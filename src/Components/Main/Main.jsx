import React from 'react';
import Header from "../Header/Header";
import SearchAnt from "../Search/Search";
import {block} from 'bem-cn';

import './main.scss'

const cn = block('main');

const Main = () => {

    return (
        <div className={cn()}>

            <Header />

            <SearchAnt />

        </div>
    );
};

export default Main;
