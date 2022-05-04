function displayAlert(message, clear = 5000) {
  const alert = document.getElementById('alert')
  const alertText = document.getElementById('alertText')

  alert.classList.add('show')

  alertText.innerText = message

  setTimeout(() => {
    hideAlert()
  }, clear)
}

function hideAlert() {
  const alert = document.getElementById('alert')
  const alertText = document.getElementById('alertText')

  alert.classList.remove('show')
}
