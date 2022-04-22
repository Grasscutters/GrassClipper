Neutralino.init();

/**
 * Every autofill, such as backgrounds and the game folder,
 * should be done here to ensure DOM contents are loaded.
 */
document.addEventListener('DOMContentLoaded', async () => {
  setBackgroundImage();
  displayGenshinFolder();

  const config = await getCfg()
  const ipArr = await getFavIps()

  if (!config.genshinImpactFolder) {
    handleGenshinFolderNotSet()
  }

  // Set last connect
  document.querySelector('#ip').value = config.lastConnect

  if (ipArr.includes(config.lastConnect)) {
    document.querySelector('#star').src = 'icons/star_filled.svg'
  }
  
  // Disable private game launch if proxy IP or proxy server is not found
  const playPriv = document.querySelector('#playPrivate') 
  const curDirList = await Neutralino.filesystem.readDirectory(NL_CWD)
  
  if (!curDirList.find(f => f.entry === 'ext')) {
    playPriv.classList.add('disabled')
    playPriv.disabled = true
  }

  const extFiles = await Neutralino.filesystem.readDirectory(NL_CWD + '/ext')

  if (!extFiles.find(f => f.entry === 'mitmdump.exe')) {
    playPriv.classList.add('disabled')
    playPriv.disabled = true
  }

  // Exit favorites list and settings panel when clicking outside of it
  window.addEventListener("click", function(e) {
    const favList = document.querySelector('#ipList')
    const settingsPanel = document.querySelector('#settingsPanel')

    // This will close the favorites list no matter what is clicked
    if (favList.style.display !== 'none') {
      favList.style.display = 'none'
      favList.style.transform = ''
    }

    // This will close the settings panel no matter what is clicked
    let settingCheckElm = e.target

    while(settingCheckElm.tagName !== 'BODY') {
      if (settingCheckElm.id === 'settingsPanel'
          || settingCheckElm.id === 'settingsBtn') {
        return
      }

      settingCheckElm = settingCheckElm.parentElement
    }

    // We travelled through the parents, so if we are at the body, we clicked outside of the settings panel
    if (settingCheckElm.tagName === 'BODY') {
      // This will close the settings panel only when something outside of it is clicked
      if (settingsPanel.style.display !== 'none') {
        settingsPanel.style.display = 'none'
      }
    }
  });
})

/**
 * Get the list of favorite IPs
 * 
 * @returns {Promise<string[]>}
 */
async function getFavIps() {
  const ipStr = await Neutralino.storage.getData('favorites').catch(e => {
    // The data isn't set, so this is our first time opening
    Neutralino.storage.setData('favorites', JSON.stringify([]))
  })

  const ipArr = ipStr ? JSON.parse(ipStr) : []

  return ipArr
}

/**
 * Get configuration
 * 
 * @returns {Promise<string>}
 */
async function getCfg() {
  const defaultConf = {
    genshinImpactFolder: '',
    lastConnect: '',
    enableKillswitch: false
  }
  const cfgStr = await Neutralino.storage.getData('config').catch(e => {
    // The data isn't set, so this is our first time opening
    Neutralino.storage.setData('config', JSON.stringify(defaultConf))

    // Show the first time notice if there is no config
    document.querySelector('#firstTimeNotice').style.display = 'block'
  })

  const config = cfgStr ? JSON.parse(cfgStr) : defaultConf

  return config
}

/**
 * Enable play buttons
 */
async function enableButtons() {
  const offBtn = document.querySelector('#playOfficial')
  const privBtn = document.querySelector('#playPrivate')

  offBtn.classList.remove('disabled')
  offBtn.disabled = false

  privBtn.classList.remove('disabled')
  privBtn.disabled = false
}

/**
 * Disable buttons when the game folder is not set
 */
async function handleGenshinFolderNotSet() {
  // Set buttons to greyed out and disable
  document.querySelector('#genshinPath').innerHTML = 'Not set'

  // Set official server background to default
  document.querySelector('#firstHalf').style.backgroundImage = `url("../bg/private/default.png")`

  const offBtn = document.querySelector('#playOfficial')
  const privBtn = document.querySelector('#playPrivate')

  offBtn.classList.add('disabled')
  offBtn.disabled = true

  privBtn.classList.add('disabled')
  privBtn.disabled = true

  // TODO show a dialog of sorts
}

