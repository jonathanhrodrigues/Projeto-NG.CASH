
import { LogoutOutlined, BellFilled, DollarCircleOutlined, AppstoreOutlined } from '@ant-design/icons';
import { Form, Input } from 'antd';
import { Tooltip } from 'antd';
import { useEffect, useState } from 'react';
import getAllUser from '../../actions/user/getAllUser';
import userLogged from '../../actions/user/logged';
import { Loading } from '../../components/loading';
import { Search } from '../../components/search';
import logo from '../../_assets/logo-ngcash-branco.88c5860.svg';
import './home.css';


export function Home () {
    const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
    const [userData, setUserData]= useState<any>([]);
    const [listData, setListData]= useState<any>([]);
    const [typeTransaction, setTypeTransaction]= useState<string>('All');
    const [loading, setLoading] = useState<boolean>(false);
    const [dataFilter, setDataFilter] = useState<boolean>(false);
    const [dataFiltred, setDataFiltred] = useState<any>([]);

    useEffect(() => {
        if(!userData.user) {
            logged();
            return;
        };

        async function logged () {
            setLoading(true);
            const data = await userLogged();
            const userList = await getAllUser();
        
            setUserData(data);
            setListData(userList);

            if(data.error){
                setLoading(false);
                return;

            };
            setLoading(false);

        };
        
    },[userData, listData, dataFilter]);

    function logOut () {
        localStorage.clear();
        window.location.reload();

    };

   function FiltredData (event:any) {
        if(event.target.value === ''){
            setDataFilter(false);
            return;

        }else {
            setDataFiltred(event.target.value);
            setDataFilter(true);
            return;

        };
       
    };
   
    return(
        <div className='Home__container'>
            <div className='Home__header'>
                <div className='Home__headerContent'>
                    <img  className='Home__logo' src={logo} alt="logo_ng_cash" />
                    <h1>
                        Bem vindo, 
                        {userData.user ? userData.user.username.toString() : ""}
                    </h1>
                </div>
                <div className='Home__options'>
                <Tooltip 
                    title="Notificações" 
                    placement="bottom"
                >
                    <BellFilled 
                        className='Home__bntLogOut'
                    />
                </Tooltip>
                <Tooltip 
                    title="Logout" 
                    placement="bottom"
                >
                    <LogoutOutlined 
                        className='Home__bntLogOut' 
                        onClick={logOut}
                    />
                </Tooltip>
                </div>
            </div>
            <div className='Home__content'>
                <div className='Home__firstContent'>
                    <h2>
                        <DollarCircleOutlined/> Transferir
                    </h2>
                    <div className='Home__saldo'>
                        <p>Saldo atual</p>
                        <Form>
                            <Input.Password
                                className='Home__saldoInput'
                                placeholder="Saldo"
                                visibilityToggle={
                                    { 
                                        visible: passwordVisible, 
                                        onVisibleChange: setPasswordVisible 
                                    }}
                                readOnly={true}
                                value={
                                    userData.account 
                                    ? 
                                    `R$ ${parseFloat(userData.account.balance).toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}` 
                                    : 
                                    ""
                                }
                            />
                        </Form>
                    </div>
                    <Search 
                        data={listData}
                    />
                </div>
                <h2>
                    <AppstoreOutlined /> 
                    Histórico de transações
                </h2>
                <div className='Home__secondContent'>
                    <div className='Home__bg'>
                        <div className='Home__transações'>
                            <ul>
                                <li>Id</li>
                                <li>Cash-Out</li>
                                <li>Cash-In</li>
                                <li>Valor</li>
                                <li>Data</li>
                                <li>Tipo</li>
                            </ul>
                            { loading && <Loading />}
                            <div className={ loading ? '--Disable': ''}>
                                {
                                    typeTransaction === 'All' && userData.transactions
                                    && 
                                    userData.transactions.debited.map((current:any, index:string )=> {
                                        const formatDate = current.createdAt.split('-').reverse()
                                        const userTransactionName = listData.filter((callback:any)=>{

                                            return callback.accountId === current.creditedAccountId && callback.username
                                        })

                                        if(dataFilter){
                                            if( current.createdAt !== dataFiltred)

                                            return ('');
                                        }else{

                                            return(
                                                <ul key={index} >
                                                    <li>{current.id}</li>
                                                    <li>{userData.user.username}</li>
                                                    <li>{userTransactionName[0].username}</li>
                                                    <li>{`R$ ${parseFloat(current.value).toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}`}</li>
                                                    <li>{`${formatDate[0]}/${formatDate[1]}/${formatDate[2]}`}</li>
                                                    <li>Cash-Out</li>
                                                </ul>
                                            );

                                        }

                                        return(
                                            <ul key={index} >
                                                <li>{current.id}</li>
                                                <li>{userData.user.username}</li>
                                                <li>{userTransactionName[0].username}</li>
                                                <li>{`R$ ${parseInt(current.value).toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}`}</li>
                                                <li>{`${formatDate[0]}/${formatDate[1]}/${formatDate[2]}`}</li>
                                                <li>Cash-Out</li>
                                            </ul>
                                        );
                                    })
                            
                                }
                                {   
                                    typeTransaction === 'All' && userData.transactions
                                    && 
                                    
                                        userData.transactions.credited.map((current:any, index:string )=> {
                                            const formatDate = current.createdAt.split('-').reverse()
                                            const userTransactionName = listData.filter((callback:any)=>{

                                                return callback.accountId === current.debitedAccountId && callback.username
                                            })
                                            
                                            if(dataFilter){
                                                if( current.createdAt !== dataFiltred)
    
                                                return ('');
                                            }else{
    
                                                return(
                                                    <ul key={index} >
                                                        <li>{current.id}</li>
                                                        <li>{userData.user.username}</li>
                                                        <li>{userTransactionName[0].username}</li>
                                                        <li>{`R$ ${parseInt(current.value).toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}`}</li>
                                                        <li>{`${formatDate[0]}/${formatDate[1]}/${formatDate[2]}`}</li>
                                                        <li>Cash-Out</li>
                                                    </ul>
                                                );
    
                                            }

                                            return(
                                                <ul key={index}>
                                                    <li>{current.id}</li>
                                                    <li>{userTransactionName[0].username}</li>
                                                    <li>{userData.user.username}</li>
                                                    <li>{`R$ ${parseInt(current.value).toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}`}</li>
                                                    <li>{`${formatDate[0]}/${formatDate[1]}/${formatDate[2]}`}</li>
                                                    <li>Cash-In</li>
                                                </ul>
                                            );

                                        })  
                                }
                                {   
                                    typeTransaction === 'Cash-In' && userData.transactions
                                    && 
                                    
                                    userData.transactions.credited.map((current:any, index:string )=> {
                                        const formatDate = current.createdAt.split('-').reverse()
                                        const userTransactionName = listData.filter((callback:any)=>{

                                            return callback.accountId === current.debitedAccountId && callback.username
                                        })

                                        if(dataFilter){
                                            if( current.createdAt !== dataFiltred)

                                            return ('');
                                        }else{

                                            return(
                                                <ul key={index} >
                                                    <li>{current.id}</li>
                                                    <li>{userData.user.username}</li>
                                                    <li>{userTransactionName[0].username}</li>
                                                    <li>{`R$ ${parseInt(current.value).toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}`}</li>
                                                    <li>{`${formatDate[0]}/${formatDate[1]}/${formatDate[2]}`}</li>
                                                    <li>Cash-Out</li>
                                                </ul>
                                            );

                                        }

                                        return(
                                            <ul key={index}>
                                                <li>{current.id}</li>
                                                <li>{userTransactionName[0].username}</li>
                                                <li>{userData.user.username}</li>
                                                <li>{`R$ ${parseInt(current.value).toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}`}</li>
                                                <li>{`${formatDate[0]}/${formatDate[1]}/${formatDate[2]}`}</li>
                                                <li>Cash-In</li>
                                            </ul>
                                        );                          

                                    })

                                }
                                {   
                                    typeTransaction === 'Cash-Out' && userData.transactions
                                    && 
                                    
                                    userData.transactions.debited.map((current:any, index:string )=> {
                                        
                                        const formatDate = current.createdAt.split('-').reverse()
                                        const userTransactionName = listData.filter((callback:any)=>{

                                            return callback.accountId === current.creditedAccountId && callback.username
                                        })

                                        if(dataFilter){
                                            if( current.createdAt !== dataFiltred)

                                            return ('');
                                        }else{

                                            return(
                                                <ul key={index} >
                                                    <li>{current.id}</li>
                                                    <li>{userData.user.username}</li>
                                                    <li>{userTransactionName[0].username}</li>
                                                    <li>{`R$ ${parseInt(current.value).toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}`}</li>
                                                    <li>{`${formatDate[0]}/${formatDate[1]}/${formatDate[2]}`}</li>
                                                    <li>Cash-Out</li>
                                                </ul>
                                            );

                                        }
                                        
                                        return(
                                            <ul key={index}>
                                                <li>{current.id}</li>
                                                <li>{userData.user.username}</li>
                                                <li>{userTransactionName[0].username}</li>
                                                <li>{`R$ ${parseInt(current.value).toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}`}</li>
                                                <li>{`${formatDate[0]}/${formatDate[1]}/${formatDate[2]}`}</li>
                                                <li>Cash-Out</li>
                                            </ul>
                                        );
                        
                                    })

                                }   

                            </div>                           
                        </div>
                        <div className='Home__filter'>
                            <h3>Filtrar</h3>
                            <section>
                                <label htmlFor="dentificação_do_cliente">Tipo de transação</label>
                                <Tooltip 
                                    placement="bottom" 
                                    title="Filtrar por tipo de transação"
                                >
                                    <select 
                                        name="Identificação_do_cliente" 
                                        required className='Home__inputOptions' 
                                        onChange={event=>setTypeTransaction(event.target.value)}
                                    >
                    
                                        <option  value={"All"} >All</option>
                                        <option  value={"Cash-In"} >Cash-In</option>
                                        <option  value={"Cash-Out"} >Cash-Out</option>
                                    </select> 
                                </Tooltip>
                            </section>
                            <section>
                            <Tooltip 
                                placement="bottomRight" 
                                title="Filtrar por data"
                            >
                                <label htmlFor="date">Data da transação</label>
                                <input 
                                    type="date" 
                                    name='date' 
                                    className='Home__inputData' 
                                    onChange={event=>FiltredData(event)}
                                />
                            </Tooltip>
                            </section>
                        </div>
                    </div>
                </div>              
            </div>
        </div>
    );
}