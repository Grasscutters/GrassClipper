/**
 * Get configuration
 * 
 * @returns {Promise<string>}
 */
async function getCfg() {
  const defaultConf = {
    gameexe: '',
    serverFolder: '',
    lastConnect: '',
    enableKillswitch: false,
    serverLaunchPanel: false,
    language: 'en',
    useHttps: true,
    debug: true,
    grasscutterBranch: '',
  }
  const cfgStr = await Neutralino.storage.getData('config').catch(e => {
    // The data isn't set, so this is our first time opening
    Neutralino.storage.setData('config', JSON.stringify(defaultConf))

    // Show the first time notice if there is no config
    document.querySelector('#firstTimeNotice').style.display = 'block'

    debug.warn('First time opening')
  })

  const config = cfgStr ? JSON.parse(cfgStr) : defaultConf

  return config
}

/**
 * Get the list of favorite IPs
 * 
 * @returns {Promise<string[]>}
 */
async function getFavIps() {
  const ipStr = await Neutralino.storage.getData('favorites').catch(e => {
    // The data isn't set, so this is our first time opening
    Neutralino.storage.setData('favorites', JSON.stringify([]))

    debug.warn('No favorites set')
  })

  debug.log('Favorites:', ipStr)

  const ipArr = ipStr ? JSON.parse(ipStr) : []

  return ipArr
}

async function proxyIsInstalled() {
  // Check if the proxy server is installed
  const curDirList = await filesystem.readDirectory(NL_CWD)

  if (curDirList.find(f => f.entry === 'ext')) {
    const extFiles = await filesystem.readDirectory(NL_CWD + '/ext')

    debug.log('ext/ folder exists')

    if (extFiles.find(f => f.entry === 'mitmdump.exe')) {
      debug.log('mitmdump exists')
      return true
    }
  }

  debug.log('No proxy installed')

  return false
}

async function checkForUpdates() {
  const url = 'https://api.github.com/repos/Grasscutters/GrassClipper/releases/latest'

  const { data } = await axios.get(url).catch(e => debug.error('Error getting latest release'))
  const latest = data.tag_name

  debug.log('Latest release:', latest)

  return latest
}

async function displayUpdate() {
  const latest = await checkForUpdates()
  const versionDisplay = document.querySelector('#newestVersion')
  const notif = document.querySelector('#downloadNotif')

  debug.log('Comparing versions: ' + latest + ' vs v' + NL_APPVERSION)

  if (latest === `v${NL_APPVERSION}`) return

  debug.log('New version available')

  versionDisplay.innerText = latest

  notif.classList.add('displayed')

  setTimeout(() => {
    notif.classList.remove('displayed')
  }, 5000)
}

async function openLatestDownload() {
  const downloadLink = 'https://github.com/Grasscutters/GrassClipper/releases/latest/'

  debug.log('Opening download link: ', downloadLink)

  Neutralino.os.open(downloadLink)
}

async function openGameFolder() {
  const config = await getCfg()
  const folder = config.gameexe.match(/.*\\|.*\//g, '')
  
  debug.log('Opening game folder: ', folder)

  if (folder.length > 0) openInExplorer(folder[0].replace(/\//g, '\\'))
}

async function openGrasscutterFolder() {
  const config = await getCfg()
  const folder = config.serverFolder.match(/.*\\|.*\//g, '')

  debug.log('Opening grasscutter folder: ', folder)

  if (folder.length > 0) openInExplorer(folder[0].replace(/\//g, '\\'))
}

// https://www.jimzhao.us/2015/09/javascript-detect-chinese-character.html
function hasForeignChars(str) {
  let re1 = /^[\x00-\x7F]+$/g
  str = str.replace(/\s/g, '')

  debug.log('Checking for foreign chars in path: ', str)
  debug.log('Path includes foreign chars? ', re1.test(str))

  return !re1.test(str)
}

function openDialog(title, message, negBtn = false, affirmBtn = closeDialog) {
  const dialog = document.getElementById('miscDialog')
  const titleElm = document.getElementById('dialogTitle')
  const contents = document.getElementById('dialogContent')
  const noBtn = document.getElementById('dialogButtonNeg')
  const yesBtn = document.getElementById('dialogButtonAffirm')

  debug.log('Opening dialog: ', title, message)

  if (!negBtn) {
    noBtn.style.display = 'none'
    debug.log('No "no" button')
  } else {
    noBtn.style.removeProperty('display')
    noBtn.onclick = () => closeDialog()
  }

  yesBtn.innerText = localeObj.dialogYes || 'OK'
  noBtn.innerText = localeObj.dialogNo || 'NO'

  yesBtn.onclick = () => {
    debug.log('Affirmative button clicked')
    affirmBtn()
    closeDialog()
  }

  // Set title and message
  titleElm.innerText = title
  contents.innerText = message

  // Show the dialog
  dialog.style.display = 'block'
}

function closeDialog() {
  const dialog = document.getElementById('miscDialog')

  debug.log('Closing dialog')

  dialog.style.display = 'none'
}

/**
 * Minimize the window
 */
function minimizeWin() {
  debug.log('Minimizing window')
  Neutralino.window.minimize()
}

/**
 * Close the window
 */
function closeWin() {
  debug.log('Closing window')
  Neutralino.app.exit()

  window.close()
}
