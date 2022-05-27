# ! NOTICE !
A new launcher is in the works that I am a large contributor to. Unfortunately this means I cannot maintain GrassClipper much - if at all - since I am busy on the new one. This is good news, however, because this new launcher is already much more stable and contains many additional features. If you are having too much trouble with GrassClipper, I recommend you wait until the new launcher.

# GrassClipper
EN | [PL](README_PL.md) | [ID](README_id.md) | [RU](README_ru.md)

Experimental Grasscutter launcher for easily switching between Official and Private servers

[Download Here!](https://github.com/Grasscutters/GrassClipper/releases/) (Supports Windows 8+)

*\*Note: some translations are outdated, so if random English text appears or an option seems misleading, this is why. If you notice an issue like this, feel free to make a pull request!*

# Table of Contents

* [Setup (for users)](#setup-for-users)
* [Setup (for development)](#setup-for-development)
* [TODO](#todo)
* [Common Problems](#having-problems)
  * [Proxy Installation not Opening/Failing](#manual-proxy-installation)
  * [White Screen Fix](#white-screen-fix)
  * [Error 502](#error-502)
  * [Error 4206](#error-4206)
  * [Infinite CMD Windows](#infinite-cmd-windows)
  * [Broken Discord/Youtube](#my-discord-is-not-letting-me-send-messages-or-load-imagesmy-youtube-is-acting-strange)
  * [No internet](#i-have-no-internet-after-closing-everythingrestarting-my-pc)
* [Languages and Translation Credits](#available-languages-and-translation-credits)
* [Screenshots](#screenshots)

# Setup (for Users)

1. Download the zip file
2. Extract the zip file somewhere
3. Run `GrassClipper.exe`, install the proxy server, and set your game folder!

# Setup (for Development)

0. Clone the repository
1. Ensure you have [NodeJS](https://nodejs.org/en/download/) installed.
2. Install the `neu` CLI tool: `npm install -g @neutralinojs/neu`
3. Install the dependencies: `setup_win.cmd`
4. Compile and run:
   * For testing: `npm run dev`
   * For production: `npm run build`

# TODO

* Interface/internals
  * [x] UI
  * [x] Official and Private options
  * [x] Server IP input
  * [x] Fun fancy CSS styling n stuff (CoD: MW 2019-style vertical menu for choosing between official and private servers? [See this](https://charlieintel.com/wp-content/uploads/2020/11/MW-new-menu.png))
  * [x] Kill switch script (optional)
  * [x] Automatically run `install.cmd` when opening for the first time
  * [x] Grasscutter auto-downloader
  * [ ] Detect when in a folder that is inaccessible to the program (eg. `C:/Program Files`) and warn
  * [ ] Custom images for private server sections (anyone is welcome to submit a pull request to add some!)
  * [x] Optional username/password creation for servers before entering (not implemented in Grasscutter yet)
  * [ ] Platform detection and bash scripts
  * [ ] Integrated banner creator
* Proxy service
  * [x] Local proxy server
  * [x] Intercept and modify GI requests like with Fiddler, allow anything else to pass through
  * [ ] Fix Discord and YouTube issues when proxy is enabled (maybe fixed)

# Having problems?

Below are some scenarios you may encounter and their solutions.

# Manual Proxy Installation

If you having trouble installing the proxy server, you can also install it manually. To do so:
1. Create a folder if it does not exist named `ext` in the GrassClipper folder.
2. Download and extract the contents of [this file](https://snapshots.mitmproxy.org/7.0.4/mitmproxy-7.0.4-windows.zip) into the `ext` folder
3. Double click `mitmdump.exe` and allow it to run for a few seconds to generate the certificate
4. Run this command as Administrator: `certutil -addstore root "%USERPROFILE%\.mitmproxy\mitmproxy-ca-cert.cer"`
5. Use GrassClipper like normal!

## White Screen Fix

Encountering a white screen? [Ensure WebView2 is installed](https://developer.microsoft.com/en-us/microsoft-edge/webview2/#download)

You may also want to run this command as administrator:
`CheckNetIsolation.exe LoopbackExempt -a -n="Microsoft.Win32WebViewHost_cw5n1h2txyewy"`

If you have Chinese characters in your file path, this may crash it too! I am working on a fix.

You can also try running in Windows 8 compatitbility mode.

If all else fails, you can run GrassClipper in `chrome` or `browser` mode. To do so:
* Create a shortcut to `GrassClipper.exe`
* Right click the shortcut, click `properties`
* In the `Target` box, at the very end, add ` --mode=chrome` or ` --mode=browser`
  * `chrome` only works if you have Chrome installed, and will create a Chrome window
  * `brower` will, you guessed it, open GrassClipper in your default browser
* Click `Ok`
* Run GrassClipper using this shortcut from now on!

## Error 502

***You may be using the wrong port, ensure your port in GrassClipper is either 443 or nothing (not 0, but literally nothing)***

1. If you are running a local server, ensure the local server is running. Otherwise, ensure the server you are connecting to is actually running.

2. If you are able, [use the development branch of Grasscutter](https://github.com/Grasscutters/Grasscutter/tree/development). It is known to work better with GrassClipper.

If you are still getting an error 502 when attempting to log in to your own server, open your Grasscutter config and add the following to the `DispatchServer` section:

```json
"PublicPort": YOUR_PORT
```
where `YOUR_PORT` is the same port you use as the `Port` value already. This will probably be 443.

## Error 4206

Ensure you have the correct `keystore.p12` file that comes with your branch (`stable` or `development`). Also ensure the password is set properly in Grasscutters `config.json` (blank for `stable`, "123456" for `development`).

## Infinite CMD Windows

If you are getting infinite CMD windows for any of the scripts (such as the proxy installation, or private server start), ensure you have UAC (user access control) set to any option that requires asking. Ensure your user account can open things as Admin.

## My Discord is not letting me send messages or load images/My Youtube is acting strange!

Discord/YouTube (plus surely some others) does not seem to be a fan of the proxy server. You may need to disable it by either closing mitmdump or by disabling your proxy in the Windows proxy settings.

## I have no internet after closing everything/restarting my PC!

The launcher most likely did not close correctly, and was unable to clean your proxy settings back to what they were. Disable your proxy in the Windows proxy settings.

# Available Languages and Translation Credits

Thank you to everyone who has provided translations! <3

* ZH - nuoxianCN, Scirese & MrAru
* ZH-TW - Kimi & KormiMeiko
* PT-BR - na.na & actuallyeunha
* VIE - labalityowo & lunaticwhat
* ID - Iqrar99 & nautilust
* FR - linsorak & memetrollsXD
* ES - memetrollsXD
* ND - memetrollsXD
* RU - fitiskin
* TR - lilmayofuksu
* JP - conochy
* HD - Arikatsu
* PL - zakhil-dev
* TH - ongsalt
* KO - tsukiroku

# Screenshots

![image](https://user-images.githubusercontent.com/25207995/164574276-645548c2-7ba6-47c3-8df4-77082003648f.png)
![image](https://user-images.githubusercontent.com/25207995/164393190-f7e6633c-60bd-4186-bf0c-30d9f30871f4.png)
![image](https://user-images.githubusercontent.com/25207995/164393040-4da72f29-6d59-4af4-bd60-072269f2ba2a.png)
![image](https://user-images.githubusercontent.com/25207995/164393024-56543ddf-7063-4c04-9a9f-0c6238f30e90.png)
![image](https://user-images.githubusercontent.com/25207995/164393118-de844e75-f9a2-491a-aea6-f2d563abecc7.png)
![image](https://user-images.githubusercontent.com/25207995/164882735-77aa535c-0e93-4b32-af7c-f8b59888257a.png)
![image](https://user-images.githubusercontent.com/25207995/164882716-c9f16cd0-c0b6-4c0a-ae9e-4c95da9ef7f5.png)


