let alertTimeout, alertCooldown = 3000

async function displayLoginAlert(message, type, cooldown = null) {
  const elm = document.getElementById('loginAlert');
  const text = document.getElementById('loginAlertText');

  elm.style.removeProperty('display');

  // Remove classification classes
  elm.classList.remove('error');
  elm.classList.remove('success');
  elm.classList.remove('warn');

  switch(type) {
    case 'error':
      elm.classList.add('error');
      break;

    case 'success':
      elm.classList.add('success');
      break;

    case 'warn':
    default:
      elm.classList.add('warn');
      break;
  }

  text.innerText = message;

  // Disappear after cooldown
  alertTimeout = setTimeout(() => {
    elm.style.display = 'none';
  }, cooldown || alertCooldown)
}

async function displayRegisterAlert(message, type, cooldown = null) {
  const elm = document.getElementById('registerAlert');
  const text = document.getElementById('registerAlertText');

  elm.style.removeProperty('display');
  
  // Remove classification classes
  elm.classList.remove('error');
  elm.classList.remove('success');
  elm.classList.remove('warn');

  switch(type) {
    case 'error':
      elm.classList.add('error');
      break;

    case 'success':
      elm.classList.add('success');
      break;

    case 'warn':
    default:
      elm.classList.add('warn');
      break;
  }

  text.innerText = message;

  // Disappear after cooldown
  alertTimeout = setTimeout(() => {
    elm.style.display = 'none';
  }, cooldown || alertCooldown)
}