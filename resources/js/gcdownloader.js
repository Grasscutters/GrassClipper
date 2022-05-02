async function clearGCInstallation() {
  Neutralino.os.execCommand(`del /s /q "./gc"`)
}

async function setDownloadButtonsToLoading() {
  const stableBtn = document.querySelector('#stableInstall')
  const devBtn = document.querySelector('#devInstall')

  stableBtn.innerText = localeObj.gcScriptRunning || 'Running...'

  devBtn.innerText = localeObj.gcScriptRunning || 'Running...'

  // Set btns to disabled
  stableBtn.disabled = true
  stableBtn.classList.add('disabled')

  devBtn.disabled = true
  devBtn.classList.add('disabled')
}

async function resetDownloadButtons() {
  const stableBtn = document.querySelector('#stableInstall')
  const devBtn = document.querySelector('#devInstall')

  stableBtn.innerText = localeObj.stableInstall || 'Download'
  devBtn.innerText = localeObj.devInstall || 'Download'

  // Set btns to enabled
  stableBtn.disabled = false
  stableBtn.classList.remove('disabled')

  devBtn.disabled = false
  devBtn.classList.remove('disabled')
}

async function downloadGC(branch) {
  const config = await getCfg()

  // If we are pulling from a new branch, delete the old installation
  if (config.grasscutterBranch !== branch) await clearGCInstallation()

  // Set current installation in config
  config.grasscutterBranch = branch

  // Set gc path for people with launcher enabled
  config.serverFolder = `${NL_CWD}/gc-${branch}/grasscutter.jar`

  // Enable server launcher
  config.serverLaunchPanel = true

  Neutralino.storage.setData('config', JSON.stringify(config))

  setDownloadButtonsToLoading()

  // Keystore for branch (since they can differ)
  const keystoreUrl = `https://github.com/Grasscutters/Grasscutter/raw/${branch}/keystore.p12`

  // External service that allows un-authed artifact downloading
  const artiUrl = `https://nightly.link/Grasscutters/Grasscutter/workflows/build/${branch}/Grasscutter.zip`

  // For data files
  const dataFiles = await axios.get(`https://api.github.com/repos/Grasscutters/Grasscutter/contents/data?ref=${branch}`)
  const dataList = dataFiles.data
    .map(file => ({ path: file.path, filename: file.name }))
    .map(o => ({ url: `https://raw.githubusercontent.com/Grasscutters/Grasscutter/${branch}/${o.path}`, filename: o.filename }))

  // For key files
  const keyFiles = await axios.get(`https://api.github.com/repos/Grasscutters/Grasscutter/contents/keys?ref=${branch}`)
  const keyList = keyFiles.data
    .map(file => ({ path: file.path, filename: file.name }))
    .map(o => ({ url: `https://raw.githubusercontent.com/Grasscutters/Grasscutter/${branch}/${o.path}`, filename: o.filename }))

  const serverFolderFixed = config.serverFolder.match(/.*\\|.*\//g, '')[0].replace(/\//g, '\\')

  // Ensure data and key folders exist

  await Neutralino.os.execCommand(`mkdir ${serverFolderFixed}\\data`)
  await Neutralino.os.execCommand(`mkdir ${serverFolderFixed}\\keys`)

  // Download data files
  for (const o of dataList) {
    const folder = 'data'
    await Neutralino.os.execCommand(`powershell Invoke-WebRequest -Uri ${o.url} -OutFile "${serverFolderFixed}\\${folder}\\${o.filename}"`)
  }

  // Download key files
  for (const o of keyList) {
    const folder = 'keys'
    await Neutralino.os.execCommand(`powershell Invoke-WebRequest -Uri ${o.url} -OutFile "${serverFolderFixed}\\${folder}\\${o.filename}"`)
  }

  // Run installer
  createCmdWindow(`.\\scripts\\gc_download.cmd ${artiUrl} ${keystoreUrl} ${branch}`)

  // Fix buttons
  resetDownloadButtons()

  // Display folder after saving config
  displayServerFolder()
  enableServerButton()
  displayServerLaunchSection()
}