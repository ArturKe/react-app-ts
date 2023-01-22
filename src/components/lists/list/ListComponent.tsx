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

    // Actions
    const deleteAction = (id: number) => {
        let newItem = items.filter((record) => record.id !== id )
        setItems(newItem)
    }
    const deleteAllAction = () => {
        let newItem = items.filter((record) => !record.selected)
        setItems(newItem)
    }
    

    // CRUD Events ---/

    const createRecordEvent = () => {
        setModalConfig({
            type: 'form',
            titleForm: 'Создание записи',
            description: '',
            actionName: 'create',
            actions: {create: (id, title, desc) => createRecordAccept(id, title, desc), delete: ()=>{}}
            // actions: {delete: deleteAction(id)}
            
        })
        toggleVisWarnModal()
    }

    const editRecordEvent = (id: Record['id'], title: Record['title'], description: Record['description']) => {
        setModalConfig({
            type: 'form',
            titleForm: 'Редактирование записи',
            title,
            description,
            actionName: 'edit',
            actions: {edit: (id, title, description) => editRecordAccept(id, title, description), delete: ()=>{}}
            // actions: {delete: deleteAction(id)}
            
        })
        toggleVisWarnModal()
        // toggleVisEditForm()
        // setWarnModalType('edit')
        // setWarnModalId(id)
        // setWarnModalTitle(title)
        // setWarnModalDesc(description)  
        // console.log('Edit record with id: ' + id + title + description)
    }

    const deleteAllRecordsEvent = () => {
        if (amountSelectedRecords > 0) {
            const action = {...ModalConfig.actions, deleteAll: () => deleteAllAction()}
            setModalConfig({
                type: 'warn',
                title: 'Групповое удаление',
                description: `Удалить ${amountSelectedRecords} записей?`,
                actionName: 'deleteAll',
                actions: {deleteAll: () => deleteAllAction()}
            })
            toggleVisWarnModal()
            // setWarnModalType('delete-all')
            // setWarnModalTitle(amountSelectedRecords > 1 ? `Delete ${amountSelectedRecords} records?` : `Delete this record?` )
        }
    }

    const deleteRecordEvent = (id: Record['id'], title?: Record['title']) => {
        setModalConfig({
            type: 'warn',
            title: 'Удаление записи',
            description: `Удалить запись: "${title}" ?`,
            actionName: 'delete',
            actions: {delete: () => deleteAction(id), create: ()=>{}, deleteAll: ()=>{}, edit: ()=>{}}
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

    const createRecordAccept = (id: Record['id'], title: Record['title'], description: string ='') => {
        // toggleVisEditForm()
        console.log(title + description)
        if (title.length > 0 || description.length > 0) {
            let newItem = [...items] 
            
            // newItem.push({id: +new Date, title: (new Date).toString(), description: 'Hello world!!!', selected: false},)
            newItem.push({id: +new Date, title, description, selected: false, created: (new Date).toString()},)
            setItems(newItem)
        }
    }

    const editRecordAccept = (id: Record['id'], title: Record['title'], description: Record['description']) => {
        console.log('Accept record with: ' + id + title + description)

        let newItems = [...items]

        let editItem = newItems.find((item) => item.id === id)
        if ( editItem ) {
            editItem.title = title
            editItem.description = description
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


    // const acceptHandler = (type: string) => {
    //     let functionHandler: (id: Record['id'], title: Record['title'], descriprion: Record['description'])=>void = () => {}
    //     // let functionHandler
    //     switch (type) {
    //         case 'delete':
    //             functionHandler = deleteRecordAccept
    //             // setSetHandler(deleteRecordAccept)
    //             break
    //         case 'delete-all':
    //             functionHandler = deleteAllRecordsAccept
    //             // setSetHandler(deleteAllRecordsAccept)
    //             break
    //         case 'edit':
    //             functionHandler = editRecordAccept
    //             // setSetHandler(editRecordAccept)
    //             break
    //         case 'create':
    //             functionHandler = createRecordAccept
    //             // setSetHandler(createRecordAccept)
    //             break
    //     }
    //     return functionHandler
    // }

    useEffect(() => {
        checkSelectedRecords()
    }, [items])


    // Modals
    const [warnModalVisible, setWarnModalVisible] = useState(false)
    const [EditFormVisible, setEditFormVisible] = useState(false)
    // const [warnModalTitle, setWarnModalTitle] = useState('')
    // const [warnModalDesc, setWarnModalDesc] = useState('')
    const [warnModalId, setWarnModalId] = useState(0)
    const [warnModalType, setWarnModalType] = useState('')
    const [amountSelectedRecords, setAmountSelectedRecords] = useState(0)
    const [amountRecords, setAmountRecords] = useState(0)


    const [ModalConfig, setModalConfig] = useState<modalConfig>({
        type: 'warn',
        actions: {
            delete: deleteAction,
            create: createRecordAccept,
            deleteAll: deleteAllAction,
            edit: editRecordAccept
        }
    })


    const modalWarn = () => {
        return warnModalVisible ?
            <WarnModal 
                config = {ModalConfig}
                eventClose={toggleVisWarnModal}
                // acceptHandler={acceptHandler(warnModalType)}
                >
            </WarnModal> : null
    }
    const editForm = () => {
        return EditFormVisible ?
            <EditForm
                type={warnModalType}
                id={warnModalId}
                title={'hello'} 
                description={'Desc'} 
                event={toggleVisEditForm}
                acceptEdit={()=>{}}
                >
            </EditForm> : null
    }
    const toggleVisWarnModal = () => {setWarnModalVisible(!warnModalVisible)}
    const toggleVisEditForm = () => {setEditFormVisible(!EditFormVisible)}

    return (
        <div className='list'>
            {modalWarn()}
            {editForm()}
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