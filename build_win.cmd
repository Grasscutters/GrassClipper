@echo off

:: This binary is the SSL-secure release
set BINARY_URL="https://github.com/SpikeHD/neutralinojs/releases/download/v420.69.0/neutralino-win_x64.exe"

:: Clean dist folder
del /s /q /f .\dist
rd /s /q .\dist

:: Get the SSL-secure version of the binary
powershell Invoke-WebRequest -Uri %BINARY_URL% -OutFile "./bin/neutralino-win_x64.exe"

:: build
call neu build

:: Copy scripts and langs
xcopy .\languages\ .\dist\GrassClipper\languages\ /y /s
xcopy .\proxy\ .\dist\GrassClipper\proxy\ /y /s
xcopy .\scripts\ .\dist\GrassClipper\scripts\ /y /s

:: bgs
mkdir .\dist\GrassClipper\resources\bg\private
mkdir .\dist\GrassClipper\resources\bg\server
xcopy .\resources\bg\private\ .\dist\GrassClipper\resources\bg\private\ /y /s
xcopy .\resources\bg\server\ .\dist\GrassClipper\resources\bg\server\ /y /s

:: rename exe
move .\dist\GrassClipper\GrassClipper-win_x64.exe .\dist\GrassClipper\GrassClipper.exe