@echo off
title Deploy IIT KGP BS Portal to Google Cloud 24x7
cd /d "%~dp0"

echo =========================================================
echo    IIT Kharagpur BS Portal - Google Cloud 24x7 Deploy
echo =========================================================
echo.
echo This tool will deploy your website to Google Cloud (Firebase Hosting)
echo so that it stays online 24/7/365 permanently for FREE!
echo.
echo Step 1: Logging in to Google Cloud / Firebase...
call npx --yes firebase-tools login

echo.
echo Step 2: Building latest production files...
call npm run build

echo.
echo Step 3: Deploying to Google Cloud 24x7 CDN...
call npx --yes firebase-tools deploy --only hosting

echo.
echo =========================================================
echo [SUCCESS] If completed, your website is now permanently 
echo           LIVE 24x7 on Google Cloud!
echo =========================================================
pause
