import React, {useState} from 'react';
import {block} from 'bem-cn';
import {Link, NavLink, Redirect} from "react-router-dom";
import Logo from "../../Img/logo";

import './header.scss';

const cn = block('header');

const Header = () => {

    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('user')));

    if (!localStorage.getItem('user')) {
        return <Redirect to="sign-in"/>
    }

    const logout = () => {
        localStorage.removeItem('user');
        setCurrentUser('');
    }

    return (
        <div className={cn()}>

            <div className="container">

                <div className={cn("menu")}>
                    <Logo width="48" height="48"/>

                    <ul className='links'>
                        <li>
                            <NavLink to='/main'>
                                Поиск
                            </NavLink>

                        </li>
                        <li>
                            <NavLink to='/select'>
                                Избранное
                            </NavLink>
                        </li>
                    </ul>
                </div>

                <div className={cn("out")}>
                    <Link to='#' onClick={logout}>Выйти</Link>
                </div>

            </div>
        </div>
    );
};

export default Header;
