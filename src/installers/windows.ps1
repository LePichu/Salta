$global:ProgressPreference = "SilentlyContinue"

Invoke-WebRequest -Uri "https://github.com/sass/dart-sass/releases/download/$Env:SASS_VER/dart-sass-$Env:SASS_VER-windows-$Env:ARCH.zip" -OutFile "$Env:DL_PATH"
Remove-Item -Path "$Env:INS_PATH/dart-sass" -Force -Recurse -ErrorAction SilentlyContinue
Expand-Archive -Path $Env:DL_PATH -DestinationPath $Env:INS_PATH -Force
Remove-Item $Env:DL_PATH -Force

Set-Content -Path "$Env:INS_PATH/sass.ps1" -Value "& '$Env:USERPROFILE\.deno\bin\dart-sass\sass.bat' `$args"  

Write-Output "🎯 Finished installing Dart-Sass!"