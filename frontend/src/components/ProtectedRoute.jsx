import { checkAuthentication } from '../services/AuthService';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
    if (!checkAuthentication()) {
        return <Navigate to="/login" />;
    }
    return children;
}