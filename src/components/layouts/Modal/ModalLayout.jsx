import React from 'react';
import './ModalLayout.css';

export default function ModalLayout (props) {
    // const closeEvent = props.closeEvent === undefined ? () => {} : props.closeEvent 
    const {closeEvent=()=>{}, children} = props
    return (
        <div className='modal-layout' onClick={closeEvent}>
            <div className='modal-layout-content' onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    )
}