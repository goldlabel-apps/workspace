import * as React from 'react'
import moment from "moment";
import {
  useFeatureDispatch,
  useFeatureSelect,
} from "../../Shared/store/hooks"
import { update as updateBanner } from "../../Banners";
import { update as updateSite } from "../../Sites";
import {
  setSharedKey,
  selectShared,
} from "../store/slice"
import {
  Box,
  Button,
  CardHeader,
  CardContent,
  CardActions,
  IconButton,
  Drawer,
  Typography,
} from "@mui/material"
import { Icon } from "../"
import {UpdateBanner} from "../../Banners"
import {UpdateSite} from "../../Sites"

type Anchor = 'right';

export default function EditDrawer() {
  // const [ valid, setValid] = React.useState<boolean>( true )
  const valid = true;
  const [state, setState] = React.useState({
    right: false,
  });
  const dispatch = useFeatureDispatch()
  const shared = useFeatureSelect(selectShared)
  const {editing} = shared
  if (!editing) return null
  const {pk, type, item, pristine} = editing
  let created = null
  const {sk} = item;
  let formEl: any = null;
  if (type === "banner") {
    formEl = <UpdateBanner />;
    created = item.meta.created
  }
  if (type === "site") {
    formEl = <UpdateSite />;
  }

  const onSaveChanges = (type: string) => {
    if (type === "banner") {
      dispatch(updateBanner());
    }
    if (type === "site") {
      dispatch(updateSite(editing));
    }
    return true;
  }

  const toggleDrawer = (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if ( event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) { return; } 
      if (!open) dispatch(setSharedKey({key: "editing", value: null }))
      setState({ ...state, [anchor]: open });
  }

  return (
    <Drawer      
      open
      anchor={"right"}
      onClose={toggleDrawer("right", false)}>
      <Box sx={{ width: 550, display:"flex", flexDirection:"column" }}>
        <CardHeader 
          sx={{ml:1, mr:1}}
          avatar={<Icon icon={type} color="secondary" />}
          // title={drawerTitle}
          action={<IconButton
                    color="secondary"
                    onClick={toggleDrawer("right", false)}>
                    <Icon icon="close" />
                  </IconButton> }/>
        <CardContent>
          {formEl}
        </CardContent>

        { !pristine ? <CardActions>
                        <Box sx={{flexGrow:1}} />
                          <Button
                            fullWidth
                            sx={{mr:2, ml:2, mb:1}}
                            color="secondary"
                            disabled={ !valid }
                            variant={ valid ? "contained" : "text" }
                            onClick={ () => {
                              onSaveChanges(type);
                            }}>
                            <Icon icon="save" />
                            <span style={{ marginLeft: 10, marginRight: 6 }}>
                              Update
                            </span>
                          </Button>
                      </CardActions> : null }

                      <CardContent>
                        <Box sx={{ ml:1.5, mr:1.5 }}>
                          <Typography variant='body2' sx={{color:"rgba(0,0,0,0.15)"}}>
                              Created {moment(created).fromNow()}
                          </Typography>
                          <Typography variant="body2" sx={{color:"rgba(0,0,0,0.15)"}}>
                              {`pk: ${pk}`}
                          </Typography>
                          <Typography variant="body2" sx={{color:"rgba(0,0,0,0.15)"}}>
                              {`sk: ${sk}`}
                          </Typography>
                      </Box>
                    </CardContent>
                      
      </Box>
    </Drawer>
  )
}

/*
<pre>{JSON.stringify(editing, null, 2)}</pre>
*/