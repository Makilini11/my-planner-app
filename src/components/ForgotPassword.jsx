// src/components/ForgotPassword.jsx
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import colors from '../constants/colors';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { resetPassword } = useAuth(); // AuthContext-இல் இருந்து resetPassword-ஐப் பெறுகிறது
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    try {
      await resetPassword(email);
      setMessage('✅ Password reset link successfully sent to your email!');
      setEmail(''); // மின்னஞ்சல் அனுப்பிய பின் ஃபீல்டை அழிக்கவும்
    } catch (err) {
      // Firebase பிழைகளைக் காட்டுகிறது
      setError('Error sending reset link. Please check your email: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // --- Login.jsx-இலிருந்து ஸ்டைல்களை மீண்டும் பயன்படுத்துதல் ---
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
    opacity: loading ? 0.7 : 1, // Loading effect
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
          Reset Password
        </h2>
        
        {error && <p style={errorStyle}>{error}</p>}
        {message && <p style={{ color: 'green', fontWeight: 'bold', marginBottom: '10px' }}>{message}</p>}

        <form onSubmit={handleSubmit}>
          <p style={{ marginBottom: '20px', fontSize: '0.9em', color: colors.Text }}>
            உங்கள் கணக்கின் மின்னஞ்சலை உள்ளிடவும். கடவுச்சொல் மீட்டமைப்பு இணைப்பு உங்களுக்கு அனுப்பப்படும்.
          </p>
          <input 
            type="email" 
            placeholder="Enter Email Address" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
            style={inputStyle}
            disabled={loading}
          />

          <button type="submit" style={buttonStyle} disabled={loading}>
            {loading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>
        
        <p style={{ color: colors.Text, marginTop: '20px' }}>
          <Link to="/login" style={linkStyle}>
            Back to Login 
          </Link>
        </p>
      </div>
    </div>
  );
}

export default ForgotPassword;