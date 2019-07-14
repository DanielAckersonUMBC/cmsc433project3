

var c;
var ctx;


var menu_enum = { MAIN_MENU: 0, HIGH_SCORE: 1, GAME_INFO1: 2, GAME_INFO2: 3, GAME_INFO3: 4, GAME_INFO4: 5,
GAME_INFO5: 6, GAME_INFO6: 7, GAME_INFO7: 8, EXP_POINTS1: 9, EXP_POINTS2: 10, EXP_POINTS3: 11,
EXP_PROF: 12, EXP_MONTH: 13, SUPPLY_MSG: 14, MATT_MSG: 15, MATT_WELCOME: 16, MATT_WELCOME2: 17,
MATT_STOREFRONT: 18, MATT_GOODBYE: 19, INDEPENDENCE: 20, KANSAS_RIVER:21, BIG_BLUE_RIVER: 22,
FORT_KEARNEY: 23, CHIMNEY_ROCK: 24, FORT_LARAMIE: 25, INDEPENDENCE_ROCK: 26, SOUTH_PASS: 27,
GREEN_RIVER: 28, FORT_BRIDGER: 29, SODA_SPRINGS: 30, FORT_HALL: 31, SNAKE_RIVER: 32, FORT_BOISE: 33,
BLUE_MOUNTAINS: 34, FORT_WALLA_WALLA: 35, DALLES: 36, COLUMBIA_RIVER: 37, TOLL_ROAD:38, OREGON_CITY: 39,
REVIEW_SUPPLIES: 40, REVIEW_SUPPLIES_STORE: 41, CHECK_MAP: 42, CHANGE_PACE: 43, CHANGE_RATIONS: 44,
ATTEMPT_TRADE: 45, FISHING: 46, OUT_OF_BAIT: 47 }; 

var weather = [ "cool", "warm", "fair", "raining", "snowing" ];

var game_data = {

	menu_counter: 22,
	current_month: "March",
	current_day: 1,
	current_year:  1848,
	current_rations: "filling",
	current_health: "good",
	num_oxen: 12,
	num_clothing: 10,
	num_food: 1000,
	num_worms: 40,
	num_wagon_wheels: 4,
	num_wagon_axles: 4,
	num_wagon_tongues: 4,
	num_party_alive: 5,
	current_money: 1600,
	current_pace: "steady",
	at_general_store: 0
	
}

