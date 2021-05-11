#!/usr/bin/env bash

get_tools_dir () {
  local prg="$BASH_SOURCE"
  while [ -h "$prg" ] ; do
      local ls
      local link
      ls=`ls -ld "$prg"`
      link=`expr "$ls" : '.*-> \(.*\)$'`
      if expr "$link" : '/.*' > /dev/null; then
          prg="$link"
      else
          prg=`dirname "$prg"`"/$link"
      fi
  done
  echo "$(realpath "$(dirname "$prg")/..")"
}
TOOLS_DIR=$(get_tools_dir)
source "$TOOLS_DIR/bin/common.sh"

show_help () {
  printf "${LCYAN}Docker Script${NC}\n\n"
  printf "Usage:  docker-build.sh [OPTIONS]\n\n"
	printf "A helper script for building docker images\n\n"
	printf "Options:\n"
	printf "  -i  string  Comma separated list of images [required]\n"
	printf "  -r  string  Repository ie. r.mymc.app [required]\n"
	printf "  -p  string  Image prefix [required]\n"
	printf "  -d  string  Docker source path (default: docker)\n"
	printf "  -c  string  Cache repo\n"
	printf "  -x  string  Context directory (default: current dir)\n"
	printf "  -v  string  Version\n"
	printf "  -l          Tag with latest \n"
	printf "  -g          Ignore git status check\n"
	printf "  -n          Don't push to repository\n"
	printf "\n"
}

# A POSIX variable
OPTIND=1 # Reset in case getopts has been used previously in the shell.

# Command line variable defaults
DOCKER_SOURCE_DIR='docker'
REPO=''
IMAGES=''
IMAGE_PREFIX=''
CACHE_REPO=''
CONTEXT_DIR="$(pwd)"
OPTVER=$VERSION
IGNORE_GIT_STATUS=0
DONT_PUSH=0
TAG_LATEST=0

while getopts "h?d:r:p:c:x:i:v:gnl" opt; do
	case "$opt" in
	h|\?)
		show_help
		exit 0
		;;
  d)  DOCKER_SOURCE_DIR=$OPTARG
    ;;
	c)  CACHE_REPO=$OPTARG
		;;
	x)  CONTEXT_DIR=$OPTARG
	  ;;
	r)  REPO=$OPTARG
		;;
	p)  IMAGE_PREFIX=$OPTARG
		;;
  i)  IMAGES=$OPTARG
    ;;
  v)  OPTVER=$OPTARG
    ;;
  l)  TAG_LATEST=1
    ;;
  g)  IGNORE_GIT_STATUS=1
		;;
  n)  DONT_PUSH=1
    ;;
	esac
done

shift $((OPTIND-1))

[ "${1:-}" = "--" ] && shift

C=( "git" "docker" )
check_cmds C

function check_required_arguments () {
  if [ -z "$IMAGES" ]; then
    printf "${LRED}[ERROR] Image(s) not specified with -i${NC}\n"
    exit 1
  fi

  if [ -z "$REPO" ]; then
    printf "${LRED}[ERROR] Repository not specified with -r${NC}\n"
    exit 1
  fi

  if [ -z "$IMAGE_PREFIX" ]; then
    printf "${LRED}[ERROR] Image prefix not specified with -p${NC}\n"
    exit 1
  fi
}

check_required_arguments

# Get comma separated image names into array
IMAGE_ARRAY=()
split_csv "$IMAGES" IMAGE_ARRAY

# Get version, if not specified falls back to git sha and timestamp
if [ -z "$OPTVER" ]; then
  timestamp=$(date +%Y%m%d_%H%M%S)
  VER="$(git rev-parse --short HEAD)-$timestamp"
else
  # Strip out "ref/tags/" from version string, if it exists
  OPTVER="${OPTVER#"refs/tags/"}"

  # Version is specified, so we'll check if it matches semver
  SEMVER=$(check_if_semanticver "$OPTVER")
  if [ -z "$SEMVER" ]; then
    error "Version is not a semantic version: ${OPTVER}"
    exit 1
	else
	  if [[ $SEMVER =~ v(.+) ]]; then
	    VER="${BASH_REMATCH[1]}"
	  else
	    error "Version could not be extracted."
	    exit 1
	  fi
	fi
