#!/usr/bin/env bash

# This script generates code from graphql schemas and updates the generated code using codemods and lint fixing.

# Locate the @thx/tools thx script and source the common features from it
BSDIR=$(dirname "$BASH_SOURCE")
get_tools_dir () {
  local prg="$BSDIR/thx"
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

# Locate the @thx/codegen script dir
get_thxcodegen_dir () {
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
THXCODEGEN_DIR=$(get_thxcodegen_dir)

show_help () {
  printf "${LCYAN}Thx Codegen Script${NC}\n\n"
  printf "Usage:  thx.codegen [OPTIONS]\n\n"
	printf "A helper script for generating typescript code from graphql.\n"
	printf "Options:\n"
	printf "  -d          Debug mode\n"
	printf "  -p  string  Packages directory (ie. packages) [required]\n"
	printf "  -e  string  Package(s) where entities exist, comma separated (ie. domain) [required]"
	printf "  -i  string  Comma separated list of package dirs to ignore\n"
	printf "  -s  string  The scope of the monorepo (ie. thx) [required]"
	printf "  -r  string  The folder under each package where source code resides (default: src)"
	printf "\n"
}

# A POSIX variable
OPTIND=1 # Reset in case getopts has been used previously in the shell.

DEBUG_MODE=0
PACKAGE_DIR=""
ENTITIES=""
SCOPE=""
IGNORE_DIRS=""
SRC="src"
LR=$(get_lerna_root)

while getopts "h?dp:e:s:i:" opt; do
	case "$opt" in
	h|\?)
		show_help
		exit 0
		;;
	d)  DEBUG_MODE=1
	  ;;
	p)  PACKAGE_DIR=$OPTARG
	  ;;
	e)  ENTITIES=$OPTARG
	  ;;
	s)  SCOPE=$OPTARG
	  ;;
	i)  IGNORE_DIRS=$OPTARG
	  ;;
	esac
done
shift $((OPTIND-1))
[ "${1:-}" = "--" ] && shift

export DEBUG_MODE
export SCOPE
export PACKAGE_DIR

if [ "$LR" = "$PWD" ]; then
  # Check for the presence of dos2unix
  C=( "dos2unix" )
  check_cmds C

  op "Patching jscodeshift"
  JSCODESHIFT_DIR=$(get_jscodeshift_dir "$TOOLS_DIR")
  fix_jscodeshift "$JSCODESHIFT_DIR" "$TOOLS_DIR" > /dev/null 2>&1
  restore_cwd

  split_csv "$IGNORE_DIRS" IGNORE_PKGS
  split_csv "$ENTITIES" ENTITY_PKGS
  ENTITY_DIRS=$(get_package_filtered_folders_string "$PACKAGE_DIR" ENTITY_PKGS "/$SRC")
  PKG_SRC_DIRS=$(get_package_folders_string "$PACKAGE_DIR" IGNORE_PKGS "/$SRC")
  PKG_CODEGEN_DIRS=$(node "$THXCODEGEN_DIR/files/findCodegenPkgs.mjs" "GET_CODEGEN_DIRS" "${PKG_SRC_DIRS}" "${SRC}")
  PKG_CODEGEN_NAMES=$(node "$THXCODEGEN_DIR/files/findCodegenPkgs.mjs" "GET_CODEGEN_NAMES" "${PKG_SRC_DIRS}" "${SRC}" "$(realpath "${PACKAGE_DIR}")")

  if [ "$DEBUG_MODE" -eq "1" ]; then
    echo "== pkg src dirs ============================="
    echo "$PKG_SRC_DIRS"
    echo "== pkg codegen dirs ========================="
    echo "$PKG_CODEGEN_DIRS"
    echo "== pkg codegen names ========================"
    echo "$PKG_CODEGEN_NAMES"
    echo "============================================="
  fi

  op "Mapping entities from: ${ENTITY_DIRS}"
  rm -f /tmp/imp_codegen_entity_map.txt
  O=$( { echo "${ENTITY_DIRS}" | "$JSCODESHIFT_DIR/bin/jscodeshift.js" --extensions=tsx,ts --parser=tsx -t "$THXCODEGEN_DIR/files/cmMapEntities.ts" --stdin; } 2>&1 )
  if [ "$?" -ne "0" ]; then
    error "Cannot map entities"
    printf "${YELLOW}%s${NC}\n" "${O}"
    exit 1
  fi

  op "Generating TS code from graphql schema"
  O=$( { yarn lerna run codegen; } 2>&1 )
  if [ "$?" -ne "0" ]; then
    error "Problem running graphql-codegen"
    printf "${YELLOW}%s${NC}\n" "${O}"
    exit 2
  fi

  op "Creating enums and fixing/sorting imports"
#  echo "${PKG_CODEGEN_DIRS}" | DEBUG_NAMESPACE="${SCOPE}" "$JSCODESHIFT_DIR/bin/jscodeshift.js" --extensions=tsx,ts --parser=tsx -t "$THXCODEGEN_DIR/files/cmCodegen.ts" --stdin
  O=$( { echo "${PKG_CODEGEN_DIRS}" | DEBUG_NAMESPACE="${SCOPE}" "$JSCODESHIFT_DIR/bin/jscodeshift.js" --extensions=tsx,ts --parser=tsx -t "$THXCODEGEN_DIR/files/cmCodegen.ts" --stdin; } 2>&1 )
  if [ "$?" -ne "0" ]; then
    error "Problem creating enums or fixing imports"
    printf "${YELLOW}%s${NC}\n" "${O}"
    exit 3
  fi

  op "Running lint fix in: ${PKG_CODEGEN_NAMES}"
  O=$(yarn lerna run lint.fix --scope "${PKG_CODEGEN_NAMES}")
  if [ "$?" -ne "0" ]; then
    error "Problem running lint fix"
    printf "${YELLOW}%s${NC}\n" "${O}"
    exit 4
  fi

  rm -f /tmp/imp_codegen_entity_map.txt
else
  yarn -s graphql-codegen "${@:2}"
fi
