@echo off
title Deploy IIT KGP BS Portal to Vercel Cloud 24x7
cd /d "%~dp0"

echo =========================================================
echo       IIT Kharagpur BS Portal - Vercel Cloud 24x7
echo =========================================================
echo.
echo Deploying your website to global 24x7 cloud hosting...
echo.
call npx --yes vercel --prod
echo.
pause
