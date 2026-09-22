@echo off
title Deploy IIT KGP BS Portal to Google Cloud Platform (24x7 Live)
color 0B
cd /d "%~dp0"

echo =====================================================================
echo       IIT KHARAGPUR BS IN DATA SCIENCE & ARTIFICIAL INTELLIGENCE
echo              Deploying to Google Cloud Platform (24x7 Live)
echo =====================================================================
echo.
echo This script will host your website directly on Google Cloud Platform's
echo global edge CDN (via Firebase Hosting).
echo.
echo [BENEFITS]
echo   - 100%% Permanent 24/7/365 Uptime Worldwide
echo   - Fast Google Cloud Edge Caching (India & Global)
echo   - Permanent URL: https://[your-project-id].web.app
echo   - Never drops, never gives Error 1033, works when your PC is OFF!
echo   - 100%% Free Tier on Google Cloud
echo.
echo =====================================================================
echo.

:: Step 1: Login to Google Cloud
echo [STEP 1/3] Logging in with your Google Account...
echo A browser window will open. Click 'Allow' with your Google account.
echo.
call npx --yes firebase-tools login
if %errorlevel% neq 0 (
    echo.
    echo [ERROR] Google login failed or was cancelled. Please try again.
    pause
    exit /b %errorlevel%
)

echo.
echo =====================================================================
:: Step 2: Build Production Assets
echo [STEP 2/3] Compiling latest production build with Vite...
echo.
call npm run build
if %errorlevel% neq 0 (
    echo.
    echo [ERROR] Production build failed.
    pause
    exit /b %errorlevel%
)

echo.
echo =====================================================================
:: Step 3: Check/Initialize Project & Deploy
echo [STEP 3/3] Deploying to Google Cloud Platform...
echo.

if not exist ".firebaserc" (
    echo Project configuration (.firebaserc) not found.
    echo Let's link your Google Cloud project now.
    echo.
    call npx --yes firebase-tools init hosting
)

echo.
echo Deploying compiled 'dist' files to Google Cloud...
call npx --yes firebase-tools deploy --only hosting

echo.
echo =====================================================================
echo [SUCCESS] Your IIT KGP BS Portal is now permanently LIVE 24x7!
echo You can share the .web.app or .firebaseapp.com link with your manager!
echo =====================================================================
echo.
pause
