@echo off

set GRASSCUTTER_JAR=%1
set GRASSCUTTER_JAR=%GRASSCUTTER_JAR:"=%

title Grasscutter

:: Get folder the jar is in
set "X=%GRASSCUTTER_JAR%"
:l
  set IS_SLASH=false

  if "%X:~-1%"=="\" set IS_SLASH=true
  if "%X:~-1%"=="/" set IS_SLASH=true

  if %IS_SLASH% equ true goto al

  set "X=%X:~0,-1%"
  goto l
:al
  set "X=%X:~0,-1%"
  set "GRASSCUTTER_ROOT=%X%"

echo Starting local Grasscutter server...

:: Change dir to server directory
cd /d "%GRASSCUTTER_ROOT%"

call java -jar "%GRASSCUTTER_JAR%"