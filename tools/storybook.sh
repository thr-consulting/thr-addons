#!/usr/bin/env bash

BIN=$PWD/../../node_modules/.bin
STORYBOOK=$PWD/../../docs/assets/storybook

$BIN/build-storybook -c $PWD/.storybook -o $STORYBOOK/$1

cp $PWD/../../tools/template.html $STORYBOOK/$1/frame.html

sed -i -e 's/IFRAMEURL/\.\/index.html/g' $STORYBOOK/$1/frame.html
