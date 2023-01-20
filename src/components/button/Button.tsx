import React, { useState } from 'react';
import { useEffect } from 'react';
import './Button.css';

export default function Button (props: any) {
    const {event=()=>{}} = props

    return (    
        <button onClick={event} className="customButton">{props.icon}{props.children || props.name}</button>
    )
}