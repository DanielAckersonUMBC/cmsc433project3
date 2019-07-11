<?php


	require_once('dbsetup.php');
    try {           

        // If adding new players for testing.
        if (isset($_POST["submit"])) {

            $drop = $_POST['drop'];
            if ($drop == "YES" && strlen($_POST['pname']) == 0
                && strlen($_POST['score']) == 0 && strlen($_POST['rating']) == 0) {

                $sql = "DROP TABLE HighScores";
                $result = $pdo->query($sql);

                $sql = "CREATE TABLE IF NOT EXISTS HighScores (
                    name varchar(20),
                    score int, 
                    rating varchar(20))";
                $result = $pdo->query($sql);

            } else if ($drop != "YES" && strlen($_POST['pname']) > 0
                && strlen($_POST['score']) > 0 && strlen($_POST['rating']) > 0) {

				$sql = "select name, score, rating from HighScores order by score asc";
				$result = $pdo->query($sql);
                $rows = $result->fetchAll(PDO::FETCH_ASSOC);
				
				$low_score = $rows[0]['score'];				
				$new_score = $_POST['score'];	
				//echo($low_score);    
				
				// If the current player is in the top 10.
				if ($new_score > $low_score){
					
					$low_score_name = $rows[0]['name'];
					$low_score_rating = $rows[0]['rating'];
					$sql = "delete from HighScores where name = '$low_score_name' and score = '$low_score' and rating = '$low_score_rating'";
					$result = $pdo->query($sql);
					
					$pname = $_POST['pname'];
					$rating = $_POST['rating'];
					
					$sql = "INSERT INTO HighScores 
                        (`name`, `score`, `rating`)
                        values
                        ('$pname', '$new_score', '$rating')";
                    $result = $pdo->query($sql);
					
				}                

            } else {
                echo "Please fill out the form in its entirety. Enter either new player data, or YES to drop the table.";
            }
        }
        
    } catch (PDOException $e) {
        $pdo = null;
        die($e->getMessage());
    }  
	 
	 // No matter what, when the script runs, the results
	 // need to be displayed.
	 $sql = "select name, score, rating from HighScores order by score desc";
     $result = $pdo->query($sql);
     $rows = $result->fetchAll(PDO::FETCH_ASSOC); 
	 $json = json_encode($rows);
	 echo($json);
     $pdo = null;
	 
	 ?>
