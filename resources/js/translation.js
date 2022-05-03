async function doTranslation() {
    const config = await getCfg()

    // See if the localization file exists
    const localizations = await filesystem.readDirectory(`${NL_CWD}/languages`)

    // Use english if the selected file does not exist
    const selectedLanguage = localizations.find(f => f.entry === `${config.language}.json`)

    // Use english if the selected file does not exist
    if (!selectedLanguage) {
        config.language = 'en'
    }

    const localization = await filesystem.readFile(`${NL_CWD}/languages/${config.language}.json`)
    const engLocale = await filesystem.readFile(`${NL_CWD}/languages/en.json`)
    engLocaleObj = JSON.parse(engLocale)
    localeObj = JSON.parse(localization)

    const set = (id, localeString) => document.getElementById(id).innerText = localeObj[localeString] || engLocaleObj[localeString]

    // Begin filling in values
    set('titleSection', 'appName')

    const verSpan = document.createElement('span')
    verSpan.id = 'version'
    verSpan.innerHTML = ` v${NL_APPVERSION}`

    document.querySelector('#titleSection').appendChild(verSpan)

    // Play buttons
    set('playOfficial', 'playOfficial')
    set('playPrivate', 'playPrivate')
    set('serverLaunch', 'launchLocalServer')

    // File select buttons
    set('gameExeSet', 'gameExeSet')
    set('grasscutterFileSet', 'grasscutterFileSet')

    // Private options
    document.querySelector('#ip').placeholder = localeObj.ipPlaceholder
    document.querySelector('#port').placeholder = localeObj.portPlaceholder

    // Settings
    set('fullSettingsTitle', 'settingsTitle')
    set('scriptsTitle', 'scriptsSectionTitle')
    set('killswitchTitle', 'killswitchOption')
    set('killswitchSubtitle', 'killswitchSubtitle')
    set('proxyTitle', 'proxyOption')
    set('proxyInstall', 'proxyInstallBtn')
    set('proxySubtitle', 'proxySubtitle')
    set('updateBtn', 'updateOption')
    set('updateTitle', 'updateOption')
    set('updateSubtitle', 'updateSubtitle')
    set('languageTitle', 'languageOption')
    set('languageSubtitle', 'languageSubtitle')
    set('serverLaunchTitle', 'enableServerLauncherOption')
    set('serverSubtitle', 'enableServerLauncherSubtitle')
    set('httpsTitle', 'httpsOption')
    set('httpsSubtitle', 'httpsSubtitle')
  
    // Intro popup
    const popup = document.getElementById('firstTimeNotice')
    const introSpan = popup.querySelector('span')
    const boldIntroSpan = document.createElement('span')

    boldIntroSpan.innerHTML = localeObj.introSen1 + '\n'
    boldIntroSpan.classList.add('boldTitle')

    introSpan.appendChild(boldIntroSpan)

    introSpan.innerHTML += localeObj.introSen2 + '<br>'
    introSpan.innerHTML += localeObj.introSen3 + '<br>'
    introSpan.innerHTML += localeObj.introSen4 + '<br>'

    set('firstTimeInstallBtn', 'proxyInstallBtn')
    set('firstTimeDenyBtn', 'proxyInstallDeny')

    // Login section
    set('loginSectionTitle', 'authLoginTitle')
    set('registerSectionTitle', 'authRegisterTitle')
    set('loggingInToIndicator', 'loggingInTo')
    set('registeringToIndicator', 'registeringFor')
    set('loginUsernameIndicator', 'authUsername')
    set('loginPasswordIndicator', 'authPassword')
    set('registerUsernameIndicator', 'authUsername')
    set('registerPasswordIndicator', 'authPassword')
    set('registerConfirmIndicator', 'authConfirmPassword')
    set('loginPopupContentBodyBtnLogin', 'authLoginBtn')
    set('loginPopupContentBodyBtnRegister', 'authRegisterBtn')
    set('noLoginBtn', 'launchWithoutAuth')

    // Downloads section
    set('downloadTitle', 'downloadTitle')
    set('grassclipperTitle', 'grassclipperTitle')
    set('grasscutterTitle', 'grasscutterTitle')
    set('installerTitle', 'installerTitle')
    set('installerSubtitle', 'installerSubtitle')
    set('downloadStable', 'downloadStable')
    set('stableSubtitle', 'stableSubtitle')
    set('downloadDev', 'downloadDev')
    set('devSubtitle', 'downloadSubtitle')
    set('downloadResources', 'downloadResources')
    set('devSubtitle', 'devSubtitle')
    set('stableInstall', 'stableInstall')
    set('devInstall', 'devInstall')

    // update notification
    set('updateNotifText', 'updateNotifText')
}