
var on_highscore_page = 0;
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
	title = document.getElementById("title");
	if(title != null){
	
	  //alert('listening');
	  title.addEventListener("keydown", function (e) {
		  if (e.keyCode === 13) {  //checks whether the pressed key is "Enter"
			  handle_title(title.value);
		  }
	  });
	  
	  	  title.addEventListener("keydown", function (e) {
		  if (e.keyCode === 13) {  //checks whether the pressed key is "Enter"
			  handle_title(title.value);
		  }
	  });
	  
	  title.addEventListener("focusout", titleFocus);
	  
	}	

	
	document.body.onkeyup = function (e){
		
		if (e.keyCode === 32 && on_highscore_page){ // checks user presses space & is on title page.
		
			drawTitle();
			
		}
	}

}

function handle_title(val){ 
  // Start the Game
  if (val == 1){
	  window.location.replace("proj3.html");
  }
  // Navigate to high score page.
  if (val == 3){
  
    on_highscore_page = 1;
	var json;
	
    // Get rid of the input box.
	document.getElementById("title").setAttribute("type","hidden");
	document.getElementById("title").setAttribute("autofocus","");
	
	// Clear out the canvas.
	var c = document.getElementById("myCanvas");
	var ctx = c.getContext("2d");
	ctx.clearRect(0,0,c.width,c.height);
	
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
	
}

function titleFocus(){
	
	document.getElementById("title").focus();
	
}
