import { useEffect} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import verifyToken from '../../actions/auth/verify-token';


export function PrivateRoute ({ children }: any) {
    const navigate = useNavigate();
    const location = useLocation();
  
    useEffect(() => {
        async function getTokenStorage () {
          const token = localStorage.getItem('token')

          if (!token) {
                navigate(
                    '/', 
                    {replace:true}
    
                );
            };

          const verify = await verifyToken();

          if(verify?.error){
                navigate(
                    '/', 
                    {replace:true}

                );

            };
            return children;

        };

        getTokenStorage();
    },[location.pathname, children, navigate]);
    
    return children;

}