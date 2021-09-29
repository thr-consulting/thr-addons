#!/usr/bin/env bash

# This script generates code from graphql schemas and updates the generated code using codemods and lint fixing.

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
  printf "${LCYAN}Codegen Script${NC}\n\n"
  printf "Usage:  codegen.sh [OPTIONS]\n\n"
	printf "A helper script for generating typescript code from graphql.\n"
	printf "Options:\n"
	printf "  -p  string  Packages directory [required]\n"
	printf "  -i  string  Comma separated list of package dirs to ignore\n"
	printf "  -d  string  Debug namespace root [required]\n"
	printf "\n"
}

# A POSIX variable
OPTIND=1 # Reset in case getopts has been used previously in the shell.

PACKAGE_DIR=""
IGNORE_DIRS=""
DEBUG_NAMESPACE=""
QUICK_AND_DIRTY=0

while getopts "h?p:i:qd:" opt; do
	case "$opt" in
	h|\?)
		show_help
		exit 0
		;;
	p)  PACKAGE_DIR=$OPTARG
		;;
  i)  IGNORE_DIRS=$OPTARG
    ;;
  q)  QUICK_AND_DIRTY=1
    ;;
  d)  DEBUG_NAMESPACE=$OPTARG
    ;;
	esac
done
shift $((OPTIND-1))
[ "${1:-}" = "--" ] && shift

C=( "dos2unix" )
check_cmds C

# Make sure a packages dir is specified
if [ -z "$PACKAGE_DIR" ]; then
  error "Packages directory not specified with -p"
  exit 1
fi

# Get comma separated package ignores into array
split_csv "$IGNORE_DIRS" IGNORE_PKGS
SRCDIRS=$(get_package_folders_string "$PACKAGE_DIR" IGNORE_PKGS '/src')

banner "Patching jscodeshift"
JSCODESHIFT_DIR=$(get_jscodeshift_dir "$TOOLS_DIR")
echo "TOOLS_DIR: ${TOOLS_DIR}"
echo "JSCODESHIFT_DIR: ${JSCODESHIFT_DIR}"
fix_jscodeshift "$JSCODESHIFT_DIR" "$TOOLS_DIR"
restore_cwd

banner "Mapping Entities"
rm -f /tmp/imp_codegen_entity_map.txt
echo "${SRCDIRS::-1}" | "$JSCODESHIFT_DIR/bin/jscodeshift.js" --extensions=tsx,ts --parser=tsx -t "$TOOLS_DIR/files/cmMapEntities.ts" --stdin
ret=$?
if [ $ret -ne 0 ]; then
  error "Error running entity mapping codemod."
  exit 1
fi
node "$TOOLS_DIR/files/mapEntities.mjs" "$(realpath "${PACKAGE_DIR}")" "src"

banner "Generating code from graphql schema & documents"
yarn lerna run codegen

banner "Codemod"
echo "${SRCDIRS}" | "$JSCODESHIFT_DIR/bin/jscodeshift.js" --extensions=tsx,ts --parser=tsx -t "$TOOLS_DIR/files/cmCodegen.ts" --stdin
ret=$?
if [ $ret -ne 0 ]; then
  error "Error running codemod. Lint fixing will continue to prevent many changed files."
fi

banner "Organize"
echo "${SRCDIRS}" | DEBUG_NAMESPACE="$DEBUG_NAMESPACE" "$JSCODESHIFT_DIR/bin/jscodeshift.js" --extensions=tsx,ts --parser=tsx -t "$TOOLS_DIR/files/cmOrganize.ts" --stdin
ret=$?
if [ $ret -ne 0 ]; then
  error "Error running codemod. Lint fixing will continue to prevent many changed files."
fi

if [ $QUICK_AND_DIRTY -eq 0 ]; then
  banner "Fixing lint issues"
  yarn lint:fix
else
  warning "Lint did not run, git may have many changes"
fi

if [ $ret -ne 0 ]; then
  error "Errors occurred during generation. Some files may be left in an inconsistent state."
fi

rm -f /tmp/imp_codegen_entity_map.txt
exit $ret
