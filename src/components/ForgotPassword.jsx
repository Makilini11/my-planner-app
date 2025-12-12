import React, { useState } from "react";
import { sendResetEmail } from "../services/authService";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr(""); setMsg("");
    setLoading(true);
    try {
      await sendResetEmail(email);
      setMsg("✅ Password reset link sent to your email!");
      setEmail("");
    } catch (error) {
      setErr(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Reset Password</h2>
        {err && <div style={styles.error}>{err}</div>}
        {msg && <div style={styles.success}>{msg}</div>}

        <form onSubmit={handleSubmit} style={styles.form}>
          <input type="email" placeholder="Enter email" value={email} onChange={(e)=>setEmail(e.target.value)} style={styles.input} disabled={loading}/>
          <button type="submit" style={styles.primaryButton} disabled={loading}>
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        <p style={{ marginTop: 12 }}>
          Back to <Link to="/login" style={styles.linkButton}>Login</Link>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: { display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", backgroundColor: "#f4f6fd" },
  card: { background: "#fff", padding: 40, borderRadius: 12, boxShadow: "0 8px 20px rgba(0,0,0,0.1)", width: 400, display: "flex", flexDirection: "column", alignItems: "center" },
  title: { marginBottom: 20, fontSize: 28, color: "#021a4e" },
  form: { width: "100%", display: "flex", flexDirection: "column", gap: 12 },
  input: { padding: "12px 16px", borderRadius: 8, border: "1px solid #ccc", fontSize: 16 },
  primaryButton: { padding: "12px", background: "#021a4e", color: "#fff", borderRadius: 8, fontWeight: 600, cursor: "pointer", marginTop: 8 },
  linkButton: { color: "#021a4e", textDecoration: "underline", cursor: "pointer", fontSize: 14 },
  error: { color: "red", marginBottom: 12 },
  success: { color: "green", marginBottom: 12 },
};
