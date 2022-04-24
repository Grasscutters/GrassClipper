#!/bin/bash

origin=$1
cert_dir="~/.mitmproxy/"

unameOut="$(uname -s)"
case "${unameOut}" in
    Linux*)     machine=Linux;;
    Darwin*)    machine=Mac;;
    CYGWIN*)    machine=Cygwin;;
    MINGW*)     machine=MinGw;;
    *)          machine="UNKNOWN:${unameOut}"
esac

echo "Current platform: ${machine}"

echo "Downloading proxy server..."

# Ensure we are in the right dir
cd "$($origin)"

# Ensure ext/ and temp/ dirs are created
mkdir -p ext
mkdir -p temp

# Download latest mitmdump for Mac or linux using curl
if [ $machine = "Mac" ]; then
    curl -o temp/mitmdump.zip https://snapshots.mitmproxy.org/7.0.4/mitmproxy-7.0.4-osx.tar.gz
fi

if [ $machine = "Linux" ] || [ $machine = "MinGw" ]; then
    curl -o temp/mitmdump.zip https://snapshots.mitmproxy.org/7.0.4/mitmproxy-7.0.4-linux.tar.gz
fi
echo "Extracting..."

# Extract the file to ext/
tar -xzf temp/mitmdump.zip -C ext

# Once we're done, delete temp dir
rm -rf temp

# Run the proxy server for a couple seconds to generate the certificate
echo "Starting proxy server to generate certificate..."

# Start mitmdump
ext/mitmdump

mitm_pid=$(ps -ef | grep mitmdump | grep -v grep | awk '{print $2}')

sleep 5

echo "Killing mitmdump..."

kill -KILL $mitm_pid

echo "Saving certs..."

if [ $machine = "Linux" ]; then
  # Create dir for extra certs if it doesn't exist already
  mkdir -p /usr/local/share/ca-certificates/extra

  # Copy cert to this dir
  cp $cert_dir/mitmproxy-ca-cert.pem /usr/local/share/ca-certificates/extra/mitmproxy-ca-cert.pem

  # Convert with openSSL
  openssl x509 -in mitmproxy-ca-cert.pem -inform PEM -out mitmproxy-ca-cert.crt

  # Update certs
  sudo update-ca-certificates
fi

if [ $machine = "Mac" ]; then
  security add-trusted-cert -d -p ssl -p basic -k /Library/Keychains/System.keychain ~/.mitmproxy/mitmproxy-ca-cert.pem
fi

echo "Done! You can now use GrassClipper!"