@echo off

:: Ensure we are elevated for certs
>nul 2>&1 certutil -addstore root %USERPROFILE%\.mitmproxy\mitmproxy-ca-cert.cer || (
	echo Currently running with non Administrator privileges, run as Administrator to install the certificate.
)

echo Downloading proxy server...

if not exist "./ext" mkdir "ext"
if not exist "./temp" mkdir "temp"

:: Begin by retrieving mitmproxy 8.0.0
powershell Invoke-WebRequest -Uri https://snapshots.mitmproxy.org/8.0.0/mitmproxy-8.0.0-windows.zip -OutFile "./temp/mitmproxy-8.0.0-windows.zip"

echo Extracting...

:: Extract from temp/ to ext/ with powershell
powershell Expand-Archive -Path "./temp/mitmproxy-8.0.0-windows.zip" -DestinationPath "./ext/" -Force

del /s /q "./temp"

echo Done! You can now open GrassClipper.exe!