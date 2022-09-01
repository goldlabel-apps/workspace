import { getFeaturesStore } from "../../../"

export const getItemByPk = (selectedPk: string | null) =>  {
  try {
    let item = null
    const state = getFeaturesStore().getState()
    const { banners } = state
    const { bannerList } = banners
    for (let i = 0; i < bannerList.length; i++){
      const { pk } = bannerList[i]
      if (pk === selectedPk){
        item = bannerList[i]
        break
      }
    }
    return item
  } catch (error: any) {
    console.warn ("getItemByPk", error)
  }
}
