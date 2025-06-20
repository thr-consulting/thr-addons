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
	printf "  -v          Verbose mode\n"
	printf "  -p  string  Packages directory (ie. packages) [required]\n"
	printf "  -e  string  Package(s) where entities exist, comma separated (ie. domain) [required]"
	printf "  -i  string  Comma separated list of package dirs to ignore\n"
	printf "  -s  string  The scope of the monorepo (ie. thx) [required]"
	printf "  -r  string  The folder under each package where source code resides (default: src)"
	printf "\n"
}

# A POSIX variable
OPTIND=1 # Reset in case getopts has been used previously in the shell.

IS_DEBUG=0
PACKAGE_DIR=""
ENTITIES=""
SCOPE=""
IGNORE_DIRS=""
SRC="src"
LR=$(get_lerna_root)

while getopts "h?vp:e:s:i:r:" opt; do
	case "$opt" in
	h|\?)
		show_help
		exit 0
		;;
	v)  IS_DEBUG=1
	  ;;
	p)  PACKAGE_DIR=$OPTARG
	  ;;
	e)  ENTITIES=$OPTARG
	  ;;
	s)  SCOPE=$OPTARG
	  ;;
	i)  IGNORE_DIRS=$OPTARG
	  ;;
	r)  SRC=$OPTARG
	  ;;
	esac
done
shift $((OPTIND-1))
[ "${1:-}" = "--" ] && shift

export IS_DEBUG
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

  if [ "$IS_DEBUG" = "1" ]; then
    banner "Package Source Dirs (PKG_SRC_DIRS)"
    printf "%s\n" "$PKG_SRC_DIRS"
    banner "Package Codegen Dirs (PKG_CODEGEN_DIRS)"
    printf "%s\n" "$PKG_CODEGEN_DIRS"
    banner "Package Codegen Names (PKG_CODEGEN_NAMES)"
    printf "%s\n\n" "$PKG_CODEGEN_NAMES"
  fi

  # Remove tmp file
  rm -f /tmp/imp_codegen_entity_map.txt

  # Map entities into tmp file
  if [ "$IS_DEBUG" = "1" ]; then
    op "Mapping entities from: ${ENTITY_DIRS}"
    echo "${ENTITY_DIRS}" | "$JSCODESHIFT_DIR/bin/jscodeshift.js" --extensions=tsx,ts --parser=tsx -t "$THXCODEGEN_DIR/files/cmMapEntities.ts" --stdin
  else
    coproc bfd { echo "${ENTITY_DIRS}" | "$JSCODESHIFT_DIR/bin/jscodeshift.js" --extensions=tsx,ts --parser=tsx -t "$THXCODEGEN_DIR/files/cmMapEntities.ts" --stdin 2>&1; }
    exec 3>&${bfd[0]}
    spinner "$!" "Mapping entities from: ${ENTITY_DIRS}"
    ret="$?"
    if [ "$ret" -ne "0" ]; then
      IFS= read -d '' -u 3 O
      printf "\n%s\n" "${O}"
      exit $ret
    fi
  fi

  if [ "$IS_DEBUG" = "1" ]; then
    banner "Mapped entities"
    cat /tmp/imp_codegen_entity_map.txt
    printf "\n"
  fi

  # Update codegen.yml files with mapped entities
  if [ "$IS_DEBUG" = "1" ]; then
    op "Updating codegen.yml"
    node "$THXCODEGEN_DIR/files/updateCodegen.mjs" "$(realpath "${PACKAGE_DIR}")" "${PKG_CODEGEN_NAMES}" "${SRC}"
  else
    coproc bfd { node "$THXCODEGEN_DIR/files/updateCodegen.mjs" "$(realpath "${PACKAGE_DIR}")" "${PKG_CODEGEN_NAMES}" "${SRC}" 2>&1; }
    exec 3>&${bfd[0]}
    spinner "$!" "Updating codegen.yml"
    ret="$?"
    if [ "$ret" -ne "0" ]; then
      IFS= read -d '' -u 3 O
      printf "\n%s\n" "${O}"
      exit $ret
    fi
  fi

  # Generate TS code with codegen in each package
  CHANGED_GRAPHQL_FILES=$(git diff --name-only master -- '*.graphql' | grep "^${PACKAGE_DIR}/" || true)

  if [ -z "$CHANGED_GRAPHQL_FILES" ]; then
    echo "No changed .graphql files detected from master. Skipping codegen."
  else
    echo "Changed .graphql files detected:"
    echo "$CHANGED_GRAPHQL_FILES"

    if [ "$IS_DEBUG" = "1" ]; then
      op "Generating TS code from graphql schema on changed .graphql files"
      yarn graphql-codegen --config codegen.yml --files $CHANGED_GRAPHQL_FILES
    else
      coproc bfd { yarn graphql-codegen --config codegen.yml --files $CHANGED_GRAPHQL_FILES 2>&1; }
      exec 3>&${bfd[0]}
      spinner "$!" "Generating TS code from graphql schema on changed .graphql files"
      ret="$?"
      if [ "$ret" -ne "0" ]; then
        IFS= read -d '' -u 3 O
        printf "\n%s\n" "${O}"
        exit $ret
      fi
    fi
  fi

  # Create enums, fix imports, sort imports
  if [ "$IS_DEBUG" = "1" ]; then
    op "Creating enums and fixing/sorting imports"
    echo "${PKG_CODEGEN_DIRS}" | DEBUG_NAMESPACE="${SCOPE}" "$JSCODESHIFT_DIR/bin/jscodeshift.js" --extensions=tsx,ts --parser=tsx -t "$THXCODEGEN_DIR/files/cmCodegen.ts" --stdin
  else
    coproc bfd { echo "${PKG_CODEGEN_DIRS}" | DEBUG_NAMESPACE="${SCOPE}" "$JSCODESHIFT_DIR/bin/jscodeshift.js" --extensions=tsx,ts --parser=tsx -t "$THXCODEGEN_DIR/files/cmCodegen.ts" --stdin 2>&1; }
    exec 3>&${bfd[0]}
    spinner "$!" "Creating enums and fixing/sorting imports"
    ret="$?"
    if [ "$ret" -ne "0" ]; then
      IFS= read -d '' -u 3 O
      printf "\n%s\n" "${O}"
      exit $ret
    fi
  fi

  # Run lint.fix per package with timings
  op "Running lint fix per package with timings"

  IFS=',' read -ra PKG_ARR <<< "$PKG_CODEGEN_NAMES"

  for pkg in "${PKG_ARR[@]}"; do
    full_scope="@${SCOPE}/${pkg}"

    echo "⏳ Starting lint.fix for package: $full_scope"
    START_TIME=$(date +%s)

    LOG_FILE=$(mktemp)
    yarn lerna run lint.fix --scope "$full_scope" &> "$LOG_FILE"
    ret="$?"

    END_TIME=$(date +%s)
    DURATION=$((END_TIME - START_TIME))

    if [ "$ret" -ne 0 ]; then
      echo "❌ Lint fix failed for package: $full_scope (took ${DURATION}s)"
      echo "---- Output ----"
      cat "$LOG_FILE"
      echo "----------------"
      rm "$LOG_FILE"
      exit $ret
    else
      echo "✅ Lint fix succeeded for package: $full_scope (took ${DURATION}s)"
    fi

    rm "$LOG_FILE"
  done

  # Remove tmp file
  rm -f /tmp/imp_codegen_entity_map.txt
else
  # Run graphql-codegen
  yarn -s graphql-codegen "${@:2}"
fi
