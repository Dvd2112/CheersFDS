<?php
require_once 'config.php';

class Auth {
    private $db;

    public function __construct($database) {
        $this->db = $database;
    }

    public function login($email, $password, $userType) {
        // Buscar usuário no banco
        $user = $this->db->fetchOne(
            "SELECT * FROM users WHERE email = ? AND user_type = ?",
            [$email, $userType]
        );

        if (!$user) {
            throw new Exception('Usuário não encontrado');
        }

        if (!password_verify($password, $user['password'])) {
            throw new Exception('Senha incorreta');
        }

        // Gerar JWT token
        $token = $this->generateToken($user);

        return [
            'token' => $token,
            'user' => [
                'id' => $user['id'],
                'name' => $user['name'],
                'email' => $user['email'],
                'userType' => $user['user_type'],
            ]
        ];
    }

    public function register($name, $email, $password, $userType) {
        // Verificar se usuário já existe
        $existing = $this->db->fetchOne(
            "SELECT * FROM users WHERE email = ?",
            [$email]
        );

        if ($existing) {
            throw new Exception('Email já cadastrado');
        }

        $hashedPassword = password_hash($password, PASSWORD_BCRYPT);
        $id = uniqid();

        $this->db->execute(
            "INSERT INTO users (id, name, email, password, user_type, created_at) 
             VALUES (?, ?, ?, ?, ?, NOW())",
            [$id, $name, $email, $hashedPassword, $userType]
        );

        $user = $this->db->fetchOne("SELECT * FROM users WHERE id = ?", [$id]);
        $token = $this->generateToken($user);

        return [
            'token' => $token,
            'user' => [
                'id' => $user['id'],
                'name' => $user['name'],
                'email' => $user['email'],
                'userType' => $user['user_type'],
            ]
        ];
    }

    public function generateToken($user) {
        $header = json_encode(['typ' => 'JWT', 'alg' => 'HS256']);
        $payload = json_encode([
            'iss' => API_BASE_URL,
            'aud' => API_BASE_URL,
            'iat' => time(),
            'exp' => time() + (24 * 60 * 60), // 24 horas
            'user_id' => $user['id'],
            'email' => $user['email'],
            'user_type' => $user['user_type'],
        ]);

        $base64UrlHeader = rtrim(strtr(base64_encode($header), '+/', '-_'), '=');
        $base64UrlPayload = rtrim(strtr(base64_encode($payload), '+/', '-_'), '=');

        $signature = hash_hmac('sha256', $base64UrlHeader . '.' . $base64UrlPayload, JWT_SECRET, true);
        $base64UrlSignature = rtrim(strtr(base64_encode($signature), '+/', '-_'), '=');

        return $base64UrlHeader . '.' . $base64UrlPayload . '.' . $base64UrlSignature;
    }

    public function validateToken($token) {
        try {
            $parts = explode('.', $token);
            if (count($parts) !== 3) {
                throw new Exception('Token inválido');
            }

            list($header, $payload, $signature) = $parts;

            // Adicionar padding se necessário
            $payload .= str_repeat('=', 4 - strlen($payload) % 4);

            $decodedPayload = json_decode(base64_decode(strtr($payload, '-_', '+/')), true);

            if (!$decodedPayload || !isset($decodedPayload['exp'])) {
                throw new Exception('Token decodificação falhou');
            }

            if ($decodedPayload['exp'] < time()) {
                throw new Exception('Token expirado');
            }

            // Verificar assinatura
            $expectedSignature = hash_hmac('sha256', $header . '.' . $payload, JWT_SECRET, true);
            $expectedSignature = rtrim(strtr(base64_encode($expectedSignature), '+/', '-_'), '=');

            if ($signature !== $expectedSignature) {
                throw new Exception('Assinatura inválida');
            }

            return $decodedPayload;
        } catch (Exception $e) {
            throw new Exception('Token validation failed: ' . $e->getMessage());
        }
    }

    public function getCurrentUser($token) {
        $payload = $this->validateToken($token);
        return $this->db->fetchOne(
            "SELECT * FROM users WHERE id = ?",
            [$payload['user_id']]
        );
    }
}
?>
