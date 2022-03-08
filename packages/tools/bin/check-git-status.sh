#!/usr/bin/env bash

# Checks git status to see if there are any outstanding files to be checked in.
# This is used to detect generated files that are not properly checked in such as yarn.lock.

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

cmds=( "git" "garg" )
check_cmds "${cmds[@]}"

printf "${LCYAN}Checking git status...${NC}"
if output=$(git status --porcelain) && [ -n "$output" ]; then
  printf " ${LRED}error${NC}\n"
  printf "\n${LRED}[ERROR] Outstanding git changes need to be committed first${NC}\n"
  exit 1
else
  printf " ${LGREEN}OK${NC}\n"
fi
