import React from 'react'
import { Link } from 'react-router-dom'
import {
    useFeatureSelect,
    useFeatureDispatch,
} from "../Shared/store/hooks"
import { 
    SitesList,
    selectSites,
    read,
} from "./"
import {
    Box,
    Button,
    IconButton,
    Card,
    CardHeader,
    Grid,
    LinearProgress,
    Typography,
} from "@mui/material"
import {
    InlineAlert,
    Icon,
    addItem,
} from "../Shared"
import {
    SearchInput,
} from "../Forms"

export default function Sites() {

    const dispatch = useFeatureDispatch()
    const sites = useFeatureSelect(selectSites)
    const { async, error, siteList } = sites
    const { creating, reading, updating, deleting, message } = async
    let subheader = message
    if (subheader === "") subheader = `${siteList.length} site${siteList.length !== 1 ? "s" : "" }`
    let showSearch = false;
    if (siteList.length > 2){
        showSearch = true;
    }

    React.useEffect(() => {
        const { initted } = async
        if (!initted){
            dispatch(read())
        }
    }, [async, dispatch])

    const onAddClick = (e: React.MouseEvent) => {
        e.preventDefault()
        dispatch(addItem({
            type: "site",
            title: "New Site",
            icon: "sites", 
        }))
    }
    
    return (
        <Box>
            <Card sx={{ m:1 }}>
                { creating || reading || updating || deleting ? <LinearProgress color="secondary"/> 
                : <Box sx={{ height: 4 }} /> }
                <CardHeader 
                    sx={{ mt:1 }}
                    title={<Typography variant="body1">Sites</Typography>}
                    subheader={<Box sx={{display: "flex"}}>
                                    <Typography variant="body2">{ subheader }</Typography>
                                </Box>}
                    avatar={<Link to="/sites">
                                <IconButton color="secondary">
                                    <Icon icon="sites"/>
                                </IconButton>
                            </Link>}
                    action={<React.Fragment>
                                <Box sx={{ display: "flex", mt:0.3 }}>
                                    {showSearch? <SearchInput /> : null}
                                    <Button 
                                        sx={{ mr:1, ml:2 }} 
                                        color="secondary"
                                        variant="contained"
                                        onClick={onAddClick}>
                                            <span style={{ marginLeft: 6, marginRight: 6 }}>
                                                New
                                            </span>
                                            <Icon icon="add" />
                                    </Button>
                                </Box>
                            </React.Fragment>}
                />

                { error ? <InlineAlert slice="sites" /> : null }
                <Grid container>
                    <Grid item xs={ 12 }>
                        <SitesList />
                    </Grid>
                </Grid>
            </Card>
        </Box>
    )
}

/*
<pre>siteList {JSON.stringify(siteList, null, 2)}</pre>
*/
