import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import loginImage from '/Users/michaelarbuthnot/dividine/src/images/Black male looking at phone.avif';
import './form.css';

function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        // add login logic here
        console.log('Logging in:', email, password);
    };

    return (
        <form className="form">
            <img src={loginImage} alt="Login" className="login-image" />

            <label>Email:</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

            <label>Password:</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

            <button type="submit" onClick={handleLogin}>Login</button>

            <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
            <p>Go back to <Link to="/">Home</Link></p>
        </form>
    );
}

export default LoginForm;