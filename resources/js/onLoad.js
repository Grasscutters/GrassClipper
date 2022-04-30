
/**
 * Every autofill, such as backgrounds and the game folder,
 * should be done here to ensure DOM contents are loaded.
 */
 document.addEventListener('DOMContentLoaded', async () => {
   displayUpdate();
  setBackgroundImage();
  displayGameFolder();
  displayServerFolder();

  // Set title version
  document.querySelector('#version').innerHTML = NL_APPVERSION

  const config = await getCfg()
  const ipArr = await getFavIps()

  if (config.serverLaunchPanel) {
    displayServerLaunchSection()
  }

  // Set last connect
  document.querySelector('#ip').value = config.lastConnect

  if (ipArr.includes(config.lastConnect)) {
    document.querySelector('#star').src = 'icons/star_filled.svg'
  }
  
  // Disable private game launch if proxy IP or proxy server is not found
  const playPriv = document.querySelector('#playPrivate') 

  if (!(await proxyIsInstalled())) {
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

  // Ensure we do the translation at the very end, after everything else has loaded
  await doTranslation()
  
  if (!config.gameexe) {
    handleGameNotSet()
  }

  if (!config.serverFolder) {
    handleServerNotSet()
  }
})
