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

:: Ensure admin
>nul 2>&1 reg query "HKU\S-1-5-19" || (
	set params = %*:"="""%
	cd /d "%~dp0" && ( if exist "%temp%\getadmin.vbs" del "%temp%\getadmin.vbs" ) && fsutil dirty query %systemdrive% 1>nul 2>nul || (  echo Set UAC = CreateObject^("Shell.Application"^) : UAC.ShellExecute "cmd.exe", "/k cd ""%~sdp0"" && %~s0 "%1"", "", "runas", 1 >> "%temp%\getadmin.vbs" && "%temp%\getadmin.vbs" && exit /B )
)

echo Starting local Grasscutter server...

:: Change dir to server directory
cd /d "%GRASSCUTTER_ROOT%"

start /b java -jar %GRASSCUTTER_JAR%