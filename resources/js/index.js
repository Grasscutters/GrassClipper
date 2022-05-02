Neutralino.init();

let localeObj;
const filesystem = Neutralino.filesystem
const createCmdWindow = async (command) => {
  Neutralino.os.execCommand(`cmd.exe /c start "" ${command}`, { background: true })
}

const openInExplorer = async (path) => {
  console.log(`explorer.exe "${path}"`)
  createCmdWindow(`explorer.exe "${path}"`)
}

/**
 * Enable play buttons
 */
async function enableButtons() {
  const offBtn = document.querySelector('#playOfficial')
  const privBtn = document.querySelector('#playPrivate')

  offBtn.classList.remove('disabled')
  offBtn.disabled = false

  // Check if the proxy server is installed
  if (await proxyIsInstalled()) {
    privBtn.classList.remove('disabled')
    privBtn.disabled = false
  }
}

/**
 * Enable server launch button
 */
 async function enableServerButton() {
  const serverBtn = document.querySelector('#serverLaunch')

  serverBtn.classList.remove('disabled')
  serverBtn.disabled = false
}

/**
 * Disable buttons when the game folder is not set
 */
async function handleGameNotSet() {
  // Set buttons to greyed out and disable
  document.querySelector('#gamePath').innerHTML = localeObj.folderNotSet

  // Set official server background to default
  document.querySelector('#firstPanel').style.backgroundImage = `url("../bg/private/default.png")`

  const offBtn = document.querySelector('#playOfficial')
  const privBtn = document.querySelector('#playPrivate')

  offBtn.classList.add('disabled')
  offBtn.disabled = true

  privBtn.classList.add('disabled')
  privBtn.disabled = true

  // TODO show a dialog of sorts
}

async function handleServerNotSet() {
  // Set buttons to greyed out and disable
  document.querySelector('#serverPath').innerHTML = localeObj.folderNotSet

  // Set official server background to default
  // document.querySelector('#firstPanel').style.backgroundImage = `url("../bg/private/default.png")`

  const privBtn = document.querySelector('#serverLaunch')

  privBtn.classList.add('disabled')
  privBtn.disabled = true
}

/**
 * Show the game folder under the select button
 */
async function displayGameFolder() {
  const elm = document.querySelector('#gamePath')
  const config = await getCfg()

  elm.innerHTML = config.gameexe
}

/**
 * Show the server folder under the select button
 */
 async function displayServerFolder() {
  const elm = document.querySelector('#serverPath')
  const config = await getCfg()

  elm.innerHTML = config.serverFolder
}

/**
 * Set the background images of both the private and public sections
 */
async function setBackgroundImage() {
  const config = await getCfg()

  const privImages = (await filesystem.readDirectory(NL_CWD + '/resources/bg/private')).filter(file => file.type === 'FILE' && !file.entry.includes('default'))
  const privImage = privImages[Math.floor(Math.random() * privImages.length)].entry

  const servImages = (await filesystem.readDirectory(NL_CWD + '/resources/bg/server')).filter(file => file.type === 'FILE' && !file.entry.includes('default'))
  const servImage = servImages[Math.floor(Math.random() * servImages.length)].entry
  
  // Set default image, it will change if the bg folder exists
  document.querySelector('#firstPanel').style.backgroundImage = `url("https://webstatic.hoyoverse.com/upload/event/2020/11/04/7fd661b5184e1734f91f628b6f89a31f_7367318474207189623.png")`

  // Set the private background image
  document.querySelector('#secondPanel').style.backgroundImage = `url("../bg/private/${privImage}")`
  
  // Set the server background image
  document.querySelector('#thirdPanel').style.backgroundImage = `url("../bg/server/${servImage}")`

  return

  // Check if resources folder exists
  const mainDir = await filesystem.readDirectory(NL_CWD)
  if (!mainDir.find(dir => dir.entry === 'resources')) {
    await filesystem.createDirectory(NL_CWD + '/resources')
  }

  // Ensure bg folder exists
  const bgDir = await filesystem.readDirectory(NL_CWD + '/resources')
  if (!bgDir.find(dir => dir.entry === 'bg')) {
    await filesystem.createDirectory(NL_CWD + '/resources/bg')
  }

  // Ensure official folder exists
  const officialDir = await filesystem.readDirectory(NL_CWD + '/resources/bg')
  if (!officialDir.find(dir => dir.entry === 'official')) {
    await filesystem.createDirectory(NL_CWD + '/resources/bg/official')
  }

  if (config.gameexe) {
    // See if bg folder exists in parent dir
    const parentDir = await filesystem.readDirectory(config.gameexe + '/..')

    if (parentDir.find(dir => dir.entry === 'bg')) {

      const officialImages = (await filesystem.readDirectory(config.gameexe + '/../bg')).filter(file => file.type === 'FILE')

      if (officialImages.length > 0) {
        for (const bg of officialImages) {
          const path = config.gameexe.replace('\\', '/') + '/../bg/' + bg.entry
  
          // See if the file exists already
          const currentBgs = (await filesystem.readDirectory(NL_CWD + '/resources/bg/official/')).filter(file => file.type === 'FILE')
  
          if (!currentBgs.find(file => file.entry === bg.entry)) {
            await filesystem.copyFile(path, NL_CWD + '/resources/bg/official/' + bg.entry).catch(e => {
              // TODO: Handle error
            })
          }
        }
  
        // Pick one of the images
        const localImg = (await filesystem.readDirectory(NL_CWD + '/resources/bg/official')).filter(file => file.type === 'FILE')
        const image = localImg[Math.floor(Math.random() * localImg.length)].entry
  
        // Set background image
        document.querySelector('#firstPanel').style.backgroundImage = `url("../bg/official/${image}")`
      }
    }
  }
}

