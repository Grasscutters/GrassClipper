Neutralino.init();


document.addEventListener('DOMContentLoaded', async () => {
  setBackgroundImage();
  displayGenshinFolder();
})

async function getCfg() {
  return JSON.parse(await Neutralino.storage.getData('config').catch(e => {
    // The data isn't set, so this is our first time opening
    Neutralino.storage.setData('config', JSON.stringify({
      genshinImpactFolder: '',
      lastConnect: ''
    }))
  }))
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

  // Copy to backgrounds folder
  const bgs = (await Neutralino.filesystem.readDirectory(NL_CWD + '/resources/bg/')).filter(file => file.type === 'FILE')

  if (!bgs.find(file => file.entry === image)) {
    console.log('new file')
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
}
