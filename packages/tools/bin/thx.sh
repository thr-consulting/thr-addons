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
  printf "${LCYAN}THX Script${NC}\n\n"
  printf "Usage:  thx [COMMAND] [OPTIONS]\n\n"
	printf "A helper script for thr-addons\n\n"
	printf "Commands:\n"
	printf "  build       Runs webpack for dev & prod on webpack.js\n"
	printf "  build.dev   Runs webpack for dev on webpack.js\n"
	printf "  build.prod  Runs webpack for prod on webpack.js\n"
	printf "  check-git-status Checks if there are pending git files\n"
	printf "  ci          Runs build, ts, deps, organize, lint:fix, sort, & test\n"
	printf "  clean       Remove production and temporary build files\n"
  printf "  codemod     Runs jscodeshift codemod\n"
  printf "  coverage    Builds test coverage information\n"
  printf "  deduplicate Runs yarn deduplicate\n"
  printf "  deps        Runs depcheck\n"
  printf "  discord     Sends a message to discord via api\n"
  printf "  docker-build Runs the docker-build script\n"
  printf "  docs        Runs doc building\n"
  printf "  docs.storybook Runs doc building using storybook\n"
	printf "  lint        Runs eslint on js, ts, and tsx files\n"
	printf "  lint.fix    Runs eslint with automatic fixing\n"
	printf "  organize    Runs organize script\n"
	printf "  sort        Sorts package.json files\n"
	printf "  test        Runs jest\n"
 	printf "  test.watch  Runs jest in watch mode\n"
	printf "  ts          Runs the typescript compiler\n"
	printf "  ts.watch    Runs the typescript compiler in watch mode\n"
	printf "  watchtower  Runs docker watchtower in HTTP mode\n"
	printf "\n"
	printf "Options:      Used in project root only\n"
  printf "  -v          Displays more information\n"
	printf "\n"
}

# This was a good idea, but webstorm linting stops working if we remove this from the package.json
# ESLINT_PARSER_OPTIONS="{\"project\": \"./tsconfig-eslint.json\"}"

LR=$(get_lerna_root)
CMD="$1"

if [ "$LR" = "$PWD" ]; then
  OPTIND=2
  while getopts "v" opt; do
  	case "$opt" in
    v)  IS_DEBUG=1
      ;;
    *)
      ;;
  	esac
  done
fi

export IS_DEBUG

