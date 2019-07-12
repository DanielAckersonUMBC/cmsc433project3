
 
        <script>		
		</script>
	    <?php require_once("highscores_working.php"); ?>
        <h1>Oregon Trail Project</h1>
        <div class="container">
            <div class="highscore"><br><br>
                The Oregon Top Ten
                <div class="highscore_table">
                    <table border="0">
                        <br><br>
                        <tr><td width='225px;'>
                        Name
                        </td><td width='200px;'>
                        Score
                        </td><td width='200px;'>
                        Rating
                        </td></tr>
                        <tr height='40px;'></tr>

                        <?php

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
                    </table><br><br>
					<div class="title_text">Press Space to Return to Title Screen</div>
                </div>	
            </div>
        </div>
		<!--
        <h2>ADD NAMES TO HIGH SCORE LIST - FOR TESTING ONLY!</h2>
        <form method="post" action="highscores.php">
            <br>
            Name:<input type="text" name="pname"><br>
            Score:<input type="text" name="score"><br>
            Rating:<input type="text" name="rating"><br>
            Drop Table Instead? (Enter YES if so):<input type="text" name="drop"><br>
            <input type="submit" value="Submit" name="submit">
        </form>
		-->
		

