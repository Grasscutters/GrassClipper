/**
 * Toggle the killswitch script
 */
async function toggleKillSwitch() {
  const killSwitch = document.querySelector('#killswitchOption')
  const config = await getCfg()

  config.enableKillswitch = killSwitch.checked

  Neutralino.storage.setData('config', JSON.stringify(config))
}

/**
 * Toggles the server launching panel
 */
async function toggleServerLaunchSection() {
  const config = await getCfg()

  displayServerLaunchSection()

  // Save setting
  config.serverLaunchPanel = !config.serverLaunchPanel
  Neutralino.storage.setData('config', JSON.stringify(config))
}

/**
 * Get all languages for the language selector
 */
async function getLanguages() {
  const languageFiles = (await filesystem.readDirectory(`${NL_CWD}/languages`)).filter(file => file.entry.endsWith('.json'))
  const config = await getCfg()

  // Clear language options
  const languageSelect = document.querySelector('#languageSelect')
  languageSelect.innerHTML = ''

  // Load all languages as options
  for (const file of languageFiles) {
    const fullLanguageName = JSON.parse(await filesystem.readFile(`${NL_CWD}/languages/${file.entry}`)).fullLangName
    const lang = file.entry.split('.json')[0]

    const option = document.createElement('option')
    option.value = lang
    option.innerHTML = fullLanguageName
    
    // Set language selected to config language
    if (lang === config.language) {
      option.selected = true
    }

    document.querySelector('#languageSelect').appendChild(option)
  }
}

/**
 * Save lang, refresh to apply
 * 
 * @param {DOMElement} elm 
 */
async function handleLanguageChange(elm) {
  const list = elm
  const config = await getCfg()

  // Set language in config
  config.language = list.value
  Neutralino.storage.setData('config', JSON.stringify(config))

  // Force refresh of application, no need for restart!
  window.location.reload()
}

/**
 * Toggle the use of HTTPS
 */
 async function toggleHttps() {
  const httpsCheckbox = document.querySelector('#httpsOption')
  const config = await getCfg()

  config.useHttps = httpsCheckbox.checked

  Neutralino.storage.setData('config', JSON.stringify(config))
}

async function toggleRegistryLogin() {
  const registryCheckbox = document.querySelector('#registryOption')
  const config = await getCfg()

  config.registryLogin = registryCheckbox.checked

  Neutralino.storage.setData('config', JSON.stringify(config))
}

/**
 * Add the current value of the IP input to the favorites list
 * OR
 * Remove the current value of the IP input from the favorites list 
 */
 async function setFavorite() {
  const ip = document.querySelector('#ip').value
  const port = document.querySelector('#port').value
  const ipArr = await getFavIps()

  const addr = `${ip}:${port}`

  // Set star icon
  const star = document.querySelector('#star')

  if (star.src.includes('filled') && ip) {
    star.src = 'icons/star_empty.svg'

    // remove from list
    ipArr.splice(ipArr.indexOf(addr), 1)
  } else {
    star.src = 'icons/star_filled.svg'

    // add to list
    if (ip && !ipArr.includes(addr)) {
      ipArr.push(addr)
    }
  }

  Neutralino.storage.setData('favorites', JSON.stringify(ipArr))
}
