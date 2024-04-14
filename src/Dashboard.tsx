import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from './User';

const Dashboard: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]); // An array of User objects
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:3001/users')
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (Array.isArray(data)) {  // Check if the response is an array
                    setUsers(data);
                } else {
                    console.error("Received data is not an array:", data);
                }
            })
            .catch(err => {
                console.error("Failed to fetch users", err);
            });
    }, []);

    return (
        <div>
            <h1>Dashboard</h1>
            <button onClick={() => navigate('/add-user')}>Add New User</button>
            <ul>
                {users.map(user => (
                    <li key={user._id}>{user.name} - {user.age}</li>
                ))}
            </ul>
        </div>
    );
};

export default Dashboard;