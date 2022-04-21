Neutralino.init();


document.addEventListener('DOMContentLoaded', async () => {
  setBackgroundImage();
  displayGenshinFolder();

  const config = await getCfg()

  if (!config.genshinImpactFolder) {
    handleGenshinFolderNotSet()
  }
})

async function getCfg() {
  const cfgStr = await Neutralino.storage.getData('config').catch(e => {
    // The data isn't set, so this is our first time opening
    Neutralino.storage.setData('config', JSON.stringify({
      genshinImpactFolder: '',
      lastConnect: ''
    }))
  })

  const config = cfgStr ? JSON.parse(cfgStr) : {
    genshinImpactFolder: '',
    lastConnect: ''
  }

  return config
}

async function enableButtons() {
  const offBtn = document.querySelector('#playOfficial')
  const privBtn = document.querySelector('#playPrivate')

  offBtn.classList.remove('disabled')
  offBtn.disabled = false

  privBtn.classList.remove('disabled')
  privBtn.disabled = false
}

async function handleGenshinFolderNotSet() {
  // Set buttons to greyed out and disable
  document.querySelector('#genshinPath').innerHTML = 'Not set'

  const offBtn = document.querySelector('#playOfficial')
  const privBtn = document.querySelector('#playPrivate')

  offBtn.classList.add('disabled')
  offBtn.disabled = true

  privBtn.classList.add('disabled')
  privBtn.disabled = true

  // TODO show a dialog of sorts
}

async function displayGenshinFolder() {
  const elm = document.querySelector('#genshinPath')
  const config = await getCfg()

  elm.innerHTML = config.genshinImpactFolder
}

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
    const officialImages = (await Neutralino.filesystem.readDirectory(config.genshinImpactFolder + '/bg')).filter(file => file.type === 'FILE')

    // Pick one of the images
    const image = officialImages[Math.floor(Math.random() * officialImages.length)].entry
    const path = config.genshinImpactFolder.replace('\\', '/') + '/bg/' + image
    
    // Copy to backgrounds folder
    const officialBgs = (await Neutralino.filesystem.readDirectory(NL_CWD + '/resources/bg/official/')).filter(file => file.type === 'FILE')
    if (!officialBgs.find(file => file.entry === image)) {
      await Neutralino.filesystem.copyFile(path, NL_CWD + '/resources/bg/official/' + image).catch(e => {
        // TODO: Handle error
      })
    }

    // Set background image
    document.querySelector('#firstHalf').style.backgroundImage = `url("../bg/official/${image}")`
  }

  const privImages = (await Neutralino.filesystem.readDirectory(NL_CWD + '/resources/bg/private')).filter(file => file.type === 'FILE')
  const privImage = privImages[Math.floor(Math.random() * privImages.length)].entry

  // Set the background image
  document.querySelector('#secondHalf').style.backgroundImage = `url("../bg/private/${privImage}")`
}

async function setGenshinImpactFolder() {
  const folder = await Neutralino.os.showFolderDialog('Select Genshin Impact folder')

  // Set the folder in our configuration
  const config = await getCfg()

  config.genshinImpactFolder = folder
  Neutralino.storage.setData('config', JSON.stringify(config))

  // Refresh background and path
  setBackgroundImage()
  displayGenshinFolder()
  enableButtons()
}

async function getGenshinExecName() {
  // Scan genshin dir
  const config = await getCfg()
  const genshinDir = await Neutralino.filesystem.readDirectory(config.genshinImpactFolder + '/Genshin Impact Game')

  // Find the executable
  const genshinExec = genshinDir.find(file => file.entry.endsWith('.exe'))

  return genshinExec.entry
}

async function launchOfficial() {
  const config = await getCfg()

  Neutralino.os.execCommand(config.genshinImpactFolder + '/Genshin Impact Game/' + await getGenshinExecName())
}

async function launchPrivate() {
  const ip = document.getElementById('ip').value || 'localhost'

  const config = await getCfg()

  console.log('connecting to ' + ip)

  // Pass IP and game folder to the private server launcher
  Neutralino.os.execCommand(`${NL_CWD}/scripts/private_server_launch.cmd ${ip} "${config.genshinImpactFolder}/Genshin Impact Game/${await getGenshinExecName()}"`).catch(e => console.log(e))
}

function minimizeWin() {
  console.log('min')
  Neutralino.window.minimize()
}

function closeWin() {
  console.log('close')
  Neutralino.app.exit()
}