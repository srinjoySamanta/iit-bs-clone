@echo off
title IIT Kharagpur BS Portal - 24/7 Server & Tunnel
echo ===================================================
echo   IIT KHARAGPUR BS IN DATA SCIENCE & AI
echo   Starting Local Server and Cloudflare Tunnel...
echo ===================================================

cd /d "%~dp0"

echo 1. Starting Vite Local Dev Server on Port 5173...
start /b cmd /c "npm run dev -- --host --port 5173"

timeout /t 3 >nul

echo 2. Starting Cloudflare 24/7 Tunnel...
python run-cloudflare.py

pause
