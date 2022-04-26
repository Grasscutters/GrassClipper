async function fillDefaultBanners() {
  await getBannerData()

  const selectList = document.getElementById('bannerDefaultSelect')

  for (const banner in bannerObj) {
    const data = bannerObj[banner]

    const option = document.createElement('option')
    option.value = banner
    option.innerText = banner
    selectList.appendChild(option)
  }
}

async function handleBaseBannerChange() {
  
}