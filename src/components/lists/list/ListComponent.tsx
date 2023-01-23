import React, { useEffect, useState } from 'react';
import Button from '@/components/button/Button.jsx';
import Checkbox from '@/components/checkbox/Checkbox.jsx';
import EditForm from '@/components/forms/edit/EditForm.jsx';
import WarnModal from '@/components/modals/warn/WarnModal.jsx';
import ListItem from '@/components/lists/Item/ListItem.jsx';
import '@/components/lists/list/listComponent.css';
import { PlusCircle, List, DeleteIcon } from '@/components/icons';

interface Record {
    id: number,
    title: string,
    description: string,
    selected: boolean,
    created: string
}

export default function ListComponent () {
    const [checkBoxState, setCheckBoxState] = useState(false)
    const [items, setItems] = useState([
        {id: 0, title: 'Firsdt Article', description: 'Hello world!!!', selected: false, created: ''},
        {id: 1, title: 'Second Article', description: 'Hello world!!!', selected: false, created: ''},
        {id: 2, title: 'Third Article', description: 'Hello world!!!', selected: true, created: ''},
        {id: 3, title: 'Article about Bears', description: 'Hello world!!!', selected: false, created: ''},
        {id: 4, title: 'Article about Dinosaurs', description: 'Hello world!!!', selected: false, created: ''},
    ])
    

    // CRUD Events ---/
    const createRecordEvent = () => {
        setModalConfig({
            type: 'form',
            titleForm: 'Создание записи',
            description: '',
            actionName: 'create',
            actions: {create: (record) => createRecordAction(record), delete: ()=>{}, default: ()=>{}, deleteAll: () =>{}, edit: ()=>{}}            
        })
        toggleVisWarnModal()
    }

    const editRecordEvent = (id: Record['id'], title: Record['title'], description: Record['description']) => {
        const record: globalRecord = {
            id,
            title,
            description
        }
        setModalConfig({
            type: 'form',
            titleForm: 'Редактирование записи',
            title,
            description,
            record,
            actionName: 'edit',
            actions: {edit: (record) => editRecordAction(record), delete: ()=>{},create: ()=>{}, default: ()=>{}, deleteAll: () =>{}}
        })
        toggleVisWarnModal()
    }

    const deleteAllRecordsEvent = () => {
        if (amountSelectedRecords > 0) {
            const action = {...ModalConfig.actions, deleteAll: () => deleteAllAction()}
            setModalConfig({
                type: 'warn',
                title: 'Групповое удаление',
                description: `Удалить ${amountSelectedRecords} записей?`,
                actionName: 'deleteAll',
                actions: {deleteAll: () => deleteAllAction(), delete: () =>{}, create: ()=>{}, edit: ()=>{}, default: ()=>{}}
            })
            toggleVisWarnModal()

            // setWarnModalTitle(amountSelectedRecords > 1 ? `Delete ${amountSelectedRecords} records?` : `Delete this record?` )
        }
    }

    const deleteRecordEvent = (id: Record['id'], title?: Record['title']) => {
        setModalConfig({
            type: 'warn',
            title: 'Удаление записи',
            description: `Удалить запись: "${title}" ?`,
            actionName: 'delete',
            actions: {delete: () => deleteAction(id), create: ()=>{}, deleteAll: ()=>{}, edit: ()=>{}, default: ()=>{}}
            // actions: {delete: deleteAction(id)}
            
        })
        toggleVisWarnModal()
    }

    // SELECT Events ---/
    const selectRecordEvent = (id: number, state: boolean = true) =>{
        let newItem = items.map((record) => {
            return record.id === id ? { ...record, selected: state} : record
        })
        setItems(newItem)
    }
    const selectAllEvent = (state: boolean = true) => {
        // setCheckBoxState(state)
        let newItem = items.map((item) => ({ ...item, selected: state}))
        setItems(newItem)
    }


    // Actions ---/
    const deleteAction = (id: number) => {
        let newItem = items.filter((record) => record.id !== id )
        setItems(newItem)
    }
    const deleteAllAction = () => {
        let newItem = items.filter((record) => !record.selected)
        setItems(newItem)
    }
    const createRecordAction = (record: globalRecord) => {
        // console.log(record.title + record.description)
        if (record.title.length > 0 || record.description.length > 0) {
            let newItem = [...items] 
            newItem.push({id: +new Date, title: record.title, description: record.description, selected: false, created: (new Date).toString()},)
            setItems(newItem)
        }
    }
    const editRecordAction = (record: globalRecord) => {
        console.log('Accept record with: ' + record.id + record.title + record.description)
        let newItems = [...items]

        let editItem = newItems.find((item) => item.id === record.id)
        if ( editItem ) {
            editItem.title = record.title
            editItem.description = record.description
        }

        console.log(editItem)
        // console.log(newItems)
        setItems(newItems)
        console.log(items)
    }


    const checkSelectedRecords = () => {
        const amountRecords = (items.filter((record) => record.selected ) || []).length
        setAmountSelectedRecords(amountRecords)
        setAmountRecords(items.length)
    }

    useEffect(() => {
        checkSelectedRecords()
    }, [items])


    // Modals
    const [warnModalVisible, setWarnModalVisible] = useState(false)
    const [amountSelectedRecords, setAmountSelectedRecords] = useState(0)
    const [amountRecords, setAmountRecords] = useState(0)

    const [ModalConfig, setModalConfig] = useState<modalConfig>({
        type: 'warn',
        actionName: 'default',
        actions: {
            delete: deleteAction,
            create: createRecordAction,
            deleteAll: deleteAllAction,
            edit: editRecordAction,
            default: ()=>{}
        }
    })

    const modalWarn = () => {
        return warnModalVisible ?
            <WarnModal 
                config = {ModalConfig}
                eventClose={toggleVisWarnModal}
                >
            </WarnModal> : null
    }

    const toggleVisWarnModal = () => {setWarnModalVisible(!warnModalVisible)}

    return (
        <div className='list'>
            {modalWarn()}
            <div className='list-header'>CRUD Form</div>
            <div className='list-controll'>
                <Checkbox isActive={checkBoxState} event={selectAllEvent}></Checkbox>
                <div>Selected rows: {amountSelectedRecords}</div>
                <div className='list-controll-buttons'>
                    <Button icon={<PlusCircle/>} event={createRecordEvent}><div className="text-button">Create</div></Button>
                    <Button icon={<DeleteIcon/>} event={deleteAllRecordsEvent}><div className="list-icon-button">{<List/>}</div><div className="text-button">Delete All Selected</div></Button>
                </div>
            </div>
            <div className='list-content'>
                <div className='list-content-item'>Rows: {amountRecords}</div>
                {items.map(item => {
                    return <ListItem 
                        eventDelete = {deleteRecordEvent}
                        eventEdit = {editRecordEvent}
                        eventSelect = {selectRecordEvent}
                        id={item.id}
                        selected={item.selected}
                        title={item.title}
                        description = {item.description}
                        key={item.id}
                    ></ListItem>
                })}
            </div>

        </div>
    )
}