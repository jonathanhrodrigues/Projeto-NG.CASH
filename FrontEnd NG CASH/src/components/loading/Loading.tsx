import { Spin } from 'antd';
import './loading.css';

export function Loading ({textCarregando = 'Carregando'}) {
    return (
        
        <div className='carregando__content'>
            <Spin  
                size="large" 
            />
            <p>{textCarregando}</p> 
        </div>
    );
};