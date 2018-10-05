#!/usr/bin/env bash

BIN=$PWD/../../node_modules/.bin
#COVERAGE=$PWD/../../website/static/coverage
COVERAGE=$PWD/../../docs/assets/coverage
#COVERAGE_PAGES=$PWD/../../website/pages/coverage

$BIN/jest --coverage --coverageDirectory $COVERAGE/$1 && cat $COVERAGE/$1/lcov.info | $BIN/coverbadge -o $COVERAGE/$1/coverage.svg

cp $PWD/../../tools/template.html $COVERAGE/$1/index.html

sed -i -e 's/IFRAMEURL/\.\/lcov-report\/index.html/g' $COVERAGE/$1/index.html

#find $COVERAGE/$1/ -type f -print0 | xargs -0 sed -i 's/href="[./]*base\.css"/href="\/lcov\/base\.css"/g'

#find $COVERAGE_PAGES/$1/lcov-report -type f -print0 | xargs -0 sed -i 's/href="[./]*base\.css"/href="\/lcov\/base\.css"/g'
#find $COVERAGE_PAGES/$1/lcov-report -type f -print0 | xargs -0 sed -i 's/href="[./]*prettify\.css"/href="\/lcov\/prettify\.css"/g'
#find $COVERAGE_PAGES/$1/lcov-report -type f -print0 | xargs -0 sed -i 's/src="[./]*block-navigation\.js"/src="\/lcov\/block-navigation\.js"/g'
#find $COVERAGE_PAGES/$1/lcov-report -type f -print0 | xargs -0 sed -i 's/src="[./]*prettify\.js"/src="\/lcov\/prettify\.js"/g'
#find $COVERAGE_PAGES/$1/lcov-report -type f -print0 | xargs -0 sed -i 's/src="[./]*sorter\.js"/src="\/lcov\/sorter\.js"/g'
#find $COVERAGE_PAGES/$1/lcov-report -type f -print0 | xargs -0 sed -i 's/[./]*sort-arrow-sprite\.png/\/lcov\/sort-arrow-sprite\.png/g'
#
#find $COVERAGE_PAGES -name "*.js" -type f -delete
#find $COVERAGE_PAGES -name "*.css" -type f -delete
