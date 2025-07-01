@echo off
echo GitHub Authentication Setup for Micro-Projects Portfolio
echo ========================================================
echo.

echo IMPORTANT: GitHub requires Personal Access Token authentication
echo.
echo Step 1: Create Personal Access Token
echo 1. Go to: https://github.com/settings/tokens
echo 2. Click "Generate new token (classic)"
echo 3. Name: micro-projects-portfolio
echo 4. Scopes: Select "repo" (full control)
echo 5. Copy the generated token
echo.

echo Step 2: Configure Git
set /p username="Enter your GitHub username (e.g., vigneshsinna): "
set /p email="Enter your GitHub email: "

git config user.name "%username%"
git config user.email "%email%"

echo.
echo Step 3: Setup repository connection
echo Repository URL: https://github.com/%username%/micro-projects-portfolio.git
echo.

git remote add origin https://github.com/%username%/micro-projects-portfolio.git
git branch -M main

echo.
echo Step 4: Push to GitHub
echo When prompted:
echo   Username: %username%
echo   Password: [PASTE YOUR PERSONAL ACCESS TOKEN]
echo.

pause
echo Pushing to GitHub...
git push -u origin main

if %errorlevel% == 0 (
    echo.
    echo SUCCESS! Repository uploaded to GitHub
    echo View at: https://github.com/%username%/micro-projects-portfolio
) else (
    echo.
    echo ERROR: Push failed. Check your Personal Access Token.
    echo Visit: https://github.com/settings/tokens to create/verify token
)

pause
