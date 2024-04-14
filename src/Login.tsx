import React, { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';  // Import useNavigate

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();  // Use useNavigate instead of useHistory

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const response = await axios.post<{ message: string }>('http://localhost:3001/login', { username, password });
            console.log(response.data.message);
            navigate('/dashboard'); // Use navigate function to redirect
        } catch (error) {
            const axiosError = error as AxiosError<{ message: string }>;
            if (axiosError.response) {
                console.log(axiosError.response.data.message);
            } else if (axiosError.request) {
                console.log(axiosError.request);
            } else {
                console.log('Error', axiosError.message);
            }
        }
    };

    return (
        <div className="App">
            <header className="App-header">
                <form onSubmit={handleSubmit}>
                    <h2>Login</h2>
                    <div>
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit">Log In</button>
                </form>
            </header>
        </div>
    );
}

export default Login;