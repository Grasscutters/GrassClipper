@echo off

echo Starting Proxy Server

SET ip=%1
SET gamePath=%2
SET gamePath=%gamePath:"=%

start "Proxy Server" ./ext/mitmdump.exe -s "./proxy/proxy.py" --ssl-insecure --set ip=%ip%

:: Allow the proxy to start
ping 192.0.2.2 -n 1 -w 5000 > nul

echo Opening %gamePath%/Genshin Impact Game/GenshinImpact.exe

start "" /b "%gamePath%/Genshin Impact Game/GenshinImpact.exe"