<?php
$host = 'localhost';
$port = 8000;

// Serve static files
$path = __DIR__;
$uri = isset($_SERVER['REQUEST_URI']) ? $_SERVER['REQUEST_URI'] : '/';
$method = isset($_SERVER['REQUEST_METHOD']) ? $_SERVER['REQUEST_METHOD'] : 'GET';

// Serve JavaScript, Images, and Views files
if (strpos($uri, '/js/') === 0 || strpos($uri, '/img/') === 0 || strpos($uri, '/views/') === 0) {
    $file = $path . $uri;
    if (file_exists($file)) {
        $mimeType = mime_content_type($file);
        header('Content-Type: ' . $mimeType);
        readfile($file);
        exit;
    }
}

// Main Page requests
if ($uri == '/' || $uri == 'index.html') {
    include __DIR__ . '/views/index.html';
    exit;
}

// Second Page requests
if ($uri == '/second') {
    include __DIR__ . '/views/second.html';
    exit;
}

// Third Page requests
if ($uri == '/third') {
    include __DIR__ .  '/views/third.html';
    exit;
}

// Question Page requests
if ($uri == '/questions') {
    include __DIR__ .  '/views/questions.html';
    exit;
}

// Gallery Page requests
if ($uri == '/gallery') {
    include __DIR__ .  '/views/gallery.html';
    exit;
}

// Handle POST requests
if ($method === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    if ($uri == '/addItem') {
        if (isset($data['item'])) {
            header('Content-Type: application/json');
            echo json_encode(['item' => $data['item']]);
            exit;
        } else {
            header('HTTP/1.1 400 Bad Request');
            echo json_encode(['error' => 'Item is required']);
            exit;
        }
    }
}

// If no routes match, return a 404 response
header('HTTP/1.1 404 Not Found');
echo "404 - Not Found";