
export default async function transfer(userCashIn:any, value:number) {
   
    try {
        const token = localStorage.getItem('token');
        console.log(value)

        const response = await fetch(`http://localhost:3333/account/transfer`,{
        method:'post',
        body:JSON.stringify({
            usercashin:userCashIn,
            value:value
            

        }),
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            Accept: 'application/json',
            
        }   
        })
        const res:any =  await response.json();
        console.log(res)
        return res;
        

    }catch(error){
        console.log(error);
        return({
            error:true,
            message:error
        });

    };

};