// Mock API Service - Simular backend sem precisar de servidor

const MOCK_TOKEN = 'mock-jwt-token-12345';

// Dados mock de usuários
const MOCK_USERS = {
  'joao@email.com': {
    id: 'user_customer_1',
    name: 'João Silva',
    email: 'joao@email.com',
    userType: 'customer',
  },
  'maria@promoter.com': {
    id: 'user_promoter_1',
    name: 'Maria Promoter',
    email: 'maria@promoter.com',
    userType: 'promoter',
  },
  'atletica@uni.com': {
    id: 'user_athletic_1',
    name: 'Atlética Universitária',
    email: 'atletica@uni.com',
    userType: 'athletic',
  },
};

// Dados mock de ingressos
const MOCK_TICKETS = [
  {
    id: 'ticket_001',
    event_id: 'event_001',
    event_name: 'Fest Universitária 2026',
    event_date: '2026-05-15T22:00:00',
    event_time: '22:00',
    location: 'Campus Universitário',
    ticket_type: 'Inteira',
    price: '50.00',
    status: 'active',
    qr_code: 'QR-001',
  },
  {
    id: 'ticket_002',
    event_id: 'event_002',
    event_name: 'Confraternização de Calouros',
    event_date: '2026-04-20T20:00:00',
    event_time: '20:00',
    location: 'Auditório Principal',
    ticket_type: 'Meia-Entrada',
    price: '20.00',
    status: 'active',
    qr_code: 'QR-002',
  },
];

// Dados mock de eventos
const MOCK_EVENTS = [
  {
    id: 'event_001',
    name: 'Fest Universitária 2026',
    date: '2026-05-15T22:00:00',
    location: 'Campus Universitário',
    price: '50.00',
    description: 'A maior festa da universidade',
  },
  {
    id: 'event_002',
    name: 'Confraternização de Calouros',
    date: '2026-04-20T20:00:00',
    location: 'Auditório Principal',
    price: '20.00',
    description: 'Bem-vindo aos calouros!',
  },
  {
    id: 'event_003',
    name: 'Happy Hour DJ',
    date: '2026-04-25T18:00:00',
    location: 'Bar Universitário',
    price: '35.00',
    description: 'DJ ao vivo com drinks',
  },
];

// Dados mock para promoter
const MOCK_PROMOTER_EVENTS = [
  {
    id: 'event_001',
    name: 'Fest Universitária 2026',
    date: '2026-05-15T22:00:00',
    tickets_sold: 150,
    revenue: '7500.00',
    status: 'active',
  },
  {
    id: 'event_002',
    name: 'Confraternização de Calouros',
    date: '2026-04-20T20:00:00',
    tickets_sold: 200,
    revenue: '4000.00',
    status: 'active',
  },
];

const MOCK_PROMOTER_STATS = {
  total_events: 3,
  total_tickets_sold: 350,
  total_revenue: '11500.00',
  active_sales: 3,
};

// Dados mock para atlética
const MOCK_EXPENSES = [
  {
    id: 'exp_001',
    description: 'Pagamento de DJ',
    amount: '1500.00',
    category: 'Entertainment',
    date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'exp_002',
    description: 'Aluguel de Som',
    amount: '800.00',
    category: 'Equipment',
    date: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'exp_003',
    description: 'Decoração',
    amount: '500.00',
    category: 'Decoration',
    date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

class MockAPIService {
  // Simular delay de rede
  static async delay(ms = 300) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Login
  static async login(email, password, userType) {
    await this.delay();

    const user = MOCK_USERS[email];

    if (!user || user.userType !== userType) {
      throw new Error('Credenciais inválidas');
    }

    if (password !== 'password') {
      throw new Error('Senha incorreta');
    }

    return {
      token: MOCK_TOKEN,
      user: user,
    };
  }

  // Listar tickets do usuário
  static async getTickets() {
    await this.delay();
    return {
      tickets: MOCK_TICKETS,
    };
  }

  // Listar eventos disponíveis
  static async getUpcomingEvents() {
    await this.delay();
    return {
      events: MOCK_EVENTS,
    };
  }

  // Dashboard Promoter
  static async getPromoterEvents() {
    await this.delay();
    return {
      events: MOCK_PROMOTER_EVENTS,
      stats: MOCK_PROMOTER_STATS,
    };
  }

  // Dashboard Atlética
  static async getAthleticData() {
    await this.delay();
    return {
      expenses: MOCK_EXPENSES,
      balance: 5000.00,
    };
  }
}

export default MockAPIService;
