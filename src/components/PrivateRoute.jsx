import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function PrivateRoute({ children }) {
    const { token } = useContext(AuthContext);

    // If there's no token, instantly kick them back to login
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return children;
}

export default PrivateRoute;
