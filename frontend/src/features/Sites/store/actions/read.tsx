import axios from "axios"
import { AppThunk } from "../../../featuresStore"
import { setSitesKey, setSitesAsync } from "../slice"
import {getFeaturesStore} from "../../../../"

const start = (dispatch: any) => {
  dispatch(setSitesAsync({ key: 'initted', value: true }))
  dispatch(setSitesAsync({ key: 'message', value: "loading..." }))
  dispatch(setSitesAsync({ key: 'reading', value: true }))
  dispatch(setSitesAsync({ key: 'read', value: false }))
}

const finish = (dispatch: any) => {
  dispatch(setSitesAsync({ key: 'message', value: "" }))
  dispatch(setSitesAsync({ key: 'reading', value: false }))
  dispatch(setSitesAsync({ key: 'read', value: true }))
}

export const read = (): AppThunk => async (dispatch: any) => {
  try {
    start(dispatch)
    const {endpoints} = getFeaturesStore().getState().sites
    const endpoint = endpoints.read.url
    axios
      .get(endpoint)
      .then(function ( res ) {
        const { data } = res
        if ( typeof data === "string" ){
          dispatch(setSitesKey({ key: 'error', value: {
            severity: "error",
            code: "Database Error",
            message: data,
          }}))
        } else {
          dispatch(setSitesKey({ key: 'siteList', value: data }))
        }
        finish(dispatch)
      })
      .catch(function (error) {
        dispatch(setSitesKey({ key: 'error', value: {
          severity: "info",
          code: "SR-101",
          message: error.toString(),
        }}))
        finish(dispatch)
      })
  } catch (error: any) {
    dispatch(setSitesKey({ key: 'error', value: {
      severity: "error",
      code: "SR-102",
      message: error.toString()
    }}))
    finish(dispatch)
  }
}
