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
  printf "Usage:  thx [COMMAND]\n\n"
	printf "A helper script for thr-addons\n\n"
	printf "Commands:\n"
	printf "  build       Runs webpack for dev & prod on webpack.js\n"
	printf "  build:dev   Runs webpack for dev on webpack.js\n"
	printf "  build:prod  Runs webpack for prod on webpack.js\n"
	printf "  ci          Runs build, ts, deps, organize, lint:fix, sort, & test\n"
	printf "  clean       Remove production and temporary build files\n"
  printf "  codegen     Runs codegen script\n"
  printf "  codemod     Runs jscodeshift codemod\n"
  printf "  deps        Runs depcheck\n"
  printf "  docs        Runs doc building\n"
  printf "  docs:md     Runs doc building for markdown\n"
  printf "  docs:storybook Runs doc building using storybook\n"
	printf "  lint        Runs eslint on js, ts, and tsx files\n"
	printf "  lint:fix    Runs eslint with automatic fixing\n"
	printf "  organize    Runs organize script\n"
	printf "  sort        Sorts package.json files\n"
	printf "  test        Runs jest (use -c for client)\n"
 	printf "  test:watch  Runs jest in watch mode (use -c for client)\n"
	printf "  ts          Runs the typescript compiler\n"
	printf "  ts:watch    Runs the typescript compiler in watch mode\n"
	printf "\n"
}

# A POSIX variable
OPTIND=1 # Reset in case getopts has been used previously in the shell.

# This was a good idea, but webstorm linting stops working if we remove this from the package.json
# ESLINT_PARSER_OPTIONS="{\"project\": \"./tsconfig-eslint.json\"}"
JEST_IS_SERVER=true
JEST_TRANSFORM_SERVER="{\"^.+.[tj]sx?$\":\"$TOOLS_DIR/files/jest-transform-server.js\"}"
JEST_TRANSFORM_CLIENT="{\"^.+.[tj]sx?$\":\"$TOOLS_DIR/files/jest-transform-client.js\"}"
DEPS_EXTRA_IGNORE_PATTERNS=""
DEPS_EXTRA_IGNORES=""
LR=$(get_lerna_root)

while getopts "?p:i:c" opt; do
	case "$opt" in
	\?)
    show_help
    exit 0
    ;;
  p)  DEPS_EXTRA_IGNORE_PATTERNS=$OPTARG
    ;;
	i)  DEPS_EXTRA_IGNORES=$OPTARG
		;;
  c)  JEST_IS_SERVER=false
    ;;
	esac
done
shift $((OPTIND-1))
[ "${1:-}" = "--" ] && shift

case "${1}" in
  build)
    printf "${LCYAN}>>> DEVELOPMENT${NC}\n"
    NODE_ENV=development yarn -s webpack --config webpack.js
    printf "${LCYAN}>>> PRODUCTION${NC}\n"
    NODE_ENV=production yarn -s webpack --config webpack.js
    ;;
  build:dev)
      NODE_ENV=development yarn -s webpack --config webpack.js "${@:2}"
      ;;
  build:prod)
      NODE_ENV=production yarn -s webpack --config webpack.js "${@:2}"
      ;;
  clean)
    if [ "$LR" = "$PWD" ]; then
      yarn -s lerna run clean
      yarn -s lerna clean -y
      yarn -s rimraf ./node_modules
    else
      yarn -s rimraf ./dist
      yarn -s rimraf ./.eslintcache
      yarn -s rimraf ./tsconfig.tsbuildinfo
    fi
    ;;
  lint)
    if [ "$LR" = "$PWD" ]; then
      yarn -s lerna run lint "${@:2}"
    else
      yarn -s eslint --cache --ext js,ts,tsx src "${@:2}"
    fi
    ;;
  lint:fix)
    if [ "$LR" = "$PWD" ]; then
      yarn -s lerna run lint:fix "${@:2}"
    else
      yarn -s eslint --cache --fix --ext js,ts,tsx src "${@:2}"
    fi
    ;;
  test)
    if [ "$LR" = "$PWD" ]; then
      yarn -s lerna run test --stream "${@:2}"
    else
      if [ "${JEST_IS_SERVER}" = true ]; then
        yarn -s jest --transform="${JEST_TRANSFORM_SERVER}" "${@:2}"
      else
        yarn -s jest --transform="${JEST_TRANSFORM_CLIENT}" "${@:2}"
      fi
    fi
    ;;
  test:watch)
    if [ "$LR" = "$PWD" ]; then
      printf "Can't run test in watch mode from lerna root\n"
    else
      if [ "${JEST_IS_SERVER}" = true ]; then
        yarn -s jest --transform="${JEST_TRANSFORM_SERVER}" --watch "${@:2}"
      else
        yarn -s jest --transform="${JEST_TRANSFORM_CLIENT}" --watch "${@:2}"
      fi
    fi
    ;;
  ts)
    if [ "$LR" = "$PWD" ]; then
      yarn -s lerna run ts "${@:2}"
    else
      if [ -f "$LR/node_modules/.bin/ttsc" ]; then
        yarn -s ttsc "${@:2}"
      else
        yarn -s tsc "${@:2}"
      fi
    fi
    ;;
  ts:watch)
    if [ "$LR" = "$PWD" ]; then
      printf "Can't run ts in watch mode from lerna root\n"
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
      yarn -s lerna run deps "${@:2}"
    else
      PATS="build/*,dist/*,types/*,webpack.js,*.test.ts"
      IGS="inspect-loader"
      if [ -n "$DEPS_EXTRA_IGNORE_PATTERNS" ]; then
        PATS="${PATS},${DEPS_EXTRA_IGNORE_PATTERNS}"
      fi
      if [ -n "$DEPS_EXTRA_IGNORES" ]; then
        IGS="${IGS},${DEPS_EXTRA_IGNORES}"
      fi
      yarn -s depcheck --ignore-patterns="${PATS}" --ignores="${IGS}" "${@:2}"
    fi
    ;;
  docs)
    if [ "$LR" = "$PWD" ]; then
      yarn -s lerna run docs "${@:2}"
    fi
    ;;
  docs:md)
    if [ "$LR" = "$PWD" ]; then
      yarn -s lerna run docs:md "${@:2}"
    fi
    ;;
  docs:storybook)
    if [ "$LR" = "$PWD" ]; then
      yarn -s lerna run docs:storybook "${@:2}"
    fi
    ;;
  sort)
    if [ "$LR" = "$PWD" ]; then
      yarn -s sort-package-json
      yarn -s lerna run sort "${@:2}"
    else
      yarn -s sort-package-json "${@:2}"
    fi
    ;;
  ci)
    if [ "$LR" = "$PWD" ]; then
      yarn -s build
      yarn -s ts
      yarn -s deps
      yarn -s organize
      yarn -s lint:fix
      yarn -s sort
      yarn -s test
    fi
    ;;
  codegen)
    if [ "$LR" = "$PWD" ]; then
      yarn -s thx_codegen "${@:2}"
    else
      yarn -s graphql-codegen "${@:2}"
    fi
    ;;
  organize)
    if [ "$LR" = "$PWD" ]; then
      yarn -s thx_organize "${@:2}"
    fi
    ;;
  codemod)
    yarn -s jscodeshift --extensions=ts,tsx --parser=tsx "${@:2}"
    ;;
  *)
    show_help
    ;;
esac
