import React from 'react'
import {
    useFeatureSelect,
} from "./store/hooks"
import {
    selectShared,
} from "./store/slice"
import {
    Notifyer,
    NewItem,
    EditDrawer,
} from "./"

export default function Shared() {
    
    const shared = useFeatureSelect(selectShared);
    const {newItem, editing, notifying} = shared

    return (
            <React.Fragment> 
                { newItem ? <NewItem /> : null }
                { editing ? <EditDrawer /> : null }
                { notifying ? <Notifyer /> : null }
            </React.Fragment>
    )
}
