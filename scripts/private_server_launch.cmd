@echo off

:: Ensure admin
>nul 2>&1 reg query "HKU\S-1-5-19" || (
	set params = %*:"="""%
	cd /d "%~dp0" && ( if exist "%temp%\getadmin.vbs" del "%temp%\getadmin.vbs" ) && fsutil dirty query %systemdrive% 1>nul 2>nul || (  echo Set UAC = CreateObject^("Shell.Application"^) : UAC.ShellExecute "cmd.exe", "/k cd ""%~sdp0"" && %~s0 %1 "%2" ""%cd%"" %4", "", "runas", 1 >> "%temp%\getadmin.vbs" && "%temp%\getadmin.vbs" && exit /B )
)

:: Use to force task kill
title PS Launcher Script

echo Starting Proxy Server

set IP=%1
set GAME_PATH=%2
set GAME_PATH=%GAME_PATH:"=%
set ORIGIN=%3
set ORIGIN=%ORIGIN:"=%
set ENABLE_KILLSWITCH=%4

set PROXY=true
@rem Store original proxy settings
for /f "tokens=2*" %%a in ('reg query "HKCU\Software\Microsoft\Windows\CurrentVersion\Internet Settings" /v ProxyEnable 2^>nul') do set "ORIG_PROXY_ENABLE=%%b"
for /f "tokens=2*" %%a in ('reg query "HKCU\Software\Microsoft\Windows\CurrentVersion\Internet Settings" /v ProxyServer 2^>nul') do set "ORIG_PROXY_SERVER=%%b"

:: Set proxy settings in Windows
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\Internet Settings" /v ProxyEnable /t REG_DWORD /d 1 /f >nul 2>nul
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\Internet Settings" /v ProxyServer /d "127.0.0.1:8080" /f >nul 2>nul

:: Start proxy server
start "Proxy Server" %ORIGIN%/ext/mitmdump.exe -s "%ORIGIN%/proxy/proxy.py" --ssl-insecure --set ip=%IP%

echo Opening %GAME_PATH%

:: Allow the proxy server to create the certificates
ping 127.0.0.1 -n 5 > nul

for %%A in ("%GAME_PATH%") do (
  set GAME_EXE=%%~nxA
)

echo Killswitch: %ENABLE_KILLSWITCH%

if "%ENABLE_KILLSWITCH%" EQU "true" (
	echo Killswitch is enabled!
	:: Start killswitch
	start /b %ORIGIN%\scripts\killswitch.cmd "%GAME_EXE%" %IP%"
)

:: Launch game
"%GAME_PATH%"

:: On exit clean proxy stuff
:EXIT
if "%PROXY%" == "" (
	echo Proxy not started, no need to clean up.
) else (
	:: Clean proxy settings
	echo Cleaning up proxy settings
	reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\Internet Settings" /v ProxyEnable /t REG_DWORD /d "%ORIG_PROXY_ENABLE%" /f >nul 2>nul
	reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\Internet Settings" /v ProxyServer /d "%ORIG_PROXY_SERVER%" /f >nul 2>nul

	:: Kill proxy server
	taskkill /f /im mitmdump.exe

	echo Done! See you next time!

	timeout /t 2 /nobreak >nul
	taskkill /f /fi "WINDOWTITLE eq Administrator:  PS Launcher Script"

	exit /b
)