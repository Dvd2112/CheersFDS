import React, { useState, useEffect } from 'react';
import './Dashboard.css';

const PromoterDashboard = ({ user }) => {
  const [events, setEvents] = useState([]);
  const [stats, setStats] = useState({
    totalEvents: 0,
    totalTicketsSold: 0,
    totalRevenue: 0,
    activeSales: 0,
  });

  useEffect(() => {
    fetchPromoterData();
  }, []);

  const fetchPromoterData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:8000/api/promoter/events', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setEvents(data.events || []);
        setStats(data.stats);
      }
    } catch (err) {
      console.error('Erro ao carregar dados:', err);
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Promoter Dashboard</h1>
        <p>Gerencie seus eventos e vendas</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">📅</div>
          <div className="stat-content">
            <p className="stat-label">Eventos</p>
            <p className="stat-value">{stats.totalEvents}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🎟️</div>
          <div className="stat-content">
            <p className="stat-label">Ingressos Vendidos</p>
            <p className="stat-value">{stats.totalTicketsSold}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">💰</div>
          <div className="stat-content">
            <p className="stat-label">Receita Total</p>
            <p className="stat-value">R$ {parseFloat(stats.totalRevenue).toFixed(2)}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🚀</div>
          <div className="stat-content">
            <p className="stat-label">Vendas Ativas</p>
            <p className="stat-value">{stats.activeSales}</p>
          </div>
        </div>
      </div>

      <div className="events-section">
        <div className="section-header">
          <h2>Meus Eventos</h2>
          <button className="btn-primary">+ Criar Evento</button>
        </div>

        <div className="events-list">
          {events.length === 0 ? (
            <p className="empty-message">Nenhum evento criado ainda</p>
          ) : (
            events.map((event) => (
              <div key={event.id} className="event-item">
                <div className="event-info">
                  <h3>{event.name}</h3>
                  <p>{new Date(event.date).toLocaleDateString('pt-BR')}</p>
                </div>
                <div className="event-stats">
                  <span>{event.tickets_sold} ingressos</span>
                  <span>R$ {parseFloat(event.revenue).toFixed(2)}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default PromoterDashboard;
