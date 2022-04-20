@echo off

:: Ensure we are elevated for certs
>nul 2>&1 reg query "HKU\S-1-5-19" || (
	echo Currently running with non Administrator privileges, raising...
	echo set UAC = CreateObject^("Shell.Application"^) > "%temp%\UAC.vbs"
	echo UAC.ShellExecute "%~f0", "%1", "", "runas", 1 >> "%temp%\UAC.vbs"
	"%temp%\UAC.vbs"
	del /f /q "%temp%\UAC.vbs" >nul 2>nul
	exit /b
)

certutil -addstore root %USERPROFILE%\.mitmproxy\mitmproxy-ca-cert.cer

echo Downloading proxy server...

if not exist "./ext" mkdir "ext"
if not exist "./temp" mkdir "temp"

:: Begin by retrieving mitmproxy 8.0.0
powershell Invoke-WebRequest -Uri https://snapshots.mitmproxy.org/8.0.0/mitmproxy-8.0.0-windows.zip -OutFile "./temp/mitmproxy-8.0.0-windows.zip"

:: Extract from temp/ to ext/ with powershell
powershell Expand-Archive -Path "./temp/mitmproxy-8.0.0-windows.zip" -DestinationPath "./ext/" -Force

echo Done! You can now open 