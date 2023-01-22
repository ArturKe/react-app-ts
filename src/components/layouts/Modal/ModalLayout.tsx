import { ReactNode } from 'react';
import './ModalLayout.css';

interface ModalLayoutProps {
    closeEvent: ()=>void,
    children: ReactNode
}

export default function ModalLayout (props: ModalLayoutProps) {
    const {closeEvent=()=>{}, children} = props
    return (
        <div className='modal-layout' onClick={closeEvent}>
            <div className='modal-layout-content' onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    )
}