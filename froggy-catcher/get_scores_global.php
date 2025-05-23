<?php
header("Cache-Control: no-cache, no-store, must-revalidate"); // HTTP 1.1.
header("Pragma: no-cache"); // HTTP 1.0.
header("Expires: 0"); // Proxies.

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$servername = "localhost";
$username = "ucmp9hcjl0yge";
$password = "Serkan123";
$dbname = "db1gwzn6lgxt7h";

$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    error_log("Connection failed: " . $conn->connect_error);  
    http_response_code(500);  
    header('Content-Type: application/json');
    echo json_encode(['error' => 'Database connection failed']);
    exit();
}

// Queries
$sqlTotalGames = "SELECT COUNT(*) as totalGames FROM froggy";
$sqlTotalAnimalsEaten = "SELECT SUM(score) as totalAnimalsEaten FROM froggy";
$sqlAverageAnimalsEaten = "SELECT AVG(score) as averageAnimalsEaten FROM froggy";

// Execute queries and fetch results
$totalGamesResult = $conn->query($sqlTotalGames);
$totalGames = $totalGamesResult->fetch_assoc()['totalGames'];

$totalAnimalsEatenResult = $conn->query($sqlTotalAnimalsEaten);
$totalAnimalsEaten = $totalAnimalsEatenResult->fetch_assoc()['totalAnimalsEaten'];

$averageAnimalsEatenResult = $conn->query($sqlAverageAnimalsEaten);
$averageAnimalsEaten = $averageAnimalsEatenResult->fetch_assoc()['averageAnimalsEaten'];

// Create an associative array to hold the data
$globalStats = [
    'totalGames' => $totalGames,
    'totalAnimalsEaten' => $totalAnimalsEaten,
    'averageAnimalsEaten' => $averageAnimalsEaten
];

// Set the header to signal that we're sending back JSON and encode our data
header('Content-Type: application/json');
echo json_encode($globalStats);

// Close the connection
$conn->close();
?>
