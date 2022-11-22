
export default async function userLogged() {

    try {
        const token = localStorage.getItem('token');

        const response = await fetch(`http://localhost:3333/logged`,{
        method:'get',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            Accept: 'application/json',
            
        }   
        })
        const res:any =  await response.json();
        return res;

    }catch(error){
        console.log(error);
        return({
            error:true,
            message:error
        });

    };

};