$( document ).ready(function() {
	
	c = document.getElementById("myCanvas");
	ctx = c.getContext("2d");
	
	var size_up_text = document.getElementById("size_up");
	size_up_text.addEventListener("focusout", sizeUpFocus); 	
	if (size_up_text != null){
		
	  	  size_up_text.addEventListener("keydown", function (e) {
		  if (e.keyCode === 13) {  //checks whether the pressed key is "Enter"
			  handleSizeUp(size_up_text.value);
		  }
		  

	  });	
	  
	}
	
	var change_pace = document.getElementById("change_pace");
	change_pace.addEventListener("focusout",changePaceFocus);
	if (change_pace != null){
		
	  	  change_pace.addEventListener("keydown", function (e) {
		  if (e.keyCode === 13) {  //checks whether the pressed key is "Enter"
			  handleChangePace(change_pace.value);
		  }
		  

	  });	
	  
	}
	
	var change_ration = document.getElementById("change_ration");
	change_ration.addEventListener("focusout",changeRationFocus);
	if (change_ration != null){
		
	  	  change_ration.addEventListener("keydown", function (e) {
		  if (e.keyCode === 13) {  //checks whether the pressed key is "Enter"
			  handleChangeRation(change_ration.value);
		  }
		  

	  });	
	  
	}
	
	var rest = document.getElementById("rest_text");
	rest.addEventListener("focusout",changeRationFocus);
	if (rest != null){
		
	  	  rest.addEventListener("keydown", function (e) {
		  if (e.keyCode === 13) {  //checks whether the pressed key is "Enter"
			  handleRest(rest.value, 1);
		  }
		  

	  });	
	  
	}
	
	var trade = document.getElementById("trade_text");
	trade.addEventListener("focusout",attemptTradeFocus);
	if (trade != null){
		
	  	  trade.addEventListener("keydown", function (e) {
		  if (e.keyCode === 13) {  //checks whether the pressed key is "Enter"
			  handleTrade(trade.value);
		  }
		  

	  });	
	  
	}
	
	var fishing = document.getElementById("fishing");
	fishing.addEventListener("focusout",fishingFocus);
	if (fishing != null){
		
	  	  fishing.addEventListener("keydown", function (e) {
		  if (e.keyCode === 13) {  //checks whether the pressed key is "Enter"
			  handleFish(fishing.value);
		  }
		  

	  });	
	  
	}
	
	document.body.onkeyup = function (e){
		
		if (e.keyCode == 32 && game_data.menu_counter == menu_enum.REVIEW_SUPPLIES && 
		    game_data.at_general_store == 1){ drawSizeUpStore(); }
		else if (e.keyCode == 32 && game_data.menu_counter == menu_enum.REVIEW_SUPPLIES && 
		    game_data.at_general_store == 0){ drawSizeUpMenu(); }
		else if (e.keyCode == 32 && game_data.menu_counter == menu_enum.FISHING && game_data.at_general_store == 1
		         && Number(game_data.num_worms) == 0){ drawSizeUpStore(); }
		else if (e.keyCode == 32 && game_data.menu_counter == menu_enum.FISHING && game_data.at_general_store == 0
		         && Number(game_data.num_worms) == 0){ drawSizeUpMenu(); }
		else if(e.keyCode == 32 && game_data.menu_counter == menu_enum.OUT_OF_BAIT && game_data.at_general_store == 1){	drawSizeUpStore(); }
		else if(e.keyCode == 32 && game_data.menu_counter == menu_enum.OUT_OF_BAIT && game_data.at_general_store == 0){	drawSizeUpMenu(); }
		else if(e.keyCode == 32 && game_data.menu_counter == menu_enum.FISH_SUCCESS && game_data.at_general_store == 1){ drawSizeUpStore(); }
		else if(e.keyCode == 32 && game_data.menu_counter == menu_enum.FISH_SUCCESS && game_data.at_general_store == 0){ drawSizeUpMenu(); }
		
	}
	
	drawSizeUpMenu();
  
});

function drawSizeUpMenu(){
		  
      clearCanvas();
	  hideTextBoxes();
	  var random = Math.floor(Math.random() * (5));
	  ctx.font = "16px AppleII";
	  ctx.fillStyle = "white";
	  ctx.fillText(game_data.current_month + " " + game_data.current_day + ", " + game_data.current_year, 225, 30);
	  ctx.fillText("You may:", 30, 180);
	  ctx.fillText("1.  Continue on the trail", 100, 220);
	  ctx.fillText("2.  Check supplies", 100, 240);
	  ctx.fillText("3.  Look at map", 100, 260);
	  ctx.fillText("4.  Change pace", 100, 280);
	  ctx.fillText("5.  Change food rations", 100, 300);
	  ctx.fillText("6.  Stop to rest", 100, 320);
	  ctx.fillText("7.  Attempt to trade", 100, 340);
	  ctx.fillText("8.  Fish for food", 100, 360);
	  ctx.fillText("What is your choice?", 30, 460);
	  
	  ctx.beginPath();		
	  ctx.fillRect(30, 50, 580, 100); 
      ctx.stroke();
	  ctx.fillStyle = "black";
	  ctx.fillText("Weather: " + weather[random], 45, 75);
	  ctx.fillText("Health: " + game_data.current_health, 45, 95);
	  ctx.fillText("Pace: " + game_data.current_pace, 45, 115);
	  ctx.fillText("Rations: " + game_data.current_rations, 45, 135);

      var size_up_text = document.getElementById("size_up");
	  size_up_text.style.top = "531px";
	  size_up_text.style.left = "750px";
	  size_up_text.setAttribute("type","text");
	  size_up_text.setAttribute("value","");
	  size_up_text.focus();
		
}

