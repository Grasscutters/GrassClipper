@echo off

set ORIGIN=%1
set ORIGIN=%ORIGIN:"=%
set OPEN_CONCUR=%2

if "%OPEN_CONCUR%" EQU "true" (
	cd /d "%~dp0" && ( if exist "%temp%\start.vbs" del "%temp%\start.vbs" ) && fsutil dirty query %systemdrive% 1>nul 2>nul || (  echo Set SHELL = CreateObject^("Shell.Application"^) : SHELL.ShellExecute "cmd.exe", "/k cd ""%~sdp0"" && %~s0 "%1" false", "", "", 1 >> "%temp%\start.vbs" && "%temp%\start.vbs" && exit /B )
)

echo Downloading proxy server...

:: Make sure we are in the right directory
cd "%ORIGIN%"

if not exist "%ORIGIN%/ext" mkdir "%ORIGIN%/ext"
if not exist "%ORIGIN%/temp" mkdir "%ORIGIN%/temp"

:: Begin by retrieving mitmproxy 7.0.4
powershell Invoke-WebRequest -Uri https://snapshots.mitmproxy.org/7.0.4/mitmproxy-7.0.4-windows.zip -OutFile "%ORIGIN%/temp/mitmproxy-7.0.4-windows.zip"

echo Extracting...

:: Extract from temp/ to ext/ with powershell
powershell Expand-Archive -Path "%ORIGIN%/temp/mitmproxy-7.0.4-windows.zip" -DestinationPath "%ORIGIN%/ext/" -Force

del /s /q "%ORIGIN%/temp"

echo Running proxy server in order to generate certificates...

:: Start proxy server
start "Proxy Server" %ORIGIN%/ext/mitmdump.exe --ssl-insecure --set ip=%ip%

:: Allow the proxy server to create the certificates
ping 127.0.0.1 -n 6 > nul

:: Kill the process
taskkill /f /im mitmdump.exe

echo Adding ceritifcate...

:: Ensure we are elevated for certs
>nul 2>&1 certutil -addstore root %USERPROFILE%\.mitmproxy\mitmproxy-ca-cert.cer || (
	echo Certificate install failed, ensure the script is running as Administrator and that the path "%USERPROFILE%\.mitmproxy" exists,
	echo You can also manually run this command: certutil -addstore root %USERPROFILE%\.mitmproxy\mitmproxy-ca-cert.cer 
)

echo Done! You can now open GrassClipper.exe!

pause

exit /b