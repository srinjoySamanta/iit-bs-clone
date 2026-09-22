@echo off
title Update 24/7 Live Website on Netlify
echo =================================================================
echo   UPDATING YOUR 24/7 PERMANENT WEBSITE:
echo   https://beautiful-malabi-51a9c4.netlify.app
echo =================================================================
echo.
echo Step 1: Opening your Netlify Deploys page in your browser...
start https://app.netlify.com/sites/beautiful-malabi-51a9c4/deploys

echo Step 2: Opening your compiled 'dist' folder in File Explorer...
explorer "%~dp0dist"

echo.
echo -----------------------------------------------------------------
echo   WHAT TO DO:
echo   Just DRAG the 'dist' folder from the Explorer window
echo   and DROP it into the "Drag and drop your site folder here"
echo   box in your browser!
echo.
echo   Your website will instantly update and stay live 24/7 forever!
echo -----------------------------------------------------------------
echo.
pause
