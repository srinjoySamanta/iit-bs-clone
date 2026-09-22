@echo off
title IIT Kharagpur BS Portal - 24x7 Server
cd /d "%~dp0"
echo ====================================================
echo   IIT Kharagpur BS Programme Portal - 24x7 Server
echo   Local:   http://localhost:5173
echo ====================================================
npm run dev -- --host --port 5173
pause
