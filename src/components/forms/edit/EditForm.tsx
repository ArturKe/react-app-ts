import ModalWrapper from '../../modals/modal-wrapper/ModalWrapper';
import Button from '../../button/Button';
import './EditForm.css'
import { useState, useEffect, useRef } from 'react';
import { ReactNode } from 'react';

interface EditFormProps {
    title?: globalRecord['title'],
    description: globalRecord['description']
    id: globalRecord['id'],
    type: string,
    event: ()=>void,
    acceptEdit: (id: EditFormProps['id'], title: EditFormProps['title'], desc: EditFormProps['description'])=>void,
    children: ReactNode
}

export default function EditForm (props: EditFormProps) {
    const {event=()=>{}, acceptEdit=()=>{}} = props

    const acceptEditHandler = () => {
        acceptEdit(props.id, title, desc)
    }

    const [title, setTitle] = useState(props.title)
    const [desc, setDesc] = useState(props.description)

    const textInput = useRef<HTMLInputElement>(null)
    useEffect(() => {
        if (textInput.current) textInput.current.focus()
    }, [])

    return (
        <ModalWrapper
            eventClose={event}
            header={props.type ==='edit' ? 'Edit Record: ' + props.title : 'Create record' }
            content={
                <div className='edit-form'>
                    <div className='edit-form_labels'>
                        <div className='edit-form_item'>Title:</div>
                        <div className='edit-form_item'>Description:</div>
                    </div>
                    <div className='edit-form_inputs'>
                        <div className='edit-form_item'>
                            <input type="text" ref={textInput} defaultValue={title} onChange={(e) => setTitle(e.target.value)} />
                        </div>
                        <div className='edit-form_item'>
                            <input type="text" defaultValue={props.description} onChange={(e) => setDesc(e.target.value)}/>
                        </div>
                    </div>
                </div>
            }
            footer={<Button event={acceptEditHandler}>Ok</Button>}
        ></ModalWrapper>
    )
}