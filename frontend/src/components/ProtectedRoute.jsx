import { useContext } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';


const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext);
    if (user === null) {
        return <Navigate to="/login" />
    }

    return user?.loggedIn ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
