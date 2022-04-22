document.addEventListener('DOMContentLoaded', async () => {
  const firstPanel = document.querySelector('#firstPanel')
  const secondPanel = document.querySelector('#secondPanel')

  // Listen to hovers
  firstPanel.addEventListener('mouseover', () => {
    secondPanel.classList.add('darken')
  })

  firstPanel.addEventListener('mouseout', () => {
    secondPanel.classList.remove('darken')
  })

  secondPanel.addEventListener('mouseover', () => {
    firstPanel.classList.add('darken')
  })

  secondPanel.addEventListener('mouseout', () => {
    firstPanel.classList.remove('darken')
  })
})