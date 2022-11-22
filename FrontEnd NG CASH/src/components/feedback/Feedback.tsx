import { Button } from 'antd';
import { CheckCircleFilled  } from '@ant-design/icons';
import './feedback.css';

type Props = {
    title:string
    subTitle:string
    btnName:string
    click:Function

}

export function Feedback (
    {
        title, 
        subTitle, 
        btnName,
        click

    }:Props) {

    return(
        <div className='Feedback__container'>
            <CheckCircleFilled 
                className='Feedback__icon'
            />
            
            <h1>{title}</h1>
            <h3>{subTitle}</h3>

            <Button type="primary" key="console" onClick={()=>click()}>
                {btnName}
            </Button>
        </div>
    );
}   