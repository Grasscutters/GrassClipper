@echo off

set GAME_EXE_NAME=%1
set GAME_EXE_NAME=%GAME_EXE_NAME:"=%
set PROXY_IP=%2
set PROXY_IP=%PROXY_IP:"=%

echo Starting killswitch...

if "%PROXY_IP%" EQU "localhost" (
  :: Needed
  set PROXY_IP=127.0.0.1
)

:loop
  :: Check if the game is even running
  @REM QPROCESS "%GAME_EXE_NAME%">NUL
  @REM IF %ERRORLEVEL% NEQ 0 (
  @REM   exit /b
  @REM )

  :: Check if the proxy server process is running
  :: https://stackoverflow.com/questions/162291/how-to-check-if-a-process-is-running-via-a-batch-script
  qprocess "mitmdump.exe">NUL
  if %ERRORLEVEL% NEQ 0 (
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

  timeout /t 2 /NOBREAK >nul

  goto loop

:killgame
  echo Proxy server not running properly, killing %GAME_EXE_NAME%
  netsh interface set interface "Ethernet" disabled
  taskkill /f /im "%GAME_EXE_NAME%"
  exit