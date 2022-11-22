export default async function register(username:string, password:string) {

    try {
        

        const response = await fetch(`http://localhost:3333/create`,{
        method:'post',
        body:JSON.stringify({
            username:username,
            password:password

        }),
        headers: {
            
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