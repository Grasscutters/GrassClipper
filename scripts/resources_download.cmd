@echo off

set FOLDER_NAME=%1
set FOLDER_NAME=%FOLDER_NAME:"=%

if not exist ".\temp" mkdir ".\temp"
if not exist ".\resources" mkdir ".\resources"

echo Downloading resources, this can take a while...

:: Grab the giant ass resource zip
powershell Invoke-WebRequest -Uri https://github.com/Koko-boya/Grasscutter_Resources/archive/refs/heads/main.zip -OutFile ".\temp\resources.zip"

echo Extracting...

:: Extract resources to the folder
powershell Expand-Archive -Path ".\temp\resources.zip" -DestinationPath "%FOLDER_NAME%" -Force

:: Delete old resources folder if there is one there
del /s /q "%FOLDER_NAME%\resources">nul

echo Moving resources to folder...

robocopy "%FOLDER_NAME%\Grasscutter_Resources-main\Resources" "%FOLDER_NAME%\resources" /E /MOVE>nul

:: Delete straggling files
del /s /q "%FOLDER_NAME%\Grasscutter_Resources-main"

echo Done, resources should be properly extracted