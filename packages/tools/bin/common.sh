trap "exit 1" TERM
export TOP_PID=$$

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

# Ends the script from where ever
#   endscript
endscript () {
  kill -s TERM $TOP_PID
}

# Prints a banner message
#   banner "A banner message"
banner () {
  printf "\n${LCYAN}#################################################${NC}\n"
  printf "  ${LGREEN}%s${NC}\n" "$1"
  printf "${LCYAN}#################################################${NC}\n"
}

# Prints an error message
#   error "An error occurred."
error () {
  printf "\n${LRED}[ERROR] %s${NC}\n" "$1"
}

# Checks to see if all commands indicated in an array are present on the system
#   COMMANDS=( "dos2unix" )
#   check_cmds COMMANDS
check_cmds () {
  local -n commands=$1
  for i in "${commands[@]}"
  do
    which "$i" > /dev/null 2>&1
    ret=$?
    if [ $ret -ne 0 ]; then
      error "Required command not found: $i"
      endscript
    fi
  done
}

# Gets the directory where the bash source script resides
#   BINDIR=$(get_bin_dir BASH_SOURCE)
get_bin_dir () {
  local -n bashsource=$1
  local bindir
  bindir="$( cd "$( dirname "${bashsource[0]}" )" >/dev/null 2>&1 && pwd )"
  echo "$bindir"
}

get_node_modules_bin_dir () {
  local nm_dir
  local tools_dir
  local bin_dir
  nm_dir=""
  bin_dir=""
  tools_dir="$1"

  cd "$tools_dir" || exit 1
  while [[ $PWD != / ]] ; do
    nm_dir=$(find "$PWD" -maxdepth 1 -type d -name "node_modules")
    if [ -n "$nm_dir" ]; then
      bin_dir=$(find "$nm_dir" -maxdepth 1 -type d -name ".bin")
      if [ -n "$bin_dir" ]; then
        echo "$bin_dir"
        return 0
      fi
    fi
    cd ..
  done
  return 1
}

# Splits a CSV string into an array
#   MYARR=()
#   split_csv "my,string,to,split" MYARR
# $1 - Comma separated string to split
# $2 - Reference to array to store split strings
split_csv () {
  local instring
  local -n outarr=$2
  instring="$1"
  IFS=',' read -r -a outarr <<< "$instring"
}

# Gets package paths into an array
#   PKGDIRS=()
#   get_package_folders_arr "$PACKAGE_DIR" IGNORE_PKGS PKGDIRS
# $1 - Packages directory
# $2 - Array of packages to ignore
# $3 - Reference to array to add package paths too
get_package_folders_arr () {
  local pkgdir
  local -n ignores=$2
  local -n outarr=$3
  pkgdir="$1"
  outarr=()
  mapfile -t M < <( ls -1 "$pkgdir" )
  for i in "${M[@]}"
  do
    if [[ ! " ${ignores[@]} " =~ " ${i} " ]]; then
      outarr+=( "$(realpath "$pkgdir/$i")" )
    fi
  done
}

# Gets package folders into a newline-separated string
#   PKGSTR=$(get_package_folders_string "$PACKAGE_DIR" IGNORE_PKGS '/src')
# $1 - Packages directory
# $2 - Array of packages to ignore
# $3 - Extra string to append to each package folder
get_package_folders_string () {
  local extra
  local dirs=""
  extra=${3:-""}
  arr=()
  get_package_folders_arr "$1" $2 arr
  for i in "${arr[@]}"
  do
    dirs+="$i$extra"$'\n'
  done
  echo "$dirs"
}

# Checks if a value is a semantic version (with leading "v")
#   SEMVER=$(check_if_semanticver "v1.0.0-beta.1")
# $1 - Version string
function check_if_semanticver () {
  re='^v(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$'
  ret="$(echo "$1" | grep -oP $re)"
  if [ -z "$ret" ]; then
    echo ""
  else
    echo "$ret"
  fi
}

# Checks if git status is pure, exiting if not
#   check_git_status
check_git_status () {
  printf "${LCYAN}Checking git status...${NC}"
  if output=$(git status --porcelain) && [ -n "$output" ]; then
    printf " ${LRED}error${NC}\n"
		printf "\n${LRED}[ERROR] Outstanding git changes need to be committed first${NC}\n"
		endscript
	else
		printf " ${LGREEN}OK${NC}\n"
  fi
}

# Restores the current working directory (this is probably not needed)
SAVE_CWD=$(pwd)
restore_cwd () {
  cd "$SAVE_CWD" || kill -s TERM $TOP_PID
}

# Gets changed packages from lerna
#   PKGS=()
#   get_changes_packages PKGS
# $1 - Array to load changed packages into
get_changed_packages () {
  local commands_needed=("yarn" "jq")
  local -n pkgs=$1

  check_cmds commands_needed
  pkgs=($(yarn -s lerna changed --json | jq -r '.[].name'))
}

# Joins an array of strings together with a delimiter
#   ARR=( "one" "two" )
#   STR=$(join ARR "\n")
# $1 - Array to join together
# $2 - String delimiter
join () {
  local -n arr=$1
  local str
  str=""
  for i in "${arr[@]}"
  do
    str+="$i$2"
  done
  echo "$str"
}
