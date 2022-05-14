@echo off

set BINARY_URL="https://github.com/SpikeHD/neutralinojs/releases/download/v1337.0.0/neutralino-win_x64.exe"

call npm install
call neu update

:: Use powershell to download the binary
powershell Invoke-WebRequest -Uri %BINARY_URL% -OutFile "./bin/neutralino-win_x64.exe"
