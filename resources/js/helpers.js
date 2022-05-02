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
    grasscutterBranch: '',
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

async function proxyIsInstalled() {
  // Check if the proxy server is installed
  const curDirList = await filesystem.readDirectory(NL_CWD)

  if (curDirList.find(f => f.entry === 'ext')) {
    const extFiles = await filesystem.readDirectory(NL_CWD + '/ext')

    if (extFiles.find(f => f.entry === 'mitmdump.exe')) {
      return true
    }
  }

  return false
}

async function checkForUpdates() {
  const url = 'https://api.github.com/repos/Grasscutters/GrassClipper/releases/latest'

  const { data } = await axios.get(url)
  const latest = data.tag_name

  return latest
}

async function displayUpdate() {
  const latest = await checkForUpdates()
  const versionDisplay = document.querySelector('#newestVersion')
  const notif = document.querySelector('#downloadNotif')

  if (latest === `v${NL_APPVERSION}`) return

  versionDisplay.innerText = latest

  notif.classList.add('displayed')

  setTimeout(() => {
    notif.classList.remove('displayed')
  }, 5000)
}

async function openLatestDownload() {
  const downloadLink = 'https://github.com/Grasscutters/GrassClipper/releases/latest/'

  Neutralino.os.open(downloadLink)
}

async function openGameFolder() {
  const config = await getCfg()
  const folder = config.gameexe.match(/.*\\/g, '')[0]

  openInExplorer(folder)
}

async function openGrasscutterFolder() {
  const config = await getCfg()
  const folder = config.serverFolder.match(/.*\\/g, '')[0]

  openInExplorer(folder)
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

  window.close()
}
