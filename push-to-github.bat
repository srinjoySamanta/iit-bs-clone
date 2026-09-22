@echo off
setlocal enabledelayedexpansion
title IIT Kharagpur BS Portal - Push to GitHub
cd /d "%~dp0"

echo =========================================================
echo       IIT Kharagpur BS Portal - GitHub Push Tool
echo =========================================================
echo.

set "GIT_EXE=C:\Users\SRINJOY SAMANTA\AppData\Local\Programs\Git\cmd\git.exe"
if not exist "!GIT_EXE!" set "GIT_EXE=git"

echo Checking Git status...
"!GIT_EXE!" status
echo.

set /p REPO_URL="Enter your GitHub Repository URL (e.g. https://github.com/YourUsername/iit-kgp-bs.git): "

if "%REPO_URL%"=="" (
    echo [ERROR] No GitHub URL provided. Exiting.
    pause
    exit /b 1
)

echo.
echo Adding remote origin: %REPO_URL%
"!GIT_EXE!" remote remove origin 2>nul
"!GIT_EXE!" remote add origin %REPO_URL%

echo.
echo Pushing main branch to GitHub...
"!GIT_EXE!" push -u origin main

if %ERRORLEVEL% EQU 0 (
    echo.
    echo =========================================================
    echo [SUCCESS] Code pushed to GitHub successfully!
    echo =========================================================
) else (
    echo.
    echo [NOTE] If you encountered an authentication prompt, sign in with GitHub or your Personal Access Token (PAT).
)

echo.
pause
