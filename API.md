# The Marrrweco API Documentation

## Base URL
```
http://localhost:8000/api
```

## Authentication

Use Bearer token no header:
```
Authorization: Bearer <token>
```

## Endpoints

### Auth

#### Login
```
POST /auth/login
Content-Type: application/json

{
  "email": "joao@email.com",
  "password": "password",
  "userType": "customer"
}

Response:
{
  "token": "eyJhbGc...",
  "user": {
    "id": "user_customer_1",
    "name": "João Silva",
    "email": "joao@email.com",
    "userType": "customer"
  }
}
```

#### Register
```
POST /auth/register
Content-Type: application/json

{
  "name": "Novo Usuário",
  "email": "novo@email.com",
  "password": "senha123",
  "userType": "customer"
}

Response: Mesmo que login
```

### Tickets

#### Listar Meus Ingressos
```
GET /tickets
Authorization: Bearer <token>

Response:
{
  "tickets": [
    {
      "id": "ticket_001",
      "event_id": "event_001",
      "event_name": "Fest Universitária 2026",
      "event_date": "2026-05-15T22:00:00",
      "event_time": "22:00",
      "location": "Campus Universitário",
      "ticket_type": "Inteira",
      "price": "50.00",
      "status": "active"
    }
  ]
}
```

### Events

#### Ver Eventos Disponíveis
```
GET /events/upcoming
Authorization: Bearer <token>

Response:
{
  "events": [
    {
      "id": "event_001",
      "name": "Fest Universitária 2026",
      "date": "2026-05-15T22:00:00",
      "location": "Campus Universitário",
      "price": "50.00"
    }
  ]
}
```

### Promoter

#### Dashboard Promoter
```
GET /promoter/events
Authorization: Bearer <token>

Response:
{
  "events": [
    {
      "id": "event_001",
      "name": "Fest Universitária 2026",
      "date": "2026-05-15T22:00:00",
      "tickets_sold": 150,
      "revenue": "7500.00",
      "status": "active"
    }
  ],
  "stats": {
    "total_events": 3,
    "total_tickets_sold": 150,
    "total_revenue": "7500.00",
    "active_sales": 3
  }
}
```

### Athletic

#### Dados da Atlética
```
GET /athletic/data
Authorization: Bearer <token>

Response:
{
  "expenses": [
    {
      "id": "exp_001",
      "description": "Pagamento de DJ",
      "amount": "1500.00",
      "date": "2026-03-02T00:00:00",
      "category": "Entertainment"
    }
  ],
  "balance": 5000.00
}
```

## Códigos de Status

| Código | Significado |
|--------|-----------|
| 200 | OK - Requisição bem-sucedida |
| 201 | Created - Recurso criado |
| 400 | Bad Request - Dados inválidos |
| 401 | Unauthorized - Token inválido |
| 404 | Not Found - Rota não encontrada |
| 500 | Server Error - Erro no servidor |

## Tratamento de Erros

Todas as respostas de erro seguem este padrão:

```json
{
  "error": "Mensagem de erro descritiva",
  "message": "Mensagem alternativa"
}
```

## CORS

CORS está habilitado para `http://localhost:3000`

## Rate Limiting

Não há rate limiting implementado. Configure no nginx se necessário.

## Exemplos com cURL

### Login
```bash
curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "joao@email.com",
    "password": "password",
    "userType": "customer"
  }'
```

### Listar Ingressos
```bash
curl -X GET http://localhost:8000/api/tickets \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Ver Eventos Disponíveis
```bash
curl -X GET http://localhost:8000/api/events/upcoming \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## Testing com Postman

1. Importe os endpoints acima no Postman
2. Configure variável: `{{base_url}} = http://localhost:8000/api`
3. Configure variável: `{{token}} = seu_token_aqui`
4. Use `Bearer {{token}}` no header Authorization

## Autenticação JWT

O token JWT contém:
- `iss`: Issuer (API URL)
- `aud`: Audience (API URL)
- `iat`: Emitido em
- `exp`: Expiração (24 horas)
- `user_id`: ID do usuário
- `email`: Email do usuário
- `user_type`: Tipo de usuário
