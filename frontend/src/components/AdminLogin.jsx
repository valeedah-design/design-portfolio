import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminPanel.css';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Login failed');
        setLoading(false);
        return;
      }

      localStorage.setItem('admin_token', data.token);
      navigate('/admin/dashboard');
    } catch (err) {
      setError('Something went wrong. Try again.');
      setLoading(false);
    }
  };

  return (
    <div className="admin-page admin-login-page">
      <form className="admin-card" onSubmit={handleSubmit}>
        <h1 className="admin-title">Admin Login</h1>
        <label className="admin-label">
          Username
          <input
            className="admin-input"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoFocus
            required
          />
        </label>
        <label className="admin-label">
          Password
          <input
            className="admin-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {error && <p className="admin-error">{error}</p>}
        <button className="admin-button" type="submit" disabled={loading}>
          {loading ? 'Signing in...' : 'Sign in'}
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
