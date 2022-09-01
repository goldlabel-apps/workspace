import * as React from 'react'
import {
  // useFeatureSelect,
  useFeatureDispatch,
} from "../../Shared/store/hooks"
import {
  // selectBanners,
  setBannerKey,
} from "../../Banners"
import {
  Icon,
} from "../"
import {
  Box,
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  Typography,
} from "@mui/material"

export default function Confirm() {

  const dispatch = useFeatureDispatch()
  // const banners = useFeatureSelect( selectBanners )
  // const { confirmOpen, confirmText } = banners
  
  const confirmOpen = false
  if ( !confirmOpen ) return null

  const handleClose = () => {
    dispatch(setBannerKey({key: "confirmOpen", value: false }))
  }

  const handleYes = () => {
    dispatch(setBannerKey({key: "confirmed", value: true }))
    handleClose()
  }

  const handleNo = () => {
    dispatch(setBannerKey({key: "confirmed", value: false }))
    handleClose()
  }

  return (
    <Dialog 
      fullWidth
      maxWidth={"xs"}
      onClose={ handleClose } 
      open
    >
      <DialogTitle>
        <Box sx={{ display: "flex" }}>
          <Typography variant="body1" sx={{ pt:0.5 }}>
            { `confirmText` }
          </Typography>          
          <Box sx={{ flexGrow: 1 }}/>
        </Box>
      </DialogTitle>
      <DialogActions>
        <Box sx={{}}>
            <Button
              color="primary"
              sx={{ m: 1}}
              onClick={ handleNo }>
              <Icon icon="close" />
              <span style={{ marginLeft: 6, marginRight: 6 }}>
                No
              </span>
            </Button>
            <Button
              autoFocus
              color="primary"
              variant={ "contained" }
              sx={{ m: 1}}
              onClick={ handleYes }>
              <span style={{ marginLeft: 6, marginRight: 6 }}>
                Yes
              </span>
              <Icon icon="tick" />
            </Button>
        </Box>
      </DialogActions>
    </Dialog>
  )
}
