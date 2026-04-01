-- The Marrrweco Database Schema

-- Tabela de Usuários
CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    user_type VARCHAR(50) NOT NULL CHECK (user_type IN ('customer', 'promoter', 'athletic')),
    phone VARCHAR(20),
    document_id VARCHAR(20) UNIQUE,
    bio TEXT,
    profile_picture_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE
);

-- Tabela de Eventos
CREATE TABLE IF NOT EXISTS events (
    id VARCHAR(50) PRIMARY KEY,
    promoter_id VARCHAR(50) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    date TIMESTAMP NOT NULL,
    time VARCHAR(10),
    location VARCHAR(255) NOT NULL,
    city VARCHAR(100),
    banner_url VARCHAR(500),
    tickets_sold INTEGER DEFAULT 0,
    revenue DECIMAL(10, 2) DEFAULT 0.00,
    status VARCHAR(50) NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'sold_out', 'cancelled')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Tipos de Ingressos
CREATE TABLE IF NOT EXISTS ticket_types (
    id VARCHAR(50) PRIMARY KEY,
    event_id VARCHAR(50) NOT NULL REFERENCES events(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    quantity_total INTEGER NOT NULL,
    quantity_sold INTEGER DEFAULT 0,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Ingressos
CREATE TABLE IF NOT EXISTS tickets (
    id VARCHAR(50) PRIMARY KEY,
    event_id VARCHAR(50) NOT NULL REFERENCES events(id) ON DELETE CASCADE,
    user_id VARCHAR(50) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    ticket_type_id VARCHAR(50) NOT NULL REFERENCES ticket_types(id),
    qr_code VARCHAR(500),
    price DECIMAL(10, 2) NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'used', 'refunded')),
    purchased_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    used_at TIMESTAMP,
    event_name VARCHAR(255),
    event_date TIMESTAMP,
    event_time VARCHAR(10),
    location VARCHAR(255),
    ticket_type VARCHAR(100)
);

-- Tabela de Transferências de Ingresso
CREATE TABLE IF NOT EXISTS ticket_transfers (
    id VARCHAR(50) PRIMARY KEY,
    ticket_id VARCHAR(50) NOT NULL REFERENCES tickets(id) ON DELETE CASCADE,
    from_user_id VARCHAR(50) NOT NULL REFERENCES users(id),
    to_user_id VARCHAR(50) NOT NULL REFERENCES users(id),
    transfer_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected'))
);

-- Tabela de Vendas
CREATE TABLE IF NOT EXISTS sales (
    id VARCHAR(50) PRIMARY KEY,
    event_id VARCHAR(50) NOT NULL REFERENCES events(id),
    buyer_id VARCHAR(50) NOT NULL REFERENCES users(id),
    ticket_id VARCHAR(50) NOT NULL REFERENCES tickets(id),
    amount DECIMAL(10, 2) NOT NULL,
    payment_method VARCHAR(50),
    payment_status VARCHAR(50) DEFAULT 'completed' CHECK (payment_status IN ('pending', 'completed', 'failed', 'refunded')),
    purchased_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Despesas (Atlética)
CREATE TABLE IF NOT EXISTS expenses (
    id VARCHAR(50) PRIMARY KEY,
    athletic_id VARCHAR(50) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    description VARCHAR(255) NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    category VARCHAR(100),
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    receipt_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Conta de Atlética
CREATE TABLE IF NOT EXISTS athletic_account (
    id VARCHAR(50) PRIMARY KEY,
    athletic_id VARCHAR(50) UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    balance DECIMAL(15, 2) DEFAULT 0.00,
    total_revenue DECIMAL(15, 2) DEFAULT 0.00,
    total_expenses DECIMAL(15, 2) DEFAULT 0.00,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Índices
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_user_type ON users(user_type);
CREATE INDEX idx_events_promoter_id ON events(promoter_id);
CREATE INDEX idx_events_date ON events(date);
CREATE INDEX idx_tickets_user_id ON tickets(user_id);
CREATE INDEX idx_tickets_event_id ON tickets(event_id);
CREATE INDEX idx_tickets_status ON tickets(status);
CREATE INDEX idx_expenses_athletic_id ON expenses(athletic_id);
CREATE INDEX idx_sales_event_id ON sales(event_id);
CREATE INDEX idx_sales_buyer_id ON sales(buyer_id);

-- Dados de exemplo
INSERT INTO users (id, name, email, password, user_type, document_id, bio, is_active)
VALUES 
    ('user_customer_1', 'João Silva', 'joao@email.com', '$2y$10$abcdefghijklmnopqrstuvwxyz', 'customer', '12345678901', 'Amante de festas universitárias', TRUE),
    ('user_promoter_1', 'Maria Promoter', 'maria@promoter.com', '$2y$10$abcdefghijklmnopqrstuvwxyz', 'promoter', '98765432101', 'Produtora de eventos', TRUE),
    ('user_athletic_1', 'Atlética Universitária', 'atletica@uni.com', '$2y$10$abcdefghijklmnopqrstuvwxyz', 'athletic', '11111111111', 'Atlética da universidade', TRUE);
