import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './form.css';

function SignUpForm() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignUp = (e) => {
        e.preventDefault();
        // add sign-up logic here
        console.log('Signing up:', username, email, passowrd);
    };

    return (
        <form className='form'>
            <label>Username:</label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />

            <label>Email:</label>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

      <label>Password:</label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

      <button type="submit" onClick={handleSignUp}>Sign Up</button>

      <p>Already have an account? <Link to="/login">Login</Link></p>
      <p>Go back to <Link to="/">Home</Link></p>
    </form>
  );
}

export default SignUpForm;  
