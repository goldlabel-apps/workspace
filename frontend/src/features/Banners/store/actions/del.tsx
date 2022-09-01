// import axios from "axios"
import { AppThunk } from "../../../featuresStore"
import { setBannerKey } from "../slice"
// import { read } from "../"

export const del = (banner: any): AppThunk => async (dispatch: any) => {
  try {
    console.log ("del", banner)
        
    // const { pk, sk , meta} = banner
    // const { displayName } = meta
    // const endpoint = `http://localhost:3000/dynamic-banners/delete`
    // const payload: any = {
    //   displayName,
    //   pk,
    //   sk,
    // }
    // // console.warn( "payload", payload )

    // dispatch(setBannerKey({ key: 'loading', value: true }))
    // dispatch(setBannerKey({ key: 'error', value: null }))
    // dispatch(setBannerKey({ key: 'pk', value: null }))
    // dispatch(setBannerKey({ key: 'loadingText', value: `Deleting "${ displayName }" ...` }))

    // axios
    // .delete(endpoint, payload)
    //   .then(function ( res ) {
    //     const response = res.data.response
    //     console.warn("response", response)
    //     const { code } = response
    //     if (code === 200){
    //       dispatch(setBannerKey({ key: 'feedback', value: {
    //           ...response,
    //       }}))
    //       // dispatch(read())
    //     }
        
    //   })
    //   .catch(function (error) {
    //     // console.warn("error", error)
    //     dispatch(setBannerKey({ key: 'feedback', value: { 
    //       severity: "error",
    //       message: error.toString() 
    //     }}))
    //   })
    //   .then(function () {
    //     dispatch(setBannerKey({ key: 'loading', value: false }))
    //     dispatch(setBannerKey({ key: 'loaded', value: true }))
    //     dispatch(setBannerKey({ key: 'loadingText', value: `` }))
    //     // dispatch(setBannerKey({ key: 'error', value: null }))
    //     dispatch(read())
    //   })
  } catch (error: any) {
    dispatch(setBannerKey({ key: 'error', value: { 
      severity: "error",
      message: error.toString() 
    } 
  }))
  }
}
