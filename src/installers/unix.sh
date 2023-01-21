#!/bin/bash
set -e

wget "https://github.com/sass/dart-sass/releases/download/${SASS_VER}/dart-sass-${SASS_VER}-${OS}-${ARCH}.${EXT}" -O ${DL_PATH}

tar -xf ${DL_PATH} -C ${INS_PATH}

rm -rf ${DL_PATH}

echo "#!/bin/bash
${INS_PATH}/dart-sass/sass \$@" > "${INS_PATH}/sass"

chmod +x "${INS_PATH}/sass"

echo "🎯 Finished installing Dart-Sass!"