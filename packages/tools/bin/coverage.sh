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
BINDIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

while getopts "h?c:p:i:" opt; do
	case "$opt" in
	h|\?)
		show_help
		exit 0
		;;
  p)  PACKAGE_DIR=$OPTARG
		;;
	c)  COVERAGE_DIR=$OPTARG
		;;
  i)  IGNORE_DIRS=$OPTARG
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

# Make sure the coverage dir is specified
if [ -z "$COVERAGE_DIR" ]; then
  error "Coverage directory not specified with -c"
  exit 1
fi

# Get comma separated package ignores into array
IFS=',' read -r -a IGNORE_PKGS <<< "$IGNORE_DIRS"

# Create array of source folders in each package, except ignored packages
#PKGDIRS=()
#mapfile -t M < <( ls -1 "$PACKAGE_DIR" )
#for i in "${M[@]}"
#do
#  if [[ ! " ${IGNORE_PKGS[@]} " =~ " ${i} " ]]; then
#    PKGDIRS+=("$(realpath "$PACKAGE_DIR/$i")")
#  fi
#done

PKGDIRS=( common-webpack )

for i in "${PKGDIRS[@]}"
do
  PKGBASE=$(basename "$i")
  rm -rf "${COVERAGE_DIR:?}/$PKGBASE"
  "${BINDIR:?}/jest" --coverage
done

#BIN=$PWD/../../node_modules/.bin
#COVERAGE=$PWD/../../docs/assets/coverage
#NAME=`basename $PWD`
#
#echo $NAME
#
## Delete previous coverage info
#rm -rf $COVERAGE/$NAME
#
## Generage coverage info
#$BIN/jest --coverage
#
## Generate coverbadge svg
#cat $COVERAGE/$NAME/lcov.info | $BIN/coverbadge -o $COVERAGE/$NAME/coverage.svg
#
## Copy template index.html and replace text
#cp $PWD/../../tools/template.html $COVERAGE/$NAME/index.html
#sed -i -e 's/IFRAMEURL/\.\/lcov-report\/index.html/g' $COVERAGE/$NAME/index.html
#sed -i -e "s/XX_TITLE/$NAME/g" $COVERAGE/$NAME/index.html
