import MockAPIService from './MockAPI';

class APIService {
  constructor() {
    this.baseURL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';
    this.useMock = process.env.REACT_APP_USE_MOCK === 'true' || !this.isBackendAvailable();
  }

  async isBackendAvailable() {
    try {
      const response = await fetch(this.baseURL.replace('/api', '/health'), {
        timeout: 2000,
      });
      return response.ok;
    } catch (error) {
      return false;
    }
  }

  async login(email, password, userType) {
    if (this.useMock) {
      return MockAPIService.login(email, password, userType);
    }

    try {
      const response = await fetch(`${this.baseURL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          userType,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        return data;
      } else {
        throw new Error(data.message || 'Erro ao fazer login');
      }
    } catch (error) {
      console.error('API Error:', error);
      // Fallback para mock
      return MockAPIService.login(email, password, userType);
    }
  }

  async getTickets(token) {
    if (this.useMock) {
      return MockAPIService.getTickets();
    }

    try {
      const response = await fetch(`${this.baseURL}/tickets`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        return data;
      } else {
        throw new Error(data.message || 'Erro ao carregar ingressos');
      }
    } catch (error) {
      console.error('API Error:', error);
      return MockAPIService.getTickets();
    }
  }

  async getUpcomingEvents(token) {
    if (this.useMock) {
      return MockAPIService.getUpcomingEvents();
    }

    try {
      const response = await fetch(`${this.baseURL}/events/upcoming`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        return data;
      } else {
        throw new Error(data.message || 'Erro ao carregar eventos');
      }
    } catch (error) {
      console.error('API Error:', error);
      return MockAPIService.getUpcomingEvents();
    }
  }

  async getPromoterEvents(token) {
    if (this.useMock) {
      return MockAPIService.getPromoterEvents();
    }

    try {
      const response = await fetch(`${this.baseURL}/promoter/events`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        return data;
      } else {
        throw new Error(data.message || 'Erro ao carregar dados');
      }
    } catch (error) {
      console.error('API Error:', error);
      return MockAPIService.getPromoterEvents();
    }
  }

  async getAthleticData(token) {
    if (this.useMock) {
      return MockAPIService.getAthleticData();
    }

    try {
      const response = await fetch(`${this.baseURL}/athletic/data`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        return data;
      } else {
        throw new Error(data.message || 'Erro ao carregar dados');
      }
    } catch (error) {
      console.error('API Error:', error);
      return MockAPIService.getAthleticData();
    }
  }
}

export default new APIService();
