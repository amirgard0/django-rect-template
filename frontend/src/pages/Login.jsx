import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
const Login = () => {
    const { login } = useContext(AuthContext);
    const Navigate = useNavigate();
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [info, setInfo] = useState({ error: null, details: null });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await api.post('/token/', credentials);
            login(data.access, data.refresh);
            info.details = 'Login successful';
            Navigate('/');
        } catch (err) {
            console.error('Login failed', err);
            info.error = 'Login failed';
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {
                info.error && (
                    <div>
                        <h4>{info.error}</h4>
                    </div>
                )
            }
            {
                info.details && (
                    <div>
                        <h5>{info.details}</h5>
                    </div>
                )
            }
            <input
                type="text"
                placeholder="Username"
                value={credentials.username}
                onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
            />
            <input
                type="password"
                placeholder="Password"
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
            />
            <button type="submit">Login</button>
        </form>
    );
};

export default Login;
