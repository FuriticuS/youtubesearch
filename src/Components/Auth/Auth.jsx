import React, { useState } from 'react';
import { Redirect } from "react-router-dom";
import { Form, Input, Button} from 'antd';
const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
};

const Auth = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const doLogin = async () => {
        let response = await fetch('/db.JSON');

        response.json().then((data)=>{
           const user = data.users.find(user => ((user.email === email) && (user.password === password)));
           if(user){
                localStorage.setItem('user', JSON.stringify(user));
                setEmail('');
                setPassword('');
            }

        }).catch(()=>{});
    }

    if(localStorage.getItem('user')){
        return <Redirect to="/main" />
    }

    return (
        <div>
            <Form
                {...layout}
                name="basic"
                initialValues={{
                    remember: true,
                }}
            >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                        },
                    ]}
                >
                    <Input onChange={(e)=>{ setEmail(e.target.value) }} />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input.Password onChange={(e)=>{ setPassword(e.target.value) }} />
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button onClick={doLogin} type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Auth;
