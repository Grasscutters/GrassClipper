@echo off

:: Ensure admin
@REM >nul 2>&1 reg query "HKU\S-1-5-19" || (
@REM 	set params = %*:"="""%
@REM 	cd /d "%~dp0" && ( if exist "%temp%\getadmin.vbs" del "%temp%\getadmin.vbs" ) && fsutil dirty query %systemdrive% 1>nul 2>nul || (  echo Set UAC = CreateObject^("Shell.Application"^) : UAC.ShellExecute "cmd.exe", "/k cd ""%~sdp0"" && %~s0 %1 %2 %3 "%4" ""%cd%"" %6", "", "runas", 1 >> "%temp%\getadmin.vbs" && "%temp%\getadmin.vbs" && exit /B )
@REM )

:: Use to force task kill
title PS Launcher Script

:: Use a character encoding that allows for use of Chinese characters. This should work but doesn't, but I'm keeping it in here just in case
chcp 65001

echo Starting Proxy Server

set IP=%1
set PORT=%2
set USE_HTTPS=%3
set GAME_PATH=%4
set GAME_PATH=%GAME_PATH:"=%
set ORIGIN=%5
set ORIGIN=%ORIGIN:"=%
set ENABLE_KILLSWITCH=%6

:: For registry
set GAME_REG="HKEY_CURRENT_USER\Software\miHoYo\Genshin Impact"

if "%ENABLE_KILLSWITCH%" EQU "true" (
	:: Restart in elevated if need be
	>nul 2>&1 reg query "HKU\S-1-5-19" || (
		set params = %*:"="""%
		cd /d "%~dp0" && ( if exist "%temp%\getadmin.vbs" del "%temp%\getadmin.vbs" ) && fsutil dirty query %systemdrive% 1>nul 2>nul || (  echo Set UAC = CreateObject^("Shell.Application"^) : UAC.ShellExecute "cmd.exe", "/k cd ""%~sdp0"" && %~s0 %1 %2 %3 "%4" ""%cd%"" %6", "", "runas", 1 >> "%temp%\getadmin.vbs" && "%temp%\getadmin.vbs" &&  taskkill /f /fi "WINDOWTITLE eq PS Launcher Script" && exit /b )
	)
)

set PROXY=true
@rem Store original proxy settings
for /f "tokens=2*" %%a in ('reg query "HKCU\Software\Microsoft\Windows\CurrentVersion\Internet Settings" /v ProxyEnable 2^>nul') do set "ORIG_PROXY_ENABLE=%%b"
for /f "tokens=2*" %%a in ('reg query "HKCU\Software\Microsoft\Windows\CurrentVersion\Internet Settings" /v ProxyServer 2^>nul') do set "ORIG_PROXY_SERVER=%%b"

:: Set proxy settings in Windows
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\Internet Settings" /v ProxyEnable /t REG_DWORD /d 1 /f >nul 2>nul
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\Internet Settings" /v ProxyServer /d "127.0.0.1:8080" /f >nul 2>nul

:: Start proxy server
start "Proxy Server" "%ORIGIN%\ext\mitmdump.exe" -s "%ORIGIN%\proxy\proxy.py" -k --allow-hosts ".*\.yuanshen\.com|.*\.mihoyo\.com|.*\.hoyoverse\.com" --ssl-insecure --set ip=%IP% --set port=%PORT% --set use_https=%USE_HTTPS%

echo Opening %GAME_PATH%

:: Allow the proxy server to open fully
ping 127.0.0.1 -n 5 > nul

for %%A in ("%GAME_PATH%") do (
  set GAME_EXE=%%~nxA
)

echo Killswitch: %ENABLE_KILLSWITCH%

if "%ENABLE_KILLSWITCH%" EQU "true" (
	echo Killswitch is enabled!
	:: Start killswitch
	start /b %ORIGIN%\scripts\killswitch.cmd "%GAME_EXE%" 127.0.0.1
)

:: Launch game
"%GAME_PATH%"

:: On exit clean proxy stuff
:EXIT
echo Exiting...

if "%PROXY%" EQU "" (
	echo Proxy not started, no need to clean up.

	exit /b	
)

:: Clean proxy settings
echo Cleaning up proxy settings...
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\Internet Settings" /v ProxyEnable /t REG_DWORD /d "%ORIG_PROXY_ENABLE%" /f >nul 2>nul
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\Internet Settings" /v ProxyServer /d "%ORIG_PROXY_SERVER%" /f >nul 2>nul

:: Kill proxy server
taskkill /f /im mitmdump.exe

echo Done, see you next time

:: Just in case the user has corutils installed, use this hacky timeout instead of the timeout command
ping 127.0.0.1 -n 2 > nul

:: Attempt to kill either
taskkill /f /fi "WINDOWTITLE eq Administrator:  PS Launcher Script"
taskkill /f /fi "WINDOWTITLE eq PS Launcher Script"

exit /b