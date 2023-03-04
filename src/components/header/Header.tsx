import { useState } from 'react';
import { Link, Outlet } from "react-router-dom";
import reactLogo from '../../assets/react.svg'
import { Menu } from '../icons';
import './header.css';
// import Button from '../button/button';
import Button from '@/components/button/Button';
import WarnModal from '@/components/modals/warn/WarnModal.jsx';

export default function Header () {

    const [mobileMenuVisible, mobileMenuVisibleSet] = useState(false)
    const toggleVisibility = () => {
        mobileMenuVisibleSet(!mobileMenuVisible)
    }

    // Проверка бэка, возврает массив пользователей
    // const fetchData = async () => {
    //     console.log('Fetch Data')
    //     const url='http://localhost:3000/api/user'
    //     const headers = [
    //         ['Content-Type', 'text/html', 'extra'],
    //         ['Accept'],
    //       ]
    //     fetch(url).then(res => {
    //         console.log(res)
    //         if (res.ok) return res.json()
    //     }).then(data => console.log(data))
    // } 

    // Modals
    const [warnModalVisible, setWarnModalVisible] = useState(false)
    const [ModalConfig, setModalConfig] = useState<modalConfig>({
        type: 'warn',
        title: 'Title',
        description: 'Description',
        actions: [],
        fields: []
    })
    const toggleForm = () => {
        setWarnModalVisible(!warnModalVisible)
    }
    const toggleLoginForm = (title='', description='') => {
        setModalConfig({
            type: 'form',
            title: 'Login',
            description: `Email & Password`,
            actions: [
                {name: 'Login', action: ()=> {console.log('Action Login')}},
                {name: 'Forgot password?', action: ()=> {console.log('Forgot password')}}
            ],
            fields: [
                {name: 'title', label: 'Email', value: title},
                {name: 'description', label: 'Password', value: description}
            ]
        })
        toggleForm()
    }

    const modal = () => {
        return warnModalVisible ?
            <WarnModal 
                config = {ModalConfig}
                eventClose={toggleForm}
                >
            </WarnModal> : null
    }


    return (
        <div className='header_component'>
            {modal()}
            <div className='header_component-wrapper'>
                <div className='header_component-logo'>
                    <img src={reactLogo} className="logo react" alt="React logo" />
                </div>
                <div className='header_component-buttons'>
                    <Link to="/">
                        <Button>CRUD</Button>
                    </Link>
                    <Link to="/info">
                        <Button>Information</Button>
                    </Link>
                </div>
                <div className='header_component_user-control'>
                    <Button event={toggleLoginForm}>Login</Button>
                    <Button>Join us</Button>
                </div>
                <div className='mobile-menu'>
                    <Button icon={<Menu/>} event={toggleVisibility}>Menu</Button>
                </div>
            </div>
            
            <div className = {['mobile-menu-list', `${mobileMenuVisible ? 'visible' : ''}`].join(' ')}>
                <div className='mobile-menu_login-buttons'>
                    <Button>Login</Button>
                    <Button>Join us</Button>
                </div>
                <Link to="/">
                    <Button event={toggleVisibility}>CRUD</Button>
                </Link>
                <Link to="/info">
                    <Button event={toggleVisibility}>Information</Button>
                </Link>
            </div>
        </div>
    )
}