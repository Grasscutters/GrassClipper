/**
 * Toggle the login section
 */
async function setLoginSection() {
  const title = document.getElementById('loginSectionTitle');
  const altTitle = document.getElementById('registerSectionTitle');
  const loginSection = document.getElementById('loginPopupContentBody');
  const registerSection = document.getElementById('registerPopupContentBody');

  title.classList.add('selectedTitle')
  altTitle.classList.remove('selectedTitle')

  loginSection.style.removeProperty('display');
  registerSection.style.display = 'none';
}

/**
 * Toggle the register section
 */
async function setRegisterSection(fromLogin = false) {
  const title = document.getElementById('registerSectionTitle');
  const altTitle = document.getElementById('loginSectionTitle');
  const loginSection = document.getElementById('loginPopupContentBody');
  const registerSection = document.getElementById('registerPopupContentBody');

  title.classList.add('selectedTitle')
  altTitle.classList.remove('selectedTitle')

  loginSection.style.display = 'none';
  registerSection.style.removeProperty('display');

  if (fromLogin) {
    // Take the values from the login section and put them in the register section
    const loginUsername = document.getElementById('loginUsername').value;
    const loginPassword = document.getElementById('loginPassword').value;

    document.getElementById('registerUsername').value = loginUsername;
    document.getElementById('registerPassword').value = loginPassword;
  }
}

function parseJwt(token) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace('-', '+').replace('_', '/');
  return JSON.parse(window.atob(base64));
}

/**
 * Attempt login and launch game
 */
async function login() {
  const username = document.getElementById('loginUsername').value;
  const password = document.getElementById('loginPassword').value;
  const ip = document.getElementById('ip').value;
  const port = document.getElementById('port').value || '443';
  const config = await getCfg();
  const useHttps = config.useHttps;
  const url = `${useHttps ? 'https' : 'http'}://${ip}:${port}`;

  const reqBody = {
    username,
    password,
  }
  
  const { data } = await axios.post(url + '/grasscutter/login', reqBody)

  switch(data.message) {
    case 'INVALID_ACCOUNT':
      displayLoginAlert(localeObj.alertInvalid || 'Invalid username or password', 'error');
      break;

    case 'NO_PASSWORD':
      // No account password, create one with change password
      displayLoginAlert(localeObj.alertNoPass || 'No password set, please change password', 'warn');
      break;

    case 'UNKNOWN':
      // Unknown error, contact server owner
      displayLoginAlert(localeObj.alertUnknown || 'Unknown error, contact server owner', 'error');
      break;

    case undefined:
    case null:
    case 'AUTH_DISABLED':
      // Authentication is disabled, we can just connect the user
      displayLoginAlert(localeObj.alertAuthNoLogin || 'Authentication is disabled, no need to log in!', 'warn');
      launchPrivate();
      break;

    default:
      // Success! Copy the JWT token to their clipboard
      const tkData = parseJwt(data.jwt)
      await Neutralino.clipboard.writeText(tkData.token)

      displayLoginAlert(localeObj.alertLoginSuccess || 'Login successful! Token copied to clipboard. Paste this token into the username field of the game to log in.', 'success', 8000);
      
      await setRegistryLoginDetails(tkData.token, tkData.uid)
      await launchPrivate()
      
      break;
  }
}

/**
 * Attempt registration, do not launch game
 */
async function register() {
  const username = document.getElementById('registerUsername').value;
  const password = document.getElementById('registerPassword').value;
  const password_confirmation = document.getElementById('registerPasswordConfirm').value;
  const ip = document.getElementById('ip').value;
  const port = document.getElementById('port').value || '443';
  const config = await getCfg();
  const useHttps = config.useHttps;
  const url = `${useHttps ? 'https' : 'http'}://${ip}:${port}`;

  const reqBody = {
    username,
    password,
    password_confirmation
  }
  
  const { data } = await axios.post(url + '/grasscutter/register', reqBody)

  switch(data.message) {
    case 'USERNAME_TAKEN':
      // Username is taken
      displayRegisterAlert(localeObj.alertUserTaken || 'Username is taken', 'error');
      break;

    case 'PASSWORD_MISMATCH':
      // The password and password confirmation do not match
      displayRegisterAlert(localStorage.alertPassMismatch || 'Password and password confirmation do not match', 'error');
      break;

    case 'UNKNOWN':
      // Unknown error, contact server owner
      displayRegisterAlert(localeObj.alertUnknown || 'Unknown error, contact server owner', 'error');
      break;

    case undefined:
    case null:
    case 'AUTH_DISABLED':
      // Authentication is disabled, we can just connect the user
      displayRegisterAlert(localeObj.alertAuthNoRegister || 'Authentication is disabled, no need to register!', 'warn');
      break;

    default:
      // Success!! Bring them to the login screen and auto-input their username
      const loginUsername = document.getElementById('loginUsername');
      loginUsername.value = username;

      setLoginSection();
      displayLoginAlert(localeObj.alertRegisterSuccess || 'Registration successful!', 'success', 5000);
      break;
  }
}
