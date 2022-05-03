let alertTimeout, alertCooldown = 3000

async function displayLoginAlert(message, type, cooldown = null) {
  displayAlert(message, type, cooldown, 'login')
}

async function displayRegisterAlert(message, type, cooldown = null) {
  displayAlert(message, type, cooldown, 'register')
}

function displayAlert(message, type, cooldown, name) {
  const elm = document.getElementById(`${name}Alert`)
  const text = document.getElementById(`${name}AlertText`)

  elm.style.removeProperty('display')
  
  // Remove classification classes
  elm.classList.remove('error')
  elm.classList.remove('success')
  elm.classList.remove('warn')

  switch(type) {
  case 'error':
    elm.classList.add('error')
    break

  case 'success':
    elm.classList.add('success')
    break

  case 'warn':
  default:
    elm.classList.add('warn')
    break
  }

  text.innerText = message

  clearTimeout(alertTimeout)

  // Disappear after cooldown
  alertTimeout = setTimeout(() => {
    elm.style.display = 'none'
  }, cooldown || alertCooldown)
}