
var on_highscore_page = 0; // just for screen navigation
var chosen_profession = ""; // can be used for gameplay implications 
var leader_name = "";
var TOP_TEN = 10;
var use_default_party_names = 1;
var party_text_selector = 1;
var party1 = ""; party2 = ""; party3 = ""; party4 = "";; // ONLY used if all 4 names are entered!
var DEFAULT_PARTY_NAMES = ["Beth","Sarah","Jed","Joey"]; // used otherwise.

$( document ).ready(function() {

	drawTitle();
	addListeners();
  
});

function addListeners(){

	var title = document.getElementById("title");
	if(title != null){
	
	  //alert('listening');
	  title.addEventListener("keydown", function (e) {
		  if (e.keyCode === 13) {  //checks whether the pressed key is "Enter"
			  handleTitle(title.value);

		  }
	  });
	  
	  title.addEventListener("focusout", titleFocus);
	  
	}
	
	// SELECTED PROFESSION INPUT BOX
	var profession = document.getElementById("prof");
	if (profession != null){
		
	  	  profession.addEventListener("keydown", function (e) {
		  if (e.keyCode === 13) {  //checks whether the pressed key is "Enter"
			  handleProf(profession.value);
		  }
	  });	
	
	  profession.addEventListener("focusout", profFocus);
	  
	}
	
	// LEADER NAME INPUT BOX
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
	
	// PARTY MEMBER INPUT BOXES
	var party2 = document.getElementById("party2");
	if (party2 != null){
		
	  	  party2.addEventListener("keydown", function (e) {
		  if (e.keyCode === 13) {  //checks whether the pressed key is "Enter"
			  handleParty2(party2.value);
		  }
		  
	  });
	  
	  document.getElementById("party2").style.top = "430px";
	  document.getElementById("party2").style.left = "550px";
	  document.getElementById("party2").style.width = "300px";
	  party2.addEventListener("focusout", partyFocus);
	  
	}
	
	var party3 = document.getElementById("party3");
	if (party3 != null){
		
	  	  party3.addEventListener("keydown", function (e) {
		  if (e.keyCode === 13) {  //checks whether the pressed key is "Enter"
			  handleParty3(party3.value);
		  }
	  });	
	
	  document.getElementById("party3").style.top = "450px";
	  document.getElementById("party3").style.left = "550px";
	  document.getElementById("party3").style.width = "300px";
	  party3.addEventListener("focusout", partyFocus);
	  
	}

	var party4 = document.getElementById("party4");
	if (party4 != null){
		
	  	  party4.addEventListener("keydown", function (e) {
		  if (e.keyCode === 13) {  //checks whether the pressed key is "Enter"
			  handleParty4(party4.value);
		  }
	  });	
	
	  document.getElementById("party4").style.top = "470px";
	  document.getElementById("party4").style.left = "550px";
	  document.getElementById("party4").style.width = "300px";
	  party4.addEventListener("focusout", partyFocus);
	  
	}
	
	var party5 = document.getElementById("party5");
	if (party5 != null){
		
	  	  party5.addEventListener("keydown", function (e) {
		  if (e.keyCode === 13) {  //checks whether the pressed key is "Enter"
			  handleParty5(party5.value);
		  }
	  });	
	
	  document.getElementById("party5").style.top = "490px";
	  document.getElementById("party5").style.left = "550px";
	  document.getElementById("party5").style.width = "300px";
	  party5.addEventListener("focusout", partyFocus);
	  
	}	
	
	var party_correct = document.getElementById("party_correct");
	if (party_correct != null){
		
	  	  party_correct.addEventListener("keydown", function (e) {
		  if (e.keyCode === 13) {  //checks whether the pressed key is "Enter"
			  handlePartyCorrect(party_correct.value);
		  }
	  });	
	
	  document.getElementById("party_correct").style.top = "510px";
	  document.getElementById("party_correct").style.left = "857px";
	  party_correct.addEventListener("focusout", partyCorrectFocus);
	  
	}	
	
	document.body.onkeyup = function (e){
		
		if (e.keyCode === 32 && on_highscore_page){ // checks user presses space & is on title page.
		
			drawTitle();
			
		}
	}

}

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
	xmlhttp.open("GET", "scripts/highscores_working.php", true);
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

