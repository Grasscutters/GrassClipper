# !/bin/bash

# Clean dist
rm -rf ./dist

# build
neu build

# copy scripts and langs
cp -r ./scripts ./dist/GrassClipper
cp -r ./proxy ./dist/GrassClipper
cp -r ./languages ./dist/GrassClipper

# copy backgrounds
mkdir ./dist/GrassClipper/resources/
mkdir ./dist/GrassClipper/resources/bg
mkdir ./dist/GrassClipper/resources/bg/private
mkdir ./dist/GrassClipper/resources/bg/server
cp -r ./resources/bg/private/* ./dist/GrassClipper/resources/bg/private
cp -r ./resources/bg/server/* ./dist/GrassClipper/resources/bg/server

# rename exe
mv ./dist/GrassClipper/GrassClipper-win_x64.exe ./dist/GrassClipper/GrassClipper.exe