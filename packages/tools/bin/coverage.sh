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
  printf "${LCYAN}Coverage Script${NC}\n\n"
  printf "Usage:  coverage.sh [OPTIONS]\n\n"
	printf "A helper script for gathering test coverage info.\n\n"
	printf "Options:\n"
	printf "  -p  string  Packages directory [required]\n"
	printf "  -c  string  Coverage directory [required]\n"
	printf "  -i  string  Comma separated list of package dirs to ignore\n"
	printf "\n"
}

# A POSIX variable
OPTIND=1 # Reset in case getopts has been used previously in the shell.

# Command line variable defaults
PACKAGE_DIR=""
COVERAGE_DIR=""
IGNORE_DIRS=""

BINDIR=$(get_node_modules_bin_dir "$TOOLS_DIR")

while getopts "h?c:p:i:" opt; do
	case "$opt" in
	h|\?)
		show_help
		exit 0
		;;
  p)  PACKAGE_DIR=$OPTARG
		;;
	c)  COVERAGE_DIR=$(realpath $OPTARG)
		;;
  i)  IGNORE_DIRS=$OPTARG
    ;;
	esac
done

shift $((OPTIND-1))

[ "${1:-}" = "--" ] && shift

# Make sure a packages dir is specified
if [ -z "$PACKAGE_DIR" ]; then
  error "Packages directory not specified with -p"
  exit 1
fi

# Make sure the coverage dir is specified
if [ -z "$COVERAGE_DIR" ]; then
  error "Coverage directory not specified with -c"
  exit 1
fi

# Get comma separated package ignores into array
split_csv "$IGNORE_DIRS" IGNORE_PKGS

# Create array of source folders in each package, except ignored packages
PKGDIRS=()
get_package_folders_arr "$PACKAGE_DIR" IGNORE_PKGS PKGDIRS

for i in "${PKGDIRS[@]}"
do
  PKGBASE=$(basename "$i")
  cd "$i" || exit 1

  # Remove existing coverage dir
  if [ -d "${COVERAGE_DIR:?}/$PKGBASE" ]; then
    rm -rf "${COVERAGE_DIR:?}/$PKGBASE"
  fi

  # Generate coverage info
  "${BINDIR:?}/jest" --coverage --silent

  # Generate coverage badge
  LCOV="${COVERAGE_DIR:?}/$PKGBASE/lcov.info"
  if [ -f "$LCOV" ]; then
    cat "$LCOV" | "$BINDIR"/coverbadge -o "${COVERAGE_DIR:?}/$PKGBASE/coverage.svg"
  fi
done

restore_cwd

## Copy template index.html and replace text
#cp $PWD/../../tools/template.html $COVERAGE/$NAME/index.html
#sed -i -e 's/IFRAMEURL/\.\/lcov-report\/index.html/g' $COVERAGE/$NAME/index.html
#sed -i -e "s/XX_TITLE/$NAME/g" $COVERAGE/$NAME/index.html
