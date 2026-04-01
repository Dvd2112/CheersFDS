import React, { useState, useEffect } from 'react';
import Login from './components/Auth';
import TicketView from './components/TicketView';
import PromoterDashboard from './pages/PromoterDashboard';
import CustomerPage from './pages/CustomerPage';
import AthleticDashboard from './pages/AthleticDashboard';
import './styles/global.css';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [userType, setUserType] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const savedUserType = localStorage.getItem('userType');
    const savedUser = localStorage.getItem('user');

    if (token && savedUser) {
      setIsLoggedIn(true);
      setUserType(savedUserType);
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogin = (userData, type) => {
    setUser(userData);
    setUserType(type);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userType');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUser(null);
    setUserType(null);
  };

  const renderContent = () => {
    if (!isLoggedIn) {
      return <Login onLogin={handleLogin} />;
    }

    switch (userType) {
      case 'customer':
        return (
          <div className="app-layout">
            <Header user={user} onLogout={handleLogout} />
            <main className="main-content">
              <CustomerPage user={user} />
              <TicketView user={user} userType={userType} />
            </main>
          </div>
        );

      case 'promoter':
        return (
          <div className="app-layout">
            <Header user={user} onLogout={handleLogout} />
            <main className="main-content">
              <PromoterDashboard user={user} />
            </main>
          </div>
        );

      case 'athletic':
        return (
          <div className="app-layout">
            <Header user={user} onLogout={handleLogout} />
            <main className="main-content">
              <AthleticDashboard user={user} />
            </main>
          </div>
        );

      default:
        return <Login onLogin={handleLogin} />;
    }
  };

  return <div className="App">{renderContent()}</div>;
}

const Header = ({ user, onLogout }) => {
  return (
    <header className="app-header">
      <div className="header-content">
        <h1 className="app-title">The Marrrweco</h1>
        <div className="header-user">
          <span className="user-name">{user.name}</span>
          <button className="btn-logout" onClick={onLogout}>
            Sair
          </button>
        </div>
      </div>
    </header>
  );
};

export default App;
