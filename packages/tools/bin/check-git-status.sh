#!/usr/bin/env bash

# Checks git status to see if there are any outstanding files to be checked in.
# This is used to detect generated files that are not properly checked in such as yarn.lock.

LRED='\033[1;31m'
LGREEN='\033[1;32m'
LCYAN='\033[1;36m'
NC='\033[0m'

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
