

// import React, { useState } from 'react';
// import { useAuth } from '../contexts/AuthContext';
// import { useNavigate, Link } from 'react-router-dom';
// import colors from '../constants/colors';
// function Register() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const { signup } = useAuth();
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     try {
//       await signup(email, password);
//       navigate('/dashboard'); 
//     } catch (err) {
//       setError('Registration Failed: ' + err.message);
//     }
//   };
//   const containerStyle = {
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     justifyContent: 'center',
//     minHeight: '100vh',
//     backgroundColor: colors.Neutral, 
//     padding: '20px',
//   };

//   const formContainerStyle = {
//     backgroundColor: 'white', 
//     padding: '40px',
//     borderRadius: '12px',
//     boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
//     width: '100%',
//     maxWidth: '400px',
//     textAlign: 'center',
//     border: `2px solid ${colors.Secondary}`, 
//   };

//   const inputStyle = {
//     width: 'calc(100% - 20px)',
//     padding: '12px 10px',
//     margin: '10px 0',
//     borderRadius: '8px',
//     border: `1px solid ${colors.Secondary}`, 
//     boxSizing: 'border-box',
//     color: colors.Text,
//   };

//   const buttonStyle = {
//     width: '100%',
//     padding: '15px',
//     margin: '20px 0 10px 0',
//     backgroundColor: colors.Primary,
//     color: 'white',
//     border: 'none',
//     borderRadius: '8px',
//     cursor: 'pointer',
//     fontSize: '16px',
//     fontWeight: 'bold',
//     transition: 'background-color 0.3s ease',
//   };

//   const linkStyle = {
//     color: colors.Text,
//     textDecoration: 'none',
//     fontWeight: 'bold',
//   };

//   const errorStyle = {
//       color: colors.Primary,
//       fontWeight: 'bold',
//       marginBottom: '10px',
//   };
//   return (
//     <div style={containerStyle}>
//       <div style={formContainerStyle}>
//         <h2 style={{ color: colors.Text, marginBottom: '20px' }}>
//            Register
//         </h2>
//         {error && <p style={errorStyle}>{error}</p>}
        
//         <form onSubmit={handleSubmit}>
//           <input 
//             type="email" 
//             placeholder="Email" 
//             value={email} 
//             onChange={(e) => setEmail(e.target.value)} 
//             required 
//             style={inputStyle}
//           />
//           <input 
//             type="password" 
//             placeholder="Password" 
//             value={password} 
//             onChange={(e) => setPassword(e.target.value)} 
//             required 
//             style={inputStyle}
//           />
//           <button type="submit" style={buttonStyle}>
//             Register
//           </button>
//         </form>
        
//         <p style={{ color: colors.Text, marginTop: '20px' }}>
//           Already have an account?{' '}
//           <Link to="/login" style={linkStyle}>
//             Login 
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }

// export default Register;


// src/components/Register.jsx
import React, { useState } from "react";
import { registerWithEmail, loginWithGoogle } from "../services/authService";
import { useNavigate, Link } from "react-router-dom";
import colors from "../constants/colors";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [err, setErr] = useState(null);
  const nav = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setErr(null);
    if (password !== confirmPassword) return setErr("Passwords do not match");
    try {
      await registerWithEmail(email, password);
      nav("/dashboard");
    } catch (error) {
      setErr(error.message);
    }
  };

  const handleGoogle = async () => {
    setErr(null);
    try {
      await loginWithGoogle();
      nav("/dashboard");
    } catch (error) {
      setErr(error.message);
    }
  };

  return (
    <div style={styles.container}>
      {/* Floating circles */}
      <div style={styles.circle1}></div>
      <div style={styles.circle2}></div>

      <div style={styles.card}>
        <h2 style={styles.title}>Register</h2>
        <p style={styles.subtitle}>Create your account</p>

        {err && <div style={styles.error}>{err}</div>}

        <form onSubmit={handleRegister} style={styles.form}>
          <div style={styles.inputWrapper}>
            <span style={styles.icon}>📧</span>
            <input
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
            />
          </div>
          <div style={styles.inputWrapper}>
            <span style={styles.icon}>🔒</span>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
            />
          </div>
          <div style={styles.inputWrapper}>
            <span style={styles.icon}>🔒</span>
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              style={styles.input}
            />
          </div>
          <button type="submit" style={styles.primaryButton}>
            Register
          </button>
        </form>

        <button onClick={handleGoogle} style={styles.googleButton}>
          Sign up with Google
        </button>

        <p style={{ marginTop: 16, color: colors.gray }}>
          Already have an account?{" "}
          <Link to="/login" style={styles.linkButton}>
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: colors.backgroundGradient,
    position: "relative",
    overflow: "hidden",
    padding: 20,
  },

  circle1: {
    position: "absolute",
    width: 300,
    height: 300,
    borderRadius: "50%",
    background: "rgba(255,255,255,0.12)",
    top: 40,
    left: 40,
    filter: "blur(80px)",
  },

  circle2: {
    position: "absolute",
    width: 350,
    height: 350,
    borderRadius: "50%",
    background: "rgba(255,255,255,0.10)",
    bottom: 60,
    right: 60,
    filter: "blur(90px)",
  },

  card: {
    backdropFilter: "blur(16px)",
    background: colors.cardGlass,
    border: `1px solid ${colors.borderGlass}`,
    padding: "45px 40px",
    borderRadius: 20,
    width: 380,
    boxShadow: "0 25px 45px rgba(0,0,0,0.20)",
    textAlign: "center",
    animation: "fadeIn 0.8s ease",
  },

  title: {
    fontSize: 32,
    fontWeight: 700,
    color: "white",
    marginBottom: 6,
  },

  subtitle: {
    fontSize: 15,
    color: colors.gray,
    marginBottom: 25,
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },

  inputWrapper: {
    display: "flex",
    alignItems: "center",
    background: colors.inputBg,
    borderRadius: 10,
    paddingLeft: 12,
    border: `1px solid ${colors.borderGlass}`,
  },

  icon: {
    marginRight: 10,
    fontSize: 18,
    color: "white",
  },

  input: {
    flex: 1,
    padding: "12px 14px",
    border: "none",
    background: "transparent",
    fontSize: 16,
    color: "white",
    outline: "none",
  },

  primaryButton: {
    padding: "12px",
    background: "white",
    color: "#4A34DD",
    fontSize: 17,
    fontWeight: 700,
    borderRadius: 10,
    border: "none",
    cursor: "pointer",
    transition: "0.25s",
  },

  googleButton: {
    padding: "12px",
    background: colors.google,
    color: "#fff",
    borderRadius: 10,
    cursor: "pointer",
    marginTop: 15,
    fontWeight: 600,
    border: "none",
    fontSize: 16,
  },

  linkButton: {
    color: "white",
    textDecoration: "underline",
    cursor: "pointer",
    fontSize: 14,
  },

  error: {
    background: "rgba(255,0,0,0.20)",
    color: colors.error,
    padding: "10px",
    borderRadius: 8,
    marginBottom: 12,
  },
};
