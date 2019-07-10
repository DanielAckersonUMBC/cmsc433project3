<?php

$connString = "mysql:host=localhost";
$user = "root";

$pdo = new PDO($connString,$user);
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

// Setup the database and table, but only if they don't exist.
$sql = "CREATE DATABASE IF NOT EXISTS OregonTrail";
$result = $pdo->query($sql);

// Use the database
$sql = "USE OregonTrail";
$result = $pdo->query($sql);

$sql = "CREATE TABLE IF NOT EXISTS HighScores (
    name VARCHAR(20) PRIMARY KEY,
    score INT NOT NULL,
    rating VARCHAR(20) NOT NULL);";
$result = $pdo->query($sql);

// Populate the HighScores table with a few names for display.

$sql = "
INSERT IGNORE INTO HighScores (`name`, `score`, `rating`)
VALUES ('TonyStark', '9999999', 'Iron Man');

INSERT IGNORE INTO HighScores (`name`, `score`, `rating`)
VALUES ('ChrisJimenez', '750', 'Trail guide');

INSERT IGNORE INTO HighScores (`name`, `score`, `rating`)
VALUES ('DanielAckerson', '700', 'Trail guide');

INSERT IGNORE INTO HighScores (`name`, `score`, `rating`)
VALUES ('AlexWhitehead', '690', 'Trail guide');

INSERT IGNORE INTO HighScores (`name`, `score`, `rating`)
VALUES ('DustinCuocci', '400', 'Greenhorn');

INSERT IGNORE INTO HighScores (`name`, `score`, `rating`)
VALUES ('HarryPotter', '390', 'Wizard');

INSERT IGNORE INTO HighScores (`name`, `score`, `rating`)
VALUES ('JackSparrow', '375', 'Swabby');

INSERT IGNORE INTO HighScores (`name`, `score`, `rating`)
VALUES ('ScarletJohannson', '370', 'Widow');

INSERT IGNORE INTO HighScores (`name`, `score`, `rating`)
VALUES ('HarveyDent', '690', 'TwoFace');

INSERT IGNORE INTO HighScores (`name`, `score`, `rating`)
VALUES ('ChrisDavis', '100', 'Worthless');";
$result = $pdo->query($sql);

?>
