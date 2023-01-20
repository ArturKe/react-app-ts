import React, { useState } from 'react';
import { Link, Outlet } from "react-router-dom";
import reactLogo from '../../assets/react.svg'
// import Button from '../button/Button';
import { Menu } from '../icons';
import './header.css';
import Button from '../button/button';


export default function Header () {

    const [mobileMenuVisible, mobileMenuVisibleSet] = useState(false)
    const toggleVisibility = () => {
        mobileMenuVisibleSet(!mobileMenuVisible)
    }

    return (
        <div className='header_component'>
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
                    <Button>Login</Button>
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
                    <Button event={mobileMenuVisible ? toggleVisibility : null}>CRUD</Button>
                </Link>
                <Link to="/info">
                    <Button event={mobileMenuVisible ? toggleVisibility : null}>Information</Button>
                </Link>
            </div>
        </div>
    )
}