function drawPartyNames(){

    party_text_selector = 1;
	var c = document.getElementById("myCanvas");
	var ctx = c.getContext("2d");
	img = document.getElementById("misc");
	ctx.drawImage(img, 100, 170, 160, 105, 30, 50, 250, 200);
	img = document.getElementById("family");
	ctx.drawImage(img, 400, 100, 170, 150);
	ctx.font = "16px AppleII";
	ctx.fillStyle = "white";
	ctx.fillText("What are the first names of the",80,280);
	ctx.fillText("four other members in your party?",80,300);
	ctx.fillText("1.",80,340);
	ctx.fillText("2.",80,360);
	ctx.fillText("3.",80,380);
	ctx.fillText("4.",80,400);
	ctx.fillText("5.",80,420);
	ctx.fillText("(Enter names or press Enter)",115,440);
	
	// Enable the input boxes.
	document.getElementById("party1").setAttribute("type","text");
	document.getElementById("party1").setAttribute("value",leader_name);
	document.getElementById("party1").readOnly = true;	
	document.getElementById("party1").style.top = "410px";
	document.getElementById("party1").style.left = "550px";
	document.getElementById("party1").style.width = "300px";
	enableParty();
	document.getElementById("party2").focus();	
	
}

function drawStartMonth(){

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

function verifyParty(){
	
	clearCanvas();
    party_text_selector = 0;
	var c = document.getElementById("myCanvas");
	var ctx = c.getContext("2d");
	img = document.getElementById("misc");
	ctx.drawImage(img, 100, 170, 160, 105, 30, 50, 250, 200);
	img = document.getElementById("family");
	ctx.drawImage(img, 400, 100, 170, 150);
	ctx.font = "16px AppleII";
	ctx.fillStyle = "white";
	ctx.fillText("What are the first names of the",80,280);
	ctx.fillText("four other members in your party?",80,300);
	ctx.fillText("1.",80,340);
	ctx.fillText("2.",80,360);
	ctx.fillText("3.",80,380);
	ctx.fillText("4.",80,400);
	ctx.fillText("5.",80,420);
	ctx.fillText("Are these names correct?",80,440);
	
	document.getElementById("party_correct").setAttribute("type","text");
	document.getElementById("party_correct").setAttribute("value","");
	document.getElementById("party_correct").focus();
	
}

function handleTitle(val){ 

  if (val > 0 && val < 6 && val.length == 1){
	  
	hideTextBoxes();
	clearCanvas();
	
  }  else { return; }
  
  // No clue why, but this didn't work with
  // switch statements.
  if (val == 1){ drawProfPage(); }
  else if (val == 3) { on_highscore_page = 1; drawHighScores(); }
  
}

function handleProf(val){
	
  if (val > 0 && val < 5 && val.length == 1){
	  
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

function handleLeader(){
	
	leader_name = document.getElementById('leader').value;
	
	if (leader_name.length > 0){
		
	  hideTextBoxes();
	  clearCanvas();
	  drawPartyNames();
	  
	} else { return; }
	
}

function handleParty2(val){

  if (val.length > 0){
	  
    party1 = document.getElementById("party2").value;
    party_text_selector = 2;
    document.getElementById("party3").focus();
	
  }  else {
	  
	  party1 = DEFAULT_PARTY_NAMES[0];
	  document.getElementById("party2").setAttribute("value",party1);
	  party2 = DEFAULT_PARTY_NAMES[1];
	  document.getElementById("party3").setAttribute("value",party2);
	  party3 = DEFAULT_PARTY_NAMES[2];
	  document.getElementById("party4").setAttribute("value",party3);
	  party4 = DEFAULT_PARTY_NAMES[3];
	  document.getElementById("party5").setAttribute("value",party4);
	  verifyParty();	  
	  
  }    
	
}

function handleParty3(val){

  if (val.length > 0){
	  
    party2 = document.getElementById("party3").value;
    party_text_selector = 3;
    document.getElementById("party4").focus();  
	
  }  else { 
  
	  party2 = DEFAULT_PARTY_NAMES[1];
	  document.getElementById("party3").setAttribute("value",party2);
	  party3 = DEFAULT_PARTY_NAMES[2];
	  document.getElementById("party4").setAttribute("value",party3);
	  party4 = DEFAULT_PARTY_NAMES[3];
	  document.getElementById("party5").setAttribute("value",party4);
	  verifyParty();	
	  
  }  
	
}

function handleParty4(val){

  if (val.length > 0){
	  
    party3 = document.getElementById("party4").value;
    party_text_selector = 4;
    document.getElementById("party5").focus();  
	
  }  else {
	  
	  party3 = DEFAULT_PARTY_NAMES[2];
	  document.getElementById("party4").setAttribute("value",party3);
	  party4 = DEFAULT_PARTY_NAMES[3];
	  document.getElementById("party5").setAttribute("value",party4);
	  verifyParty();	
	  
  }   
	
}

function handleParty5(val){

  if (val.length > 0){
	  
    party4 = document.getElementById("party5").value;
    verifyParty(); 
	
  }  else {
	  
	  party4 = DEFAULT_PARTY_NAMES[3];
	  document.getElementById("party5").setAttribute("value",party4);
	  verifyParty();	
	  
  }   
	
}

function handlePartyCorrect(val){

  if (val.length > 0){
  
    if (val == "Y" || val == "y"){
		
		clearCanvas();
		hideTextBoxes();
		
	}
	else if (val == "N" || val == "n"){
	 
	  party1 = party2 = party3 = party4 = "";
	  clearCanvas();
	  hideTextBoxes();
	  drawPartyNames();
	
	}
  
  } 
  else { return; }
	
}

// Small Utility Functions
function hideTextBoxes(){ 

	document.getElementById("title").setAttribute("type","hidden");
	document.getElementById("title").setAttribute("autofocus","");
	document.getElementById("prof").setAttribute("type","hidden");
	document.getElementById("prof").setAttribute("autofocus","");	
	document.getElementById("leader").setAttribute("type","hidden");
	document.getElementById("leader").setAttribute("autofocus","");
	document.getElementById("party1").setAttribute("type","hidden");
	document.getElementById("party1").setAttribute("autofocus","");
	document.getElementById("party2").setAttribute("type","hidden");
	document.getElementById("party2").setAttribute("autofocus","");
	document.getElementById("party3").setAttribute("type","hidden");
	document.getElementById("party3").setAttribute("autofocus","");
	document.getElementById("party4").setAttribute("type","hidden");
	document.getElementById("party4").setAttribute("autofocus","");
	document.getElementById("party5").setAttribute("type","hidden");
	document.getElementById("party5").setAttribute("autofocus","");
	document.getElementById("party_correct").setAttribute("type","hidden");
	document.getElementById("party_correct").setAttribute("autofocus","");
	
}

function showPartyTextBoxes(){

	document.getElementById("party1").setAttribute("type","text");
	document.getElementById("party1").setAttribute("value",leader_name);
	
	document.getElementById("party2").setAttribute("type","text");
	document.getElementById("party2").setAttribute("value",party1);
	
	document.getElementById("party3").setAttribute("type","text");
	document.getElementById("party3").setAttribute("value",party2);
	
	document.getElementById("party4").setAttribute("type","text");
	document.getElementById("party4").setAttribute("value",party3);
	
	document.getElementById("party5").setAttribute("type","text");
	document.getElementById("party5").setAttribute("value",party4);
	
}

function clearCanvas(){
	
	var c = document.getElementById("myCanvas");
	var ctx = c.getContext("2d");
	ctx.clearRect(0,0,c.width,c.height);
	
}

function titleFocus(){ document.getElementById("title").focus(); }
function profFocus(){ document.getElementById("prof").focus(); }
function leaderFocus(){ document.getElementById("leader").focus(); }
function partyCorrectFocus() { document.getElementById("party_correct").focus(); }

function enableParty(){

  document.getElementById("party2").setAttribute("type","text");
  document.getElementById("party2").setAttribute("value","");
  document.getElementById("party3").setAttribute("type","text");
  document.getElementById("party3").setAttribute("value","");
  document.getElementById("party4").setAttribute("type","text");
  document.getElementById("party4").setAttribute("value","");
  document.getElementById("party5").setAttribute("type","text");
  document.getElementById("party5").setAttribute("value","");
	
}

function partyFocus(){

  if (party_text_selector == 1){ document.getElementById("party2").focus(); }
  else if (party_text_selector == 2){ document.getElementById("party3").focus(); }
  else if (party_text_selector == 3){ document.getElementById("party4").focus(); }
  else if (party_text_selector == 4){ document.getElementById("party5").focus(); }
	
}