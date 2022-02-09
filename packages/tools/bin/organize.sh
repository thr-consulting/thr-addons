#!/usr/bin/env bash

# Find the current directory for wherever the node_modules/@thx/tools is, following symlinks
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
  printf "${LCYAN}Organize Script${NC}\n\n"
  printf "Usage:  organize.sh [OPTIONS]\n\n"
	printf "A helper script for organizing your code.\n"
	printf "Runs the following tools:\n"
	printf "  - Sorts all package.json files\n"
	printf "  - Codemod to sort import statements\n"
	printf "  - Codemod to rename alias imports\n"
	printf "  - Codemod to fix debug namespaces\n"
	printf "  - Fixes lint issues\n\n"
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

C=( "dos2unix" "git" )
check_cmds C

# Make sure a packages dir is specified
if [ -z "$PACKAGE_DIR" ]; then
  error "Packages directory not specified with -p"
  exit 1
fi

# Get comma separated package ignores into array
split_csv "$IGNORE_DIRS" IGNORE_PKGS
SRCDIRS=$(get_package_folders_string "$PACKAGE_DIR" IGNORE_PKGS '/src')

#banner "Fixing jscodeshift"
JSCODESHIFT_DIR=$(get_jscodeshift_dir "$TOOLS_DIR")
fix_jscodeshift "$JSCODESHIFT_DIR" "$TOOLS_DIR"
restore_cwd

banner "Sorting package.json files"
yarn -s sort

banner "Codemod - Sort imports, aliases, debug namespaces"
echo "${SRCDIRS}" | DEBUG_NAMESPACE="$DEBUG_NAMESPACE" "$JSCODESHIFT_DIR/bin/jscodeshift.js" --extensions=tsx,ts --parser=tsx -t "$TOOLS_DIR/files/cmOrganize.ts" --stdin
ret=$?
if [ $ret -ne 0 ]; then
  error "Error running codemod. Lint fixing will continue to prevent many changed files."
fi

banner "Fixing lint issues"
yarn -s lint.fix

if [ $ret -ne 0 ]; then
  error "Errors occurred during generation. Some files may be left in an inconsistent state."
  exit $ret
fi

banner "Organize complete"
exit 0
