<?php
require_once 'config.php';
require_once 'Database.php';
require_once 'Auth.php';

class Router {
    private $method;
    private $path;
    private $db;
    private $auth;
    private $headers;

    public function __construct() {
        $this->method = $_SERVER['REQUEST_METHOD'];
        $this->path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
        $this->path = str_replace('/api', '', $this->path);
        
        $this->db = new Database();
        $this->auth = new Auth($this->db);
        $this->headers = getallheaders();
    }

    public function route() {
        try {
            switch (true) {
                // Auth routes
                case preg_match('/^\/auth\/login$/', $this->path) && $this->method === 'POST':
                    $this->handleLogin();
                    break;

                case preg_match('/^\/auth\/register$/', $this->path) && $this->method === 'POST':
                    $this->handleRegister();
                    break;

                // Ticket routes
                case preg_match('/^\/tickets$/', $this->path) && $this->method === 'GET':
                    $this->handleGetTickets();
                    break;

                // Promoter routes
                case preg_match('/^\/promoter\/events$/', $this->path) && $this->method === 'GET':
                    $this->handleGetPromoterEvents();
                    break;

                // Athletic routes
                case preg_match('/^\/athletic\/data$/', $this->path) && $this->method === 'GET':
                    $this->handleGetAthleticData();
                    break;

                // Events routes
                case preg_match('/^\/events\/upcoming$/', $this->path) && $this->method === 'GET':
                    $this->handleGetUpcomingEvents();
                    break;

                default:
                    http_response_code(404);
                    echo json_encode(['error' => 'Rota não encontrada']);
                    break;
            }
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => $e->getMessage()]);
        }
    }

    private function handleLogin() {
        $data = json_decode(file_get_contents('php://input'), true);

        $email = $data['email'] ?? '';
        $password = $data['password'] ?? '';
        $userType = $data['userType'] ?? 'customer';

        if (!$email || !$password) {
            http_response_code(400);
            echo json_encode(['message' => 'Email e senha são obrigatórios']);
            return;
        }

        $result = $this->auth->login($email, $password, $userType);
        http_response_code(200);
        echo json_encode($result);
    }

    private function handleRegister() {
        $data = json_decode(file_get_contents('php://input'), true);

        $name = $data['name'] ?? '';
        $email = $data['email'] ?? '';
        $password = $data['password'] ?? '';
        $userType = $data['userType'] ?? 'customer';

        if (!$name || !$email || !$password) {
            http_response_code(400);
            echo json_encode(['message' => 'Todos os campos são obrigatórios']);
            return;
        }

        $result = $this->auth->register($name, $email, $password, $userType);
        http_response_code(201);
        echo json_encode($result);
    }

    private function getAuthToken() {
        $authHeader = $this->headers['Authorization'] ?? '';
        if (preg_match('/Bearer\s+(.*)/', $authHeader, $matches)) {
            return $matches[1];
        }
        throw new Exception('Token não fornecido');
    }

    private function handleGetTickets() {
        $token = $this->getAuthToken();
        $user = $this->auth->getCurrentUser($token);

        $tickets = $this->db->fetchAll(
            "SELECT * FROM tickets WHERE user_id = ? ORDER BY event_date DESC",
            [$user['id']]
        );

        echo json_encode(['tickets' => $tickets]);
    }

    private function handleGetPromoterEvents() {
        $token = $this->getAuthToken();
        $user = $this->auth->getCurrentUser($token);

        $events = $this->db->fetchAll(
            "SELECT * FROM events WHERE promoter_id = ? ORDER BY date DESC",
            [$user['id']]
        );

        $stats = $this->db->fetchOne(
            "SELECT COUNT(*) as total_events, 
                    COALESCE(SUM(tickets_sold), 0) as total_tickets_sold,
                    COALESCE(SUM(revenue), 0) as total_revenue,
                    COUNT(CASE WHEN status = 'active' THEN 1 END) as active_sales
             FROM events WHERE promoter_id = ?",
            [$user['id']]
        );

        echo json_encode([
            'events' => $events,
            'stats' => $stats
        ]);
    }

    private function handleGetAthleticData() {
        $token = $this->getAuthToken();
        $user = $this->auth->getCurrentUser($token);

        $expenses = $this->db->fetchAll(
            "SELECT * FROM expenses WHERE athletic_id = ? ORDER BY date DESC",
            [$user['id']]
        );

        $balance = $this->db->fetchOne(
            "SELECT COALESCE(balance, 0) as balance FROM athletic_account WHERE athletic_id = ?",
            [$user['id']]
        );

        echo json_encode([
            'expenses' => $expenses,
            'balance' => $balance['balance'] ?? 0
        ]);
    }

    private function handleGetUpcomingEvents() {
        $token = $this->getAuthToken();

        $events = $this->db->fetchAll(
            "SELECT * FROM events WHERE date > NOW() AND status = 'active' ORDER BY date ASC LIMIT 20"
        );

        echo json_encode(['events' => $events]);
    }
}

$router = new Router();
$router->route();
?>
