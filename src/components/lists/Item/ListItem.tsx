// import React, {useEffect} from 'react';
import Button from '../../button/Button';
import Checkbox from '../../checkbox/Checkbox';
// import { EditIcon } from '../../icons/EditIcon';
import { EditIcon, DeleteIcon } from '../../icons';

import './ListItem.css';

interface ListItemsProps {
    selected: boolean,
    title: string,
    description: string,
    id: number,
    eventEdit: (id: number, title: string, descriprion: string,) => void,
    eventDelete: (id: number, title: string) => void,
    eventSelect: (id: number, state: any) => void,
}

export default function ListItem (props: ListItemsProps) {
    const {eventEdit=()=>{}, eventDelete=()=>{}, eventSelect=()=>{}} = props

    const handlerDelete = () => {
        eventDelete(props.id, props.title)
    }
    const handlerEdit = () => {
        eventEdit(props.id, props.title, props.description)
    }
    const handlerSelect = (state: any) => {
        eventSelect(props.id, state)
    }

    return (
        <div className='list-item'>
            <Checkbox event={handlerSelect} isActive={props.selected}></Checkbox>
            <div className='list-item-title'>{props.title || 'Some Title'}</div>
            <div className='list-item-buttons'>
                <Button icon={<EditIcon/>} event={handlerEdit}><div className="text-button">Edit</div></Button>
                <Button icon={<DeleteIcon/>} event={handlerDelete}><div className="text-button">Delete</div></Button>
            </div>
        </div>
    )
}