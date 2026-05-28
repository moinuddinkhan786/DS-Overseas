@echo off
echo ============================================
echo Video Converter for DS Overseas Website
echo ============================================
echo.
echo This script will convert your videos to web-compatible format.
echo.

REM Check if FFmpeg is installed
where ffmpeg >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: FFmpeg is not installed or not in PATH!
    echo.
    echo Please install FFmpeg first:
    echo   Option 1: choco install ffmpeg
    echo   Option 2: Download from https://www.gyan.dev/ffmpeg/builds/
    echo.
    echo See VIDEO-FIX-GUIDE.md for detailed instructions.
    pause
    exit /b 1
)

echo FFmpeg found! Starting conversion...
echo.

cd /d "e:\aib innovations\Ds Coded\dsoversease\public\videos"

REM Create backup folder
if not exist "backup" mkdir backup
echo Backing up original videos to backup folder...
copy *.mp4 backup\ >nul 2>nul
echo.

REM Convert each video
echo Converting chetan.mp4...
ffmpeg -i chetan.mp4 -c:v libx264 -preset medium -crf 23 -c:a aac -b:a 128k -movflags +faststart chetan-new.mp4 -y

echo Converting hiren-makwana.mp4...
ffmpeg -i hiren-makwana.mp4 -c:v libx264 -preset medium -crf 23 -c:a aac -b:a 128k -movflags +faststart hiren-makwana-new.mp4 -y

echo Converting milan-patel.mp4...
ffmpeg -i milan-patel.mp4 -c:v libx264 -preset medium -crf 23 -c:a aac -b:a 128k -movflags +faststart milan-patel-new.mp4 -y

echo Converting prerakbhai-patel.mp4...
ffmpeg -i prerakbhai-patel.mp4 -c:v libx264 -preset medium -crf 23 -c:a aac -b:a 128k -movflags +faststart prerakbhai-patel-new.mp4 -y

echo Converting success-story-1.mp4...
ffmpeg -i success-story-1.mp4 -c:v libx264 -preset medium -crf 23 -c:a aac -b:a 128k -movflags +faststart success-story-1-new.mp4 -y

echo Converting success-story-2.mp4...
ffmpeg -i success-story-2.mp4 -c:v libx264 -preset medium -crf 23 -c:a aac -b:a 128k -movflags +faststart success-story-2-new.mp4 -y

echo.
echo Replacing original files...
del chetan.mp4 hiren-makwana.mp4 milan-patel.mp4 prerakbhai-patel.mp4 success-story-1.mp4 success-story-2.mp4
ren chetan-new.mp4 chetan.mp4
ren hiren-makwana-new.mp4 hiren-makwana.mp4
ren milan-patel-new.mp4 milan-patel.mp4
ren prerakbhai-patel-new.mp4 prerakbhai-patel.mp4
ren success-story-1-new.mp4 success-story-1.mp4
ren success-story-2-new.mp4 success-story-2.mp4

echo.
echo ============================================
echo SUCCESS! All videos converted!
echo ============================================
echo.
echo Original videos backed up to: backup folder
echo.
echo Now refresh your browser at http://localhost:3000
echo The videos should load properly now!
echo.
pause
