import axios from "axios"
import { AppThunk } from "../../../featuresStore"
import { 
  setSharedKey,
  select,
} from "../../../Shared"
import { getFeaturesStore } from "../../../../";
import { 
  setBannersAsync,
  read,  
} from "../../";

const start = (dispatch: any) => {
  dispatch(setBannersAsync({ key: 'message', value: `updating...` }))
  dispatch(setBannersAsync({ key: 'updating', value: true }))
  dispatch(setBannersAsync({ key: 'updated', value: false }))
  dispatch(select(null, ""));
}

const finish = (dispatch: any) => {
  dispatch(setBannersAsync({ key: 'message', value: "" }));
  dispatch(setBannersAsync({ key: 'updating', value: false }));
  dispatch(setBannersAsync({ key: 'updated', value: true }));
  dispatch(read());
}

export const update = (): AppThunk => async (dispatch: any) => {
  
  try {
    const {endpoints} = getFeaturesStore().getState().banners
    const {editing} = getFeaturesStore().getState().shared
    const endpoint = endpoints.update.url
    if (!editing){
      return null;
    }
    start(dispatch);
    const {pk, sk} = editing.item
    const payload = {
      pk, sk,
      updatedBanner:{
        ...editing.item
      },
    };
    axios
      .post(endpoint, payload)
      .then(function (res) {
        const { code, message} = res.data.response;
        if (code === 200){
          dispatch(setSharedKey({ key: 'notifying', value: {
            severity: "success",
            message: `${message}`,
          }}))
        }
      })
      .catch(function (error) {
        dispatch(setSharedKey({ key: 'notifying', value: {
          severity: "warning",
          message: error.toString(),
        }}))
      })
      .then( function() {
        finish(dispatch);
      })

  } catch (error: any) {
    finish(dispatch);
    console.log(error)
    dispatch(setSharedKey({ key: 'notifying', value: {
      severity: "error",
      message: error.toString(),
    }}))
  }
}
