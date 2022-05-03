@echo off

set BRANCH=%1

echo Checking java version...

where java >nul 2>nul
if %errorlevel%==1 (
    echo =======================================================================================
  echo No version of Java was found!
  
  if %BRANCH% EQU stable (
    echo To launch the stable branch server, you must install Java 8
  )

  if %BRANCH% EQU development (
    echo To launch the development branch server, you must install Java 17
  )

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

if %BRANCH% EQU stable (
  :: Ensure java 8
  if %MAJOR% EQU 1 (
    if %MINOR% LSS 8 (
    echo =======================================================================================
      echo !! Java version is less than 8 !!
      echo Please download Java 8 to ensure %BRANCH% branch server launches correctly.
    echo =======================================================================================
      exit /b
    )
  )

  if %MAJOR% NEQ 1 (
    echo =======================================================================================
    echo !! Java version is not 8 !!
    echo Please download Java 8 to ensure %BRANCH% branch server launches correctly.
    echo =======================================================================================
    exit /b
  )
)

if %BRANCH% EQU development (
  :: Ensure java 17
  if %MAJOR% LSS 17 (
    echo =======================================================================================
    echo !! Java version is less than 17 !!
    echo Please download Java 17 to ensure %BRANCH% branch server launches correctly.
    echo =======================================================================================
    exit /b
  )
)

echo Java version is compatible