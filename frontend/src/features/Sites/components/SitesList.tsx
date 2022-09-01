import React from 'react'
import {
    useFeatureDispatch,
} from "../../Shared/store/hooks"
import {
    useTheme,
    Box,
    Checkbox,
    Avatar,
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    Typography,
} from "@mui/material"
import {
    useFeatureSelect,
} from "../../Shared/store/hooks"
import {
    selectSites,
} from "../"
import {
    select,
} from "../../Shared"

export default function SitesList() {
    const dispatch = useFeatureDispatch()
    const sites = useFeatureSelect(selectSites)
    const theme = useTheme()
    const avatarBgColor = theme.palette.background.default
    const avatarTxtColor = theme.palette.primary.main
    const { 
        siteList,
    } = sites
    if ( typeof siteList === "string" ) return null
    const showCheckboxes = false;

    return (
        <List dense>
            { siteList.map(( item: any, i: number ) => {
                const { title, mainLogoColor, logo } = item
                return <React.Fragment key={ `site_${i}` }>
                            <Box sx={{display:"flex"}}>
                                <ListItem 
                                    button
                                    onClick={( e: React.MouseEvent ) => {
                                        e.preventDefault()
                                        dispatch(select(item, "site"))
                                    }}>
                                    <ListItemAvatar>
                                        <Avatar src={logo} sx={{ background: mainLogoColor }} />
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={ title }
                                    />
                                </ListItem>
                                { showCheckboxes ? <Checkbox sx={{mr:2}}/> : null }
                            </Box>
                        </React.Fragment>
            })}
        </List>
    )
}

/*
<Avatar sx={{ background: mainLogoColor }} >
    <Typography sx={{ color: avatarTxtColor}}>
        {title.toUpperCase().substring(0,1) }{ title.toLowerCase().substring(1,2)}
    </Typography>
</Avatar>
*/