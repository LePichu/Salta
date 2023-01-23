$global:ProgressPreference = "SilentlyContinue"

$SASS_PATH = "./dart-sass/dart-sass.tgz"
$SASS_VER = "1.57.1"

Remove-Item $SASS_PATH -Force -ErrorAction SilentlyContinue
Remove-Item "./dart-sass/package" -Force -Recurse -ErrorAction SilentlyContinue

Invoke-WebRequest -Uri "https://registry.npmjs.org/@lumeland/sass/-/sass-$SASS_VER.tgz" -Outfile $SASS_PATH
tar -xf $SASS_PATH -C "./dart-sass"
Remove-Item $SASS_PATH

Set-Location "./dart-sass/package"
npm install
Set-Location "../../"