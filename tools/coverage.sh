#!/usr/bin/env bash

BIN=$PWD/../../node_modules/.bin
COVERAGE=$PWD/../../docs/assets/coverage

$BIN/jest --coverage --coverageDirectory $COVERAGE/$1 && cat $COVERAGE/$1/lcov.info | $BIN/coverbadge -o $COVERAGE/$1/coverage.svg

cp $PWD/../../tools/template.html $COVERAGE/$1/index.html

sed -i -e 's/IFRAMEURL/\.\/lcov-report\/index.html/g' $COVERAGE/$1/index.html
