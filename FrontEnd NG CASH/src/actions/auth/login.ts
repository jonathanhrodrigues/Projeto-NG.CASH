
export default async function login(username:string, password:string) {

    try {

        const response = await fetch(`http://localhost:3333/auth/login`,{
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
        if(res.error){
            return res
        };
        localStorage.setItem('token', res.token);
        return res;
        
        
    }catch(error){

        console.log(error)
        return({
            error:true,
            message:error
        });

    };

};