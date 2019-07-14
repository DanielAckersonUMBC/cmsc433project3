
var on_highscore_page = 0;
var chosen_profession = "";
var TOP_TEN = 10;

function drawTitle(){
	
	// Clear out the canvas.
	var c = document.getElementById("myCanvas");
	var ctx = c.getContext("2d");
	ctx.clearRect(0,0,c.width,c.height);
	
	// Draws the title screen.	
	var c = document.getElementById("myCanvas");
	var ctx = c.getContext("2d");
	var img = document.getElementById("trail_title");
	ctx.drawImage(img, 2.5, 10);
	img = document.getElementById("title_graphic.png");
	ctx.drawImage(img, 12, 70);
	ctx.font = "16px AppleII";
	ctx.fillStyle = "white";
	ctx.fillText("You may:",80, 170);
	ctx.fillText("1.  Travel the trail", 107, 210);
	ctx.fillText("2.  Learn about the trail", 107, 229);
	ctx.fillText("3.  See the Oregon Top Ten", 107, 248);
	ctx.fillText("4.  Turn sound off", 107, 267);
	ctx.fillText("5.  Choose Management Options", 107, 286); 
	ctx.fillText("6.  End", 107, 305);
	ctx.fillText("What is your choice?",80, 345);
	ctx.drawImage(img, 12, 375);
	  	  
	// Bring the input box back.
	document.getElementById("title").setAttribute("type","text");
	document.getElementById("title").setAttribute("value","");			
	document.getElementById("title").focus();
	
	on_highscore_page = 0;
	
}

function addListeners(){

	var title = document.getElementById("title");
	if(title != null){
	
	  //alert('listening');
	  title.addEventListener("keydown", function (e) {
		  if (e.keyCode === 13) {  //checks whether the pressed key is "Enter"
			  handle_title(title.value);

		  }
	  });
	  
	  title.addEventListener("focusout", titleFocus);
	  
	}
	
	var profession = document.getElementById("prof");
	if (profession != null){
		
	  	  profession.addEventListener("keydown", function (e) {
		  if (e.keyCode === 13) {  //checks whether the pressed key is "Enter"
			  handle_prof(profession.value);
		  }
	  });	
	
	  profession.addEventListener("focusout", profFocus);
	  
	}
	
	var leader = document.getElementById("leader");
	if (leader != null){
		
	  	  leader.addEventListener("keydown", function (e) {
		  if (e.keyCode === 13) {  //checks whether the pressed key is "Enter"
			  handleLeader(profession.value);
		  }
	  });	
	
	  document.getElementById("leader").style.top = "371px";
	  document.getElementById("leader").style.left = "702px";
	  document.getElementById("leader").style.width = "300px";
	  leader.addEventListener("focusout", leaderFocus);
	  
	}
	
	document.body.onkeyup = function (e){
		
		if (e.keyCode === 32 && on_highscore_page){ // checks user presses space & is on title page.
		
			drawTitle();
			
		}
	}

}

function drawHighScores(){
	
	// Sent a request to the high scores php file.
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
	  if (this.readyState == 4 && this.status == 200) {

		json = JSON.parse(this.responseText);
		console.log(json);
		
		// Draws the highscore screen.
		var c = document.getElementById("myCanvas");
		var ctx = c.getContext("2d");	
		ctx.font = "18px AppleII";
		ctx.fillStyle = "white";
		ctx.fillText("The Oregon Top Ten", 165, 50);
		ctx.fillText("Name", 75, 130);
		ctx.fillText("Points", 250, 130);
		ctx.fillText("Rating", 430, 130);
		
		// Draw the results of the high score query.
		var n_x = 10; var p_x = 265; var r_x = 400;
		var y = 160;
		for (i = 0; i < TOP_TEN; i++){

		  ctx.fillText(json[i].name, n_x, y);
		  ctx.fillText(json[i].score, p_x, y);
		  ctx.fillText(json[i].rating, r_x, y);
		  
		  y += 20;
		
		}
		
		ctx.fillText("Press SPACE BAR to return", 120, 410);
		
	  }
	};
	xmlhttp.open("GET", "highscores_working.php", true);
	xmlhttp.send();
	
}

function drawProfPage(){
			
	var c = document.getElementById("myCanvas");
	var ctx = c.getContext("2d");
	img = document.getElementById("title_graphic.png");
	ctx.drawImage(img, 12, 10);
	ctx.font = "16px AppleII";
	ctx.fillStyle = "white";
	ctx.fillText("Many kinds of people made the",80,100);
	ctx.fillText("trip to Oregon.",80,120);
	ctx.fillText("You may:",80, 170);
	ctx.fillText("1.  Be a banker from Boston", 107, 210);
	ctx.fillText("2.  Be a carpenter from Ohio", 107, 229);
	ctx.fillText("3.  Be a farmer from Illinois", 107, 248);
	ctx.fillText("4.  Find out the differences", 107, 267);
	ctx.fillText("    between these choices", 107, 286); 
	ctx.fillText("What is your choice?",80, 345);
	ctx.drawImage(img, 12, 375);
	  	  
	// Bring the input box back.
	document.getElementById("prof").setAttribute("type","text");
	document.getElementById("prof").setAttribute("value","");			
	document.getElementById("prof").focus();
		
}

function drawLeaderName(){
	
	var c = document.getElementById("myCanvas");
	var ctx = c.getContext("2d");
	img = document.getElementById("misc");
	ctx.drawImage(img, 100, 170, 160, 105, 30, 50, 250, 200);
	img = document.getElementById("family");
	ctx.drawImage(img, 400, 100, 170, 150);
	ctx.font = "16px AppleII";
	ctx.fillStyle = "white";
	ctx.fillText("What is the first name of the",80,280);
	ctx.fillText("wagon leader?",80,300);
	
	// Bring the input box back.
	document.getElementById("leader").setAttribute("type","text");
	document.getElementById("leader").setAttribute("value","");			
	document.getElementById("leader").focus();	
	
}

function handle_title(val){ 

  if (val > 0 && val < 6){
	  
	hideTextBoxes();
	clearCanvas();
	
  }  else { return; }
  
  // No clue why, but this didn't work with
  // switch statements.
  if (val == 1){ drawProfPage(); }
  else if (val == 3) { on_highscore_page = 1; drawHighScores(); }
  
}

function handle_prof(val){
	
  if (val > 0 && val < 5){
	  
	hideTextBoxes();
	clearCanvas();
	
  }  else { return; }
  
  
  
  if (val > 0 && val < 4){ 
  
    if (val == 1){ chosen_profession = "banker"; }
	else if (val == 2){ chosen_profession = "carpenter"; }
	else { chosen_profession = "farmer"; }
    drawLeaderName(); 
	
  }
  else if (val == 4){ }
	
}

function handleLeader(){}

// Small Utility Functions
function hideTextBoxes(){ 

	document.getElementById("title").setAttribute("type","hidden");
	document.getElementById("title").setAttribute("autofocus","");
	document.getElementById("prof").setAttribute("type","hidden");
	document.getElementById("prof").setAttribute("autofocus","");
	
}

function clearCanvas(){
	
	var c = document.getElementById("myCanvas");
	var ctx = c.getContext("2d");
	ctx.clearRect(0,0,c.width,c.height);
	
}

function titleFocus(){ document.getElementById("title").focus(); }
function profFocus(){ document.getElementById("prof").focus(); }
function leaderFocus(){ document.getElementById("leader").focus(); }
