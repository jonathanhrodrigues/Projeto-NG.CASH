import { Mentions, Tooltip, Modal, notification } from 'antd';
import { useState } from 'react';
import transfer from '../../actions/transfer/transfer-balance';
import { Loading } from '../loading';
import './search.css';
const { Option } = Mentions;

type NotificationType = 'success' | 'info' | 'warning' | 'error';

export function Search ({data=[]}:any) {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [userCashIn, setUserCashIn] = useState<any>([]);
    const [value, setValue] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false)

    const onSelect = (option: any) => {
        setIsModalOpen(true);
        setUserCashIn(data[option.key])
        
    };

    const openNotificationWithIcon = (type: NotificationType, message:string, description:string) => {
        notification[type]({
          message: message,
          description: description
          
        });
    };

    async function handleOk() {
      setLoading(true);
      const transferBalance = await transfer(userCashIn,value);

      if(transferBalance.error) {
            openNotificationWithIcon('error', 'Atenção!', transferBalance.message);
            setLoading(false);
            setIsModalOpen(false);
            
        };

      if(transferBalance.success){
            openNotificationWithIcon('success', 'Transação realizada, Aguarde!', transferBalance.message);
            setLoading(false);
            setIsModalOpen(false);
            setTimeout(()=> {
                window.location.reload();
                
            }, 5000)
            
        };

    };

    const handleCancel = () => {
      setIsModalOpen(false);

    };

    function onlyNumbers (event:any) {
        setValue(event.target.value);
        
    };



    return (
        <>
            <Tooltip 
                placement="top" 
                title="Digite @ para acessar a lista de usuários"
            >
                <Mentions
                    style={{ width: '100%', fontSize:'14px' }}
                    onSelect={onSelect}
                    placeholder='Digite @ para acessar a lista de usuários'
                    
                >
                    {data.length > 0 && 

                        data.map((current:any, index:any)=> {
                            return (
                                <Option 
                                    key={index} 
                                    value={`${current.username}`}
                                >
                                    {`Id:${current.id} Username:${current.username}`}

                                </Option>
                            )

                        })
                    
                    }
                </Mentions>
            </Tooltip>
            <Modal 
                title="Operação de transferência" 
                open={isModalOpen} 
                onOk={handleOk} 
                onCancel={handleCancel}
            >
                {
                    loading 
                    && 
                    <Loading 
                    textCarregando='Aguarde...'
                    
                    />
                }
                <div className={loading ? '--Disable' : ''}>
                    <p className='Search__span'>User Cash-In</p>
                    <p>{userCashIn.value && userCashIn.value }</p>
                    <label htmlFor="valor" className='Search__span'>Valor</label><br/>
                    
                        <Tooltip 
                            placement="bottomLeft" 
                            title="Digite o valor que deseja transferir"
                        >
                            <div  className='Search__modalInput'>
                                <p>R$</p>
                                <input 
                                    type="number" 
                                    name="valor" 
                                    value={value ? value : ''} 
                                    className='Search__inputValue' 
                                    placeholder='Digite o valor' 
                                    onChange={event=>onlyNumbers(event)}
                            
                                />
                            </div>                                                 
                        </Tooltip>
                    </div>                            
            </Modal>          
        </>
    );
   

    

    

}