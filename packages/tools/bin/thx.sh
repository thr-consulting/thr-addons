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
	printf "  clean       Remove production and temporary build files\n"
	printf "  lint        Runs eslint on js, ts, and tsx files\n"
	printf "  lint:fix    Runs eslint with automatic fixing\n"
	printf "  ts          Runs the typescript compiler\n"
	printf "  depcheck    Runs depcheck\n"
	printf "  test        Runs jest\n"
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
      NODE_ENV=development yarn -s webpack --config webpack.js
      ;;
  build:prod)
      NODE_ENV=production yarn -s webpack --config webpack.js
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
      yarn -s lerna run lint
    else
      yarn -s eslint --cache --ext js,ts,tsx src "${@:2}"
    fi
    ;;
  lint:fix)
    if [ "$LR" = "$PWD" ]; then
      yarn -s lerna run lint:fix
    else
      yarn -s eslint --cache --fix --ext js,ts,tsx src "${@:2}"
    fi
    ;;
  test)
    if [ "$LR" = "$PWD" ]; then
      yarn -s lerna run test --stream
    else
      if [ "${JEST_IS_SERVER}" = true ]; then
        yarn -s jest --transform="${JEST_TRANSFORM_SERVER}" "${@:2}"
      else
        yarn -s jest --transform="${JEST_TRANSFORM_CLIENT}" "${@:2}"
      fi
    fi
    ;;
  test:watch)
    if [ "${JEST_IS_SERVER}" = true ]; then
      yarn -s jest --transform="${JEST_TRANSFORM_SERVER}" --watch "${@:2}"
    else
      yarn -s jest --transform="${JEST_TRANSFORM_CLIENT}" --watch "${@:2}"
    fi
    ;;
  ts)
    yarn -s tsc "${@:2}"
    ;;
  ts:watch)
    yarn -s tsc --watch "${@:2}"
    ;;
  deps)
    if [ "$LR" = "$PWD" ]; then
      yarn -s lerna run deps
    else
      PATS="build/*,dist/*,types/*,webpack.js,*.test.ts"
      IGS="inspect-loader"
      if [ -n "$DEPS_EXTRA_IGNORE_PATTERNS" ]; then
        PATS="${PATS},${DEPS_EXTRA_IGNORE_PATTERNS}"
      fi
      if [ -n "$DEPS_EXTRA_IGNORES" ]; then
        IGS="${IGS},${DEPS_EXTRA_IGNORES}"
      fi
      yarn -s depcheck --ignore-patterns="${PATS}" --ignores="${IGS}"
    fi
    ;;
  docs)
    if [ "$LR" = "$PWD" ]; then
      yarn -s lerna run docs
    fi
    ;;
  docs:md)
    if [ "$LR" = "$PWD" ]; then
      yarn -s lerna run docs:md
    fi
    ;;
  docs:storybook)
    if [ "$LR" = "$PWD" ]; then
      yarn -s lerna run docs:storybook
    fi
    ;;
  sort)
    if [ "$LR" = "$PWD" ]; then
      yarn -s sort-package-json "${@:2}"
      yarn -s lerna run sort
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
  *)
    show_help
    ;;
esac

# *.stories.tsx
# style-loader,css-loader
