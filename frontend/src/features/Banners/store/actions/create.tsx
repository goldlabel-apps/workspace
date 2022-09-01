import axios from "axios"
import { AppThunk } from "../../../featuresStore"
import { setBannerKey } from "../slice"
import { setSharedKey } from "../../../Shared"
import { setBannersAsync, read } from "../../"
import { getFeaturesStore } from "../../../../"

const start = (dispatch: any) => {
    dispatch(setBannersAsync({ key: 'message', value: `creating...` }))
    dispatch(setBannersAsync({ key: 'creating', value: true }))
    dispatch(setBannersAsync({ key: 'created', value: false }))
}

const finish = (dispatch: any) => {
  dispatch(setBannersAsync({ key: 'message', value: "" }))
  dispatch(setBannersAsync({ key: 'creating', value: false }))
  dispatch(setBannersAsync({ key: 'created', value: true }))
}

export const create = ( displayName: string ): AppThunk => async (dispatch: any) => {
  try {
    start(dispatch)
    const {endpoints} = getFeaturesStore().getState().banners
    const endpoint = endpoints.create.url
    axios
      .post( endpoint, {
        "sk": "sk_value",
        "meta":{
          displayName,
          created: Date.now(),
          updated: Date.now(),
        },
        "links": {
          "affiliation": "https://dt9affiliations.com",
          "terms": "https://dt9affiliations.com/termini-condizioni"
        },
        "colors": {
          "ctaButtonBackgroundColor": "#d82320",
          "ctaButtonTextColor": "#f9f9f9",
          "ctaBorderBottomColor": "#333",
        },
        "assets": {
            "logo": "https://wei-zang.com/logos/dt9.png",
            "background": "none"
        },
        "text": {
            "CTAButtonText": "Click Here",
            "offerHeader": "Offer Text",
            "termsText": "Terms text"
        }
      })
      .then(function (res) {
        finish(dispatch)
        const { pk } = res.data
        if (pk){
          dispatch(read())
          dispatch(setSharedKey({ key: 'notifying', value: {
            severity: "success",
            message: `"${res.data.meta.displayName}" created OK`,
          }}))
        } else {
          dispatch(setSharedKey({ key: 'notifying', value: {
            severity: "error",
            message: res.data,
          }}))
        }
      })
      .catch(function (error) {
        dispatch(setBannerKey({ key: 'error', value: {
          severity: "error",
          code: "BC-101",
          message: error.toString(),
        }}))
        finish(dispatch)
      })

  } catch (error: any) {
    dispatch(setBannerKey({ key: 'error', value: {
      severity: "error",
      code: "BC-102",
      message: error.toString()
    }}))
    finish(dispatch)
  }
}
