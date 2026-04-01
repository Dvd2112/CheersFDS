-- Dados de teste para The Marrrweco

-- Inserir mais eventos de exemplo
INSERT INTO events (id, promoter_id, name, description, date, time, location, city, status)
VALUES 
    ('event_001', 'user_promoter_1', 'Fest Universitária 2026', 'A maior festa da universidade', '2026-05-15 22:00:00', '22:00', 'Campus Universitário', 'São Paulo', 'active'),
    ('event_002', 'user_promoter_1', 'Confraternização de Calouros', 'Bem-vindo aos calouros!', '2026-04-20 20:00:00', '20:00', 'Auditório Principal', 'São Paulo', 'active'),
    ('event_003', 'user_promoter_1', 'Happy Hour DJ', 'DJ ao vivo com drinks', '2026-04-25 18:00:00', '18:00', 'Bar Universitário', 'São Paulo', 'active');

-- Inserir tipos de ingressos
INSERT INTO ticket_types (id, event_id, name, price, quantity_total, description)
VALUES 
    ('type_001', 'event_001', 'Inteira', 50.00, 500, 'Ingresso inteiro para o evento'),
    ('type_002', 'event_001', 'Meia-Entrada', 25.00, 300, 'Meia-entrada (estudante)'),
    ('type_003', 'event_002', 'Cortesia', 0.00, 100, 'Entrada gratuita'),
    ('type_004', 'event_002', 'Meia-Entrada', 20.00, 200, 'Meia-entrada'),
    ('type_005', 'event_003', 'Inteira', 35.00, 200, 'Ingresso inteiro');

-- Inserir ingressos de exemplo
INSERT INTO tickets (id, event_id, user_id, ticket_type_id, price, status, event_name, event_date, event_time, location, ticket_type)
VALUES 
    ('ticket_001', 'event_001', 'user_customer_1', 'type_001', 50.00, 'active', 'Fest Universitária 2026', '2026-05-15 22:00:00', '22:00', 'Campus Universitário', 'Inteira'),
    ('ticket_002', 'event_002', 'user_customer_1', 'type_004', 20.00, 'active', 'Confraternização de Calouros', '2026-04-20 20:00:00', '20:00', 'Auditório Principal', 'Meia-Entrada');

-- Inserir despesas da atlética
INSERT INTO expenses (id, athletic_id, description, amount, category, date)
VALUES 
    ('exp_001', 'user_athletic_1', 'Pagamento de DJ', 1500.00, 'Entertainment', NOW() - INTERVAL '30 days'),
    ('exp_002', 'user_athletic_1', 'Aluguel de Som', 800.00, 'Equipment', NOW() - INTERVAL '20 days'),
    ('exp_003', 'user_athletic_1', 'Decoração', 500.00, 'Decoration', NOW() - INTERVAL '10 days');

-- Criar conta da atlética
INSERT INTO athletic_account (id, athletic_id, balance, total_revenue, total_expenses)
VALUES 
    ('acc_athletic_1', 'user_athletic_1', 5000.00, 15000.00, 10000.00);