/**
 * When an IP is being input, check if it is part of the favorites
 */
async function handleFavoriteInput() {
  const ip = document.querySelector('#ip').value
  const port = document.querySelector('#port').value || '443'
  const ipArr = await getFavIps()

  const addr = `${ip}:${port}`

  if (!ip || !ipArr.includes(addr)) {
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
  const portInput = document.querySelector('#port')

  const parseIp = ip.split(':')[0]
  const parsePort = ip.split(':')[1]

  // Set star
  if (ip) {
    document.querySelector('#star').src = 'icons/star_filled.svg'
  }

  ipInput.value = parseIp
  portInput.value = parsePort
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

      listItem.innerHTML = localeObj.noFavorites
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
    let newY = (27 * ipArr.length) * window.devicePixelRatio

    if (ipArr.length === 0 || ipArr.length === 1) newY = 0

    ipList.style.transform = `translate(${xy[0]}px, calc(56vh - ${newY}px)`
  }
}

async function openSettings() {
  const settings = document.querySelector('#settingsPanel')
  const config = await getCfg()

  if (settings.style.display === 'none') {
    settings.style.removeProperty('display')
  }

  // Fill setting options with what is currently set in config
  const killSwitch = document.querySelector('#killswitchOption')
  const serverLaunch = document.querySelector('#serverLaunchOption')
  const httpsCheckbox = document.querySelector('#httpsOption')
  const registryCheckbox = document.querySelector('#registryOption')

  killSwitch.checked = config.enableKillswitch
  serverLaunch.checked = config.serverLaunchPanel
  httpsCheckbox.checked = config.useHttps
  registryCheckbox.checked = config.registryLogin

  // Load languages
  getLanguages()

  // Check for updates
  //checkForUpdatesAndShow()
}

async function closeSettings() {
  const settings = document.querySelector('#settingsPanel')
  const config = await getCfg()

  settings.style.display = 'none'

  // In case we installed the proxy server
  if (await proxyIsInstalled() && config.gameexe) {
    const playPriv = document.querySelector('#playPrivate')
    
    playPriv.classList.remove('disabled')
    playPriv.disabled = false
  }
}

async function openLogin() {
  const login = document.querySelector('#loginPanel')
  const ip = document.querySelector('#ip').value
  const port = document.querySelector('#port').value
  const loginIpDisplay = document.querySelector('#loginPopupServer')
  const registerIpDisplay = document.querySelector('#registerPopupServer')
  
  const config = await getCfg()
  const useHttps = config.useHttps
  const url = `${useHttps ? 'https' : 'http'}://${ip}:${port}`;

  // Check if we even need to authenticate
  try {
    const { data } = await axios.get(url + '/grasscutter/auth_status')

    if (data?.message !== 'AUTH_ENABLED') {
      launchPrivate()
      return
    }
  } catch(e) {
    launchPrivate()
    return
  }


  loginIpDisplay.innerText = ip
  registerIpDisplay.innerText = ip

  if (login.style.display === 'none') {
    login.style.removeProperty('display')
  }
}

