Get-ChildItem "e:\aib innovations\Ds Coded\dsoversease\public\videos\*.mp4" | ForEach-Object {
    $sizeMB = [math]::Round($_.Length / 1MB, 2)
    Write-Host "$($_.Name) - $sizeMB MB"
}
