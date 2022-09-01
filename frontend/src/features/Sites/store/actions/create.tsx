import axios from "axios"
import { AppThunk } from "../../../featuresStore"
import { setSharedKey } from "../../../Shared"
import { setSitesAsync, read } from "../../"
import { getFeaturesStore } from "../../../../"

const start = (dispatch: any) => {
  dispatch(setSitesAsync({ key: 'message', value: `creating...` }))
  dispatch(setSitesAsync({ key: 'creating', value: true }))
  dispatch(setSitesAsync({ key: 'created', value: false }))
}

const finish = (dispatch: any) => {
  dispatch(setSitesAsync({ key: 'message', value: "" }))
  dispatch(setSitesAsync({ key: 'creating', value: false }))
  dispatch(setSitesAsync({ key: 'created', value: true }))
}

export const create = ( displayName: string ): AppThunk => async (dispatch: any) => {
  try {
    start(dispatch)
    const {endpoints} = getFeaturesStore().getState().sites
    const endpoint = endpoints.create.url
    axios
      .post(endpoint, {
        "title": displayName,
        "domain": "example.com",
        "region": "us-east-1",
        "logo": "https://wei-zang.com/logos/dt9_inv.png",
        "mainLogoColor": "#d82320",
        "version": [0,0,3],
      })
      .then(function (res) {
        finish(dispatch)
        const { pk } = res.data
        if (pk){
          dispatch(read())
          dispatch(setSharedKey({ key: 'notifying', value: {
            severity: "success",
            message: `"${res.data.title}" created OK`,
          }}))
        } else {
          dispatch(setSharedKey({ key: 'notify', value: {
            code: "CS-101",
            severity: "error",
            message: res.data,
          }}))
        }
      })
  } catch (error: any) {
    dispatch(setSharedKey({ key: 'error', value: {
      code: "CS-201",
      severity: "error",
      message: `createSite ${error.toString()}`
    }}))
  }
}
