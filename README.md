# GrassClipper
Grasscutter launcher for easily switching between Official and Private servers

[Download Here!](https://github.com/Grasscutters/GrassClipper/releases/)

# Setup (for Users)

1. Download the zip file
2. Extract the zip file somewhere
3. Run `install.cmd` as administrator. This will install the proxy server.
4. Run `GrassClipper.exe` and set your `Genshin Impact` folder!

# Setup (for Development)

0. Clone the repository
1. Ensure you have [NodeJS](https://nodejs.org/en/download/) installed.
2. Install the `neu` CLI tool: `npm install -g @neutralinojs/neu`
3. Install the dependencies: `npm install` AND `neu update`
4. Compile and run:
   * For testing: `npm run dev`
   * For production: `npm run build`

# TODO

* Interface
  * UI
  * ~~Official and Private options~~
  * ~~Server IP input~~
  * Fun fancy CSS styling n stuff (CoD: MW 2019-style vertical menu for choosing between official and private servers? [See this](https://charlieintel.com/wp-content/uploads/2020/11/MW-new-menu.png))
* Proxy service
  * ~~Local proxy server~~~~
  * ~~Intercept and modify GI requests like with Fiddler, allow anything else to pass through~~

# Having problems?

Below are some scenarios you may encounter and their solutions.

### My Discord is not letting my send messages or load images!

Discord does not seem to be a fan of the proxy server. You may need to disable it by either closing mitmdump or by disabling your proxy in the Windows proxy settings.

### I have no internet after closing everything/restarting my PC!

The launcher most likely did not close correctly, and was unable to clean your proxy settings back to what they were. Disable your proxy in the Windows proxy settings.

### The game will not launch/background launcher images don't load!

Ensure you have selected to correct path to Genshin Impact. This is ***not*** your `Genshin Impact Game` folder, but instead the main `Genshin Impact` folder (where the `bg` folder and `launcher.exe` can be found).

# Screenshots

![image](https://user-images.githubusercontent.com/25207995/164393190-f7e6633c-60bd-4186-bf0c-30d9f30871f4.png)
![image](https://user-images.githubusercontent.com/25207995/164393040-4da72f29-6d59-4af4-bd60-072269f2ba2a.png)
![image](https://user-images.githubusercontent.com/25207995/164393024-56543ddf-7063-4c04-9a9f-0c6238f30e90.png)
![image](https://user-images.githubusercontent.com/25207995/164393118-de844e75-f9a2-491a-aea6-f2d563abecc7.png)
