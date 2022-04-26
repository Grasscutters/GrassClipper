@echo off

set GRASSCUTTER_JAR=%1
set GRASSCUTTER_JAR=%GRASSCUTTER_JAR:"=%

:: Get folder the jar is in
set "X=%GRASSCUTTER_JAR%"
:l
if "%X:~-1%"=="\" goto al
set "X=%X:~0,-1%"
goto l
:al
set "X=%X:~0,-1%"
set "GRASSCUTTER_ROOT=%X%"

echo Starting local Grasscutter server...

:: Change dir to server directory
cd /d "%GRASSCUTTER_ROOT%"

call java -jar %GRASSCUTTER_JAR%