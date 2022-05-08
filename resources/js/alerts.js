function displayAlert(message, clear = 4000) {
  const alert = document.getElementById('alert')
  const alertText = document.getElementById('alertText')

  alert.classList.add('show')

  alertText.innerText = message

  debug.log('Displaying message: ' + message)

  setTimeout(() => {
    hideAlert()
  }, clear)
}

function hideAlert() {
  const alert = document.getElementById('alert')
  const alertText = document.getElementById('alertText')

  debug.log('Hiding alert')

  alert.classList.remove('show')
}
