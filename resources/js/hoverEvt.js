document.addEventListener('DOMContentLoaded', async () => {
    const firstPanel = document.querySelector('#firstPanel')
    const secondPanel = document.querySelector('#secondPanel')
    const thirdPanel = document.querySelector('#thirdPanel')

    // Listen to hovers
    firstPanel.addEventListener('mouseover', () => {
        secondPanel.classList.add('darken')
        thirdPanel.classList.add('darken')
    })

    firstPanel.addEventListener('mouseout', () => {
        secondPanel.classList.remove('darken')
        thirdPanel.classList.remove('darken')
    })

    secondPanel.addEventListener('mouseover', () => {
        firstPanel.classList.add('darken')
        thirdPanel.classList.add('darken')
    })

    secondPanel.addEventListener('mouseout', () => {
        firstPanel.classList.remove('darken')
        thirdPanel.classList.remove('darken')
    })

    thirdPanel.addEventListener('mouseover', () => {
        firstPanel.classList.add('darken')
        secondPanel.classList.add('darken')
    })

    thirdPanel.addEventListener('mouseout', () => {
        firstPanel.classList.remove('darken')
        secondPanel.classList.remove('darken')
    })
})