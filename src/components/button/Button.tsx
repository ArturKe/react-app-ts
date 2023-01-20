import React, { ReactNode, useState } from 'react';
import { useEffect } from 'react';
import './Button.css';

interface Button {
    event?: ()=>void,
    icon?: JSX.Element
    children?: ReactNode
    name?: string
}

export default function Button (props: Button) {
    const {event=()=>{}} = props

    return (    
        <button onClick={event} className="customButton">{props.icon}{props.children || props.name}</button>
    )
}