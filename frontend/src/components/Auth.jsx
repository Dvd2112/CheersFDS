import React, { useState } from 'react';
import './Auth.css';
import APIService from '../services/api';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('customer');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = await APIService.login(email, password, userType);

      localStorage.setItem('token', data.token);
      localStorage.setItem('userType', userType);
      localStorage.setItem('user', JSON.stringify(data.user));
      onLogin(data.user, userType);
    } catch (err) {
      setError(err.message || 'Erro ao fazer login');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1>The Marrrweco</h1>
          <p>Compre ingressos para festas universitárias</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="userType">Tipo de Usuário</label>
            <select
              id="userType"
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
              className="form-input"
            >
              <option value="customer">Cliente</option>
              <option value="promoter">Promoter</option>
              <option value="athletic">Atlética</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Senha</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="form-input"
              required
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Entrando...' : 'Entrar'}
          </button>

          <div className="auth-footer">
            <p>Não tem conta? <a href="#signup">Cadastre-se</a></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
