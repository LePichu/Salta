$GITIGNORE = Get-Content -Path "./.gitignore"

Set-Content -Path "./.gitignore" -Value ""

./dart-sass/vendor.ps1

git add "./dart-sass/*"
git commit -m "publish: $(Get-Date) @ v1.57.1"
git push

Remove-Item -Path "./dart-sass/package/" -Recurse -Force
git add "./dart-sass/*"
Set-Content -Path "./.gitignore" -Value $GITIGNORE
git add .
git commit -m "cleanup: $(Get-Date) @ v1.57.1"
git push
