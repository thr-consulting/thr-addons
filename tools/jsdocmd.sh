#!/usr/bin/env bash

cat README.md > ../../docs/api/$1.md
NODE_ENV=development $PWD/../../node_modules/.bin/jsdoc2md -c jsdoc.json --source " " --separators -g none -p table -m table --plugin dmd-clear >> ../../docs/api/$1.md
