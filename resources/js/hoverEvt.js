document.addEventListener('DOMContentLoaded', async () => {
  const firstHalf = document.querySelector('#firstHalf')
  const secondHalf = document.querySelector('#secondHalf')

  // Listen to hovers
  firstHalf.addEventListener('mouseover', () => {
    secondHalf.classList.add('darken')
  })

  firstHalf.addEventListener('mouseout', () => {
    secondHalf.classList.remove('darken')
  })

  secondHalf.addEventListener('mouseover', () => {
    firstHalf.classList.add('darken')
  })

  secondHalf.addEventListener('mouseout', () => {
    firstHalf.classList.remove('darken')
  })
})