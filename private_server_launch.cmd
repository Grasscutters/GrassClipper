@echo off

echo Starting Proxy Server

SET ip=%1
SET gamePath=%2
SET gamePath=%gamePath:"=%

set PROXY=true
@rem Store original proxy settings
for /f "tokens=2*" %%a in ('reg query "HKCU\Software\Microsoft\Windows\CurrentVersion\Internet Settings" /v ProxyEnable 2^>nul') do set "ORIG_PROXY_ENABLE=%%b"
for /f "tokens=2*" %%a in ('reg query "HKCU\Software\Microsoft\Windows\CurrentVersion\Internet Settings" /v ProxyServer 2^>nul') do set "ORIG_PROXY_SERVER=%%b"

start "Proxy Server" ./ext/mitmdump.exe -s "./proxy/proxy.py" --ssl-insecure --set ip=%ip%

:: Set proxy settings in Windows
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\Internet Settings" /v ProxyEnable /t REG_DWORD /d 1 /f >nul 2>nul
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\Internet Settings" /v ProxyServer /d "127.0.0.1:8080" /f >nul 2>nul

:: Allow the proxy to start
ping 192.0.2.2 -n 1 -w 5000 > nul

echo Opening %gamePath%/Genshin Impact Game/GenshinImpact.exe

start "" /b "%gamePath%/Genshin Impact Game/GenshinImpact.exe"

:EXIT
if "%PROXY%" == "" (
	echo Proxy not started, no need to clean up.
) else (
	echo Cleaning up proxy settings
	reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\Internet Settings" /v ProxyEnable /t REG_DWORD /d "%ORIG_PROXY_ENABLE%" /f >nul 2>nul
	reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\Internet Settings" /v ProxyServer /d "%ORIG_PROXY_SERVER%" /f >nul 2>nul
)