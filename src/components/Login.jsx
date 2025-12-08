

import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import colors from '../constants/colors';
function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login(email, password);
      navigate('/dashboard'); 
    } catch (err) {
      setError('Login failed ' + err.message);
    }
  };
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: colors.Neutral, 
    padding: '20px',
  };

  const formContainerStyle = {
    backgroundColor: 'white', 
    padding: '40px',
    borderRadius: '12px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '400px',
    textAlign: 'center',
    border: `2px solid ${colors.Secondary}`,
  };

  const inputStyle = {
    width: 'calc(100% - 20px)',
    padding: '12px 10px',
    margin: '10px 0',
    borderRadius: '8px',
    border: `1px solid ${colors.Secondary}`, 
    boxSizing: 'border-box',
    color: colors.Text,
  };

  const buttonStyle = {
    width: '100%',
    padding: '15px',
    margin: '20px 0 10px 0',
    backgroundColor: colors.Primary, 
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold',
    transition: 'background-color 0.3s ease',
  };

  const linkStyle = {
    color: colors.Text, 
    textDecoration: 'none',
    fontWeight: 'bold',
  };

  const errorStyle = {
      color: colors.Primary, 
      fontWeight: 'bold',
      marginBottom: '10px',
  };

  return (
    <div style={containerStyle}>
      <div style={formContainerStyle}>
        <h2 style={{ color: colors.Text, marginBottom: '20px' }}>
          Planner Login
        </h2>
        {error && <p style={errorStyle}>{error}</p>}
        
        <form onSubmit={handleSubmit}>
          <input 
            type="email" 
            placeholder="Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
            style={inputStyle}
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            style={inputStyle}
          />
          <button type="submit" style={buttonStyle}>
             Login
          </button>
        </form>
        
        <p style={{ color: colors.Text, marginTop: '20px' }}>
          Don't have an account?{' '}
          <Link to="/register" style={linkStyle}>
            Register 
          </Link>
        </p>
      </div>
    </div>
  );
}
export default Login;