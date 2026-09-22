@echo off
setlocal enabledelayedexpansion
title Push to GitHub & Host 24x7 on GitHub Pages
color 0A
cd /d "%~dp0"

echo =====================================================================
echo       IIT KHARAGPUR BS IN DATA SCIENCE & ARTIFICIAL INTELLIGENCE
echo         Push to GitHub & Deploy 24x7 to GitHub Pages
echo =====================================================================
echo.
echo GitHub Account: https://github.com/srinjoySamanta
echo.

set "GIT_EXE=C:\Users\SRINJOY SAMANTA\AppData\Local\Programs\Git\cmd\git.exe"
if not exist "!GIT_EXE!" set "GIT_EXE=git"

echo [STEP 1/3] If you haven't created the GitHub repository yet:
echo   1. Go to: https://github.com/new
echo   2. Set Repository name: iit-kgp-bs
echo   3. Set to Public
echo   4. Click "Create repository"
echo.
set /p REPO_NAME="Enter your repository name [Press ENTER for default 'iit-kgp-bs']: "
if "%REPO_NAME%"=="" set "REPO_NAME=iit-kgp-bs"

set "REPO_URL=https://github.com/srinjoySamanta/%REPO_NAME%.git"
echo.
echo Target Remote: %REPO_URL%
echo.

echo [STEP 2/3] Staging and committing all files...
"!GIT_EXE!" branch -M main
"!GIT_EXE!" add .
"!GIT_EXE!" commit -m "Deploy IIT Kharagpur BS Portal to GitHub Pages 24x7"

echo.
echo Setting remote origin...
"!GIT_EXE!" remote remove origin 2>nul
"!GIT_EXE!" remote add origin %REPO_URL%

echo.
echo [STEP 3/3] Pushing to GitHub (main branch)...
echo If a GitHub login window appears, sign in with your GitHub account.
echo.
"!GIT_EXE!" push -u origin main

if %ERRORLEVEL% EQU 0 (
    echo.
    echo =====================================================================
    echo [SUCCESS] Code pushed to GitHub successfully!
    echo =====================================================================
    echo.
    echo To activate your permanent 24/7 GitHub Pages URL:
    echo   1. Open: https://github.com/srinjoySamanta/%REPO_NAME%/settings/pages
    echo   2. Under "Build and deployment" > "Source", select:
    echo      --> "GitHub Actions"
    echo.
    echo GitHub will automatically build and publish your site in 60 seconds at:
    echo 👉 https://srinjoySamanta.github.io/%REPO_NAME%/
    echo.
    echo =====================================================================
) else (
    echo.
    echo [NOTE] Push did not complete. If the repository does not exist yet on
    echo GitHub, please create it first at: https://github.com/new?name=%REPO_NAME%
    echo and then re-run this script.
)

echo.
pause