async function closeLogin() {
  const login = document.querySelector('#loginPanel')

  login.style.display = 'none'
  
  setLoginSection()
}

async function closeFirstTimePopup() {
  const firstTimePopup = document.querySelector('#firstTimeNotice')
  firstTimePopup.style.display = 'none'
}

async function runInstallScript() {
  createCmdWindow(`.\\scripts\\install.cmd "${NL_CWD}" true`)

  // Create an interval that will check for the proxy server installation finish
  const interval = setInterval(async () => {
    if (await proxyIsInstalled()) {
      clearInterval(interval)
      enableButtons()
    }
  }, 1000)

  closeFirstTimePopup()
}

async function updateResources() {

} 

async function checkForUpdatesAndShow() {
  const updateBtn = document.querySelector('#updateBtn')
  const subtitle = document.querySelector('#updateSubtitle')
  const url = 'https://github.com/Grasscutters/GrassClipper/releases/latest/download/'
  const manifest = await Neutralino.updater.checkForUpdates(url)

  // Version mismatch? Update!
  if (manifest?.version !== NL_APPVERSION) {
    subtitle.innerHTML = "New update available!"
    updateBtn.classList.remove('disabled')
  } else {
    subtitle.innerHTML = "You are on the latest version! :)"
    updateBtn.classList.add('disabled')
  }
}

async function displayServerLaunchSection() {
  const serverPanel = document.querySelector('#thirdPanel')
  const bottomBtnSection = document.querySelector('#serverPath').parentElement

  if (serverPanel.style.display === 'none') {
    serverPanel.style.removeProperty('display')
    bottomBtnSection.style.removeProperty('display')
  } else {
    serverPanel.style.display = 'none'
    bottomBtnSection.style.display = 'none'
  }
}

/**
 * Set the game folder by opening a folder picker
 */
async function setGameExe() {
  const gameExe = await Neutralino.os.showOpenDialog(localeObj.gameFolderDialog, {
    filters: [
      { name: 'Executable files', extensions: ['exe'] }
    ]
  })

  // Set the folder in our configuration
  const config = await getCfg()

  // It's an array of selections, so only get the first one
  config.gameexe = gameExe[0].replace(/\//g, '\\')

  Neutralino.storage.setData('config', JSON.stringify(config))

  // Refresh background and path
  setBackgroundImage()
  displayGameFolder()
  enableButtons()
}

async function setGrasscutterFolder() {
  const folder = await Neutralino.os.showOpenDialog(localeObj.grasscutterFileDialog, {
    filters: [
      { name: 'Jar files', extensions: ['jar'] }
    ]
  })

  // Set the folder in our configuration
  const config = await getCfg()

  config.serverFolder = folder[0]
  Neutralino.storage.setData('config', JSON.stringify(config))

  displayServerFolder()
  enableServerButton()
}

/**
 * Launch the game with no modifications nor proxy
 */
async function launchOfficial() {
  const config = await getCfg()

  Neutralino.os.execCommand(`"${config.gameexe}"`)
}

/**
 * Launch the game with a proxy
 */
async function launchPrivate() {
  const ip = document.getElementById('ip').value || '127.0.0.1'
  const port = document.getElementById('port').value || '443'

  const config = await getCfg()

  console.log('connecting to ' + ip + ':' + port)

  // Set the last connect
  config.lastConnect = ip
  Neutralino.storage.setData('config', JSON.stringify(config))

  // Pass IP and game folder to the private server launcher
  createCmdWindow(`.\\scripts\\private_server_launch.cmd ${ip} ${port} ${config.useHttps} "${config.gameexe}" "${NL_CWD}" ${config.enableKillswitch} true`).catch(e => console.log(e))
}

async function launchLocalServer() {
  const config = await getCfg()

  createCmdWindow(`.\\scripts\\local_server_launch.cmd "${config.serverFolder}"`).catch(e => console.log(e))
}