function drawSizeUpMenuRest(){

      clearCanvas();
	  hideTextBoxes();
	  var random = Math.floor(Math.random() * (5));
	  ctx.font = "16px AppleII";
	  ctx.fillStyle = "white";
	  ctx.fillText(game_data.current_month + " " + game_data.current_day + ", " + game_data.current_year, 225, 30);
	  ctx.fillText("How many days would you", 100, 435);
	  ctx.fillText("like to rest?", 100, 455);
	  ctx.fillText("You may:", 30, 180);
	  ctx.fillText("1.  Continue on the trail", 100, 220);
	  ctx.fillText("2.  Check supplies", 100, 240);
	  ctx.fillText("3.  Look at map", 100, 260);
	  ctx.fillText("4.  Change pace", 100, 280);
	  ctx.fillText("5.  Change food rations", 100, 300);
	  ctx.fillText("6.  Stop to rest", 100, 320);
	  ctx.fillText("7.  Attempt to trade", 100, 340);
	  ctx.fillText("8.  Fish for food", 100, 360);
	  
	  ctx.beginPath();		
	  ctx.fillRect(30, 50, 580, 100); 
      ctx.stroke();
	  ctx.fillStyle = "black";
	  ctx.fillText("Weather: " + weather[random], 45, 75);
	  ctx.fillText("Health: " + game_data.current_health, 45, 95);
	  ctx.fillText("Pace: " + game_data.current_pace, 45, 115);
	  ctx.fillText("Rations: " + game_data.current_rations, 45, 135);	  
	  
	  // Rest box
	  ctx.beginPath();		
	  ctx.lineWidth = "6";
	  ctx.strokeStyle = "white";
	  ctx.fillRect(110, 370, 420, 50); 
      ctx.stroke();	  

      var rest_text = document.getElementById("rest_text");
	  rest_text.style.top = "525px";
	  rest_text.style.left = "723px";
	  rest_text.setAttribute("type","text");
	  rest_text.setAttribute("value","");
	  rest_text.focus();
	  
}

function drawCheckSupplies(){
  
  clearCanvas();
  hideTextBoxes();
  ctx.font = "16px AppleII";
  ctx.fillStyle = "white";
  ctx.fillText("Your Supplies", 225, 30);
  ctx.fillText("oxen", 180, 70);
  ctx.fillText("sets of clothing", 180, 90);
  ctx.fillText("worms", 180, 110);
  ctx.fillText("wagon wheels", 180, 130);
  ctx.fillText("wagon axles", 180, 150);
  ctx.fillText("wagon tongues", 180, 170);
  ctx.fillText("pounds of food", 180, 190);
  ctx.fillText("money left", 180, 210);
  
  ctx.fillText(game_data.num_oxen, 470, 70);
  ctx.fillText(game_data.num_clothing, 470, 90);
  ctx.fillText(game_data.num_worms, 470, 110);
  ctx.fillText(game_data.num_wagon_wheels, 470, 130);
  ctx.fillText(game_data.num_wagon_axles, 470, 150);
  ctx.fillText(game_data.num_wagon_tongues, 470, 170);
  ctx.fillText(game_data.num_food, 470, 190);
  ctx.fillText("$" + game_data.current_money.toFixed(2), 470, 210);
  
  img = document.getElementById("matt_food_img");
  ctx.drawImage(img, 30, 30, 100, 100);
  img = document.getElementById("matt_parts_img");
  ctx.drawImage(img, 45, 160, 100, 100);
  img = document.getElementById("matt_oxen_img");
  ctx.drawImage(img, 60, 290, 160, 100);
  img = document.getElementById("matt_clothing_img");
  ctx.drawImage(img, 230, 260, 160, 100);
  img = document.getElementById("matt_worm_img");
  ctx.drawImage(img, 420, 290, 160, 100);
  
  ctx.fillText("Press SPACE BAR to continue", 135, 460);
  game_data.menu_counter = menu_enum.REVIEW_SUPPLIES;
	
}

function drawCheckMap(){

  clearCanvas();
  hideTextBoxes();
  img = document.getElementById("trail_map");
  ctx.drawImage(img, 0, 0, 640, 480);
  game_data.menu_counter = menu_enum.CHECK_MAP;
	
}

