import ModalWrapper from '../modal-wrapper/ModalWrapper';
import Button from '../../button/Button';
// import { ReactNode } from 'react';
import { useState, useEffect, useRef, ReactNode } from 'react';
import './WarnModal.css'

interface WarnModalProps {
    eventClose: ()=> void,
    // acceptHandler: ()=> void,
    config: modalConfig
    children: ReactNode
}

export default function WarnModal (props: WarnModalProps) {
    const closeHandler = () => {
                props.eventClose()
                console.log('Close')
            }

    const acceptHandler = () => {
        console.log("Accept")
        const record = {
            id: props.config.record?.id,
            title,
            description: desc
        }
        if (props.config.actions) console.log(props.config.actions[props.config.actionName](record))
        props.eventClose()
    }

    const [title, setTitle] = useState(props.config.record?.title)
    const [desc, setDesc] = useState(props.config.record?.description)

    const textInput = useRef<HTMLInputElement>(null)
    useEffect(() => {
        if (textInput.current) textInput.current.focus()
    }, [])


    if (props.config.type === 'warn') {
        return (
            <ModalWrapper
                eventClose={closeHandler}
                header={props.config.title}
                content={props.config.description}
                footer={<Button event={acceptHandler}>Ok</Button>}
            ></ModalWrapper>
        )  
    } else {
        return (<ModalWrapper
            eventClose={closeHandler}
            header={props.config.titleForm }
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
                            <input type="text" defaultValue={desc} onChange={(e) => setDesc(e.target.value)}/>
                        </div>
                    </div>
                </div>
            }
            footer={<Button event={acceptHandler}>Ok</Button>}
        ></ModalWrapper>)
    }
    // if (props.config.type === 'form')
    
}