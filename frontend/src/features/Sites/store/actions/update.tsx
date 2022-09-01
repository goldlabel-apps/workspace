import axios from "axios"
import { AppThunk } from "../../../featuresStore"
// import { 
//   setSitesKey,
// } from "../slice";
import { read } from "../../"
import {
  setSharedKey,
} from "../../../Shared";
import { setSitesAsync } from "../../";

const start = (dispatch: any) => {
  dispatch(setSitesAsync({ key: 'message', value: `updating...` }))
  dispatch(setSitesAsync({ key: 'updating', value: true }))
  dispatch(setSitesAsync({ key: 'updated', value: false }))
}

const finish = (dispatch: any) => {
  dispatch(setSitesAsync({ key: 'message', value: "" }));
  dispatch(setSitesAsync({ key: 'updating', value: false }));
  dispatch(setSitesAsync({ key: 'updated', value: true }));
  dispatch(read());
}

export const update = (editing:any): AppThunk => async (dispatch: any) => {
  try {

    console.log ("Updating site...");
    start(dispatch);
    const endpoint = `${process.env.REACT_APP_BASE_URL}site/update`
    const {pk, sk} = editing.item
    const payload = {
      pk, sk,
      item:{
        ...editing.item
      },
    };
    axios
      .put(endpoint, payload)
      .then(function (res) {
        console.log ("res", res);
      })
      .catch(function (error) {
        dispatch(setSharedKey({ key: 'notifying', value: {
          severity: "error",
          message: error.toString(),
        }}))
      })
      .then( function() {
        finish(dispatch);
      })
  } catch (error: any) {
    dispatch(setSharedKey({ key: 'notifying', value: {
      severity: "error",
      message: error.toString(),
    }}))
    finish(dispatch);
  }
}
