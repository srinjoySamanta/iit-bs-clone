@echo off
title Deploy to Google Cloud App Engine (appspot.com)
color 0E
cd /d "%~dp0"

echo =====================================================================
echo       IIT KHARAGPUR BS IN DATA SCIENCE & ARTIFICIAL INTELLIGENCE
echo              Deploying to Google Cloud App Engine
echo =====================================================================
echo.

where gcloud >nul 2>nul
if %errorlevel% neq 0 (
    echo [NOTICE] Google Cloud SDK (gcloud) is not detected on your PC.
    echo.
    echo Would you like to install Google Cloud SDK automatically using winget?
    set /p INSTALL_SDK="Install now? (y/n): "
    if /i "%INSTALL_SDK%"=="y" (
        echo Installing Google Cloud SDK...
        winget install Google.CloudSDK
        echo Installation initiated. Please restart this script once complete.
        pause
        exit /b 0
    ) else (
        echo Please use 'deploy-to-google-cloud.bat' instead (requires NO SDK installation).
        pause
        exit /b 1
    )
)

echo Step 1: Compiling latest production files...
call npm run build

echo.
echo Step 2: Deploying to Google App Engine...
call gcloud app deploy app.yaml --quiet

echo.
echo Step 3: Opening your live Google Cloud website...
call gcloud app browse

pause
