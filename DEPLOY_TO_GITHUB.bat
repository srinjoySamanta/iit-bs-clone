@echo off
title Deploy IIT KGP BS to GitHub Pages 24x7
color 0A
cd /d "%~dp0"

echo =====================================================================
echo       IIT KHARAGPUR BS IN DATA SCIENCE & ARTIFICIAL INTELLIGENCE
echo              Deploying to GitHub Pages (24x7 Live)
echo =====================================================================
echo.
echo Target GitHub Repository: https://github.com/srinjoySamanta/iit-bs-clone
echo Target 24x7 Live Website: https://srinjoySamanta.github.io/iit-bs-clone/
echo.
echo =====================================================================

set "GIT_EXE=C:\Users\SRINJOY SAMANTA\AppData\Local\Programs\Git\cmd\git.exe"
if not exist "!GIT_EXE!" set "GIT_EXE=git"

echo [STEP 1/4] Building production web assets...
call npm run build
if %errorlevel% neq 0 (
    echo [ERROR] Build failed.
    pause
    exit /b %errorlevel%
)

echo.
echo [STEP 2/4] Committing all latest changes...
"!GIT_EXE!" branch -M main
"!GIT_EXE!" add .
"!GIT_EXE!" commit -m "Update IIT KGP BS Portal: Aligned Header, Admissions Chatbot, and Qualifier CBT Exam"

echo.
echo [STEP 3/4] Pushing source code to main branch...
"!GIT_EXE!" remote remove origin 2>nul
"!GIT_EXE!" remote add origin https://github.com/srinjoySamanta/iit-bs-clone.git
"!GIT_EXE!" push -u origin main

echo.
echo [STEP 4/4] Deploying to 'gh-pages' branch for instant 24x7 hosting...
call npx --yes gh-pages -d dist -b gh-pages

echo.
echo =====================================================================
echo [SUCCESS] Your portal has been pushed to GitHub!
echo.
echo Opening your GitHub Pages settings page in your browser now...
start https://github.com/srinjoySamanta/iit-bs-clone/settings/pages
echo.
echo In the GitHub Pages settings page:
echo   1. Under "Branch", select: "gh-pages" (and folder: "/ (root)")
echo   2. Click "Save"
echo.
echo Your permanent 24x7 website will be LIVE at:
echo 👉 https://srinjoySamanta.github.io/iit-bs-clone/
echo =====================================================================
echo.
pause
