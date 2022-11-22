import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';
import './notFound.css';

export function NotFound(){
    const navigate = useNavigate();
    return (
        <div className='NotFound__container'>
            <Result
            className='NotFound__result'
                status="404"
                title="404"
                subTitle="Sorry, the page you visited does not exist."
                extra={
                    <Button 
                        type="primary" 
                        onClick={()=>navigate('/home',{replace:true})}
                    >
                        Back Home
                    </Button>
                }
            />
        </div>  
    ); 
};