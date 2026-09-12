import {useState, useEffect} from 'react'
import { checkAuthentication } from '../services/AuthService';
import {Navigate} from 'react-router';

export default function ProtectedRoute({ children }){

    const [isAuthenticated, setIsAuthenticated] = useState(null); 

    useEffect(() => {

        async function checkAuth(){
            const authenticated = await checkAuthentication();
            setIsAuthenticated(authenticated);
        }

        checkAuth();

    }, []);

    if(isAuthenticated === null){
        return <p>Loading...</p>
    }

    if(isAuthenticated === false){
        return <Navigate to="/login" />
    }


    return children;
}