fi

docker_build () {
  IMAGE_NAME=$1
  TAG="$REPO/$IMAGE_PREFIX-$IMAGE_NAME:$VER"
  DOCKER_FILE="$DOCKER_SOURCE_DIR/$IMAGE_NAME/$IMAGE_NAME.dockerfile"
  CACHE_FILE="$CACHE_REPO/build-$IMAGE_NAME-cache:latest"

  if [ -n "$CACHE_REPO" ]
  then
    # Pull cached image
    printf "${LCYAN}Attempting to pull cached image: ${CACHE_FILE}...${NC}\n"
    docker pull "$CACHE_FILE" || true
  fi

  # Build image
  printf "${LCYAN}Building image: ${IMAGE_NAME}...${NC}\n"
  if [ -z "$CACHE_REPO" ]
  then
    docker build -t "$TAG" -f "$DOCKER_FILE" "$CONTEXT_DIR"
  else
    docker build -t "$TAG" -f "$DOCKER_FILE" --cache-from="$CACHE_FILE" "$CONTEXT_DIR"
  fi

  ret=$?
  if [ $ret -ne 0 ]; then
		printf "\n${LRED}[ERROR] Error building docker image: ${IMAGE_NAME}${NC}\n"
		exit 1
	else
		printf "\n${LGREEN}Build OK: ${IMAGE_NAME}${NC}\n"
	fi

  if [ -n "$CACHE_REPO" ]
  then
    # Tag and push cache
  printf "${LCYAN}Tagging and pushing cache: ${CACHE_FILE}...${NC}\n"
	docker tag "$TAG" "$CACHE_FILE"
	docker push "$CACHE_FILE"
  fi

  if [ "$TAG_LATEST" = "1" ]; then
    # Tag as latest
	  printf "${LCYAN}Tagging image as latest...${NC}\n"
	  docker tag $TAG "$REPO/$IMAGE_PREFIX-$IMAGE_NAME:latest"
  fi
}

docker_push () {
  IMAGE_NAME=$1
  TAG="$REPO/$IMAGE_PREFIX-$IMAGE_NAME:$VER"

  printf "${LCYAN}Pushing release: ${IMAGE_PREFIX}-${IMAGE_NAME}:${VER}...${NC}\n"
  docker push "$TAG"
  ret=$?
	if [ $ret -ne 0 ]; then
		printf " ${LRED}error${NC}\n"
		printf "\n${LRED}[ERROR] Error pushing docker image: ${IMAGE_NAME}:${VER}${NC}\n"
		exit 1
	else
		printf " ${LGREEN}OK${NC}\n"
	fi

  if [ "$TAG_LATEST" = "1" ]; then
    printf "${LCYAN}Pushing latest tag: ${IMAGE_PREFIX}-${IMAGE_NAME}:latest...${NC}\n"
    docker push "$REPO/$IMAGE_PREFIX-$IMAGE_NAME:latest"
  fi
}

build_summary () {
  printf "${LCYAN}DOCKER BUILD${NC}\n"
  printf "${LCYAN}============${NC}\n"
  printf "${LBLUE}Build Options:${NC}\n"
  printf "  ${LBLUE}Context dir: ${GREEN}${CONTEXT_DIR}${NC}\n"
  if [ -n "$CACHE_REPO" ]
  then
    printf "  ${LBLUE}Cache repo : ${GREEN}${CACHE_REPO}${NC}\n"
  fi
  printf "${LBLUE}Images:${NC}\n"
  for el in "${IMAGE_ARRAY[@]}"
  do
    TAG="$REPO/$IMAGE_PREFIX-$el:$VER"
    printf "  ${GREEN}${TAG}${NC}\n"
  done
  printf "\n"
}

if [ "$IGNORE_GIT_STATUS" = "0" ]; then
  check_git_status
fi

build_summary

# Build Docker Images
for el in "${IMAGE_ARRAY[@]}"
do
  docker_build "$el"
done

if [ "$DONT_PUSH" = "0" ]; then
  # Push Docker Images
  for el in "${IMAGE_ARRAY[@]}"
  do
    docker_push "$el"
  done
fi

build_summary