/**
 * Show the game folder under the select button
 */
async function displayGenshinFolder() {
  const elm = document.querySelector('#genshinPath')
  const config = await getCfg()

  elm.innerHTML = config.genshinImpactFolder
}

/**
 * Set the background images of both the private and public sections
 */
async function setBackgroundImage() {
  const config = await getCfg()

  // Check if resources folder exists
  const mainDir = await Neutralino.filesystem.readDirectory(NL_CWD)
  if (!mainDir.find(dir => dir.entry === 'resources')) {
    await Neutralino.filesystem.createDirectory(NL_CWD + '/resources')
  }

  // Ensure bg folder exists
  const bgDir = await Neutralino.filesystem.readDirectory(NL_CWD + '/resources')
  if (!bgDir.find(dir => dir.entry === 'bg')) {
    await Neutralino.filesystem.createDirectory(NL_CWD + '/resources/bg')
  }

  // Ensure official folder exists
  const officialDir = await Neutralino.filesystem.readDirectory(NL_CWD + '/resources/bg')
  if (!officialDir.find(dir => dir.entry === 'official')) {
    await Neutralino.filesystem.createDirectory(NL_CWD + '/resources/bg/official')
  }

  if (config.genshinImpactFolder) {
    const officialImages = (await Neutralino.filesystem.readDirectory(config.genshinImpactFolder + '/../bg')).filter(file => file.type === 'FILE')

    if (officialImages.length > 0) {
      for (const bg of officialImages) {
        const path = config.genshinImpactFolder.replace('\\', '/') + '/../bg/' + bg.entry

        // See if the file exists already
        const currentBgs = (await Neutralino.filesystem.readDirectory(NL_CWD + '/resources/bg/official/')).filter(file => file.type === 'FILE')

        if (!currentBgs.find(file => file.entry === bg.entry)) {
          await Neutralino.filesystem.copyFile(path, NL_CWD + '/resources/bg/official/' + bg.entry).catch(e => {
            // TODO: Handle error
          })
        }
      }

      // Pick one of the images
      const localImg = (await Neutralino.filesystem.readDirectory(NL_CWD + '/resources/bg/official')).filter(file => file.type === 'FILE')
      const image = localImg[Math.floor(Math.random() * localImg.length)].entry

      // Set background image
      document.querySelector('#firstHalf').style.backgroundImage = `url("../bg/official/${image}")`
    } else {
      // Set default image
      document.querySelector('#firstHalf').style.backgroundImage = `url("https://webstatic.hoyoverse.com/upload/event/2020/11/04/7fd661b5184e1734f91f628b6f89a31f_7367318474207189623.png")`
    }
  }

  const privImages = (await Neutralino.filesystem.readDirectory(NL_CWD + '/resources/bg/private')).filter(file => file.type === 'FILE' && !file.entry.includes('default'))
  const privImage = privImages[Math.floor(Math.random() * privImages.length)].entry

  // Set the background image
  document.querySelector('#secondHalf').style.backgroundImage = `url("../bg/private/${privImage}")`
}

/**
 * When an IP is being input, check if it is part of the favorites
 */
async function handleFavoriteInput() {
  const ip = document.querySelector('#ip').value
  const ipArr = await getFavIps()

  if (!ip || !ipArr.includes(ip)) {
    document.querySelector('#star').src = 'icons/star_empty.svg'
  } else {
    document.querySelector('#star').src = 'icons/star_filled.svg'
  }
}

/**
 * Set the IP input value
 * 
 * @param {String} ip 
 */
async function setIp(ip) {
  const ipInput = document.querySelector('#ip')

  // Set star
  if (ip) {
    document.querySelector('#star').src = 'icons/star_filled.svg'
  }

  ipInput.value = ip
}

/**
 * Create/hide the favorites list
 */
