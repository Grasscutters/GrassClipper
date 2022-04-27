let alertTimeout, alertCooldown = 3000

async function displayLoginAlert(message, type) {
  const elm = document.getElementById('loginAlert');
  const text = document.getElementById('loginAlertText');

  elm.style.removeProperty('display');

  switch(type) {
    case 'error':
      elm.classList.add('error');
      break;

    case 'warn':
    default:
      elm.classList.add('warn');
      break;
  }

  text.innerText = message;

  // Disappear after 5 seconds
  alertTimeout = setTimeout(() => {
    elm.style.display = 'none';
  }, alertCooldown)
}

async function displayRegisterAlert(message, type) {
  const elm = document.getElementById('registerAlert');

  elm.style.removeProperty('display');

  switch(type) {
    case 'error':
      elm.classList.add('error');
      break;

    case 'warn':
    default:
      elm.classList.add('warn');
      break;
  }

  text.innerText = message;

  // Disappear after 5 seconds
  alertTimeout = setTimeout(() => {
    elm.style.display = 'none';
  }, alertCooldown)
}