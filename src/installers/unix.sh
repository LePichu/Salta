#!/bin/bash

set -e

wget \
    "https://github.com/sass/dart-sass/releases/download/${SASS_VER}/dart-sass-${SASS_VER}-${OS}-${ARCH}.zip" \
    -O ${DL_PATH}

rm -rf ${INS_PATH}/dart-sass

tar -zxf ${DL_PATH} ${INS_PATH}

rm -rf ${DL_PATH}