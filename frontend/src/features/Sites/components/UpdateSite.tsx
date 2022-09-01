import React from 'react'
import {
    useFeatureSelect,
    useFeatureDispatch,
} from "../../Shared/store/hooks"
import {
    // Icon,
    selectShared,
    edit,
} from "../../Shared"
import {
    EditableFieldColor,
    EditableFieldString,
    SelectAWSRegion,
    SelectLogo,
} from "../../Forms";
import { 
    Box,
    Typography,
} from '@mui/material'

export default function UpdateBanner() {
    const dispatch = useFeatureDispatch();
    const shared = useFeatureSelect(selectShared);
    const {editing} = shared
    if (!editing) return null
    const {item} = editing
    const {pk, title, logo, mainLogoColor, sk, version, region} = item;
    return (
        <Box>
                
            <Box sx={{ m: 1, mb:3 }}>
                <Typography variant="body2">
                    {`vs: ${version[0]}.${version[1]}.${version[2]}`}
                </Typography>
                <Typography variant="body2">
                    {`pk: ${pk}`}
                </Typography>
                <Typography variant="body2">
                    {`sk: ${sk}`}
                </Typography>
            </Box>

            <Box sx={{ m: 1, mb:3 }}>
                <EditableFieldString field={{
                    label: "Title",
                    id: `title`,
                    value: title,
                    onChange: (e: any) => {
                        e.preventDefault()
                        const {value} = e.target;
                        dispatch(edit({key: "title", value}))
                    }
                }}/>
            </Box>

            <Box sx={{ m: 1, mb:2}}>
                <SelectLogo field={{
                    label: "Logo",
                    id: `logo`,
                    value: logo,
                    onSelect: (value: string) => { 
                        dispatch(edit({key: "logo", value}));
                    }
                }}/>
            </Box>

            <Box sx={{ m: 1, mb:4 }}>
                <EditableFieldColor field={{
                    label: "Main Logo Color",
                    id: `mainLogoColor`,
                    value: mainLogoColor,
                    onSelectColor: (color: string) => {
                        dispatch(edit({key: "mainLogoColor", value: color}))
                    }
                }}/>          
            </Box>

            <Box sx={{ m: 1, mb:4 }}>
                <SelectAWSRegion field={{
                    label:"AWS Region", 
                    id: 'region', 
                    defaultValue: region, 
                    onSelect: (e: any) => {
                        const {value} = e.target;
                        dispatch(edit({key: "region", value}))
                    }
                }} />
            </Box>

        </Box>
    )
}
