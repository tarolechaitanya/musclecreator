import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface UserData {
    name: string;
    age: string;
    height: string;
    weight: string;
    bmi: string;
    joiningDate: string;
    monthlyFees: string;
}

const AddUser: React.FC = () => {
    const [userData, setUserData] = useState<UserData>({
        name: '',
        age: '',
        height: '',
        weight: '',
        bmi: '',
        joiningDate: '',
        monthlyFees: ''
    });
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3001/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData)
            });
            if (response.ok) {
                navigate('/dashboard');
            }
        } catch (error) {
            console.error('Error saving user:', error);
        }
    };

    return (
        <div>
            <h1>Add New User</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Name" value={userData.name} onChange={handleChange} />
                <input type="text" name="age" placeholder="Age" value={userData.age} onChange={handleChange} />
                <input type="text" name="height" placeholder="Height" value={userData.height} onChange={handleChange} />
                <input type="text" name="weight" placeholder="Weight" value={userData.weight} onChange={handleChange} />
                <input type="text" name="bmi" placeholder="BMI Index" value={userData.bmi} onChange={handleChange} />
                <input type="date" name="joiningDate" placeholder="Joining Date" value={userData.joiningDate} onChange={handleChange} />
                <input type="text" name="monthlyFees" placeholder="Monthly Fees" value={userData.monthlyFees} onChange={handleChange} />
                <button type="submit">Save User</button>
            </form>
        </div>
    );
};

export default AddUser;