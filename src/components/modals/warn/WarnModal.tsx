import { useState, useEffect, useRef, ReactNode } from 'react';
import ModalWrapper from '../modal-wrapper/ModalWrapper';
import Button from '../../button/Button';
import CustomInput from '@/components/input/CustomInput';
import './WarnModal.css'

interface WarnModalProps {
    eventClose: ()=> void,
    // acceptHandler: ()=> void,
    config: modalConfig
    children: ReactNode
}

export default function WarnModal (props: WarnModalProps) {
    const [text, setText] = useState({})

    const closeHandler = () => {
        props.eventClose()
    }

    const acceptHandler = (foo: (record: globalRecord)=>void) => {
        const record: globalRecord = {
            ...text,
            id: props.config.record?.id
        }
        debugger
        if (foo) foo(record)
        // if (props.config.actions) props.config.actions[props.config.actionName](record)
        // console.log(props.config.title)
        props.eventClose()
    }

    // Object strings
    const textChanger = (title:string, val: string | number) => {
        const prepObject = {
            ...text,
            [title]: val
        }
        setText(prepObject)
        console.log(text)
    }

    const textInput = useRef<HTMLInputElement>(null)
    const textInputs = useRef<HTMLInputElement>(null)
    useEffect(() => {
        if (textInput.current) textInput.current.focus()
        initFunc()
        // return () => {
        //     initFunc()
        // }
    }, [])

    // Init default fields values
    const initFunc = () => {
        let initObj = {}
        if (props.config.fields) (props.config.fields || []).map(field => {
            initObj = {...initObj, [field.name]: field.value}
            setText(initObj)
        })
    }

    // Actions to buttons
    const buttons = () => {
        return (
            (props.config.actions || []).map(action => {
                return (
                    <Button event={() => acceptHandler(action.action)}>{action.name}</Button>
                )
           })
        )
    }


    if (props.config.type === 'warn') {
        return (
            <ModalWrapper
                eventClose={closeHandler}
                header={props.config.title}
                content={props.config.description}
                footer={buttons()}
            ></ModalWrapper>
        )  
    } else {
        return (<ModalWrapper
            eventClose={closeHandler}
            header={props.config.title }
            content={
                <div className='edit-form'>
                    <div className='edit-form_labels'>
                        {(props.config.fields || []).map(field => {
                                return (
                                    <div className='edit-form_item' key={field.name}>{field.label}:</div>
                                )
                            })
                        }
                    </div>
                    <div className='edit-form_inputs'>
                        {(props.config.fields || []).map((field, idx) => {
                            return (
                                <CustomInput reference={idx === 0 ? textInput : textInputs} key={field.name} name={field.name} value={field.value} onChange={(name, val)=> textChanger(name, val)}/>
                            )
                        })}
                    </div>
                </div>
            }
            footer={buttons()}
        ></ModalWrapper>)
    }
    // if (props.config.type === 'form')
    
}