@echo off
echo Setting up GitHub repository for Micro-Projects Portfolio...
echo.

echo Step 1: Update git user configuration
set /p username="Enter your GitHub username: "
set /p email="Enter your GitHub email: "

git config user.name "%username%"
git config user.email "%email%"

echo.
echo Step 2: Add GitHub remote (replace YOUR_USERNAME with your actual username)
echo Run this command after creating the repository on GitHub:
echo git remote add origin https://github.com/YOUR_USERNAME/micro-projects-portfolio.git
echo.

echo Step 3: Push to GitHub
echo git branch -M main
echo git push -u origin main
echo.

echo Instructions:
echo 1. Go to https://github.com/new
echo 2. Create repository: micro-projects-portfolio
echo 3. Run the git remote add command above (with your username)
echo 4. Run: git branch -M main
echo 5. Run: git push -u origin main
echo.

pause
