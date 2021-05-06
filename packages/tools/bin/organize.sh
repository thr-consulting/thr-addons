#!/usr/bin/env bash

RED='\033[0;31m'
GREEN='\033[0;32m'
ORANGE='\033[0;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
DGRAY='\033[1;30m'
LRED='\033[1;31m'
LGREEN='\033[1;32m'
YELLOW='\033[0;33m'
LBLUE='\033[1;34m'
LPURPLE='\033[1;35m'
LCYAN='\033[1;36m'
NC='\033[0m'

# Find the current dir for wherever the node_modules/@thx/tools is, following symlinks
PRG="$BASH_SOURCE"
progname=`basename "$BASH_SOURCE"`
while [ -h "$PRG" ] ; do
    ls=`ls -ld "$PRG"`
    link=`expr "$ls" : '.*-> \(.*\)$'`
    if expr "$link" : '/.*' > /dev/null; then
        PRG="$link"
    else
        PRG=`dirname "$PRG"`"/$link"
    fi
done
DIR=$(realpath "$(dirname "$PRG")/..")

show_help () {
  printf "${LCYAN}Organize Script${NC}\n\n"
  printf "Usage:  organize.sh [OPTIONS]\n\n"
	printf "A helper script for organizing your code.\n\n"
	printf "Options:\n"
	printf "  -p  string  Packages directory [required]\n"
	printf "  -d  string  Debug namespace root [required]\n"
	printf "  -i  string  Comma separated list of package dirs to ignore\n"
	printf "\n"
}

# A POSIX variable
OPTIND=1 # Reset in case getopts has been used previously in the shell.

# Command line variable defaults
PACKAGE_DIR=""
IGNORE_DIRS=""
DEBUG_NAMESPACE=""

while getopts "h?p:i:d:" opt; do
	case "$opt" in
	h|\?)
		show_help
		exit 0
		;;
	p)  PACKAGE_DIR=$OPTARG
		;;
  i)  IGNORE_DIRS=$OPTARG
    ;;
  d)  DEBUG_NAMESPACE=$OPTARG
    ;;
	esac
done

shift $((OPTIND-1))

[ "${1:-}" = "--" ] && shift

banner () {
  printf "\n${LCYAN}#################################################${NC}\n"
  printf "  ${LGREEN}%s${NC}\n" "$1"
  printf "${LCYAN}#################################################${NC}\n"
}

error () {
  printf "\n${LRED}[ERROR] %s${NC}\n" "$1"
}

# Make sure a packages dir is specified
if [ -z "$PACKAGE_DIR" ]; then
  error "Packages directory not specified with -p"
  exit 1
fi

# Get comma separated package ignores into array
IFS=',' read -r -a IGNORE_PKGS <<< "$IGNORE_DIRS"

# Create array of source folders in each package, except ignored packages
SRCDIRS=""
mapfile -t M < <( ls -1 "$PACKAGE_DIR" )
for i in "${M[@]}"
do
  if [[ ! " ${IGNORE_PKGS[@]} " =~ " ${i} " ]]; then
    SRCDIRS+=$(realpath "$PACKAGE_DIR/$i/src")$'\n'
  fi
done

get_jscodeshift_dir () {
  NODE_MODULES_DIR=""
  cd "$DIR" || exit 1
  while [[ $PWD != / ]] ; do
  #  echo "$PWD"
    NODE_MODULES_DIR=$(find "$PWD" -maxdepth 1 -type d -name "node_modules")
    if [ -n "$NODE_MODULES_DIR" ]; then
      JSCODESHIFT_DIR=$(find "$NODE_MODULES_DIR" -maxdepth 1 -type d -name "jscodeshift")
      if [ -n "$JSCODESHIFT_DIR" ]; then
        echo "$JSCODESHIFT_DIR"
        return 0
      fi
    fi
    cd ..
  done
}

fix_jscodeshift () {
  cd "$1/bin" || exit 1
  dos2unix -q -F *
  ret=$?
  if [ $ret -ne 0 ]; then
    error "Error fixing jscodeshift. Please install dos2unix first: apt install dos2unix."
    exit 1
  fi
  patch -Nu "$1/src/Runner.js" -i "$DIR/files/jscodeshift.patch"
}

banner "Fixing jscodeshift"
CURDIR=$(pwd)
JSCODESHIFT_DIR=$(get_jscodeshift_dir)
fix_jscodeshift "$JSCODESHIFT_DIR"
cd "$CURDIR" || exit 1

banner "Sorting package.json files"
npx sort-package-json
yarn lerna run sort

banner "Codemod"
echo "${SRCDIRS::-1}" | DEBUG_NAMESPACE="$DEBUG_NAMESPACE" "$JSCODESHIFT_DIR/bin/jscodeshift.js" --extensions=tsx,ts --parser=tsx -t "$DIR/files/cmOrganize.ts" --stdin
ret=$?
if [ $ret -ne 0 ]; then
  error "Error running codemod. Lint fixing will continue to prevent many changed files."
fi

banner "Fixing lint issues"
yarn lerna run lint:fix

if [ $ret -ne 0 ]; then
  error "Errors occurred during generation. Some files may be left in an inconsistent state."
fi
exit $ret
