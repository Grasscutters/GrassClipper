@echo off

set BRANCH=%1

echo Checking java version...

where java >nul 2>nul
if %errorlevel%==1 (
    echo =======================================================================================
  echo No version of Java was found!
  
  echo To launch the server, you must install Java 17
  echo =======================================================================================

  exit /b
)

:: https://stackoverflow.com/questions/5675459/how-to-get-java-version-from-batch-script
for /f "tokens=3" %%g in ('java -version 2^>^&1 ^| findstr /i "version"') do (
    @echo Output: %%g
    set JAVAVER=%%g
)
set JAVAVER=%JAVAVER:"=%

for /f "delims=. tokens=1-3" %%v in ("%JAVAVER%") do (
    set MAJOR=%%v
    set MINOR=%%w
    set BUILD=%%x
)

:: Ensure java 17
if "%MAJOR%" NEQ "17" (
  echo =======================================================================================
  echo !! Java version is not 17 !!
  echo Please download Java 17 or later to ensure %BRANCH% branch server launches correctly.
  echo =======================================================================================
  exit /b
)

echo Java version is compatible