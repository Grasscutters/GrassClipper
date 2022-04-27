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

  // Send the request
  const response = await fetch(url + '/grasscutter/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(reqBody),
    mode: 'no-cors',
  }).catch(e => {
    console.log(e)
  })

  console.log(response)
}

/**
 * Attempt registration, do not launch game
 */
async function register() {

}
