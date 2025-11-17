import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/auth.css';

export default function Login({ setIsAuthenticated }) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isLogin) {
      // Simple login validation
      if (!formData.email || !formData.password) {
        setError('Please fill in all fields');
        return;
      }
      if (formData.email.length < 5) {
        setError('Please enter a valid email');
        return;
      }
    } else {
      // Signup validation
      if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
        setError('Please fill in all fields');
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        return;
      }
      if (formData.password.length < 6) {
        setError('Password must be at least 6 characters');
        return;
      }
    }

    // Save to localStorage
    localStorage.setItem('tradebro_auth', JSON.stringify({
      email: formData.email,
      name: formData.name || 'User'
    }));
    
    setIsAuthenticated(true);
    navigate('/dashboard');
  };

  return (
    <div className="auth-container">
      <div className="auth-form" style={{ display: isLogin ? 'flex' : 'none' }}>
        <div className="form-header">
          <h1>Welcome to <span>TradeBro</span></h1>
          <p>Please sign in to your account</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input 
              type="email" 
              className="input-field" 
              placeholder="Email Address" 
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="input-group">
            <input 
              type="password" 
              className="input-field" 
              placeholder="Password" 
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>
          {error && <div className="error-message">{error}</div>}
          <button type="submit" className="submit-btn">Login</button>
          <p className="switch-form-text">
            No account? <span onClick={() => setIsLogin(false)} style={{ cursor: 'pointer' }}>Sign Up</span>
          </p>
        </form>
      </div>

      <div className="auth-form" style={{ display: !isLogin ? 'flex' : 'none' }}>
        <div className="form-header">
          <h1>Create Account</h1>
          <p>Get started with your free account</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input 
              type="text" 
              className="input-field" 
              placeholder="Full Name" 
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="input-group">
            <input 
              type="email" 
              className="input-field" 
              placeholder="Email Address" 
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="input-group">
            <input 
              type="password" 
              className="input-field" 
              placeholder="Create Password" 
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="input-group">
            <input 
              type="password" 
              className="input-field" 
              placeholder="Confirm Password" 
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required
            />
          </div>
          {error && <div className="error-message">{error}</div>}
          <button type="submit" className="submit-btn">Create Account</button>
          <p className="switch-form-text">
            Already have an account? <span onClick={() => setIsLogin(true)} style={{ cursor: 'pointer' }}>Login</span>
          </p>
        </form>
      </div>
    </div>
  );
}
