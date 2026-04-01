import React, { useState, useEffect } from 'react';
import './Dashboard.css';

const CustomerPage = ({ user }) => {
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const tokens = localStorage.getItem('token');
      const response = await fetch('http://localhost:8000/api/events/upcoming', {
        headers: {
          'Authorization': `Bearer ${tokens}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUpcomingEvents(data.events || []);
      }
    } catch (err) {
      console.error('Erro ao carregar eventos:', err);
    }
  };

  const addToCart = (event) => {
    setCart([...cart, event]);
  };

  return (
    <div className="customer-container">
      <div className="customer-header">
        <h1>Eventos Disponíveis</h1>
        <p>Bem-vindo, {user.name}!</p>
      </div>

      <div className="customer-content">
        <div className="events-explore">
          <h2>Descubra Festas</h2>
          <div className="events-grid">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="event-card">
                <div className="event-image-placeholder">🎉</div>
                <h3>{event.name}</h3>
                <p className="event-date">
                  {new Date(event.date).toLocaleDateString('pt-BR')}
                </p>
                <p className="event-price">R$ {parseFloat(event.price).toFixed(2)}</p>
                <button
                  className="btn-primary"
                  onClick={() => addToCart(event)}
                >
                  Comprar Agora
                </button>
              </div>
            ))}
          </div>
        </div>

        {cart.length > 0 && (
          <div className="cart-summary">
            <h3>Carrinho ({cart.length})</h3>
            <div className="cart-items">
              {cart.map((item, idx) => (
                <div key={idx} className="cart-item">
                  <span>{item.name}</span>
                  <span>R$ {parseFloat(item.price).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <button className="btn-primary full-width">
              Ir para Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerPage;
