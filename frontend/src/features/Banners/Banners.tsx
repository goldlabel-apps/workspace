import React from 'react'
import { Link } from 'react-router-dom'
import {
    useFeatureSelect,
    useFeatureDispatch,
} from "../Shared/store/hooks"
import {
    BannersList,
    selectBanners,
    read,
} from "./"
import {
    InlineAlert,
    Icon,
    addItem,
} from "../Shared"
import {
    SearchInput,
} from "../Forms"
import {
    Box,
    Button,
    Card,
    Grid,
    CardHeader,
    LinearProgress,
    IconButton,
    Typography,
} from "@mui/material"


export default function Banners() {

    
    const dispatch = useFeatureDispatch()
    const banners = useFeatureSelect(selectBanners)
    const { error, async, bannerList } = banners
    const { creating, reading, updating, deleting, message } = async
    let subheader = message
    if (subheader === "") subheader = `${bannerList.length} banner${bannerList.length !== 1 ? "s" : "" }`
    let showSearch = false;
    if (bannerList.length > 2){
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
            type: "banner",
            title: "New Banner",
            icon: "banners", 
        }))
    }
    
    return (
        <Box>
            <Card sx={{ m:1 }}>
                { creating || reading || updating || deleting ? <LinearProgress color="secondary"/> 
                : <Box sx={{ height: 4 }} /> }
                <CardHeader 
                    sx={{ mt: 1 }}
                    title={<Typography variant="body1">Banners</Typography>}
                    subheader={<Box sx={{display: "flex"}}>
                                    <Typography variant="body2">{ subheader }</Typography>
                                </Box>}
                    avatar={<Link to="/banners">
                                <IconButton color="secondary">
                                    <Icon icon="banners"/>
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
                            </React.Fragment>}/>

                { error ? <InlineAlert slice="banners" /> : null }
                <Grid container>
                    <Grid item xs={ 12 }>
                        <BannersList />
                    </Grid>
                </Grid>
            </Card>
        </Box>
    )
}

/*
<pre>bannersList {JSON.stringify(bannerList, null, 2)}</pre>
*/