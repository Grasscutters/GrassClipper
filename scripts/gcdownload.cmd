@echo off

set KEYSTORE_URL=%1
set ARTIFACT_URL=%2
set BRANCH=%3
set FOLDER_NAME=".\gc-%BRANCH%"
set FOLDER_NAME=%FOLDER_NAME:"=%

title GC Download Script

if not exist "%FOLDER_NAME%" mkdir "%FOLDER_NAME%"
if not exist ".\temp" mkdir ".\temp"

echo Downloading Grasscutter prebuilt jar...

:: Download the jar
powershell Invoke-WebRequest -Uri %KEYSTORE_URL% -OutFile "./temp/gcjar.zip"

echo Extracting...

:: Delete old file if there is one there
if exist "%FOLDER_NAME%\grasscutter.jar" del "%FOLDER_NAME%\grasscutter.jar"

powershell Expand-Archive -Path "./temp/gcjar.zip" -DestinationPath "%FOLDER_NAME%" -Force

:: Find the jar file name and rename it, just in case
for %%i in (%FOLDER_NAME%/*) do (
  :: If the extension is jar, rename the file
  if %%~xi equ .jar rename "%FOLDER_NAME%\%%i" grasscutter.jar
)

echo Downloading keystore.p12...

:: Download the keystore.p12 file
powershell Invoke-WebRequest -Uri %ARTIFACT_URL% -OutFile "./%FOLDER_NAME%/keystore.p12"

:: Remove temp stuff
del /s /q "./temp"

echo Done, latest Grasscutter %BRANCH% now downloaded in %FOLDER_NAME%

pause

taskkill /f /fi "WINDOWTITLE eq GC Download Script"

