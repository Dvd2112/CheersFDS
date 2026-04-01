<?php
// Backend PHP - Configurações

// Configuração de Ambiente
define('APP_ENV', getenv('APP_ENV') ?: 'development');
define('APP_DEBUG', APP_ENV === 'development');

// Database
define('DB_HOST', getenv('DB_HOST') ?: 'localhost');
define('DB_PORT', getenv('DB_PORT') ?: '5432');
define('DB_NAME', getenv('DB_NAME') ?: 'the_marrrweco');
define('DB_USER', getenv('DB_USER') ?: 'postgres');
define('DB_PASSWORD', getenv('DB_PASSWORD') ?: 'password');

// JWT Secret
define('JWT_SECRET', getenv('JWT_SECRET') ?: 'your-super-secret-jwt-key-change-in-production');

// API
define('API_BASE_URL', getenv('API_BASE_URL') ?: 'http://localhost:8000');
define('CORS_ORIGIN', getenv('CORS_ORIGIN') ?: 'http://localhost:3000');

// Timezone
date_default_timezone_set('America/Sao_Paulo');

// Error Reporting
if (APP_DEBUG) {
    error_reporting(E_ALL);
    ini_set('display_errors', 1);
} else {
    error_reporting(E_ALL);
    ini_set('display_errors', 0);
}

// Headers padrão
header('Access-Control-Allow-Origin: ' . CORS_ORIGIN);
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}
?>
