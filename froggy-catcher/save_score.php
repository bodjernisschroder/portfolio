<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$servername = "localhost";
$username = "ucmp9hcjl0yge";
$password = "Serkan123";
$dbname = "db1gwzn6lgxt7h";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if(isset($_POST['username']) && isset($_POST['score'])) {
    $player_name = mysqli_real_escape_string($conn, $_POST['username']);
    $score = mysqli_real_escape_string($conn, $_POST['score']);

    $sql = "INSERT INTO `froggy` (`username`, `score`) VALUES ('$player_name', '$score')";
    
    if ($conn->query($sql) === TRUE) {
        echo "New record created successfully";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
} else {
    echo "Username or Score is not set!";
    error_log(print_r($_POST, true));
}

$conn->close();
?>

