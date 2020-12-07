import React, {useState} from 'react';
import {Redirect} from "react-router-dom";
import {block} from 'bem-cn';
import {Form, Input, Button} from 'antd';
import "antd/dist/antd.css";
import Logo from "../../Img/logo";

import './auth.scss';

const cn = block('auth');

const Auth = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const doLogin = async () => {
        let response = await fetch('/db.JSON');

        response.json().then((data) => {
            const user = data.users.find(user => (user.email === email && user.password === password));

            if (user && user.idToken !== '') {
                localStorage.setItem('user', JSON.stringify(user));
                setEmail('');
                setPassword('');
            }

            if (!user) {
                alert("Логин или пароль указаны неверно!")
            }

            if (user.idToken === '') {
                alert("У юзера отсутствует TOKEN")
            }

        }).catch(() => {
        });
    }

    if (localStorage.getItem('user')) {
        return <Redirect to="/main"/>
    }


    return (
        <div className={cn()}>

            <div className={cn("top")}>
                <Logo width="88" height="88"/>

                <h3>Вход</h3>
            </div>

            <div className={cn("bottom")}>
                <Form
                    name="basic"
                    layout="vertical"
                    initialValues={{
                        remember: true,
                    }}
                >
                    <Form.Item
                        label="Логин"
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: 'Введите свой логин',
                            },
                        ]}
                    >
                        <Input onChange={(e) => {
                            setEmail(e.target.value)
                        }}/>
                    </Form.Item>

                    <Form.Item
                        label="Пароль"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Введите свой пароль',
                            },
                        ]}
                    >
                        <Input.Password onChange={(e) => {
                            setPassword(e.target.value)
                        }}/>
                    </Form.Item>

                    <Form.Item>
                        <Button onClick={doLogin} type="primary" htmlType="submit">
                            Войти
                        </Button>
                    </Form.Item>
                </Form>
            </div>

        </div>
    );
};

export default Auth;
