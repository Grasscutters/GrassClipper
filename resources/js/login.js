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
async function setRegisterSection() {
  const title = document.getElementById('registerSectionTitle');
  const altTitle = document.getElementById('loginSectionTitle');
  const loginSection = document.getElementById('loginPopupContentBody');
  const registerSection = document.getElementById('registerPopupContentBody');

  title.classList.add('selectedTitle')
  altTitle.classList.remove('selectedTitle')

  loginSection.style.display = 'none';
  registerSection.style.removeProperty('display');
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

  console.log(data)

  switch(data.message) {
    case 'INVALID_ACCOUNT':
      // Username or password invalid
      break;

    case 'NO_PASSWORD':
      // No account password, create one with change password
      break;

    case 'UNKNOWN':
      // Unknown error, contact server owner
      break;

    case 'AUTH_DISABLED':
      // Authentication is disabled, we can just connect the user
      break;

    default:
      // Success! Copy the JWT token to their clipboard
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

  console.log(data)

  switch(data.message) {
    case 'USERNAME_TAKEN':
      // Username is taken
      break;

    case 'PASSWORD_MISMATCH':
      // The password and password confirmation do not match
      break;

    case 'UNKNOWN':
      // Unknown error, contact server owner
      break;

    case 'AUTH_DISABLED':
      // Authentication is disabled, we can just connect the user
      break;
  }
}
