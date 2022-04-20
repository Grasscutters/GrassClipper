@echo off

echo Downloading proxy server...

if not exist "./ext" mkdir "ext"
if not exist "./temp" mkdir "temp"

:: Begin by retrieving mitmproxy 8.0.0
powershell Invoke-WebRequest -Uri https://snapshots.mitmproxy.org/8.0.0/mitmproxy-8.0.0-windows.zip -OutFile "./temp/mitmproxy-8.0.0-windows.zip"

echo Extracting...

:: Extract from temp/ to ext/ with powershell
powershell Expand-Archive -Path "./temp/mitmproxy-8.0.0-windows.zip" -DestinationPath "./ext/" -Force

del /s /q "./temp"

echo Running proxy server in order to generate certificates...

:: Start proxy server
start "Proxy Server" ./ext/mitmdump.exe --ssl-insecure --set ip=%ip%

:: Allow the proxy server to create the certificates
ping 127.0.0.1 -n 6 > nul

:: Kill the process
taskkill /f /im mitmdump.exe

:: Ensure we are elevated for certs
>nul 2>&1 certutil -addstore root %USERPROFILE%\.mitmproxy\mitmproxy-ca-cert.cer || (
	echo Certificate install failed, ensure the script is running as Administrator and that the path "%USERPROFILE%\.mitmproxy" exists, 
)

echo Done! You can now open GrassClipper.exe!

pause
