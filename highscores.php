<!DOCTYPE html>
<html>
    <head>
        <meta charset='utf-8'/>
        <title>Oregon Trail</title>
        <link rel="stylesheet" href="proj3.css"/>
    </head>

    <?php

      try{   

        $connString = "mysql:host=localhost";
        $user = "root";

        $pdo = new PDO($connString,$user);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        // Setup the database and table, but only if they don't exist.
        $sql = "CREATE DATABASE IF NOT EXISTS OregonTrail";
        $result = $pdo->query($sql);
          
        $sql = "CREATE TABLE IF NOT EXISTS OregonTrail.HighScores (
          name varchar(20),
          score int,
          rating varchar(20))";
        $result = $pdo->query($sql);

        // This is optional. The script will populate the HighScores
        // table with a few names for display.
        // require "dbsetup.php";
 
        // If adding new players for testing.
        if(isset($_POST["submit"])){

          $drop = $_POST['drop'];
          if($drop == "YES" && strlen($_POST['pname']) == 0 && strlen($_POST['score']) == 0 && strlen($_POST['rating']) == 0){
            
            $sql = "DROP TABLE OregonTrail.HighScores";
            $result = $pdo->query($sql);

            $sql = "CREATE TABLE IF NOT EXISTS OregonTrail.HighScores (
              name varchar(20),
              score int,
              rating varchar(20))";
              $result = $pdo->query($sql);

          }
          
          else if($drop != "YES" && strlen($_POST['pname']) > 0 && strlen($_POST['score']) > 0 && strlen($_POST['rating']) > 0){

            $sql = "select count(*) from OregonTrail.HighScores";
            $result = $pdo->query($sql);
            
            // Top 10 can only have 10 players!
            if ($result->fetchColumn() < 10){

              $pname = $_POST['pname'];
              $score = $_POST['score'];
              $rating = $_POST['rating'];

              $sql = "INSERT INTO OregonTrail.HighScores 
                     (`name`, `score`, `rating`)
                     values
                     ('$pname', '$score', '$rating')";
              $result = $pdo->query($sql);

            }

            else{

              echo "Only 10 players allowed on the high core list. Drop the table.";

            }

          }

          else{

            echo "Please fill out the form in its entirety. Enter either new player data, or YES to drop the table.";

          }

        }
 
        $sql = "select name, score, rating from OregonTrail.Highscores order by score desc";
        $result = $pdo->query($sql);
        $rows = $result->fetchAll(PDO::FETCH_ASSOC); 
        $pdo = null;

      }      

      catch (PDOException $e){

        die($e->getMessage());

      }  

    ?>

    <body>
        <h1>Oregon Trail Project</h1>
        <div class="container">
            <div class="highscore">
            The Oregon Top Ten
            <div class="highscore_table">
            <table border="0">
            <?php

              echo "<br><br>";
              echo "<tr><td width='225px;'>";
              echo "Name";
              echo "</td><td width='200px;'>";
              echo "Score";
              echo "</td><td width='200px;'>";
              echo "Rating";
              echo "</td></tr>";
              echo "<tr height='40px;'></tr>";              
               
              foreach ( $rows as $row ) {

                echo "<tr><td>";
                echo($row['name']);
                echo"</td><td>";
                echo($row['score']);
                echo "</td><td>";
                echo($row['rating']);
                echo("</td></tr>\n");
              
              }

            ?>
            </div>
            </table>
            </div>
        </div>
    <h2>ADD NAMES TO HIGH SCORE LIST - FOR TESTING ONLY!</h2>
    <form method="post" action="highscores.php">
    <br>
    Name:<input type="text" name="pname"><br>
    Score:<input type="text" name="score"><br>
    Rating:<input type="text" name="rating"><br>
    Drop Table Instead? (Enter YES if so):<input type="text" name="drop"><br>
    <input type="submit" value="Submit" name="submit">
    </form>
    
    
    </body>
</html>
