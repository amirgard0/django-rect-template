import { useState, useContext } from 'react';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';
const Register = () => {
    const { login, logout } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });
    const [confirmPassword, setConfirmPassword] = useState("")
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== confirmPassword) {
            setMessage('Passwords do not match');
            return;
        }
        try {
            logout()
            await api.post('/register/', formData);

            // #region Login user after registering automaticy
            const credentials = {
                username: formData.username,
                password: formData.password
            }
            try {
                const { data } = await api.post('/token/', credentials);
                login(data.access, data.refresh);
                setMessage("done")
            } catch (err) {
                console.error('Login failed', err);
                setMessage('Login failed');
            }
            //#endregion

        } catch (error) {
            setMessage('Registration failed: ' + error.response?.data || error.message);
            console.log(error)
        }
    };

    return (
        <div>
            <h1>Register</h1>
            {message && <p>{message}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Username"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                /> <br />
                <input
                    type="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                /> <br />
                <input
                    type="password"
                    placeholder='Confirm password'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                /> <br />
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;
