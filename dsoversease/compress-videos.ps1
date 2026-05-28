# Video Compression Script
# This script compresses all videos in the public/videos folder to be under 10MB

$videosPath = "e:\aib innovations\Ds Coded\dsoversease\public\videos"
$ffmpegPath = "e:\aib innovations\Ds Coded\dsoversease\ffmpeg.exe"
$targetSizeMB = 10

Write-Host "=== Video Compression Script ===" -ForegroundColor Cyan
Write-Host ""

# Check if ffmpeg exists
if (-not (Test-Path $ffmpegPath)) {
    Write-Host "ffmpeg not found. Downloading portable version..." -ForegroundColor Yellow

    # Download ffmpeg essentials build
    $ffmpegUrl = "https://www.gyan.dev/ffmpeg/builds/ffmpeg-release-essentials.zip"
    $zipPath = "e:\aib innovations\Ds Coded\dsoversease\ffmpeg-essentials.zip"
    $extractPath = "e:\aib innovations\Ds Coded\dsoversease\ffmpeg-temp"

    try {
        Write-Host "Downloading ffmpeg (this may take a few minutes)..." -ForegroundColor Yellow
        Invoke-WebRequest -Uri $ffmpegUrl -OutFile $zipPath -UseBasicParsing

        Write-Host "Extracting ffmpeg..." -ForegroundColor Yellow
        Expand-Archive -Path $zipPath -DestinationPath $extractPath -Force

        # Find ffmpeg.exe in extracted folder
        $ffmpegExe = Get-ChildItem -Path $extractPath -Recurse -Filter "ffmpeg.exe" | Select-Object -First 1
        if ($ffmpegExe) {
            Copy-Item $ffmpegExe.FullName -Destination $ffmpegPath
            Write-Host "ffmpeg downloaded successfully!" -ForegroundColor Green
        }

        # Clean up
        Remove-Item $zipPath -Force -ErrorAction SilentlyContinue
        Remove-Item $extractPath -Recurse -Force -ErrorAction SilentlyContinue
    }
    catch {
        Write-Host "Error downloading ffmpeg: $_" -ForegroundColor Red
        Write-Host "Please download ffmpeg manually from https://ffmpeg.org/download.html" -ForegroundColor Yellow
        exit 1
    }
}

# Get all video files
$videos = Get-ChildItem -Path $videosPath -Filter "*.mp4"

if ($videos.Count -eq 0) {
    Write-Host "No video files found in $videosPath" -ForegroundColor Red
    exit 1
}

Write-Host "Found $($videos.Count) video(s) to compress" -ForegroundColor Green
Write-Host ""

# Create backup folder
$backupPath = Join-Path $videosPath "originals"
if (-not (Test-Path $backupPath)) {
    New-Item -ItemType Directory -Path $backupPath | Out-Null
    Write-Host "Created backup folder: $backupPath" -ForegroundColor Green
}

# Compress each video
foreach ($video in $videos) {
    $currentSizeMB = [math]::Round($video.Length / 1MB, 2)

    Write-Host "Processing: $($video.Name)" -ForegroundColor Cyan
    Write-Host "  Current size: $currentSizeMB MB" -ForegroundColor Yellow

    if ($currentSizeMB -le $targetSizeMB) {
        Write-Host "  Already under ${targetSizeMB}MB, skipping..." -ForegroundColor Green
        Write-Host ""
        continue
    }

    # Backup original
    $backupFile = Join-Path $backupPath $video.Name
    if (-not (Test-Path $backupFile)) {
        Copy-Item $video.FullName -Destination $backupFile
        Write-Host "  Backed up original to: originals\$($video.Name)" -ForegroundColor Gray
    }

    # Calculate target bitrate (in kbps)
    # Get video duration first
    $durationCmd = "& `"$ffmpegPath`" -i `"$($video.FullName)`" 2>&1"
    $ffprobeOutput = Invoke-Expression $durationCmd
    $durationLine = $ffprobeOutput | Select-String "Duration: (\d{2}):(\d{2}):(\d{2}.\d{2})"

    if ($durationLine) {
        $hours = [int]$durationLine.Matches.Groups[1].Value
        $minutes = [int]$durationLine.Matches.Groups[2].Value
        $seconds = [double]$durationLine.Matches.Groups[3].Value
        $durationSeconds = ($hours * 3600) + ($minutes * 60) + $seconds

        # Target size in bits, accounting for audio (assume 128kbps audio)
        $targetSizeBits = $targetSizeMB * 8 * 1024 * 1024 * 0.95  # 95% to leave some margin
        $audioBitrate = 128
        $videoBitrate = [math]::Floor(($targetSizeBits / $durationSeconds / 1024) - $audioBitrate)

        # Ensure minimum quality
        if ($videoBitrate -lt 200) {
            $videoBitrate = 200
        }

        Write-Host "  Target bitrate: ${videoBitrate}k" -ForegroundColor Gray

        # Compress video
        $tempOutput = Join-Path $videosPath "temp_$($video.Name)"
        $compressCmd = "& `"$ffmpegPath`" -i `"$($video.FullName)`" -c:v libx264 -b:v ${videoBitrate}k -c:a aac -b:a 128k -preset medium -movflags +faststart -y `"$tempOutput`" 2>&1"

        Write-Host "  Compressing..." -ForegroundColor Yellow
        $output = Invoke-Expression $compressCmd

        if (Test-Path $tempOutput) {
            $newSizeMB = [math]::Round((Get-Item $tempOutput).Length / 1MB, 2)

            # If still too large, try again with lower bitrate
            if ($newSizeMB -gt $targetSizeMB) {
                Write-Host "  First attempt: $newSizeMB MB (still too large, retrying...)" -ForegroundColor Yellow
                Remove-Item $tempOutput

                $videoBitrate = [math]::Floor($videoBitrate * 0.7)  # Reduce by 30%
                $compressCmd = "& `"$ffmpegPath`" -i `"$($video.FullName)`" -c:v libx264 -b:v ${videoBitrate}k -c:a aac -b:a 96k -preset medium -movflags +faststart -y `"$tempOutput`" 2>&1"
                $output = Invoke-Expression $compressCmd

                if (Test-Path $tempOutput) {
                    $newSizeMB = [math]::Round((Get-Item $tempOutput).Length / 1MB, 2)
                }
            }

            # Replace original with compressed version
            Remove-Item $video.FullName
            Move-Item $tempOutput $video.FullName

            Write-Host "  Compressed to: $newSizeMB MB" -ForegroundColor Green

            if ($newSizeMB -le $targetSizeMB) {
                Write-Host "  SUCCESS!" -ForegroundColor Green
            } else {
                Write-Host "  WARNING: Still above ${targetSizeMB}MB, but this is the best compression without major quality loss" -ForegroundColor Yellow
            }
        } else {
            Write-Host "  ERROR: Compression failed" -ForegroundColor Red
        }
    } else {
        Write-Host "  ERROR: Could not determine video duration" -ForegroundColor Red
    }

    Write-Host ""
}

Write-Host "=== Compression Complete ===" -ForegroundColor Cyan
Write-Host "Original videos are backed up in: $backupPath" -ForegroundColor Green
Write-Host ""

# Show final sizes
Write-Host "Final video sizes:" -ForegroundColor Cyan
Get-ChildItem -Path $videosPath -Filter "*.mp4" | ForEach-Object {
    $sizeMB = [math]::Round($_.Length / 1MB, 2)
    $status = if ($sizeMB -le $targetSizeMB) { "[OK]" } else { "[OVER]" }
    Write-Host "  $status $($_.Name) - $sizeMB MB"
}
