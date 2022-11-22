import { LockOutlined, UserOutlined} from '@ant-design/icons';
import { Button, Form, Input, notification } from 'antd';
import { useState } from 'react';
import register from '../../actions/user/register';
import {Loading } from '../../components/loading';
import { Feedback } from '../../components/feedback';
import './register.css';

type NotificationType = 'success' | 'info' | 'warning' | 'error';

export function Register () {
    const [result, setResult] = useState<boolean>(false);
    const [username, setUserName] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);


    const openNotificationWithIcon = (type: NotificationType, message:string, description:string) => {
        notification[type]({
          message: message,
          description: description
          
        });
    };

    async function userRegister () {
        setLoading(true);
        const userRegister = await register(username, password);
        console.log(userRegister)

        if(userRegister.error){
            setLoading(false)
            openNotificationWithIcon('error', 'Atenção!', userRegister.message);
            return;

        };
        setLoading(false);
        setResult(true);
        
    }

    return(
        <div className='Register__container'>
            <div className='Register__content'>
                <div className={ result ? '--Disable' : '' }>
                <h2>Faça parte da nova geração!</h2>
                <h3>Cadastre-se</h3>
                <Form
                    name="normal_login"
                    className="login-form"                              
                >
                    <Form.Item
                        name="username"
                        rules={[{ required: true, message: 'Please input your Username!' }]}
                    >
                        <Input 
                            prefix={<UserOutlined 
                            className="site-form-item-icon" />} 
                            placeholder="Username" 
                            onChange={event=> setUserName(event.target.value)}
                           
                        />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Please input your Password!' }]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Password"
                            onChange={event=> setPassword(event.target.value)}
                           
                        />
                    </Form.Item>
                    <Form.Item>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Form.Item>
                                
                        {
                            loading ?
                            < Loading
                                textCarregando='Aguarde...'
                            />
                            :
                            
                            <Button type="primary" htmlType="submit" className="login-form-button" onClick={userRegister}>
                                Cadastrar
                            </Button>
                        } 
                                
                    </Form.Item>
                    </Form.Item>
                    </Form.Item>
    
                </Form>
                </div>
                <div className={ result ? 'Register__result' : '--Disable'}>
                <Feedback 
                    title={'Seu cadastro foi realizado com sucesso!'}
                    subTitle={'Agora é fazer o login e aproveitar todos os benefícios'}
                    btnName={'Login'}
                    click={()=>window.location.pathname='/'}
                        
                />
                </div>               
            </div>           
        </div>
    );
}