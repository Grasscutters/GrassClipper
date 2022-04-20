Neutralino.init();


document.addEventListener('DOMContentLoaded', async () => {
  setBackgroundImage();
  displayGenshinFolder();
})

async function getCfg() {
  const cfgStr = await Neutralino.storage.getData('config').catch(e => {
    // The data isn't set, so this is our first time opening
    Neutralino.storage.setData('config', JSON.stringify({
      genshinImpactFolder: '',
      lastConnect: ''
    }))
  })
  
  if (!cfgStr) return {
    genshinImpactFolder: '',
    lastConnect: ''
  }

  return JSON.parse(cfgStr)
}

async function displayGenshinFolder() {
  const elm = document.querySelector('#genshinPath')
  const config = await getCfg()

  elm.innerHTML = config.genshinImpactFolder
}

async function setBackgroundImage() {
  const config = await getCfg()

  const images = (await Neutralino.filesystem.readDirectory(config.genshinImpactFolder + '/bg')).filter(file => file.type === 'FILE')

  // Pick one of the images
  const image = images[Math.floor(Math.random() * images.length)].entry
  const path = config.genshinImpactFolder.replace('\\', '/') + '/bg/' + image

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

  // Copy to backgrounds folder
  const bgs = (await Neutralino.filesystem.readDirectory(NL_CWD + '/resources/bg/')).filter(file => file.type === 'FILE')

  if (!bgs.find(file => file.entry === image)) {
    await Neutralino.filesystem.copyFile(path, NL_CWD + '/resources/bg/' + image)
  }

  // Set the background image
  document.querySelector('#firstHalf').style.backgroundImage = `url("../bg/${image}")`
}

async function setGenshinImpactFolder() {
  const folder = await Neutralino.os.showFolderDialog('Select Genshin Impact folder')

  // Set the folder in our configuration
  const config = await getCfg()
  
  config.genshinImpactFolder = folder
  Neutralino.storage.setData('config', JSON.stringify(config))

  // Refresh background
  setBackgroundImage()
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