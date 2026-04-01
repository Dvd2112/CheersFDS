import React, { useState, useEffect } from 'react';
import './TicketView.css';
import APIService from '../services/api';

const TicketView = ({ user, userType }) => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedTicket, setSelectedTicket] = useState(null);

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const token = localStorage.getItem('token');
      const data = await APIService.getTickets(token);
      setTickets(data.tickets || []);
    } catch (err) {
      setError('Erro ao carregar ingressos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="ticket-container">
        <div className="loading">Carregando ingressos...</div>
      </div>
    );
  }

  return (
    <div className="ticket-container">
      <div className="ticket-header">
        <h1>Meus Ingressos</h1>
        <p>Bem-vindo, {user.name}!</p>
      </div>

      {error && <div className="error-message">{error}</div>}

      {tickets.length === 0 ? (
        <div className="empty-state">
          <p>Você não possui ingressos ainda</p>
          <a href="#" className="btn-secondary">Comprar Ingresso</a>
        </div>
      ) : (
        <div className="tickets-grid">
          {tickets.map((ticket) => (
            <div
              key={ticket.id}
              className="ticket-card"
              onClick={() => setSelectedTicket(ticket)}
            >
              <div className="ticket-mini-header">
                <h3>{ticket.event_name}</h3>
                <span className={`ticket-status ${ticket.status}`}>
                  {ticket.status === 'active' ? 'Ativo' : 'Usado'}
                </span>
              </div>

              <div className="ticket-mini-info">
                <p><strong>Data:</strong> {new Date(ticket.event_date).toLocaleDateString('pt-BR')}</p>
                <p><strong>Tipo:</strong> {ticket.ticket_type}</p>
                <p><strong>Preço:</strong> R$ {parseFloat(ticket.price).toFixed(2)}</p>
              </div>

              <div className="ticket-qr-preview">
                📱 QR Code
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedTicket && (
        <div className="modal-overlay" onClick={() => setSelectedTicket(null)}>
          <div className="ticket-modal" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close"
              onClick={() => setSelectedTicket(null)}
            >
              ✕
            </button>

            <div className="ticket-full">
              <div className="ticket-full-header">
                <h2>{selectedTicket.event_name}</h2>
                <p className="event-date">
                  {new Date(selectedTicket.event_date).toLocaleDateString('pt-BR', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>

              <div className="ticket-details">
                <div className="detail-row">
                  <span className="detail-label">Tipo de Ingresso</span>
                  <span className="detail-value">{selectedTicket.ticket_type}</span>
                </div>

                <div className="detail-row">
                  <span className="detail-label">Local</span>
                  <span className="detail-value">{selectedTicket.location}</span>
                </div>

                <div className="detail-row">
                  <span className="detail-label">Horário</span>
                  <span className="detail-value">{selectedTicket.event_time}</span>
                </div>

                <div className="detail-row">
                  <span className="detail-label">Valor</span>
                  <span className="detail-value">R$ {parseFloat(selectedTicket.price).toFixed(2)}</span>
                </div>

                <div className="detail-row">
                  <span className="detail-label">Status</span>
                  <span className={`detail-value ${selectedTicket.status}`}>
                    {selectedTicket.status === 'active' ? 'Ativo' : 'Já Utilizado'}
                  </span>
                </div>
              </div>

              <div className="ticket-qr-code">
                <div className="qr-placeholder">
                  □ □ □ □ □<br/>
                  □ QR □ □ □<br/>
                  □ □ □ □ □
                </div>
                <p className="qr-label">ID: {selectedTicket.id}</p>
              </div>

              <div className="ticket-actions">
                <button className="btn-primary">Transferir Ingresso</button>
                <button className="btn-secondary">Compartilhar</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TicketView;