# Check first argument
case "${CMD}" in
  build)
    # Assumptions
    #   - Calls build from monorepo root only
    if [ "$LR" = "$PWD" ]; then
      spinop "Building" "yarn" "-s lerna run build"
    fi
    ;;
  build.roll)
    # Assumptions
    #   - Runs rollup, not from monorepo root
    if [ "$LR" != "$PWD" ]; then
      yarn -s rollup -c "${@:2}"
    fi
    ;;
  build.babel)
    # Assumptions
    #   - TS and TSX files
    #   - 'dist' output
    #   - Ignores test files
    #   - Creates sourcemaps
    #   - Not from monorepo root
    if [ "$LR" != "$PWD" ]; then
      yarn -s babel src --extensions ".ts,.tsx" --out-dir dist --source-maps --ignore "src/**/*.test.ts" "${@:2}"
    fi
    ;;
  clean)
    # Assumptions
    #   - 'dist' folder
    #   - '.eslintcache' and 'tsconfig.tsbuildinfo' files
    if [ "$LR" = "$PWD" ]; then
      spinop "Cleaning packages" "yarn" "-s lerna run clean"
      spinop "Cleaning root packages" "yarn" "-s lerna clean -y"
      spinop "Deleting node_modules" "yarn" "-s rimraf ./node_modules"
    else
      yarn -s rimraf ./dist
      yarn -s rimraf ./.eslintcache
      yarn -s rimraf ./tsconfig.tsbuildinfo
    fi
    ;;
  lint)
    # Assumptions
    #   - JS, TS,  and TSX files
    #   - 'src' folder
    if [ "$LR" = "$PWD" ]; then
      spinop "Linting" "yarn" "-s lerna run lint"
    else
      yarn -s eslint --cache --ext js,ts,tsx src "${@:2}"
    fi
    ;;
  lint.fix)
    # Assumptions
    #   - JS, TS,  and TSX files
    #   - 'src' folder
    if [ "$LR" = "$PWD" ]; then
      spinop "Linting and fixing" "yarn" "-s lerna run lint.fix"
    else
      yarn -s eslint --cache --fix --ext js,ts,tsx src "${@:2}"
    fi
    ;;
  test)
    # Assumptions
    #   - Uses mocha for tests
    if [ "$LR" = "$PWD" ]; then
      spinop "Testing" "yarn" "-s lerna run test"
    else
      yarn -s mocha "${@:2}"
      # node --experimental-vm-modules "${LR}/node_modules/.bin/jest" "${@:2}"
    fi
    ;;
  test.watch)
    # Assumptions
    if [ "$LR" = "$PWD" ]; then
      printf "Can't run test in watch mode from lerna root\n"
    else
      printf "Not implemented\n"
      # node --experimental-vm-modules "${LR}/node_modules/.bin/jest" --watch "${@:2}"
    fi
    ;;
  ts)
    # Assumptions
    #   - If ttypescript is found, uses that instead
    if [ "$LR" = "$PWD" ]; then
      spinop "Checking types" "yarn" "-s lerna run ts"
    else
      if [ -f "$LR/node_modules/.bin/ttsc" ]; then
        yarn -s ttsc "${@:2}"
      else
        yarn -s tsc "${@:2}"
      fi
    fi
    ;;
  ts.watch)
    # Assumptions
    #   - If ttypescript is found, uses that instead
    if [ "$LR" = "$PWD" ]; then
      printf "Can't run ts in watch mode from lerna root"
    else
      if [ -f "$LR/node_modules/.bin/ttsc" ]; then
        yarn -s ttsc --watch "${@:2}"
      else
        yarn -s tsc --watch "${@:2}"
      fi
    fi
    ;;
  deps)
    if [ "$LR" = "$PWD" ]; then
      spinop "Checking dependencies" "yarn" "-s lerna run deps"
    else
      PATTERNS=""
      IGNORES=""

      OPTIND=2
      while getopts "p:i:" opt; do
      	case "$opt" in
        p)  PATTERNS=$OPTARG
          ;;
      	i)  IGNORES=$OPTARG
      		;;
        *)
          ;;
      	esac
      done

      PATS="build/*,dist/*,types/*,*.test.ts,*.test.js,.eslintrc.cjs"
      IGS="inspect-loader"
      if [ -n "${PATTERNS}" ]; then
        PATS="${PATS},${PATTERNS}"
      fi
      if [ -n "${IGNORES}" ]; then
        IGS="${IGS},${IGNORES}"
      fi

      yarn -s depcheck --ignore-patterns="${PATS}" --ignores="${IGS}" "${@:OPTIND+1}"
    fi
    ;;
  docs)
    if [ "$LR" = "$PWD" ]; then
      spinop "Building docs" "yarn" "-s lerna run docs"
    else
      printf "Docs doesn't have anything to do in specific packages\n"
    fi
    ;;
  docs.storybook)
    if [ "$LR" = "$PWD" ]; then
      spinop "Building storybook docs" "yarn" "-s lerna run docs.storybook"
    fi
    ;;
  sort)
    if [ "$LR" = "$PWD" ]; then
      spinop "Sorting root package.json" "yarn" "-s sort-package-json"
      spinop "Sorting packages package.json" "yarn" "-s lerna run sort"
    else
      yarn -s sort-package-json "${@:2}"
    fi
    ;;
  ci)
    if [ "$LR" = "$PWD" ]; then
      spinop "Building" "yarn" "-s build"
      spinop "Checking types" "yarn" "-s ts"
      spinop "Checking dependencies" "yarn" "-s deps"
      spinop "Organizing code and linting" "yarn" "-s organize"
      spinop "Testing" "yarn" "-s test"
    fi
    ;;
  organize)
    if [ "$LR" = "$PWD" ]; then
      printf "${LRED}============${NC}\n"
      printf "%s\n" "${@:OPTIND+1}"
      printf "${LRED}============${NC}\n"
      printf "%s\n" "${OPTIND}"
      printf "${LRED}============${NC}\n"
      "${TOOLS_DIR}/bin/organize.sh" "${@:OPTIND+1}"
    fi
    ;;
  codemod)
    yarn -s jscodeshift --extensions=ts,tsx --parser=tsx "${@:2}"
    ;;
  deduplicate)
    npx yarn-deduplicate
    ;;
  watchtower)
    "${TOOLS_DIR}/bin/watchtower.sh" "${@:2}"
    ;;
  docker-build)
    "${TOOLS_DIR}/bin/docker-build.sh" "${@:2}"
    ;;
  discord)
    "${TOOLS_DIR}/bin/discord.sh" "${@:2}"
    ;;
  coverage)
    # TODO this does not autodetect if 'test' is not defined in package.json
    if [ "$LR" = "$PWD" ]; then
      "${TOOLS_DIR}/bin/coverage.sh" "${@:2}"
    fi
    ;;
  check-git-status)
    "${TOOLS_DIR}/bin/check-git-status.sh" "${@:2}"
    ;;
  *)
    show_help
    ;;
esac
