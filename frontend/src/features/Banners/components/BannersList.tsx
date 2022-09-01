import React from 'react'
import {
    Box,
    Checkbox,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Avatar,
    IconButton,
} from "@mui/material"
import {
    useFeatureSelect,
    useFeatureDispatch,
} from "../../Shared/store/hooks"
import { 
    selectBanners,
} from "../"
import {
    select,
    Icon,
    filterBanners,
} from "../../Shared"

export default function BannerList() {
    const avatarBgColor = "#fff";
    const dispatch = useFeatureDispatch()
    const banners = useFeatureSelect(selectBanners)
    const { 
        bannerList,
        filter,
    } = banners
    let filteredDocs = []
    if ( !bannerList ) return null 
    if (bannerList.length) filteredDocs = filterBanners(bannerList, filter)
    // const ordered = [...filteredDocs].sort((a, b) => a["meta"]["updated"] - b["meta"]["updated"] ).reverse()
    const ordered = filteredDocs;
    const showCheckboxes = false;
    const showDelete = true;
    return (
            <List dense>
                { ordered.map(( item: any, i: number ) => {
                    let metaData = {
                        displayName: "",
                        logo: "https://iptc.org/wp-content/uploads/2018/05/avatar-anonymous-300x300.png",
                    }
                    const {meta, assets} = item
                    if (meta){
                        const {displayName} = meta;
                        if (displayName) metaData.displayName = displayName;
                    }
                    if (assets){
                        const {logo} = assets;
                        if (logo) metaData.logo = logo;
                    }
                    return <React.Fragment key={ `banner_${i}` }>
                                <Box sx={{display:"flex"}}>
                                    <ListItem 
                                        button
                                        onClick={( e: React.MouseEvent ) => {
                                            e.preventDefault()
                                            dispatch(select(item, "banner"))
                                        }}>
                                        <ListItemAvatar>
                                            <Avatar src={metaData.logo} sx={{ background: avatarBgColor, height: 24, width: 24 }} />
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={ metaData.displayName }
                                        />
                                    </ListItem>
                                    { showCheckboxes ? <Checkbox sx={{mr:2}}/> : null }
                                    { showDelete ? <IconButton 
                                                        color="primary"
                                                        sx={{mr:2}}>
                                                        <Icon icon="delete" />
                                                    </IconButton> : null }
                                </Box>
                            </React.Fragment>
                })}
            </List>
    )
}

/*
<Typography sx={{ color: avatarTxtColor}}>
    { metaData.displayName.substring(0,1) }{ metaData.displayName.substring(1,2).toLowerCase() }
</Typography>
*/
