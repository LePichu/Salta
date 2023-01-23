$global:ProgressPreference = "SilentlyContinue"

$SASS_PATH = "./dart-sass/dart-sass.tgz"
$SASS_VER = "1.57.1"

if (Test-Path $SASS_PATH) {
    Remove-Item $SASS_PATH
}

Invoke-WebRequest -Uri "https://registry.npmjs.org/@lumeland/sass/-/sass-$SASS_VER.tgz" -Outfile $SASS_PATH
tar -xf $SASS_PATH -C "./dart-sass"
Remove-Item $SASS_PATH

Set-Location "$SASS_PATH/dart-sass"
npm install
Set-Location "../../"