import React from 'react';
import Header from "../Header/Header";
import {block} from 'bem-cn';

import './select.scss';

const cn = block('select');

const Select = () => {
    return (
        <div className={cn()}>
            <Header/>
            <div className="container">
                <h1>Избранное</h1>
            </div>
        </div>
    );
};

export default Select;