async function handleFavoriteList() {
  const ipArr = await getFavIps()
  const ipList = document.querySelector('#ipList')

  if (ipList.style.display === 'none') {
    ipList.innerHTML = ''

    const list = ipList.appendChild(
      document.createElement('ul')
    )

    if (ipArr.length < 1) {
      const listItem = list.appendChild(
        document.createElement('li')
      )

      listItem.innerHTML = 'No favorites set'
    }

    for (const ip of ipArr) {
      const elm = document.createElement('li')
      elm.innerHTML = ip
      elm.addEventListener('click', () => setIp(ip))
      list.appendChild(elm)
    }

    ipList.style.display = 'block'

    const transform = window.getComputedStyle(document.querySelector('#ipList')).transform
    const xy = [ transform.split(',')[4], transform.split(',')[5] ]
    let newY = parseInt(xy[1].replace(')', '')) - (27 * ipArr.length)

    if (ipArr.length === 0) newY -= 27

    ipList.style.transform = `translate(${xy[0]}px, ${newY}px)`
  }
}

/**
 * Add the current value of the IP input to the favorites list
 * OR
 * Remove the current value of the IP input from the favorites list 
 */
async function setFavorite() {
  const ip = document.querySelector('#ip').value
  const ipArr = await getFavIps()

  // Set star icon
  const star = document.querySelector('#star')

  if (star.src.includes('filled') && ip) {
    star.src = 'icons/star_empty.svg'

    // remove from list
    ipArr.splice(ipArr.indexOf(ip), 1)
  } else {
    star.src = 'icons/star_filled.svg'

    // add to list
    if (ip && !ipArr.includes(ip)) {
      ipArr.push(ip)
    }
  }

  Neutralino.storage.setData('favorites', JSON.stringify(ipArr))
}

async function openSettings() {
  const settings = document.querySelector('#settingsPanel')
  const config = await getCfg()

  if (settings.style.display === 'none') {
    settings.style.removeProperty('display')
  }

  // Fill setting options with what is currently set in config
  const killSwitch = document.querySelector('#killswitchOption')

  killSwitch.checked = config.enableKillswitch
}

async function closeSettings() {
  const settings = document.querySelector('#settingsPanel')

  settings.style.display = 'none'
}

async function toggleKillSwitch() {
  const killSwitch = document.querySelector('#killswitchOption')
  const config = await getCfg()

  config.enableKillswitch = killSwitch.checked

  Neutralino.storage.setData('config', JSON.stringify(config))
}

async function closeFirstTimePopup() {
  const firstTimePopup = document.querySelector('#firstTimeNotice')
  firstTimePopup.style.display = 'none'
}

async function runInstallScript() {
  Neutralino.os.execCommand(`${NL_CWD}/scripts/install.cmd "${NL_CWD}"`)

  closeFirstTimePopup()
}

/**
 * Set the game folder by opening a folder picker
 */
async function setGenshinImpactFolder() {
  const folder = await Neutralino.os.showFolderDialog('Select Genshin Impact Game folder')

  // Set the folder in our configuration
  const config = await getCfg()

  config.genshinImpactFolder = folder
  Neutralino.storage.setData('config', JSON.stringify(config))

  // Refresh background and path
  setBackgroundImage()
  displayGenshinFolder()
  enableButtons()
}

/**
 * Get the name of the game executable
 * 
 * @returns {Promise<String>}
 */
async function getGenshinExecName() {
  // Scan genshin dir
  const config = await getCfg()
  const genshinDir = await Neutralino.filesystem.readDirectory(config.genshinImpactFolder)

  // Find the executable
  const genshinExec = genshinDir.find(file => file.entry.endsWith('.exe'))

  return genshinExec.entry
}

/**
 * Launch the game with no modifications nor proxy
 */
async function launchOfficial() {
  const config = await getCfg()

  Neutralino.os.execCommand(config.genshinImpactFolder + '/' + await getGenshinExecName())
}

/**
 * Launch the game with a proxy
 */
async function launchPrivate() {
  const ip = document.getElementById('ip').value || 'localhost'

  const config = await getCfg()

  console.log('connecting to ' + ip)

  // Set the last connect
  config.lastConnect = ip
  Neutralino.storage.setData('config', JSON.stringify(config))

  // Pass IP and game folder to the private server launcher
  Neutralino.os.execCommand(`${NL_CWD}/scripts/private_server_launch.cmd ${ip} "${config.genshinImpactFolder}/${await getGenshinExecName()}" "${NL_CWD}" ${config.enableKillswitch}`).catch(e => console.log(e))
}

/**
 * Minimize the window
 */
function minimizeWin() {
  console.log('min')
  Neutralino.window.minimize()
}

/**
 * Close the window
 */
function closeWin() {
  console.log('close')
  Neutralino.app.exit()
}