function drawChangePace(){

	clearCanvas();
	hideTextBoxes();
	img = document.getElementById("title_graphic.png");
	ctx.drawImage(img, 12, 10);
	ctx.font = "16px AppleII";
	ctx.fillStyle = "white";
	ctx.fillText("Change pace",240,90);
	ctx.fillText('(currently "' + game_data.current_pace + '")',180,110);
	ctx.fillText("The pace at which you travel",120,150);
	ctx.fillText("can change. Your choices are:",120,170);
	ctx.fillText("1.  a steady pace", 140, 210);
	ctx.fillText("2.  a strenuous pace", 140, 230);
	ctx.fillText("3.  a grueling pace", 140, 250);
	ctx.fillText("What is your choice?",120,290);
	ctx.drawImage(img, 12, 375);
    
	var change_pace = document.getElementById("change_pace");
	change_pace.style.top = "361px";
	change_pace.style.left = "840px";
    change_pace.setAttribute("type","text");
	change_pace.setAttribute("value","");
	change_pace.focus();
	
	game_data.menu_counter = menu_enum.CHANGE_PACE;
	
}

function drawChangeRations(){

	clearCanvas();
	hideTextBoxes();
	img = document.getElementById("title_graphic.png");
	ctx.drawImage(img, 12, 10);
	ctx.font = "16px AppleII";
	ctx.fillStyle = "white";
	ctx.fillText("Change food rations",190,90);
	ctx.fillText('(currently "' + game_data.current_rations + '")', 175,110);
	ctx.fillText("The amount of food the people in",90,150);
	ctx.fillText("your party eat each day can",90,170);
	ctx.fillText("change. These amounts are:",90,190);
	ctx.fillText("1.  filling - meals are large and", 105, 230);
	ctx.fillText("generous.", 160, 250);
	ctx.fillText("2.  meager - meals are small, but", 105, 270);
	ctx.fillText("adequate.", 160, 290);
	ctx.fillText("3.  bare bones - meals are very", 105, 310);
	ctx.fillText("small; everyone stays hungry.", 160, 330);
	ctx.fillText("What is your choice?",90,370);
	ctx.drawImage(img, 12, 375);
    
	var change_ration = document.getElementById("change_ration");
	change_ration.style.top = "441px";
	change_ration.style.left = "810px";
    change_ration.setAttribute("type","text");
	change_ration.setAttribute("value","");
	change_ration.focus();
	
	game_data.menu_counter = menu_enum.CHANGE_RATIONS;
	
}

function drawAttemptTrade(){

  clearCanvas();
  hideTextBoxes();
  ctx.font = "16px AppleII";
  ctx.fillStyle = "white";
  ctx.fillText("Your Supplies", 225, 30);
  ctx.fillText("oxen", 180, 70);
  ctx.fillText("sets of clothing", 180, 90);
  ctx.fillText("worms", 180, 110);
  ctx.fillText("wagon wheels", 180, 130);
  ctx.fillText("wagon axles", 180, 150);
  ctx.fillText("wagon tongues", 180, 170);
  ctx.fillText("pounds of food", 180, 190);
  ctx.fillText("money left", 180, 210);
  
  ctx.fillText(game_data.num_oxen, 470, 70);
  ctx.fillText(game_data.num_clothing, 470, 90);
  ctx.fillText(game_data.num_worms, 470, 110);
  ctx.fillText(game_data.num_wagon_wheels, 470, 130);
  ctx.fillText(game_data.num_wagon_axles, 470, 150);
  ctx.fillText(game_data.num_wagon_tongues, 470, 170);
  ctx.fillText(game_data.num_food, 470, 190);
  ctx.fillText("$" + game_data.current_money.toFixed(2), 470, 210);
  
  img = document.getElementById("matt_food_img");
  ctx.drawImage(img, 30, 30, 100, 100	);
  img = document.getElementById("matt_parts_img");
  ctx.drawImage(img, 45, 140, 100, 100);
  img = document.getElementById("matt_oxen_img");
  ctx.drawImage(img, 60, 250, 160, 100);
  img = document.getElementById("matt_clothing_img");
  ctx.drawImage(img, 230, 220, 160, 100);
  img = document.getElementById("matt_worm_img");
  ctx.drawImage(img, 420, 250, 160, 100);
  
  ctx.fillText("You meet another emigrant who", 180, 390);
  ctx.fillText("wants two oxen. She will", 180, 410);
  ctx.fillText("trade you 200 pounds of food.", 180, 430);
  ctx.fillText("Are you willing to trade?", 180, 470);
  
  var trade = document.getElementById("trade_text");
  trade.style.top = "542px";
  trade.style.left = "970px";
  trade.setAttribute("type","text");
  trade.setAttribute("value","");
  trade.focus();
  
  game_data.menu_counter = menu_enum.ATTEMPT_TRADE;
	
}

