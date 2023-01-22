import { ReactNode } from 'react';
// import ModalLayout from '../../../layouts/Modal/ModalLayout'
import ModalLayout from '@/components/layouts/Modal/ModalLayout';
import Button from '../../button/Button';
import './ModalWrapper.css';

interface ModalWrapperProps {
    header?: ReactNode,
    content?: ReactNode,
    footer?: ReactNode,
    eventClose: ()=>void

}

export default function ModalWrapper (props: ModalWrapperProps) {
    const closeHandler = () => {
        props.eventClose()
        console.log('Close')
    }

    return (
        <ModalLayout
            closeEvent={closeHandler}
        >
            <div className='warn-modal'>
                <div className='warn-modal-header'>
                    <div className='warn-modal-header_title'>{props.header}</div>
                    <div>
                        <Button event={closeHandler}>Close</Button>
                    </div>
                </div>
                <div className='warn-modal-content'>{props.content}</div>
                <div className='warn-modal-buttons'>{props.footer}</div>
            </div>
        </ModalLayout>
    )
}