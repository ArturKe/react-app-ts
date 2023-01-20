import React from 'react';
import './PageLayout.css';

export default function PageLayout (props) {
    return (
        <div className='page'>
            <div className='page-header'>{props.header}</div>
            <div className='page-content'>
                <div className='page-content-left'>{props.blockLeft}</div>
                <div className='page-content-center'>{props.blocCenter}</div>
                <div className='page-content-right'>{props.blocRight}</div>
            </div>
            <div className='page-footer'>{props.footer}</div>
        </div>
    )
}