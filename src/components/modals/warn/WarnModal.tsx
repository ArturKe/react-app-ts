import ModalWrapper from '../modal-wrapper/ModalWrapper';
import Button from '../../button/Button';
// import { ReactNode } from 'react';
import { useState, useEffect, useRef } from 'react';

interface WarnModalProps {
    eventClose: ()=> void,
    acceptHandler: ()=> void,
    config: modalConfig
}

export default function WarnModal (props: WarnModalProps) {
    const closeHandler = () => {
                props.eventClose()
                console.log('Close')
            }

    const acceptHandler = () => {
        // props.acceptHandler()
        console.log("Accept")
        if (props.config.actions) console.log(props.config.actions[props.config.actionName](0, title, desc))
        props.eventClose()
    }

    const [title, setTitle] = useState(props.config.title)
    const [desc, setDesc] = useState(props.config.description)

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
    } else if (props.config.type === 'form') {
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

    
}