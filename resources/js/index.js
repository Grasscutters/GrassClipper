Neutralino.init();

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
})

async function getFavIps() {
  const ipStr = await Neutralino.storage.getData('favorites').catch(e => {
    // The data isn't set, so this is our first time opening
    Neutralino.storage.setData('favorites', JSON.stringify([]))
  })

  const ipArr = ipStr ? JSON.parse(ipStr) : []

  return ipArr
}

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

async function handleFavoriteInput() {
  console.log('onchange')
  const ip = document.querySelector('#ip').value
  const ipArr = await getFavIps()

  if (!ip || !ipArr.includes(ip)) {
    document.querySelector('#star').src = 'icons/star_empty.svg'
  } else {
    document.querySelector('#star').src = 'icons/star_filled.svg'
  }
}

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

async function getGenshinExecName() {
  // Scan genshin dir
  const config = await getCfg()
  const genshinDir = await Neutralino.filesystem.readDirectory(config.genshinImpactFolder)

  // Find the executable
  const genshinExec = genshinDir.find(file => file.entry.endsWith('.exe'))

  return genshinExec.entry
}

async function launchOfficial() {
  const config = await getCfg()

  Neutralino.os.execCommand(config.genshinImpactFolder + '/' + await getGenshinExecName())
}

async function launchPrivate() {
  const ip = document.getElementById('ip').value || 'localhost'

  const config = await getCfg()

  console.log('connecting to ' + ip)

  // Set the last connect
  config.lastConnect = ip
  Neutralino.storage.setData('config', JSON.stringify(config))

  // Pass IP and game folder to the private server launcher
  Neutralino.os.execCommand(`${NL_CWD}/scripts/private_server_launch.cmd ${ip} "${config.genshinImpactFolder}/${await getGenshinExecName()}"`).catch(e => console.log(e))
}

function minimizeWin() {
  console.log('min')
  Neutralino.window.minimize()
}

function closeWin() {
  console.log('close')
  Neutralino.app.exit()
}