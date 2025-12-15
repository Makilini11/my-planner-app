

// import React, { useState } from 'react';
// import { useAuth } from '../contexts/AuthContext';
// import { useNavigate, Link } from 'react-router-dom';
// import colors from '../constants/colors';
// function Login() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const { login } = useAuth();
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     try {
//       await login(email, password);
//       navigate('/dashboard'); 
//     } catch (err) {
//       setError('Login failed ' + err.message);
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
//     color: colors.Primary,
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
//         <h2 style={{ color: colors.Primary, marginBottom: '20px' }}>
//           Planner Login
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
//           <div style={{ textAlign: 'right', marginBottom: '10px' }}>
//             <Link to="/forgot-password" style={{ ...linkStyle, fontSize: '0.9em', color: colors.Primary }}>
//               Forgot Password?
//             </Link>
//           </div>
//           <button type="submit" style={buttonStyle}>
//              Login
//           </button>
//         </form>
        
//         <p style={{ color: colors.Text, marginTop: '20px' }}>
//           Don't have an account?{' '}
//           <Link to="/register" style={linkStyle}>
//             Register 
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }
// export default Login;


// src/components/Login.jsx
// src/components/Login.jsx
import React, { useState, useEffect } from "react";
import { loginWithEmail, loginWithGoogle } from "../services/authService";
import { useNavigate, Link } from "react-router-dom";
import { auth } from "../services/firebase";
import { onAuthStateChanged } from "firebase/auth";
import colors from "../constants/colors";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(null);
  const nav = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) nav("/dashboard");
    });
    return () => unsubscribe();
  }, [nav]);

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setErr(null);
    try {
      await loginWithEmail(email, password);
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
      {/* Floating background circles */}
      <div style={styles.circle1}></div>
      <div style={styles.circle2}></div>

      <div style={styles.card}>
        {/* Logo */}
        <div style={styles.logoWrapper}>
          <img src="/logo.png" alt="App Logo" style={styles.logo} />
        </div>

        <h2 style={styles.title}>Welcome Back</h2>
        <p style={styles.subtitle}>Login to continue</p>

        {err && <div style={styles.error}>{err}</div>}

        <form onSubmit={handleEmailLogin} style={styles.form}>
          <div style={styles.inputWrapper}>
            <span style={styles.icon}>📧</span>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              style={styles.input}
            />
          </div>

          <div style={styles.inputWrapper}>
            <span style={styles.icon}>🔒</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              style={styles.input}
            />
          </div>

          <div style={styles.rowBetween}>
            <Link to="/forgot-password" style={styles.linkButton}>
              Forgot password?
            </Link>
          </div>

          <button type="submit" style={styles.primaryButton}>
            Sign in
          </button>
        </form>

        <button onClick={handleGoogle} style={styles.googleButton}>
          <span style={{ marginRight: 8, display: "inline-flex", alignItems: "center" }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 533.5 544.3" width="18" height="18">
              <path fill="#4285f4" d="M533.5 278.4c0-18.4-1.5-36-4.4-53.3H272v100.9h146.9c-6.3 33.7-25.2 62.2-53.7 81.2v67h86.9c50.7-46.7 80.4-115.6 80.4-195.8z"/>
              <path fill="#34a853" d="M272 544.3c72.8 0 133.9-24 178.5-65.4l-86.9-67c-24.2 16.3-55 26-91.6 26-70.5 0-130.2-47.7-151.6-111.8h-89.4v70.6c44.8 88.2 137.8 147.6 241 147.6z"/>
              <path fill="#fbbc04" d="M120.9 315.7c-10.7-31.7-10.7-65.8 0-97.5v-70.6h-89.4c-38.9 77.9-38.9 168.8 0 246.7l89.4-78.6z"/>
              <path fill="#ea4335" d="M272 107.3c37.7 0 71.7 12.9 98.4 34.7l73.9-73.9C405.9 24 344.8 0 272 0 169.8 0 76.8 59.4 32 147.6l89.4 70.6C141.8 155 201.5 107.3 272 107.3z"/>
            </svg>
          </span>
          Sign in with Google
        </button>

        <p style={{ marginTop: 16, color: colors.gray }}>
          Don't have an account?{" "}
          <Link to="/register" style={styles.linkButton}>
            Register
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
    width: 350,
    height: 350,
    borderRadius: "50%",
    background: "rgba(156, 77, 255, 0.15)",
    top: -50,
    left: -50,
    filter: "blur(100px)",
    animation: "float 8s ease-in-out infinite",
  },

  circle2: {
    position: "absolute",
    width: 400,
    height: 400,
    borderRadius: "50%",
    background: "rgba(0, 200, 255, 0.12)",
    bottom: -70,
    right: -70,
    filter: "blur(120px)",
    animation: "float 10s ease-in-out infinite",
  },

  card: {
    backdropFilter: "blur(20px)",
    background: colors.cardGlass,
    border: `1px solid ${colors.borderGlass}`,
    padding: "45px 40px",
    borderRadius: 25,
    width: 380,
    boxShadow: "0 25px 60px rgba(0,0,0,0.25)",
    textAlign: "center",
    transition: "0.3s",
  },

  logoWrapper: {
    width: 100,
    height: 100,
    margin: "0 auto 20px auto",
    borderRadius: "50%",
    background: "rgba(255, 255, 255, 0.1)", // soft glow behind logo
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  logo: {
    width: 60,
    height: 60,
    objectFit: "contain",
  },

  title: { fontSize: 32, fontWeight: 700, color: colors.primary, marginBottom: 6 },
  subtitle: { fontSize: 15, color: colors.gray, marginBottom: 25 },

  form: { display: "flex", flexDirection: "column", gap: 16 },
  inputWrapper: {
    display: "flex",
    alignItems: "center",
    background: colors.inputBg,
    borderRadius: 12,
    paddingLeft: 12,
    border: `1px solid ${colors.borderGlass}`,
    transition: "0.25s",
  },
  icon: { marginRight: 10, fontSize: 18, color: colors.primary },
  input: {
    flex: 1,
    padding: "12px 14px",
    border: "none",
    background: "transparent",
    fontSize: 16,
    color: colors.primary,
    outline: "none",
  },

  primaryButton: {
    padding: "12px",
    background: colors.accent,
    color: "#fff",
    fontSize: 17,
    fontWeight: 700,
    borderRadius: 12,
    border: "none",
    cursor: "pointer",
    transition: "0.25s",
  },

  googleButton: {
    padding: "12px",
    background: colors.google,
    color: "#fff",
    borderRadius: 12,
    cursor: "pointer",
    marginTop: 15,
    fontWeight: 600,
    border: "none",
    fontSize: 16,
    transition: "0.25s",
  },

  linkButton: { color: "#fff", textDecoration: "underline", cursor: "pointer", fontSize: 14 },
  rowBetween: { display: "flex", justifyContent: "flex-end" },

  error: {
    background: "rgba(255,107,107,0.2)",
    color: colors.error,
    padding: "10px",
    borderRadius: 8,
    marginBottom: 12,
  },
};
