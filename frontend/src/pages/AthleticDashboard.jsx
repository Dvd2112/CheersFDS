import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import APIService from '../services/api';

const AthleticDashboard = ({ user }) => {
  const [expenses, setExpenses] = useState([]);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    fetchAthleticData();
  }, []);

  const fetchAthleticData = async () => {
    try {
      const token = localStorage.getItem('token');
      const data = await APIService.getAthleticData(token);
      setExpenses(data.expenses || []);
      setBalance(data.balance || 0);
    } catch (err) {
      console.error('Erro ao carregar dados:', err);
    }
  };

  const totalExpenses = expenses.reduce((sum, exp) => sum + parseFloat(exp.amount || 0), 0);

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Atlética - Gerenciador de Gastos</h1>
        <p>Controle financeiro de suas festas</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">💰</div>
          <div className="stat-content">
            <p className="stat-label">Saldo</p>
            <p className="stat-value">R$ {balance.toFixed(2)}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📊</div>
          <div className="stat-content">
            <p className="stat-label">Gastos Totais</p>
            <p className="stat-value">R$ {totalExpenses.toFixed(2)}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🎯</div>
          <div className="stat-content">
            <p className="stat-label">Transações</p>
            <p className="stat-value">{expenses.length}</p>
          </div>
        </div>
      </div>

      <div className="expenses-section">
        <div className="section-header">
          <h2>Histórico de Gastos</h2>
          <button className="btn-primary">+ Adicionar Gasto</button>
        </div>

        <div className="expenses-list">
          {expenses.length === 0 ? (
            <p className="empty-message">Nenhum gasto registrado</p>
          ) : (
            expenses.map((expense) => (
              <div key={expense.id} className="expense-item">
                <div className="expense-info">
                  <h4>{expense.description}</h4>
                  <p>
                    {new Date(expense.date).toLocaleDateString('pt-BR')}
                  </p>
                </div>
                <p className="expense-amount">
                  R$ {parseFloat(expense.amount).toFixed(2)}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AthleticDashboard;
