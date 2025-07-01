@echo off
echo GitHub Push with Credential Manager
echo =====================================
echo.

echo Setting up Windows Credential Manager for GitHub...
git config --global credential.helper manager-core

echo.
echo This will open a login window where you can:
echo 1. Enter username: vigneshsinna
echo 2. Enter password: [PASTE YOUR PERSONAL ACCESS TOKEN]
echo.

echo The login window allows proper copy/paste unlike the terminal.
echo.

pause

echo Attempting to push to GitHub...
cd "v:\pers\Freelance\micro-projects-portfolio"
git push -u origin main

if %errorlevel% == 0 (
    echo.
    echo SUCCESS! Your micro-projects portfolio is now on GitHub!
    echo View it at: https://github.com/vigneshsinna/micro-projects-portfolio
    echo.
    echo Your AI Todo App is live and ready to showcase!
) else (
    echo.
    echo If that didn't work, try GitHub Desktop:
    echo 1. Download: https://desktop.github.com/
    echo 2. Sign in with your GitHub account
    echo 3. Add this folder as a repository
    echo 4. Publish to GitHub
)

pause