function drawFishFood(){

  clearCanvas();
  hideTextBoxes();
  ctx.font = "16px AppleII";
  ctx.fillStyle = "white";
  ctx.fillText("Gone Fishing", 240, 30);
  ctx.fillText("You can attempt to fish,", 160, 70);
  ctx.fillText("if you have baitworms.", 160, 90);
  game_data.menu_counter = menu_enum.FISHING;
  
  if (Number(game_data.num_worms) == 0){
	  
	  ctx.fillText("You don't have any worms.", 160, 130);
	  ctx.fillText("Press SPACE BAR to continue", 160, 150);
	  
  } else {
	  
	  ctx.fillText("How many baitworms would you", 160, 130);
	  ctx.fillText("like to use?", 160, 150);
	  
  }
  
  img = document.getElementById("matt_worm_img");
  ctx.drawImage(img, 420, 250, 160, 100);
    
  var fishing = document.getElementById("fishing");
  fishing.style.top = "222px";
  fishing.style.left = "770px";
  fishing.style.width = "200px";
  fishing.setAttribute("type","text");
  fishing.setAttribute("value","");
  fishing.focus();
	
}

function drawNotEnoughBait(){

  clearCanvas();
  hideTextBoxes();
  ctx.font = "16px AppleII";
  ctx.fillStyle = "white";
  ctx.fillText("Gone Fishing", 240, 30);
  ctx.fillText("You don't have that much bait.", 130, 70);
  ctx.fillText("Press SPACE BAR to continue", 130, 150);
  game_data.menu_counter = menu_enum.OUT_OF_BAIT;
  
  img = document.getElementById("matt_worm_img");
  ctx.drawImage(img, 420, 250, 160, 100);
    
	
}

function drawFishSuccess(val,food){
	
  clearCanvas();
  hideTextBoxes();
  ctx.font = "16px AppleII";
  ctx.fillStyle = "white";
  ctx.fillText("Gone Fishing", 240, 30);
  ctx.fillText("You caught " + val + " fish. Way to go!", 130, 70);
  ctx.fillText("Added " + food + " food to your total.", 130, 90);
  ctx.fillText("Press SPACE BAR to continue", 130, 150);
  game_data.menu_counter = menu_enum.FISH_SUCCESS;
  
  img = document.getElementById("matt_worm_img");
  ctx.drawImage(img, 420, 250, 160, 100);
    

}

function handleSizeUp(val){

  if(val.length == 1){
	  
	  if (val == 1){ playGame(); }
	  else if (val == 2) { drawCheckSupplies(); }
	  else if (val == 3) { drawCheckMap(); }
	  else if (val == 4) { drawChangePace(); }
	  else if (val == 5) { drawChangeRations(); }
	  else if (val == 6) { drawSizeUpMenuRest(); }
	  else if (val == 7) { drawAttemptTrade(); }
	  else if (val == 8) { drawFishFood(); }
	  
  } else { return; }
	
}

function handleChangePace(val){

  if(val.length == 1){
	  
	  if (val == 1){ game_data.current_pace = "steady"; }
	  else if (val == 2) { game_data.current_pace = "strenuous"; }
      else if (val == 3) { game_data.current_pace = "grueling"; }
	  
	  if (game_data.menu_counter == menu_enum.REVIEW_SUPPLIES_STORE) { drawSizeUpStore(); }
	  else { drawSizeUpMenu(); }
	  
  } else { return; }
	
}

function handleChangeRation(val){

  if(val.length == 1){
	  
	  if (val == 1){ game_data.current_rations = "filling"; }
	  else if (val == 2) { game_data.current_rations = "meager"; }
      else if (val == 3) { game_data.current_rations = "bare bones"; }
	  
	  if (game_data.menu_counter == menu_enum.REVIEW_SUPPLIES_STORE) { drawSizeUpStore(); }
	  else { drawSizeUpMenu(); }
	  
  } else { return; }	
	
	
}

