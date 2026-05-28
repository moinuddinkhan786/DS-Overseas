@echo off
echo Starting video compression...
echo.
powershell -ExecutionPolicy Bypass -File "%~dp0compress-videos.ps1"
echo.
echo Press any key to exit...
pause >nul
