Neutralino.init()

const filesystem = Neutralino.filesystem
let bannerObj

async function getBannerData() {
  const bannerData = await filesystem.readFile('resources/banner_creator/data/banners.txt')
  const lines = bannerData.split('\n')
  bannerObj = {}

  for (const line of lines) {
    const values = line.split(' ')

    bannerObj[values[0]] = {
      assetName: values[1],
      fiveStar: values[2],
      // The rest are a list of 4 stars
      fourStars: values.slice(3)
    }
  }
}