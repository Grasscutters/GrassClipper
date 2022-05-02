async function clearGCInstallation() {
  Neutralino.os.execCommand(`del /s /q "./gc"`)
}

async function downloadGC(branch) {
  const config = await getCfg()

  // If we are pulling from a new branch, delete the old installation
  if (config.grasscutterBranch !== branch) await clearGCInstallation()

  // Keystore for branch (since they can differ)
  const keystoreUrl = `https://github.com/Grasscutters/Grasscutter/raw/${branch}/keystore.p12`

  // External service that allows un-authed artifact downloading
  const artiUrl = `https://nightly.link/Grasscutters/Grasscutter/workflows/build/${branch}/Grasscutter.zip`
  
  // Run installer
  createCmdWindow(`.\\scripts\\gcdownload.cmd ${artiUrl} ${keystoreUrl} ${branch}`)

  // Set current installation in config
  config.grasscutterBranch = branch

  // Set gc path for people with launcher enabled
  config.serverFolder = `${NL_CWD}\\gc-${branch}\\`

  Neutralino.storage.setData('config', JSON.stringify(config))
}