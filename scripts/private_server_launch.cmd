@echo off

:: Ensure admin
>nul 2>&1 reg query "HKU\S-1-5-19" || (
	set params = %*:"="""%
	cd /d "%~dp0" && ( if exist "%temp%\getadmin.vbs" del "%temp%\getadmin.vbs" ) && fsutil dirty query %systemdrive% 1>nul 2>nul || (  echo Set UAC = CreateObject^("Shell.Application"^) : UAC.ShellExecute "cmd.exe", "/k cd ""%~sdp0"" && %~s0 %1 "%2" ""%cd%"" ", "", "runas", 1 >> "%temp%\getadmin.vbs" && "%temp%\getadmin.vbs" && exit /B )
)

echo Starting Proxy Server

SET ip=%1
SET gamePath=%2
SET gamePath=%gamePath:"=%
SET ORIGIN=%3
SET ORIGIN=%ORIGIN:"=%

set PROXY=true
@rem Store original proxy settings
for /f "tokens=2*" %%a in ('reg query "HKCU\Software\Microsoft\Windows\CurrentVersion\Internet Settings" /v ProxyEnable 2^>nul') do set "ORIG_PROXY_ENABLE=%%b"
for /f "tokens=2*" %%a in ('reg query "HKCU\Software\Microsoft\Windows\CurrentVersion\Internet Settings" /v ProxyServer 2^>nul') do set "ORIG_PROXY_SERVER=%%b"

:: Set proxy settings in Windows
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\Internet Settings" /v ProxyEnable /t REG_DWORD /d 1 /f >nul 2>nul
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\Internet Settings" /v ProxyServer /d "127.0.0.1:8080" /f >nul 2>nul

:: Start proxy server
start "Proxy Server" ./ext/mitmdump.exe -s "%ORIGIN%/proxy/proxy.py" --ssl-insecure --set ip=%ip%

echo Opening %gamePath%

:: Allow the proxy server to create the certificates
ping 127.0.0.1 -n 5 > nul

For %%A in ("%gamePath%") do (
  Set GAME_EXE=%%~nxA
)

:: Start killswitch
start /b %ORIGIN%\scripts\killswitch.cmd "%GAME_EXE%" %ip%"

:: Launch game
"%gamePath%"

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

	exit /b
)