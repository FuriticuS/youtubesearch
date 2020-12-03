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
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const onFinish = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const doLogin = async () => {
        let response = await fetch('/db.JSON');

        response.json().then((data)=>{
           const user = data.users.find(user => ((user.name === username) && (user.password === password)));
           if(user){
                localStorage.setItem('user', JSON.stringify(user));
                setUsername('');
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
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
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
                    <Input onChange={(e)=>{ setUsername(e.target.value) }} />
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