function handleRest(val, rest){

  if (!isNaN(val)){
	  
	  // Handle date update.
	  game_data.current_day = Number(game_data.current_day) + Number(val);	  
	  var day = game_data.current_day;
	  var month = game_data.current_month;
	  if (day > 30){

        // Handle if the year / month rolls over.
        if(month = "December"){

          game_data.current_month = "January";
		  game_data.current_day = 1;
		  game_data.current_year += 1;

        }
		else{

          if(month == "January"){ game_data.current_month = "February"; }
		  else if(month == "February") { game_data.current_month = "March"; }
		  else if(month == "March") { game_data.current_month = "April"; }
		  else if(month == "April") { game_data.current_month = "May"; }
		  else if(month == "May") { game_data.current_month = "June"; }
		  else if(month == "June") { game_data.current_month = "July"; }
		  else if(month == "July") { game_data.current_month = "August"; }
		  else if(month == "August") { game_data.current_month = "September"; }
		  else if(month == "September") { game_data.current_month = "October"; }
		  else if(month == "October") { game_data.current_month = "November"; }
		  else if(month == "November") { game_data.current_month = "December"; }
          game_data.current_day = 1;
		
		}		
		
	  }
	  
	  // Handle food update.
	  var food_amt = 0;
	  if (game_data.current_rations == "filling") { food_amt = 3; }
	  else if (game_Data.current_rations == "meager"){ food_amt = 2; }
	  else { food_amt = 1; }
	  game_data.num_food = Number(game_data.num_food) - (Number(val) * Number(game_data.num_party_alive) * Number(food_amt));
	  
	  // Handle health update.
	  if (rest == 1 && val > 3){ game_data.current_health = "great"; }
	  
	  if (game_data.menu_counter == menu_enum.REVIEW_SUPPLIES_STORE) { drawSizeUpStore(); }
	  else { drawSizeUpMenu(); }
	  
  } else { return; }
	
}

function handleTrade(val){
	
  if (val.length == 1){	  
	 
	  if (val == 'y' || val == 'Y'){
		  
	    game_data.num_oxen = Number(game_data.num_oxen) - 2;
	    game_data.num_food = Number(game_data.num_food) + 200;
		handleRest(1,0);
		
	  }
	  else if (val == 'n' || val == 'N'){ handleRest(1,0); }

	  
  } else { return; }
	
}

function handleFish(val){

  if(!isNaN(val) && val <= game_data.num_worms){

    var random = Math.floor(Math.random() * (3) + 1);	
	var food = val * random;
	game_data.num_worms -= val;
	game_data.num_food += food;
	drawFishSuccess(random, food);
	
  }
  else if (!isNaN(val) && val > game_data.num_worms){

    	drawNotEnoughBait();
	
  }
	
}

function sizeUpFocus(){ document.getElementById("size_up").focus(); }
function changePaceFocus(){ document.getElementById("change_pace").focus(); }
function changeRationFocus() { document.getElementById("change_ration").focus(); }
function changeRestFocus() { document.getElementById("change_ration").focus(); }
function attemptTradeFocus(){ document.getElementById("trade_text").focus(); }
function fishingFocus(){ document.getElementById("fishing").focus(); }


function clearCanvas(){	ctx.clearRect(0,0,c.width,c.height); }
function hideTextBoxes() {

	document.getElementById("size_up").setAttribute("type","hidden");
	document.getElementById("size_up").setAttribute("autofocus","");
	document.getElementById("change_pace").setAttribute("type","hidden");
	document.getElementById("change_pace").setAttribute("autofocus","");
	document.getElementById("change_ration").setAttribute("type","hidden");
	document.getElementById("change_ration").setAttribute("autofocus","");
	document.getElementById("rest_text").setAttribute("type","hidden");
	document.getElementById("rest_text").setAttribute("autofocus","");
	document.getElementById("trade_text").setAttribute("type","hidden");
	document.getElementById("trade_text").setAttribute("autofocus","");
	document.getElementById("fishing").setAttribute("type","hidden");
	document.getElementById("fishing").setAttribute("autofocus","");
	
}

