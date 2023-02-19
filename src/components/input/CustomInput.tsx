import React, { useState, useEffect, useRef, ReactNode } from 'react'
import './CustomInput.css'
interface customInput {
    name: string
    value?: number | string,
    onChange?: (name: string, val:string | number)=>void,
    reference?: React.RefObject<HTMLInputElement>
}

export default function CustomInput (props: customInput) {
    const [value, setValue] = useState(props.value || '')
    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target?.value)
        if(props.onChange) console.log(props.onChange(props.name, e.target?.value))
    }

    return (
        <input ref={props.reference} type="text" defaultValue={value} onChange={(e) => changeHandler(e)}/>
    )
}