import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext);

    if (user === null) {
        return <div>Loading...</div>; // Show a loading state while checking auth
    }

    return user?.loggedIn ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
