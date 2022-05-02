@echo off

set KEYSTORE_URL=%1
set ARTIFACT_URL=%2
set BRANCH=%3
set FOLDER_NAME=".\gc-%BRANCH%"

if not exist %FOLDER_NAME% mkdir %FOLDER_NAME%
if not exist ".\temp" mkdir ".\temp"

echo Downloading Grasscutter prebuilt jar...

:: Download the jar
powershell Invoke-WebRequest -Uri %KEYSTORE_URL% -OutFile "./temp/gcjar.zip"

echo Extracting...

powershell Expand-Archive -Path "./temp/gcjar.zip" -DestinationPath %FOLDER_NAME% -Force

:: Download the keystore.p12 file

echo Downloading keystore.p12...

powershell Invoke-WebRequest -Uri %ARTIFACT_URL% -OutFile "./%FOLDER_NAME%/keystore.p12"

:: Remove temp stuff
del /s /q "./temp"

echo Done, latest Grasscutter %BRANCH% now downloaded in %FOLDER_NAME%

pause

exit /b

