@echo off

set GAME_EXE_NAME=%1
set GAME_EXE_NAME=%GAME_EXE_NAME:"=%
set PROXY_IP=%2
set PROXY_IP=%PROXY_IP:"=%

:: For task killing
title PS Killswitch

:: Get current wifi SSID to reconnect
for /f "delims=: tokens=2" %%n in ('netsh wlan show interface name="Wi-Fi" ^| findstr "Profile"') do set "WIFI=%%n"
set WIFI=%WIFI: =%

echo Wifi to reconnect to (if using Wifi): %WIFI%

echo Starting killswitch...

if "%PROXY_IP%" EQU "localhost" (
  :: Needed
  set PROXY_IP=127.0.0.1
)

:loop
  :: Wait a couple seconds
  ping 127.0.0.1 -n 2 > nul

  :: Check if the game is even running
  :: tasklist /fi "ImageName eq %GAME_EXE_NAME%" /fo csv 2>NUL | find /I "%GAME_EXE_NAME%.exe">NUL
  :: IF %ERRORLEVEL% NEQ 0 (
  ::   exit /b
  :: )

  :: Check if the proxy server process is running
  :: https://stackoverflow.com/questions/162291/how-to-check-if-a-process-is-running-via-a-batch-script
  tasklist /fi "ImageName eq mitmdump.exe" /fo csv 2>NUL | find /I "mitmdump.exe">NUL
  if "%ERRORLEVEL%" NEQ "0" (
    echo "mitmdump not running"
    goto killgame
  )

  :: Ensure system proxy is on and set to the proxy IP
  for /F "usebackq tokens=3*" %%A in (`reg query "HKCU\Software\Microsoft\Windows\CurrentVersion\Internet Settings" /v ProxyEnable`) do (
    set PROXY_ENABLED=%%A %%B
  )
  :: echo %PROXY_ENABLED%

  :: Get the proxy IP
  :: https://stackoverflow.com/questions/445167/how-can-i-get-the-value-of-a-registry-key-from-within-a-batch-script
  for /F "usebackq tokens=3*" %%A in (`reg query "HKCU\Software\Microsoft\Windows\CurrentVersion\Internet Settings" /v ProxyServer`) do (
    set CUR_PROXY_IP=%%A %%B
  )
  :: echo %CUR_PROXY_IP%

  :: Ensure proxy is enabled, space is there on purpose
  IF "%PROXY_ENABLED%" NEQ "0x1 " (
    goto killgame
  )

  :: echo Proxy is enabled!

  :: echo Current Windows proxy is %CUR_PROXY_IP% while the proxy IP is %PROXY_IP%:8080

  :: There is a space after %PROXY_IP on purpose, Windows is weird
  if "%CUR_PROXY_IP%" NEQ "%PROXY_IP%:8080 " (
    goto killgame
  )

  goto loop

:killgame
  echo Proxy server not running properly, killing %GAME_EXE_NAME% and disabling internet...

  :: Disable WiFi
  netsh wlan disconnect

  ::Disable ethernet
  netsh interface set interface "Ethernet" disable

  taskkill /f /im "%GAME_EXE_NAME%"

  echo Re-enabling internet...

  :: Once the game is dead, bring back the internet
  netsh interface set interface "Ethernet" enable

  echo Reconnecting to %WIFI%...

  :: Reconnect to the WiFi
  netsh wlan connect name="%WIFI%"

	taskkill /f /fi "WINDOWTITLE eq Administrator:  PS Killswitch"

  exit