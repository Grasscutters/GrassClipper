Neutralino.init()

const filesystem = Neutralino.filesystem

async function getBannerData() {
  const bannerData = await filesystem.readFile('resources/banner_creator/data/banners.txt')
  const lines = bannerData.split('\n')
  let bannerObj = {}

  for (const line of lines) {
    const values = line.split(' ')

    bannerObj[values[0]] = {
      assetName: values[1],
      fiveStar: values[2],
      // The rest are a list of 4 stars
      fourStars: values.slice(3)
    }
  }

  console.log(bannerObj)
}