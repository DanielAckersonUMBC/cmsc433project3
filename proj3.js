var menu_enum = { MAIN_MENU: 0, HIGH_SCORE: 1, GAME_INFO1: 2, GAME_INFO2: 3, GAME_INFO3: 4, GAME_INFO4: 5,
GAME_INFO5: 6, GAME_INFO6: 7, GAME_INFO7: 8, EXP_POINTS1: 9, EXP_POINTS2: 10, EXP_POINTS3: 11,
EXP_PROF: 12, EXP_MONTH: 13, SUPPLY_MSG: 14, MATT_MSG: 15, MATT_WELCOME: 16, MATT_WELCOME2: 17,
MATT_STOREFRONT: 18, MATT_GOODBYE: 19, INDEPENDENCE: 20, KANSAS_RIVER:21, BIG_BLUE_RIVER: 22,
FORT_KEARNEY: 23, CHIMNEY_ROCK: 24, FORT_LARAMIE: 25, INDEPENDENCE_ROCK: 26, SOUTH_PASS: 27,
GREEN_RIVER: 28, FORT_BRIDGER: 29, SODA_SPRINGS: 30, FORT_HALL: 31, SNAKE_RIVER: 32, FORT_BOISE: 33,
BLUE_MOUNTAINS: 34, FORT_WALLA_WALLA: 35, DALLES: 36, COLUMBIA_RIVER: 37, TOLL_ROAD:38, OREGON_CITY: 39,
REVIEW_SUPPLIES: 40, REVIEW_SUPPLIES_STORE: 41, CHECK_MAP: 42, CHANGE_PACE: 43, CHANGE_RATIONS: 44,
ATTEMPT_TRADE: 45, FISHING: 46, OUT_OF_BAIT: 47, ON_TRAIL: 48, SIZE_UP_MENU: 49, FORT_MENU: 50}; 
var weather = [ "cool", "warm", "fair", "raining", "snowing" ];
var TOP_TEN = 10;
var DEFAULT_PARTY_NAMES = ["Beth","Sarah","Jed","Joey"]; // used otherwise.
var MONTHS = ["", "March", "April", "May", "June", "July"];
// Array of all locations
var LOCATIONS = ["Independence", "Kansas River", "Big Blue River", "Fort Kearney", "Chimney Rock", "Fort Laramie", "Independence Rock", "South Pass", "Green River", "Fort Bridger", "Soda Springs", "Fort Hall", "Snake River", "Fort Boise", "Blue Mountains", "Fort Walla Walla", "Dalles", "Oregon City"];
// Array of distance to next location so at 0 you're at indepenence wiith 102mi to Kansas River, etc.
var MILESTONE_DIST = [102, 185, 304, 554, 640, 830, 932, 1057, 1151, 1201, 1258, 1440, 1554, 1714, 1769, 1983, 2044];
var c;
var ctx;

var game_data = {

	menu_counter: 0, // just for screen navigation
	chosen_profession: "",
	chosen_month: "",
	leader_name: "",
	current_month: "",
	current_day: 1,
	current_location: 0,
	party_text_selector: 1,
	party1: "", party2: "", party3: "", party4: "",
	esc_pressed: 0,
	current_money: 1600,
	current_matt_bill: 0,
	current_weather: "",
	current_month: "",
	current_day: 1,
	current_year: 1848,
	current_health: "",
	current_location: "",
	current_rations: "filling",
	current_pace: "steady",
	num_oxen: 0,
	num_clothing: 0,
	num_food: 0,
	num_worms: 0,
	current_pace: 1,
	current_rations: 1,
	current_location: 0,
	leader_health: "healthy",
	party1_health: "healthy",
	party2_health: "healthy",
	party3_health: "healthy",
	party4_health: "healthy",
	party_alive: 5,
	miles_traveled: 0,
	num_wagon_wheels: 0,
	num_wagon_axles: 0,
	num_wagon_tongues: 0,
	num_party_alive: 5,
	at_general_store: 0
	
}

var matt_bill = {

	oxen_amt: 0,
	food_amt: 0,
	clothing_amt: 0,
	worm_amt: 0,
	parts_amt: 0,
	total: 0

}

function init(){

	game_data.menu_counter = 0; // just for screen navigation
	game_data.chosen_profession = ""; // can be used for gameplay implications
	game_data.leader_name = "";
	game_data.party_text_selector = 1;
	game_data.party1 = ""; game_data.party2 = ""; game_data.party3 = ""; game_data.party4 = ""; // ONLY used if all 4 names are entered!
	game_data.esc_pressed = 0;
	game_data.current_money = 1600;
	game_data.current_matt_bill = 0;
	game_data.current_weather = "";
	game_data.current_month = "";
	game_data.current_day = 1;
	game_data.current_year = 1848;
	game_data.current_health = "good";
	game_data.current_location = "";
	game_data.current_rations = "filling";
	game_data.current_pace = "steady";
	game_data.num_oxen = 0;
	game_data.num_clothing = 0;
	game_data.num_food = 0;
	game_data.num_worms = 0;
	game_data.num_wagon_wheels = 0;
	game_data.num_wagon_axles = 0;
	game_data.num_wagon_tongues = 0;
	game_data.miles_traveled = 0;
	game_data.current_pace = 1;
	game_data.current_rations = 1;
	game_data.leader_health = "healthy";
	game_data.party1_health = "healthy";
	game_data.party2_health = "healthy";
	game_data.party3_health = "healthy";
	game_data.party4_health = "healthy";
	game_data.at_general_store = 0;
	matt_bill.oxen_amt = 0;
	matt_bill.food_amt = 0;
	matt_bill.clothing_amt = 0;
	matt_bill.worm_amt = 0;
	matt_bill.parts_amt = 0;
	matt_bill.total = 0;

}

$( document ).ready(function() {

	c = document.getElementById("myCanvas");
	ctx = c.getContext("2d");
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

	var explain_points = document.getElementById("explain_points");
	if (explain_points != null){

	  	  explain_points.addEventListener("keydown", function (e) {
		  if (e.keyCode === 13) {  //checks whether the pressed key is "Enter"
			  handleExplainPoints(explain_points.value);
		  }

	  });

	  document.getElementById("explain_points").style.top = "502px";
	  document.getElementById("explain_points").style.left = "815px";
	  explain_points.addEventListener("focusout", explainPointsFocus);

	}

	var month = document.getElementById("month");
	if (month != null){

	  	  month.addEventListener("keydown", function (e) {
		  if (e.keyCode === 13) {  //checks whether the pressed key is "Enter"
			  handleMonth(month.value);
		  }
	  });

	  month.addEventListener("focusout", monthFocus);

	}

	var matt = document.getElementById("matt_text");
	if (matt != null){

	  	  matt.addEventListener("keydown", function (e) {
		  if (e.keyCode === 13) {  //checks whether the pressed key is "Enter"
			  handleMatt(matt.value);
		  }
		  else if (e.keyCode == 32) {

		  	  game_data.current_money -= matt_bill.total;
			  drawMattGoodbye();

		  }
	  });
	  document.getElementById("matt_text").style.top = "422px";
	  document.getElementById("matt_text").style.left = "855px";
	  matt.addEventListener("focusout", mattFocus);

	}

	var matt_oxen = document.getElementById("matt_oxen");
	if (matt_oxen != null){

	  	  matt_oxen.addEventListener("keydown", function (e) {
		  if (e.keyCode === 13) {  //checks whether the pressed key is "Enter"
			  handleMattOxen(matt_oxen.value);
		  }
	  });
	  document.getElementById("matt_oxen").style.top = "343px";
	  document.getElementById("matt_oxen").style.left = "710px";
	  document.getElementById("matt_oxen").style.width = "300px";
	  matt_oxen.addEventListener("focusout", mattOxenFocus);

	}

	var matt_food = document.getElementById("matt_food");
	if (matt_food != null){

	  	  matt_food.addEventListener("keydown", function (e) {
		  if (e.keyCode === 13) {  //checks whether the pressed key is "Enter"
			  handleMattFood(matt_food.value);
		  }
	  });
	  document.getElementById("matt_food").style.top = "433px";
	  document.getElementById("matt_food").style.left = "768px";
	  document.getElementById("matt_food").style.width = "270px";
	  matt_food.addEventListener("focusout", mattFoodFocus);

	}

	var matt_clothing = document.getElementById("matt_clothing");
	if (matt_clothing != null){

	  	  matt_clothing.addEventListener("keydown", function (e) {
		  if (e.keyCode === 13) {  //checks whether the pressed key is "Enter"
			  handleMattClothing(matt_clothing.value);
		  }
	  });
	  document.getElementById("matt_clothing").style.top = "372px";
	  document.getElementById("matt_clothing").style.left = "768px";
	  document.getElementById("matt_clothing").style.width = "270px";
	  matt_clothing.addEventListener("focusout", mattClothingFocus);

	}

	var matt_worms = document.getElementById("matt_worms");
	if (matt_worms != null){

	  	  matt_worms.addEventListener("keydown", function (e) {
		  if (e.keyCode === 13) {  //checks whether the pressed key is "Enter"
			  handleMattWorms(matt_worms.value);
		  }
	  });
	  document.getElementById("matt_worms").style.top = "333px";
	  document.getElementById("matt_worms").style.left = "773px";
	  document.getElementById("matt_worms").style.width = "200px";
	  matt_worms.addEventListener("focusout", mattWormsFocus);

	}

	var matt_wheels = document.getElementById("matt_wheels");
	if (matt_wheels != null){

	  	  matt_wheels.addEventListener("keydown", function (e) {
		  if (e.keyCode === 13) {  //checks whether the pressed key is "Enter"
			  handleMattWheels(matt_wheels.value);
		  }
	  });
	  document.getElementById("matt_wheels").style.top = "392px";
	  document.getElementById("matt_wheels").style.left = "946px";
	  document.getElementById("matt_wheels").style.width = "100px";
	  matt_wheels.addEventListener("focusout", mattWheelsFocus);

	}

	var matt_axles = document.getElementById("matt_axles");
	if (matt_axles != null){

	  	  matt_axles.addEventListener("keydown", function (e) {
		  if (e.keyCode === 13) {  //checks whether the pressed key is "Enter"
			  handleMattAxles(matt_axles.value);
		  }
	  });
	  document.getElementById("matt_axles").style.top = "392px";
	  document.getElementById("matt_axles").style.left = "940px";
	  document.getElementById("matt_axles").style.width = "100px";
	  matt_axles.addEventListener("focusout", mattAxlesFocus);

	}

	var matt_tongues = document.getElementById("matt_tongues");
	if (matt_tongues != null){

	  	  matt_tongues.addEventListener("keydown", function (e) {
		  if (e.keyCode === 13) {  //checks whether the pressed key is "Enter"
			  handleMattTongues(matt_tongues.value);
		  }
	  });
	  document.getElementById("matt_tongues").style.top = "392px";
	  document.getElementById("matt_tongues").style.left = "964px";
	  document.getElementById("matt_tongues").style.width = "100px";
	  matt_tongues.addEventListener("focusout", mattTonguesFocus);

	}

	var size_up_text = document.getElementById("size_up");
	size_up_text.addEventListener("focusout", sizeUpFocus); 	
	if (size_up_text != null){
		  game_data.menu_counter = menu_enum.SIZE_UP_MENU;
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
	
		var fort = document.getElementById("fort_menu");
	fort.addEventListener("focusout",fortFocus);
	if (fort != null){
		
	  	  fort.addEventListener("keydown", function (e) {
		  if (e.keyCode === 13) {  //checks whether the pressed key is "Enter"
			  handleFort(fort.value);
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

		// This is to keep track of which screen the player is on when the space bar
		// or enter key is pressed. Each one has a different for the next screen.
		if (e.keyCode == 32 && game_data.menu_counter == menu_enum.GAME_INFO1){ drawGameInfo2(); }
		else if (e.keyCode == 32 && game_data.menu_counter == menu_enum.GAME_INFO2){ drawGameInfo3();	}
		else if (e.keyCode == 32 && game_data.menu_counter == menu_enum.GAME_INFO3){ drawGameInfo4();	}
		else if (e.keyCode == 32 && game_data.menu_counter == menu_enum.GAME_INFO4){ drawGameInfo5();	}
		else if (e.keyCode == 32 && game_data.menu_counter == menu_enum.GAME_INFO5){ drawGameInfo6();	}
		else if (e.keyCode == 32 && game_data.menu_counter == menu_enum.GAME_INFO6){ drawGameInfo7();	}
		else if (e.keyCode == 32 && game_data.menu_counter == menu_enum.GAME_INFO7){ drawTitle();	}
		else if (e.keyCode == 32 && game_data.menu_counter == menu_enum.EXP_POINTS1) { drawExplainPoints2(); }
		else if (e.keyCode == 32 && game_data.menu_counter == menu_enum.EXP_POINTS2){ drawExplainPoints3(); }
		else if (e.keyCode == 32 && game_data.menu_counter == menu_enum.EXP_POINTS3) { drawTitle(); }
		else if (e.keyCode == 32 && game_data.menu_counter == menu_enum.EXP_PROF) { drawProfPage(); }
		else if (e.keyCode == 32 && game_data.menu_counter == menu_enum.EXP_MONTH) { drawMonthPick(); }
		else if (e.keyCode == 32 && game_data.menu_counter == menu_enum.SUPPLY_MSG) { drawMattMsg(); }
		else if (e.keyCode == 32 && game_data.menu_counter == menu_enum.MATT_MSG) { drawMattWelcome(); }
		else if (e.keyCode == 32 && game_data.menu_counter == menu_enum.MATT_WELCOME) { drawMattWelcome2(); }
		else if (e.keyCode == 32 && game_data.menu_counter == menu_enum.MATT_WELCOME2) { drawMattStorefront(); }
		else if (e.keyCode == 13 && game_data.menu_counter == menu_enum.MATT_GOODBYE){ drawIndependence(); }
		else if (e.keyCode == 32 && game_data.menu_counter == menu_enum.INDEPENDENCE){ playGame(); }
		else if (e.keyCode == 32 && game_data.menu_counter == menu_enum.REVIEW_SUPPLIES && 
		    game_data.at_general_store == 1){ drawSizeUpStore(); }
		else if (e.keyCode == 32 && game_data.menu_counter == menu_enum.REVIEW_SUPPLIES && 
		    game_data.at_general_store == 0){ drawSizeUpMenu(); }
		else if (e.keyCode == 32 && game_data.menu_counter == menu_enum.CHECK_MAP && 
		    game_data.at_general_store == 1){ drawSizeUpStore(); }
		else if (e.keyCode == 32 && game_data.menu_counter == menu_enum.CHECK_MAP && 
		    game_data.at_general_store == 0){ drawSizeUpMenu(); }
		else if (e.keyCode == 32 && game_data.menu_counter == menu_enum.FISHING && game_data.at_general_store == 1
		         && Number(game_data.num_worms) == 0){ drawSizeUpStore(); }
		else if (e.keyCode == 32 && game_data.menu_counter == menu_enum.FISHING && game_data.at_general_store == 0
		         && Number(game_data.num_worms) == 0){ drawSizeUpMenu(); }
		else if(e.keyCode == 32 && game_data.menu_counter == menu_enum.OUT_OF_BAIT && game_data.at_general_store == 1){	drawSizeUpStore(); }
		else if(e.keyCode == 32 && game_data.menu_counter == menu_enum.OUT_OF_BAIT && game_data.at_general_store == 0){	drawSizeUpMenu(); }
		else if(e.keyCode == 32 && game_data.menu_counter == menu_enum.FISH_SUCCESS && game_data.at_general_store == 1){ drawSizeUpStore(); }
		else if(e.keyCode == 32 && game_data.menu_counter == menu_enum.FISH_SUCCESS && game_data.at_general_store == 0){ drawSizeUpMenu(); }
		else if(e.keyCode == 13 && game_data.menu_counter == menu_enum.ON_TRAIL){ drawSizeUpMenu(); }
		else if(e.keyCode == 32 && game_data.menu_counter == menu_enum.ON_TRAIL){ playGame(); }
		else if(e.keyCode == 32 && game_data.menu_counter == menu_enum.SIZE_UP_MENU){ playGame(); }
		else if(e.keyCode == 32 && game_data.menu_counter == menu_enum.FORT_MENU){ playGame(); }
		// Handles the double escape to quit functionality.
		else if (e.keyCode == 27){

          console.log(game_data.esc_pressed);
          game_data.esc_pressed += 1;
		  if (game_data.esc_pressed > 1){

		    hideTextBoxes();
		    drawTitle();

		  }

		}

		else if (e.keyCode != 27) { game_data.esc_pressed = 0; }

	}

}

function drawTitle(){

	init();
    clearCanvas();
	game_data.esc_pressed = 0;

	// Draws the title screen.
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
	ctx.drawImage(img, 12, 385);

	// Bring the input box back.
	document.getElementById("title").setAttribute("type","text");
	document.getElementById("title").setAttribute("value","");
	document.getElementById("title").focus();

	game_data.menu_counter = 0;

}

function drawHighScores(){

	// Sent a request to the high scores php file.
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
	  if (this.readyState == 4 && this.status == 200) {

		json = JSON.parse(this.responseText);
		console.log(json);

		// Draws the highscore screen.
		ctx.lineWidth = "6";
		ctx.beginPath();
		ctx.moveTo(30, 15);
		ctx.lineTo(605, 15);
		ctx.strokeStyle = "#07e896";
		ctx.stroke();
		ctx.beginPath();
		ctx.moveTo(30, 70);
		ctx.lineTo(605, 70);
		ctx.stroke();
		ctx.beginPath();
		ctx.strokeStyle = "white";
		ctx.rect(100, 375, 390, 75);
		ctx.stroke();
		ctx.font = "16px AppleII";
		ctx.fillStyle = "white";
		ctx.fillText("The Oregon Top Ten", 165, 50);
		ctx.fillText("Name", 75, 130);
		ctx.fillText("Points", 250, 130);
		ctx.fillText("Rating", 430, 130);

		// Draw the results of the high score query.
		var n_x = 20; var p_x = 270; var r_x = 420;
		var y = 160;
		for (i = 0; i < TOP_TEN; i++){

		  ctx.fillText(json[i].name, n_x, y);
		  ctx.fillText(json[i].score, p_x, y);
		  ctx.fillText(json[i].rating, r_x, y);

		  y += 20;

		}

		ctx.fillText("Would you like to see how", 120, 410);
		ctx.fillText("points are earned?", 120, 430);

		document.getElementById("explain_points").setAttribute("type","text");
		document.getElementById("explain_points").setAttribute("value","");
		document.getElementById("explain_points").focus();

	  }
	};
	xmlhttp.open("GET", "scripts/highscores_working.php", true);
	xmlhttp.send();

}

function drawProfPage(){

	clearCanvas();
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

    game_data.party_text_selector = 1;
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
	document.getElementById("party1").setAttribute("value",game_data.leader_name);
	document.getElementById("party1").readOnly = true;
	document.getElementById("party1").style.top = "410px";
	document.getElementById("party1").style.left = "550px";
	document.getElementById("party1").style.width = "300px";
	enableParty();
	document.getElementById("party2").focus();

}

function drawStartMonth(){

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

function drawVerifyParty(){

	clearCanvas();
    game_data.party_text_selector = 0;
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

function drawGameInfo1(){

    clearCanvas();
	hideTextBoxes();

	// Draws the title screen.
	var img = document.getElementById("trail_title");
	ctx.drawImage(img, 2.5, 10);
	img = document.getElementById("title_graphic.png");
	ctx.drawImage(img, 12, 70);
	ctx.font = "16px AppleII";
	ctx.fillStyle = "white";
	ctx.fillText("Try taking a journey by",110, 170);
	ctx.fillText("covered wagon across 2000", 110, 190);
	ctx.fillText("miles of plains, rivers, and", 110, 210);
	ctx.fillText("mountains. Try! On the ", 110, 230);
	ctx.fillText("plains, will you slosh your", 110, 250);
	ctx.fillText("oxen through mud and", 110, 270);
	ctx.fillText("water-filled ruts or will you", 110, 290);
	ctx.fillText("plod through dust six inches",110, 310);
	ctx.fillText("deep?",110, 330);
	ctx.fillText("Press SPACE BAR to continue",125, 460);
	ctx.drawImage(img, 12, 385);

	game_data.menu_counter = menu_enum.GAME_INFO1;

}

function drawGameInfo2(){

    clearCanvas();
	hideTextBoxes();

	var img = document.getElementById("trail_title");
	ctx.drawImage(img, 2.5, 10);
	img = document.getElementById("title_graphic.png");
	ctx.drawImage(img, 12, 70);
	ctx.font = "16px AppleII";
	ctx.fillStyle = "white";
	ctx.fillText("How will you cross the rivers?",110, 170);
	ctx.fillText("If you have money, you might", 110, 190);
	ctx.fillText("take a ferry (if there is a", 110, 210);
	ctx.fillText("ferry). Or, you can ford the", 110, 230);
	ctx.fillText("river and hope you and your", 110, 250);
	ctx.fillText("wagon aren't swallowed alive!", 110, 270);
	ctx.fillText("Press SPACE BAR to continue",125, 460);
	ctx.drawImage(img, 12, 385);

	game_data.menu_counter = menu_enum.GAME_INFO2;

}

function drawGameInfo3(){

    clearCanvas();
	hideTextBoxes();

	var img = document.getElementById("trail_title");
	ctx.drawImage(img, 2.5, 10);
	img = document.getElementById("title_graphic.png");
	ctx.drawImage(img, 12, 70);
	ctx.font = "16px AppleII";
	ctx.fillStyle = "white";
	ctx.fillText("What about supplies? Well, if", 110, 190);
	ctx.fillText("you're low on food you can", 110, 210);
	ctx.fillText("hunt. You might get a buffalo...", 110, 230);
	ctx.fillText("you might.  And there are", 110, 250);
	ctx.fillText("bear in the mountains.", 110, 270);
	ctx.fillText("Press SPACE BAR to continue",125, 460);
	ctx.drawImage(img, 12, 385);

	game_data.menu_counter = menu_enum.GAME_INFO3;

}

function drawGameInfo4(){

    clearCanvas();
	hideTextBoxes();

	var img = document.getElementById("trail_title");
	ctx.drawImage(img, 2.5, 10);
	img = document.getElementById("title_graphic.png");
	ctx.drawImage(img, 12, 70);
	ctx.font = "16px AppleII";
	ctx.fillStyle = "white";
	ctx.fillText("At the Dalles, you can try",110, 170);
	ctx.fillText("navigating the Columbia river,", 110, 190);
	ctx.fillText("but if running the rapids with", 110, 210);
	ctx.fillText("a makeshift raft makes you", 110, 230);
	ctx.fillText("queasy, better take the Barlow", 110, 250);
	ctx.fillText("Road.", 110, 270);
	ctx.fillText("Press SPACE BAR to continue",125, 460);
	ctx.drawImage(img, 12, 385);

	game_data.menu_counter = menu_enum.GAME_INFO4;

}

function drawGameInfo5(){

    clearCanvas();
	hideTextBoxes();

	var img = document.getElementById("trail_title");
	ctx.drawImage(img, 2.5, 10);
	img = document.getElementById("title_graphic.png");
	ctx.drawImage(img, 12, 70);
	ctx.font = "16px AppleII";
	ctx.fillStyle = "white";
	ctx.fillText("If for some reason you don't",110, 170);
	ctx.fillText("survive -- your wagon burns,", 110, 190);
	ctx.fillText("or thieves steal your oxen, or", 110, 210);
	ctx.fillText("you run out of provisions, or", 110, 230);
	ctx.fillText("you die of cholera -- don't", 110, 250);
	ctx.fillText("give up! Try again...and", 110, 270);
	ctx.fillText("again...until your name is up", 110, 290);
	ctx.fillText("with the others on The Oregon",110, 310);
	ctx.fillText("Top Ten.",110, 330);
	ctx.fillText("Press SPACE BAR to continue",125, 460);
	ctx.drawImage(img, 12, 385);

	game_data.menu_counter = menu_enum.GAME_INFO5;

}

function drawGameInfo6(){

    clearCanvas();
	hideTextBoxes();

	var img = document.getElementById("trail_title");
	ctx.drawImage(img, 2.5, 10);
	img = document.getElementById("title_graphic.png");
	ctx.drawImage(img, 12, 70);
	ctx.font = "16px AppleII";
	ctx.fillStyle = "white";
	ctx.fillText("Esc key",250, 170);
	ctx.fillText("You may want to quit in the", 110, 210);
	ctx.fillText("middle of the program. If so,", 110, 230);
	ctx.fillText("press the Escape (Esc) key", 110, 250);
	ctx.fillText("twice whenever the computer is", 110, 270);
	ctx.fillText("waiting for a response.", 110, 290);
	ctx.fillText("Press SPACE BAR to continue",125, 460);
	ctx.drawImage(img, 12, 385);

	game_data.menu_counter = menu_enum.GAME_INFO6;

}

function drawGameInfo7(){

    clearCanvas();
	hideTextBoxes();

	var img = document.getElementById("trail_title");
	ctx.drawImage(img, 2.5, 10);
	img = document.getElementById("title_graphic.png");
	ctx.drawImage(img, 12, 70);
	ctx.font = "16px AppleII";
	ctx.fillStyle = "white";
	ctx.fillText("The software team responsible",110, 150);
	ctx.fillText("for creation of this product includes:", 55, 170);
	ctx.fillText("Ed Gratz", 265, 210);
	ctx.fillText("Charolyn Kapplinger", 195, 230);
	ctx.fillText("Mark Paquette", 230, 250);
	ctx.fillText("Larry Phenow", 232, 270);
	ctx.fillText("Julie Redland", 230, 290);
	ctx.fillText("(Adapted by Alex Whitehead, Daniel Ackerson",20, 330);
	ctx.fillText("Chris Jimenez, and Dustin Cuocci)",70, 350);
	ctx.fillText("Press SPACE BAR to continue",125, 460);
	ctx.drawImage(img, 12, 385);

	game_data.menu_counter = menu_enum.GAME_INFO7;

}

function drawExplainPoints1(){

		clearCanvas();

		ctx.lineWidth = "6";
		ctx.beginPath();
		ctx.moveTo(30, 15);
		ctx.lineTo(605, 15);
		ctx.strokeStyle = "#07e896";
		ctx.stroke();
		ctx.beginPath();
		ctx.moveTo(30, 70);
		ctx.lineTo(605, 70);
		ctx.stroke();
		ctx.font = "16px AppleII";
		ctx.fillStyle = "white";
		ctx.fillText("On Arriving in Oregon", 175, 50);
		ctx.fillText("Your most important resource is the", 65, 130);
		ctx.fillText("people you have with you. You", 65, 150);
		ctx.fillText("receive points for each member of", 65, 170);
		ctx.fillText("your party who arrives safely; you", 65, 190);
		ctx.fillText("receive more points if they arrive", 65, 210);
		ctx.fillText("in good health!", 65, 230);
		ctx.fillText("good", 130, 340);
		ctx.fillText("fair", 130, 360);
		ctx.fillText("poor", 130, 380);
		ctx.fillText("very poor", 130, 400);
		ctx.fillText("500", 420, 340);
		ctx.fillText("400", 420, 360);
		ctx.fillText("300", 420, 380);
		ctx.fillText("200", 420, 400);
		ctx.fillText("Press SPACE BAR to continue",125, 460);

		// Rectangles with text in them.
		ctx.beginPath();
		ctx.fillStyle = "white";
		ctx.fillRect(90, 250, 200, 70);
		ctx.stroke();

		ctx.beginPath();
		ctx.fillStyle = "white";
		ctx.fillRect(340, 250, 200, 70);
		ctx.stroke();

		ctx.fillStyle = "black";
		ctx.fillText("Health of", 130, 280);
		ctx.fillText("Party", 155, 300);
		ctx.fillText("Points per", 365, 280);
		ctx.fillText("Person", 405, 300);

		game_data.menu_counter = menu_enum.EXP_POINTS1;

}

function drawExplainPoints2(){

		clearCanvas();

		ctx.lineWidth = "6";
		ctx.beginPath();
		ctx.moveTo(30, 15);
		ctx.lineTo(605, 15);
		ctx.strokeStyle = "#07e896";
		ctx.stroke();
		ctx.beginPath();
		ctx.moveTo(30, 70);
		ctx.lineTo(605, 70);
		ctx.stroke();
		ctx.font = "16px AppleII";
		ctx.fillStyle = "white";
		ctx.fillText("On Arriving in Oregon", 175, 50);
		ctx.fillText("The resources you arrive with will", 65, 130);
		ctx.fillText("help you get started in the new", 65, 150);
		ctx.fillText("land. You receive points for each", 65, 170);
		ctx.fillText("item you bring safely to Oregon.", 65, 190);

		ctx.fillText("wagon", 110, 290);
		ctx.fillText("ox", 110, 310);
		ctx.fillText("spare wagon part", 110, 330);
		ctx.fillText("set of clothing", 110, 350);
		ctx.fillText("worms (each 50)", 110, 370);
		ctx.fillText("food (each 25 pounds)", 110, 390);
		ctx.fillText("cash (each 5 dollars)", 110, 410);

		ctx.fillText("50", 420, 290);
		ctx.fillText("4", 433, 310);
		ctx.fillText("2", 433, 330);
		ctx.fillText("2", 433, 350);
		ctx.fillText("1", 433, 370);
		ctx.fillText("1", 433, 390);
		ctx.fillText("1", 433, 410);

		ctx.fillText("Press SPACE BAR to continue",125, 460);

		// Rectangles with text in them.
		ctx.beginPath();
		ctx.fillStyle = "white";
		ctx.fillRect(90, 200, 200, 70);
		ctx.stroke();

		ctx.beginPath();
		ctx.fillStyle = "white";
		ctx.fillRect(340, 200, 200, 70);
		ctx.stroke();

		ctx.fillStyle = "black";
		ctx.fillText("Resources of", 105, 230);
		ctx.fillText("Party", 160, 250);
		ctx.fillText("Points per", 365, 230);
		ctx.fillText("Item", 405, 250);

		game_data.menu_counter = menu_enum.EXP_POINTS2;

}

function drawExplainPoints3(){

    clearCanvas();
	hideTextBoxes();

	img = document.getElementById("title_graphic.png");
	ctx.drawImage(img, 12, 70);
	ctx.font = "16px AppleII";
	ctx.fillStyle = "white";
	ctx.fillText("On Arriving in Oregon", 175, 50);
	ctx.fillText("You receive points for your",110, 170);
	ctx.fillText("occupation in the new land.", 110, 190);
	ctx.fillText("Because more farmers and", 110, 210);
	ctx.fillText("carpenters were needed than", 110, 230);
	ctx.fillText("bankers, you receive double", 110, 250);
	ctx.fillText("points upon arriving in Oregon", 110, 270);
	ctx.fillText("as a carpenter, and triple", 110, 290);
	ctx.fillText("points for arriving as a farmer.",110, 310);
	ctx.fillText("Press SPACE BAR to continue",125, 460);
	ctx.drawImage(img, 12, 385);

	game_data.menu_counter = menu_enum.EXP_POINTS3;

}

function drawProfInfo(){

	img = document.getElementById("title_graphic.png");
	hideTextBoxes();
	ctx.drawImage(img, 12, 10);
	ctx.font = "16px AppleII";
	ctx.fillStyle = "white";
	ctx.fillText("Traveling to Oregon isn't easy!",120,100);
	ctx.fillText("But if you're a banker, you'll",120,120);
	ctx.fillText("have more money for supplies",120, 140);
	ctx.fillText("and services than a carpenter", 120, 160);
	ctx.fillText("or a farmer.", 120, 180);
	ctx.fillText("However, the harder you have", 120, 220);
	ctx.fillText("to try, the more points you", 120, 240);
	ctx.fillText("deserve! Therefore, the", 120, 260);
	ctx.fillText("farmer earns the greatest",120, 280);
	ctx.fillText("number of points and the",120, 300);
	ctx.fillText("banker earns the least.",120, 320);
	ctx.drawImage(img, 12, 375);
	ctx.fillText("Press SPACE BAR to continue",125, 460);

	game_data.menu_counter = menu_enum.EXP_PROF;

}

function drawMonthPick(){

	clearCanvas();
	hideTextBoxes();
	img = document.getElementById("title_graphic.png");
	ctx.drawImage(img, 12, 10);
	ctx.font = "16px AppleII";
	ctx.fillStyle = "white";
	ctx.fillText("It is 1848. Your jumping off",80,100);
	ctx.fillText("place for Oregon is Independence,",80,120);
	ctx.fillText("Missouri. You must decide which",80,140);
	ctx.fillText("month to leave Independence.",80,160);
	ctx.fillText("1.  March", 107, 200);
	ctx.fillText("2.  April", 107, 220);
	ctx.fillText("3.  May", 107, 240);
	ctx.fillText("4.  June", 107, 260);
	ctx.fillText("5.  July", 107, 280);
	ctx.fillText("6.  Ask for advice", 107, 300);
	ctx.fillText("What is your choice?",80, 345);
	ctx.drawImage(img, 12, 375);

	// Bring the input box back.
	document.getElementById("month").setAttribute("type","text");
	document.getElementById("month").setAttribute("value","");
	document.getElementById("month").focus();

}

function drawMonthInfo(){

	img = document.getElementById("title_graphic.png");
	clearCanvas();
	hideTextBoxes();
	ctx.drawImage(img, 12, 10);
	ctx.font = "16px AppleII";
	ctx.fillStyle = "white";
	ctx.fillText("You attend a public meeting held",120,100);
	ctx.fillText('for "folks with the California -"',120,120);
	ctx.fillText('Oregon fever." You\'re told:',120, 140);
	ctx.fillText("If you leave too early, there", 120, 180);
	ctx.fillText("won't be any grass for your", 120, 200);
	ctx.fillText("However, the harder you have", 120, 220);
	ctx.fillText("to try, the more points you", 120, 240);
	ctx.fillText("deserve! Therefore, the", 120, 260);
	ctx.fillText("farmer earns the greatest",120, 280);
	ctx.fillText("number of points and the",120, 300);
	ctx.fillText("banker earns the least.",120, 320);
	ctx.drawImage(img, 12, 375);
	ctx.fillText("Press SPACE BAR to continue",125, 460);

	game_data.menu_counter = menu_enum.EXP_MONTH;

}

function drawSupplyMsg(){

	img = document.getElementById("title_graphic.png");
	clearCanvas();
	hideTextBoxes();
	ctx.drawImage(img, 12, 10);
	ctx.font = "16px AppleII";
	ctx.fillStyle = "white";
	ctx.fillText("Before leaving Independence you",120,200);
	ctx.fillText("should buy equipment and",120,220);
	ctx.fillText("supplies. You have $1600.00 in",120, 240);
	ctx.fillText("cash, but you don't have to", 120, 260);
	ctx.fillText("spend it all now.", 120, 280);
	ctx.drawImage(img, 12, 375);
	ctx.fillText("Press SPACE BAR to continue",125, 460);

	game_data.menu_counter = menu_enum.SUPPLY_MSG;

}

function drawMattMsg(){

	img = document.getElementById("title_graphic.png");
	clearCanvas();
	hideTextBoxes();
	ctx.drawImage(img, 12, 10);
	ctx.font = "16px AppleII";
	ctx.fillStyle = "white";
	ctx.fillText("You can buy whatever you need at",120,220);
	ctx.fillText("Matt's General Store.",120, 240);
	ctx.drawImage(img, 12, 375);
	ctx.fillText("Press SPACE BAR to continue",125, 460);

	game_data.menu_counter = menu_enum.MATT_MSG;

}

function drawMattWelcome(){

	clearCanvas();
	hideTextBoxes();
	img = document.getElementById("matt");
	ctx.drawImage(img, 40, 160, 110, 270);
	ctx.font = "16px AppleII";
	ctx.fillStyle = "white";
	ctx.fillText("Hello, I'm Matt. So you're going",130,70);
	ctx.fillText("to Oregon! I can fix you up with",130, 90);
	ctx.fillText("what you need:",130, 110);
	ctx.fillText("- a team of oxen to pull",200, 190);
	ctx.fillText("your wagon",230, 210);
	ctx.fillText("- clothing for both",200, 250);
	ctx.fillText("summer and winter",230, 270);
	ctx.fillText("Press SPACE BAR to continue",125, 460);

	game_data.menu_counter = menu_enum.MATT_WELCOME;

}

function drawMattWelcome2(){

	clearCanvas();
	hideTextBoxes();
	img = document.getElementById("matt");
	ctx.drawImage(img, 40, 160, 110, 270);
	ctx.font = "16px AppleII";
	ctx.fillStyle = "white";
	ctx.fillText("Hello, I'm Matt. So you're going",130,70);
	ctx.fillText("to Oregon! I can fix you up with",130, 90);
	ctx.fillText("what you need:",130, 110);
	ctx.fillText("- plenty of food for the",200, 190);
	ctx.fillText("trip",230, 210);
	ctx.fillText("- worms for your",200, 250);
	ctx.fillText("fishing rod",230, 270);
	ctx.fillText("- spare parts for your",200, 310);
	ctx.fillText("wagon",230, 330);
	ctx.fillText("Press SPACE BAR to continue",125, 460);

	game_data.menu_counter = menu_enum.MATT_WELCOME2;

}

function drawMattStorefront(){

	clearCanvas();
	hideTextBoxes();
	img = document.getElementById("matt");
	ctx.drawImage(img, 40, 160, 110, 270);

	ctx.lineWidth = "6";
	ctx.strokeStyle = "#ff3d3d";
	ctx.beginPath();
	ctx.moveTo(200, 30);
	ctx.lineTo(585, 30);
	ctx.stroke();
	ctx.beginPath();
	ctx.moveTo(200, 120);
	ctx.lineTo(585, 120);
	ctx.stroke();
	ctx.beginPath();
	ctx.moveTo(200, 232);
	ctx.lineTo(585, 232);
	ctx.stroke();

	var curr_funds = "$" + game_data.current_money.toFixed(2);
	var curr_oxen = "$" + matt_bill.oxen_amt.toFixed(2);
	var curr_food = "$" + matt_bill.food_amt.toFixed(2);
	var curr_clothing = "$" + matt_bill.clothing_amt.toFixed(2);
	var curr_worm = "$" + matt_bill.worm_amt.toFixed(2);
	var curr_parts = "$" + matt_bill.parts_amt.toFixed(2);
	var curr_total = "$" + matt_bill.total.toFixed(2);

	ctx.fillText("Matt's General Store",250,50);
	ctx.fillText("Independence, Missouri",250, 70);
	ctx.fillText(game_data.chosen_month,300, 112);
	ctx.fillText("1,  1848",390, 112);

	ctx.fillText("1.  Oxen",230, 142);
	ctx.fillText(curr_oxen,470, 142);
	ctx.fillText("2.  Food",230, 162);
	ctx.fillText(curr_food,470, 162);
	ctx.fillText("3.  Clothing",230, 182);
	ctx.fillText(curr_clothing,470, 182);
	ctx.fillText("4.  Worms",230, 202);
	ctx.fillText(curr_worm,470, 202);
	ctx.fillText("5.  Spare parts",230, 222);
	ctx.fillText(curr_parts,470, 222);
	ctx.fillText("Total bill:",270, 252);
	ctx.fillText(curr_total,470, 252);
	ctx.fillText("Amount you have:",210, 292);
	ctx.fillText(curr_funds,470, 292);

	ctx.fillText("Which item would you", 245, 332);
	ctx.fillText("like to buy?",245, 352);

	ctx.fillText("Press SPACE BAR to",245, 392);
	ctx.fillText("leave store",245, 412);

	document.getElementById("matt_text").setAttribute("type","text");
	document.getElementById("matt_text").setAttribute("value","");
	document.getElementById("matt_text").focus();

	game_data.menu_counter = menu_enum.MATT_STOREFRONT;
	
}

function drawMattOxen(){

	clearCanvas();
	hideTextBoxes();
	img = document.getElementById("matt");
	ctx.drawImage(img, 40, 160, 110, 270);
	img = document.getElementById("matt_oxen_img");
	ctx.drawImage(img, 290, 315, 170, 120);

	ctx.lineWidth = "6";
	ctx.strokeStyle = "#ff3d3d";
	ctx.beginPath();
	ctx.moveTo(200, 30);
	ctx.lineTo(585, 30);
	ctx.stroke();
	ctx.beginPath();
	ctx.moveTo(200, 80);
	ctx.lineTo(585, 80);
	ctx.stroke();
	ctx.beginPath();

	ctx.fillText("Matt's General Store",250,50);
	ctx.fillText("Independence, Missouri",250, 70);

	ctx.fillText("There are 2 oxen in a yoke;",200, 162);
	ctx.fillText("I recommend at least 3 yoke.",200, 182);
	ctx.fillText("I charge $40 a yoke.",200, 202);

	ctx.fillText("How many yoke do you",200, 252);
	ctx.fillText("want?",200, 272);

	document.getElementById("matt_oxen").setAttribute("type","text");
	document.getElementById("matt_oxen").setAttribute("value","");
	document.getElementById("matt_oxen").focus();

    var curr_total = "$" + matt_bill.total.toFixed(2);
	ctx.fillText("Bill so far:",245, 450);
	ctx.fillText(curr_total,420, 450);

}

function drawMattOxenInvalid(){

	clearCanvas();
	hideTextBoxes();
	img = document.getElementById("matt");
	ctx.drawImage(img, 40, 160, 110, 270);
	img = document.getElementById("matt_oxen_img");
	ctx.drawImage(img, 290, 315, 170, 120);

	ctx.lineWidth = "6";
	ctx.strokeStyle = "#ff3d3d";
	ctx.beginPath();
	ctx.moveTo(200, 30);
	ctx.lineTo(585, 30);
	ctx.stroke();
	ctx.beginPath();
	ctx.moveTo(200, 80);
	ctx.lineTo(585, 80);
	ctx.stroke();
	ctx.beginPath();

	ctx.fillText("Matt's General Store",250,50);
	ctx.fillText("Independence, Missouri",250, 70);
	ctx.fillText("You didn't have enough cash.",200, 100);

	ctx.fillText("There are 2 oxen in a yoke;",200, 162);
	ctx.fillText("I recommend at least 3 yoke.",200, 182);
	ctx.fillText("I charge $40 a yoke.",200, 202);

	ctx.fillText("How many yoke do you",200, 252);
	ctx.fillText("want?",200, 272);

	document.getElementById("matt_oxen").setAttribute("type","text");
	document.getElementById("matt_oxen").setAttribute("value","");
	document.getElementById("matt_oxen").focus();

    var curr_total = "$" + matt_bill.total.toFixed(2);
	ctx.fillText("Bill so far:",245, 450);
	ctx.fillText(curr_total,420, 450);

}

function drawMattFood(){

	clearCanvas();
	hideTextBoxes();
	img = document.getElementById("matt");
	ctx.drawImage(img, 40, 160, 110, 270);
	img = document.getElementById("matt_food_img");
	ctx.drawImage(img, 320, 372, 90, 60);

	ctx.lineWidth = "6";
	ctx.strokeStyle = "#ff3d3d";
	ctx.beginPath();
	ctx.moveTo(200, 30);
	ctx.lineTo(585, 30);
	ctx.stroke();
	ctx.beginPath();
	ctx.moveTo(200, 80);
	ctx.lineTo(585, 80);
	ctx.stroke();
	ctx.beginPath();

	ctx.fillText("Matt's General Store",250,50);
	ctx.fillText("Independence, Missouri",250, 70);

	ctx.fillText("I recommend you take at",200, 162);
	ctx.fillText("least 200 pounds of food",200, 182);
	ctx.fillText("for each person in your",200, 202);
	ctx.fillText("family. I see that you have",200, 222);
	ctx.fillText("5 people in all. You'll need",200, 242);
	ctx.fillText("flour, sugar, bacon, and",200, 262);
	ctx.fillText("coffee. My price is 20",200, 282);
	ctx.fillText("cents per pound.",200, 302);

	ctx.fillText("How many pounds of food do",200, 342);
	ctx.fillText("you want?",200, 362);

	document.getElementById("matt_food").setAttribute("type","text");
	document.getElementById("matt_food").setAttribute("value","");
	document.getElementById("matt_food").focus();

    var curr_total = "$" + matt_bill.total.toFixed(2);
	ctx.fillText("Bill so far:",245, 450);
	ctx.fillText(curr_total,420, 450);

}

function drawMattFoodInvalid(){

	clearCanvas();
	hideTextBoxes();
	img = document.getElementById("matt");
	ctx.drawImage(img, 40, 160, 110, 270);
	img = document.getElementById("matt_food_img");
	ctx.drawImage(img, 320, 372, 90, 60);

	ctx.lineWidth = "6";
	ctx.strokeStyle = "#ff3d3d";
	ctx.beginPath();
	ctx.moveTo(200, 30);
	ctx.lineTo(585, 30);
	ctx.stroke();
	ctx.beginPath();
	ctx.moveTo(200, 80);
	ctx.lineTo(585, 80);
	ctx.stroke();
	ctx.beginPath();

	ctx.fillText("Matt's General Store",250,50);
	ctx.fillText("Independence, Missouri",250, 70);
	ctx.fillText("You didn't have enough cash.",200, 100);

	ctx.fillText("I recommend you take at",200, 162);
	ctx.fillText("least 200 pounds of food",200, 182);
	ctx.fillText("for each person in your",200, 202);
	ctx.fillText("family. I see that you have",200, 222);
	ctx.fillText("5 people in all. You'll need",200, 242);
	ctx.fillText("flour, sugar, bacon, and",200, 262);
	ctx.fillText("coffee. My price is 20",200, 282);
	ctx.fillText("cents per pound.",200, 302);

	ctx.fillText("How many pounds of food do",200, 342);
	ctx.fillText("you want?",200, 362);

	document.getElementById("matt_food").setAttribute("type","text");
	document.getElementById("matt_food").setAttribute("value","");
	document.getElementById("matt_food").focus();

    var curr_total = "$" + matt_bill.total.toFixed(2);
	ctx.fillText("Bill so far:",245, 450);
	ctx.fillText(curr_total,420, 450);

}

function drawMattClothing(){

	clearCanvas();
	hideTextBoxes();
	img = document.getElementById("matt");
	ctx.drawImage(img, 40, 160, 110, 270);
	img = document.getElementById("matt_clothing_img");
	ctx.drawImage(img, 320, 325, 120, 80);

	ctx.lineWidth = "6";
	ctx.strokeStyle = "#ff3d3d";
	ctx.beginPath();
	ctx.moveTo(200, 30);
	ctx.lineTo(585, 30);
	ctx.stroke();
	ctx.beginPath();
	ctx.moveTo(200, 80);
	ctx.lineTo(585, 80);
	ctx.stroke();
	ctx.beginPath();

	ctx.fillText("Matt's General Store",250,50);
	ctx.fillText("Independence, Missouri",250, 70);

	ctx.fillText("You'll need warm clothing in",200, 162);
	ctx.fillText("the mountains. I recommend",200, 182);
	ctx.fillText("taking at least 2 sets of",200, 202);
	ctx.fillText("clothes per person. Each",200, 222);
	ctx.fillText("set is $10.00.",200, 242);

	ctx.fillText("How many sets of clothes do",200, 282);
	ctx.fillText("you want?",200, 302);

	document.getElementById("matt_clothing").setAttribute("type","text");
	document.getElementById("matt_clothing").setAttribute("value","");
	document.getElementById("matt_clothing").focus();

    var curr_total = "$" + matt_bill.total.toFixed(2);
	ctx.fillText("Bill so far:",245, 450);
	ctx.fillText(curr_total,420, 450);

}

function drawMattClothingInvalid(){

	clearCanvas();
	hideTextBoxes();
	img = document.getElementById("matt");
	ctx.drawImage(img, 40, 160, 110, 270);
	img = document.getElementById("matt_clothing_img");
	ctx.drawImage(img, 320, 325, 120, 80);

	ctx.lineWidth = "6";
	ctx.strokeStyle = "#ff3d3d";
	ctx.beginPath();
	ctx.moveTo(200, 30);
	ctx.lineTo(585, 30);
	ctx.stroke();
	ctx.beginPath();
	ctx.moveTo(200, 80);
	ctx.lineTo(585, 80);
	ctx.stroke();
	ctx.beginPath();

	ctx.fillText("Matt's General Store",250,50);
	ctx.fillText("Independence, Missouri",250, 70);
	ctx.fillText("You didn't have enough cash.",200, 100);

	ctx.fillText("You'll need warm clothing in",200, 162);
	ctx.fillText("the mountains. I recommend",200, 182);
	ctx.fillText("taking at least 2 sets of",200, 202);
	ctx.fillText("clothes per person. Each",200, 222);
	ctx.fillText("set is $10.00.",200, 242);

	ctx.fillText("How many sets of clothes do",200, 282);
	ctx.fillText("you want?",200, 302);

	document.getElementById("matt_clothing").setAttribute("type","text");
	document.getElementById("matt_clothing").setAttribute("value","");
	document.getElementById("matt_clothing").focus();

    var curr_total = "$" + matt_bill.total.toFixed(2);
	ctx.fillText("Bill so far:",245, 450);
	ctx.fillText(curr_total,420, 450);

}

function drawMattWorm(){

	clearCanvas();
	hideTextBoxes();
	img = document.getElementById("matt");
	ctx.drawImage(img, 40, 160, 110, 270);
	img = document.getElementById("matt_worm_img");
	ctx.drawImage(img, 320, 325, 120, 80);

	ctx.lineWidth = "6";
	ctx.strokeStyle = "#ff3d3d";
	ctx.beginPath();
	ctx.moveTo(200, 30);
	ctx.lineTo(585, 30);
	ctx.stroke();
	ctx.beginPath();
	ctx.moveTo(200, 80);
	ctx.lineTo(585, 80);
	ctx.stroke();
	ctx.beginPath();

	ctx.fillText("Matt's General Store",250,50);
	ctx.fillText("Independence, Missouri",250, 70);

	ctx.fillText("I sell baitworms in sets",200, 162);
	ctx.fillText("of 20 worms. Each set",200, 182);
	ctx.fillText("costs $2.00.",200, 202);

	ctx.fillText("How many sets do you",200, 242);
	ctx.fillText("you want?",200, 262);

	document.getElementById("matt_worms").setAttribute("type","text");
	document.getElementById("matt_worms").setAttribute("value","");
	document.getElementById("matt_worms").focus();

    var curr_total = "$" + matt_bill.total.toFixed(2);
	ctx.fillText("Bill so far:",245, 450);
	ctx.fillText(curr_total,420, 450);

}

function drawMattWormInvalid(){

	clearCanvas();
	hideTextBoxes();
	img = document.getElementById("matt");
	ctx.drawImage(img, 40, 160, 110, 270);
	img = document.getElementById("matt_worm_img");
	ctx.drawImage(img, 320, 325, 120, 80);

	ctx.lineWidth = "6";
	ctx.strokeStyle = "#ff3d3d";
	ctx.beginPath();
	ctx.moveTo(200, 30);
	ctx.lineTo(585, 30);
	ctx.stroke();
	ctx.beginPath();
	ctx.moveTo(200, 80);
	ctx.lineTo(585, 80);
	ctx.stroke();
	ctx.beginPath();

	ctx.fillText("Matt's General Store",250,50);
	ctx.fillText("Independence, Missouri",250, 70);
	ctx.fillText("You didn't have enough cash.",200, 100);

	ctx.fillText("I sell baitworms in sets",200, 162);
	ctx.fillText("of 20 worms. Each set",200, 182);
	ctx.fillText("costs $2.00.",200, 202);

	ctx.fillText("How many sets do you",200, 242);
	ctx.fillText("you want?",200, 262);

	document.getElementById("matt_worms").setAttribute("type","text");
	document.getElementById("matt_worms").setAttribute("value","");
	document.getElementById("matt_worms").focus();

    var curr_total = "$" + matt_bill.total.toFixed(2);
	ctx.fillText("Bill so far:",245, 450);
	ctx.fillText(curr_total,420, 450);

}

function drawMattWagonWheels(){

	clearCanvas();
	hideTextBoxes();
	img = document.getElementById("matt");
	ctx.drawImage(img, 40, 160, 110, 270);
	img = document.getElementById("matt_parts_img");
	ctx.drawImage(img, 320, 340, 120, 80);

	ctx.lineWidth = "6";
	ctx.strokeStyle = "#ff3d3d";
	ctx.beginPath();
	ctx.moveTo(200, 30);
	ctx.lineTo(585, 30);
	ctx.stroke();
	ctx.beginPath();
	ctx.moveTo(200, 80);
	ctx.lineTo(585, 80);
	ctx.stroke();
	ctx.beginPath();

	ctx.fillText("Matt's General Store",250,50);
	ctx.fillText("Independence, Missouri",250, 70);

	ctx.fillText("It's a good idea to have a",200, 162);
	ctx.fillText("few spare parts for your",200, 182);
	ctx.fillText("wagon. Here are the prices:",200, 202);

	ctx.fillText("wagon wheel - $10 each",220, 242);
	ctx.fillText("wagon wheel - $10 each",220, 262);
	ctx.fillText("wagon wheel - $10 each",220, 282);

	ctx.fillText("How many wagon wheels?",200, 322);


	document.getElementById("matt_wheels").setAttribute("type","text");
	document.getElementById("matt_wheels").setAttribute("value","");
	document.getElementById("matt_wheels").focus();

    var curr_total = "$" + matt_bill.total.toFixed(2);
	ctx.fillText("Bill so far:",245, 450);
	ctx.fillText(curr_total,420, 450);

}

function drawMattWagonWheelsInvalid(){

	clearCanvas();
	hideTextBoxes();
	img = document.getElementById("matt");
	ctx.drawImage(img, 40, 160, 110, 270);
	img = document.getElementById("matt_parts_img");
	ctx.drawImage(img, 320, 340, 120, 80);

	ctx.lineWidth = "6";
	ctx.strokeStyle = "#ff3d3d";
	ctx.beginPath();
	ctx.moveTo(200, 30);
	ctx.lineTo(585, 30);
	ctx.stroke();
	ctx.beginPath();
	ctx.moveTo(200, 80);
	ctx.lineTo(585, 80);
	ctx.stroke();
	ctx.beginPath();

	ctx.fillText("Matt's General Store",250,50);
	ctx.fillText("Independence, Missouri",250, 70);
	ctx.fillText("You didn't have enough cash.",200, 100);

	ctx.fillText("It's a good idea to have a",200, 162);
	ctx.fillText("few spare parts for your",200, 182);
	ctx.fillText("wagon. Here are the prices:",200, 202);

	ctx.fillText("wagon wheel - $10 each",220, 242);
	ctx.fillText("wagon wheel - $10 each",220, 262);
	ctx.fillText("wagon wheel - $10 each",220, 282);

	ctx.fillText("How many wagon wheels?",200, 322);


	document.getElementById("matt_wheels").setAttribute("type","text");
	document.getElementById("matt_wheels").setAttribute("value","");
	document.getElementById("matt_wheels").focus();

    var curr_total = "$" + matt_bill.total.toFixed(2);
	ctx.fillText("Bill so far:",245, 450);
	ctx.fillText(curr_total,420, 450);

}

function drawMattWagonAxles(){

	clearCanvas();
	hideTextBoxes();
	img = document.getElementById("matt");
	ctx.drawImage(img, 40, 160, 110, 270);
	img = document.getElementById("matt_parts_img");
	ctx.drawImage(img, 320, 340, 120, 80);

	ctx.lineWidth = "6";
	ctx.strokeStyle = "#ff3d3d";
	ctx.beginPath();
	ctx.moveTo(200, 30);
	ctx.lineTo(585, 30);
	ctx.stroke();
	ctx.beginPath();
	ctx.moveTo(200, 80);
	ctx.lineTo(585, 80);
	ctx.stroke();
	ctx.beginPath();

	ctx.fillText("Matt's General Store",250,50);
	ctx.fillText("Independence, Missouri",250, 70);

	ctx.fillText("It's a good idea to have a",200, 162);
	ctx.fillText("few spare parts for your",200, 182);
	ctx.fillText("wagon. Here are the prices:",200, 202);

	ctx.fillText("wagon wheel - $10 each",220, 242);
	ctx.fillText("wagon wheel - $10 each",220, 262);
	ctx.fillText("wagon wheel - $10 each",220, 282);

	ctx.fillText("How many wagon axles?",200, 322);


	document.getElementById("matt_axles").setAttribute("type","text");
	document.getElementById("matt_axles").setAttribute("value","");
	document.getElementById("matt_axles").focus();

    var curr_total = "$" + matt_bill.total.toFixed(2);
	ctx.fillText("Bill so far:",245, 450);
	ctx.fillText(curr_total,420, 450);

}

function drawMattWagonAxlesInvalid(){

	clearCanvas();
	hideTextBoxes();
	img = document.getElementById("matt");
	ctx.drawImage(img, 40, 160, 110, 270);
	img = document.getElementById("matt_parts_img");
	ctx.drawImage(img, 320, 340, 120, 80);

	ctx.lineWidth = "6";
	ctx.strokeStyle = "#ff3d3d";
	ctx.beginPath();
	ctx.moveTo(200, 30);
	ctx.lineTo(585, 30);
	ctx.stroke();
	ctx.beginPath();
	ctx.moveTo(200, 80);
	ctx.lineTo(585, 80);
	ctx.stroke();
	ctx.beginPath();

	ctx.fillText("Matt's General Store",250,50);
	ctx.fillText("Independence, Missouri",250, 70);
	ctx.fillText("You didn't have enough cash.",200, 100);

	ctx.fillText("It's a good idea to have a",200, 162);
	ctx.fillText("few spare parts for your",200, 182);
	ctx.fillText("wagon. Here are the prices:",200, 202);

	ctx.fillText("wagon wheel - $10 each",220, 242);
	ctx.fillText("wagon wheel - $10 each",220, 262);
	ctx.fillText("wagon wheel - $10 each",220, 282);

	ctx.fillText("How many wagon axles?",200, 322);

	document.getElementById("matt_axles").setAttribute("type","text");
	document.getElementById("matt_axles").setAttribute("value","");
	document.getElementById("matt_axles").focus();

    var curr_total = "$" + matt_bill.total.toFixed(2);
	ctx.fillText("Bill so far:",245, 450);
	ctx.fillText(curr_total,420, 450);

}

function drawMattWagonTongues(){

	clearCanvas();
	hideTextBoxes();
	img = document.getElementById("matt");
	ctx.drawImage(img, 40, 160, 110, 270);
	img = document.getElementById("matt_parts_img");
	ctx.drawImage(img, 320, 340, 120, 80);

	ctx.lineWidth = "6";
	ctx.strokeStyle = "#ff3d3d";
	ctx.beginPath();
	ctx.moveTo(200, 30);
	ctx.lineTo(585, 30);
	ctx.stroke();
	ctx.beginPath();
	ctx.moveTo(200, 80);
	ctx.lineTo(585, 80);
	ctx.stroke();
	ctx.beginPath();

	ctx.fillText("Matt's General Store",250,50);
	ctx.fillText("Independence, Missouri",250, 70);

	ctx.fillText("It's a good idea to have a",200, 162);
	ctx.fillText("few spare parts for your",200, 182);
	ctx.fillText("wagon. Here are the prices:",200, 202);

	ctx.fillText("wagon wheel - $10 each",220, 242);
	ctx.fillText("wagon wheel - $10 each",220, 262);
	ctx.fillText("wagon wheel - $10 each",220, 282);

	ctx.fillText("How many wagon tongues?",200, 322);


	document.getElementById("matt_tongues").setAttribute("type","text");
	document.getElementById("matt_tongues").setAttribute("value","");
	document.getElementById("matt_tongues").focus();

    var curr_total = "$" + matt_bill.total.toFixed(2);
	ctx.fillText("Bill so far:",245, 450);
	ctx.fillText(curr_total,420, 450);

}

function drawMattWagonTonguesInvalid(){

	clearCanvas();
	hideTextBoxes();
	img = document.getElementById("matt");
	ctx.drawImage(img, 40, 160, 110, 270);
	img = document.getElementById("matt_parts_img");
	ctx.drawImage(img, 320, 340, 120, 80);

	ctx.lineWidth = "6";
	ctx.strokeStyle = "#ff3d3d";
	ctx.beginPath();
	ctx.moveTo(200, 30);
	ctx.lineTo(585, 30);
	ctx.stroke();
	ctx.beginPath();
	ctx.moveTo(200, 80);
	ctx.lineTo(585, 80);
	ctx.stroke();
	ctx.beginPath();

	ctx.fillText("Matt's General Store",250,50);
	ctx.fillText("Independence, Missouri",250, 70);
	ctx.fillText("You didn't have enough cash.",200, 100);

	ctx.fillText("It's a good idea to have a",200, 162);
	ctx.fillText("few spare parts for your",200, 182);
	ctx.fillText("wagon. Here are the prices:",200, 202);

	ctx.fillText("wagon wheel - $10 each",220, 242);
	ctx.fillText("wagon wheel - $10 each",220, 262);
	ctx.fillText("wagon wheel - $10 each",220, 282);

	ctx.fillText("How many wagon tongues?",200, 322);


	document.getElementById("matt_tongues").setAttribute("type","text");
	document.getElementById("matt_tongues").setAttribute("value","");
	document.getElementById("matt_tongues").focus();

    var curr_total = "$" + matt_bill.total.toFixed(2);
	ctx.fillText("Bill so far:",245, 450);
	ctx.fillText(curr_total,420, 450);

}

function drawMattGoodbye(){

	clearCanvas();
	hideTextBoxes();
	game_data.menu_counter = menu_enum.MATT_GOODBYE;
	img = document.getElementById("matt");
	ctx.drawImage(img, 40, 160, 110, 270);

	ctx.fillText("Well then, you're ready",200, 200);
	ctx.fillText("to start. Good luck!",200, 220);
	ctx.fillText("you have a long and",200, 240);
	ctx.fillText("difficult journey ahead",200, 260);
	ctx.fillText("of you.",200, 280);

	ctx.fillText("Press ENTER to continue",200, 460);

}

function drawIndependence(){

	clearCanvas();
	hideTextBoxes();
	img = document.getElementById("Independence_img");
	game_data.menu_counter = menu_enum.INDEPENDENCE;
	game_data.current_month = game_data.chosen_month;
	game_data.current_location = 0;
	ctx.drawImage(img, 30, 30, 580, 300);
	ctx.beginPath();		
	ctx.fillStyle = "white";
	ctx.fillRect(125, 380, 390, 50); 
	ctx.stroke();
	ctx.fillText("Press SPACE BAR to continue",125, 460);
	ctx.fillStyle = "black";
	ctx.fillText("Independence", 240, 400);
	ctx.fillText(game_data.chosen_month + " 1, 1848", 230, 420);

}

function drawSizeUpMenu(){
	
	  game_data.menu_counter = menu_enum.SIZE_UP_MENU;
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

function drawFortMenu(){
	
	  game_data.menu_counter = menu_enum.FORT_MENU;
      clearCanvas();
	  hideTextBoxes();
	  ctx.font = "16px AppleII";
	  ctx.fillStyle = "white";
	  ctx.fillText(LOCATIONS[game_data.current_location] + "	" + game_data.current_month + " " + game_data.current_day + ", " + game_data.current_year, 225, 30);
	  ctx.fillText("You may:", 30, 180);
	  ctx.fillText("1.  Check supplies", 100, 220);
	  ctx.fillText("2.  Look at map", 100, 240);
	  ctx.fillText("3.  Change pace", 100, 260);
	  ctx.fillText("4.  Change food rations", 100, 280);
	  ctx.fillText("5.  Stop to rest", 100, 300);
	  ctx.fillText("6.  Attempt to trade", 100, 320);
	  ctx.fillText("7.  Fish for food", 100, 340);
	  ctx.fillText("8.  Shop at the general store", 100, 360);
	  ctx.fillText("What is your choice?", 30, 460);
	  ctx.fillText("Or press Space to continue", 100, 400)
	  
	  ctx.beginPath();		
	  ctx.fillRect(30, 50, 580, 100); 
      ctx.stroke();
	  ctx.fillStyle = "black";
	  ctx.fillText("Weather: " + weather[random], 45, 75);
	  ctx.fillText("Health: " + game_data.current_health, 45, 95);
	  ctx.fillText("Pace: " + game_data.current_pace, 45, 115);
	  ctx.fillText("Rations: " + game_data.current_rations, 45, 135);

      var fort = document.getElementById("fort_menu");
	  fort.style.top = "531px";
	  fort.style.left = "750px";
	  fort.setAttribute("type","text");
	  fort.setAttribute("value","");
	  fort.focus();
		
}

function drawWin(){

      clearCanvas();
	  hideTextBoxes();
	  ctx.font = "bolder 25px AppleII";
	  ctx.fillStyle = "white";
	  ctx.fillText("Congradulations! You made it to Oregon City", 100, 280);
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
  game_data.menu_counter = menu_enum.SIZE_UP_MENU;
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

function handleFort(val){
  game_data.menu_counter = menu_enum.FORT_MENU;
  if(val.length == 1){
	  
	  if (val == 1) { drawCheckSupplies(); }
	  else if (val == 2) { drawCheckMap(); }
	  else if (val == 3) { drawChangePace(); }
	  else if (val == 4) { drawChangeRations(); }
	  else if (val == 5) { drawSizeUpMenuRest(); }
	  else if (val == 6) { drawAttemptTrade(); }
	  else if (val == 7) { drawFishFood(); }
	  else if (val == 8) { drawFortBuy(); }
	  
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
	  else if (game_data.current_rations == "meager"){ food_amt = 2; }
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

function playGame(){
	game_data.menu_counter = menu_enum.ON_TRAIL;
	clearCanvas();
	hideTextBoxes();
	drawDay();
	mathDay();
}

function mathDay(){
	//Check pace
	if (game_data.current_pace == 1){ 	//20mi a day base
		game_data.miles_traveled = game_data.miles_traveled + 20;
	}
	else if (game_data.current_pace == 2){	//30mi a day strenuous
		game_data.miles_traveled = game_data.miles_traveled + 30;
	}
	else{	//40mi a day grueling
		game_data.miles_traveled = game_data.miles_traveled + 40;
	}
	
	if ((MILESTONE_DIST[game_data.current_location] - game_data.miles_traveled) <= 0){
		game_data.current_location = game_data.current_location + 1;
		if (game_data.current_location >= 17){
			game_data.menu_counter = menu_enum.OREGON_CITY;
			drawWin();
		}
		else{
			drawFortMenu();	
		}
	}
	
	//Do food math 1 lb per person per day per eating level
	game_data.num_food = game_data.num_food - (game_data.party_alive * game_data.current_rations);
	if (game_data.num_food <= 0){
		game_data.num_food = 0;
	}
	
	game_data.current_day = game_data.current_day + 1;
	if(game_data.current_day == 30){
		switch(game_data.current_month){
			case "September":
				game_data.current_month = "October";
				game_data.current_day = 1;
				break;
			case "April":
				game_data.current_month = "May";
				game_data.current_day = 1;
				break;
			case "June":
				game_data.current_month = "July";
				game_data.current_day = 1;
				break;
		}
	}

	if (game_data.current_day == 31){
		switch(game_data.current_month){
			case "May":
				game_data.current_month = "June";
				game_data.current_day = 1;
				break;
			case "July":
				game_data.current_month = "August";
				game_data.current_day = 1;
				break;
			case "August":
				game_data.current_month = "September";
				game_data.current_day = 1;
				break;
			case "March":
				game_data.current_month = "April";
				game_data.current_day = 1;
				break;
			case "October":
				game_data.current_month = "November";
				game_data.current_day = 1;
				// Display game loss at first Blizzard
				break;
		}
	}
}

function drawDay(){//Draw date/weather/health/food/landmark/miles traveled
	clearCanvas();
	ctx.beginPath();
	ctx.rect(20, 200, 600, 250);
	ctx.fillStyle = "white";
	ctx.fill();
	ctx.font = "bolder 18px AppleII";
	ctx.fillStyle = "Black";
	ctx.fillText("Date: 	" + game_data.current_month + " " + game_data.current_day + ", 1848",150, 320);
	ctx.fillText("Weather: Fair", 150,345);
	ctx.fillText("Health: Good", 150,370);
	ctx.fillText("Food: " + game_data.num_food ,150,395);
	ctx.fillText("Next Landmark: " + (MILESTONE_DIST[game_data.current_location] - game_data.miles_traveled),150,420);
	ctx.fillText("Miles Traveled: " + game_data.miles_traveled,150,445);
	ctx.fillStyle = "white";
	ctx.fillText("Press SPACE to continue", 150, 465);
}

function handleTitle(val){

  if (val > 0 && val < 6 && val.length == 1){

	hideTextBoxes();
	clearCanvas();

  }  else { return; }

  // No clue why, but this didn't work with
  // switch statements.
  if (val == 1){ drawProfPage(); }
  else if (val == 2) { drawGameInfo1(); }
  else if (val == 3) { game_data.menu_counter = 1; drawHighScores(); }

}

function handleProf(val){

  if (val > 0 && val < 5 && val.length == 1){

	hideTextBoxes();
	clearCanvas();

  }  else { return; }

  if (val > 0 && val < 4){

    if (val == 1){ game_data.chosen_profession = "banker"; }
	else if (val == 2){ game_data.chosen_profession = "carpenter"; }
	else { game_data.chosen_profession = "farmer"; }
    drawLeaderName();

  }
  else if (val == 4){

    drawProfInfo();

  }

}

function handleLeader(){

	game_data.leader_name = document.getElementById('leader').value;

	if (game_data.leader_name.length > 0){

	  hideTextBoxes();
	  clearCanvas();
	  drawPartyNames();

	} else { return; }

}

function handleParty2(val){

  if (val.length > 0){

    game_data.party1 = document.getElementById("party2").value;
    game_data.party_text_selector = 2;
    document.getElementById("party3").focus();

  }  else {

	  game_data.party1 = DEFAULT_PARTY_NAMES[0];
	  document.getElementById("party2").setAttribute("value",game_data.party1);
	  game_data.party2 = DEFAULT_PARTY_NAMES[1];
	  document.getElementById("party3").setAttribute("value",game_data.party2);
	  game_data.party3 = DEFAULT_PARTY_NAMES[2];
	  document.getElementById("party4").setAttribute("value",game_data.party3);
	  game_data.party4 = DEFAULT_PARTY_NAMES[3];
	  document.getElementById("party5").setAttribute("value",game_data.party4);
	  drawVerifyParty();

  }

}

function handleParty3(val){

  if (val.length > 0){

    game_data.party2 = document.getElementById("party3").value;
    game_data.party_text_selector = 3;
    document.getElementById("party4").focus();

  }  else {

	  game_data.party2 = DEFAULT_PARTY_NAMES[1];
	  document.getElementById("party3").setAttribute("value",game_data.party2);
	  game_data.party3 = DEFAULT_PARTY_NAMES[2];
	  document.getElementById("party4").setAttribute("value",game_data.party3);
	  game_data.party4 = DEFAULT_PARTY_NAMES[3];
	  document.getElementById("party5").setAttribute("value",game_data.party4);
	  drawVerifyParty();

  }

}

function handleParty4(val){

  if (val.length > 0){

    party3 = document.getElementById("party4").value;
    game_data.party_text_selector = 4;
    document.getElementById("party5").focus();

  }  else {

	  game_data.party3 = DEFAULT_PARTY_NAMES[2];
	  document.getElementById("party4").setAttribute("value",game_data.party3);
	  game_data.party4 = DEFAULT_PARTY_NAMES[3];
	  document.getElementById("party5").setAttribute("value",game_data.party4);
	  drawVerifyParty();

  }

}

function handleParty5(val){

  if (val.length > 0){

    party4 = document.getElementById("party5").value;
    drawVerifyParty();

  }  else {

	  game_data.party4 = DEFAULT_PARTY_NAMES[3];
	  document.getElementById("party5").setAttribute("value",game_data.party4);
	  drawVerifyParty();

  }

}

function handlePartyCorrect(val){

  if (val.length == 1 ){

    if (val == "Y" || val == "y"){

		drawMonthPick();

	}
	else if (val == "N" || val == "n"){

	  game_data.party1 = game_data.party2 = game_data.party3 = game_data.party4 = "";
	  clearCanvas();
	  hideTextBoxes();
	  drawPartyNames();

	}

  }
  else { return; }

}

function handleExplainPoints(val){

	if(val.length == 1){

		if (val == "Y" || val == "y"){

			hideTextBoxes();
			drawExplainPoints1();

		}
		else if (val == "N" || val == "n"){

			hideTextBoxes();
			drawTitle();

		}

	}

}

function handleMonth(val){

  if(val.length == 1){

    if (val != 6){

		game_data.chosen_month = MONTHS[val];
		game_data.current_month = MONTHS[val];
		drawSupplyMsg();

	} else if (val == 6){ drawMonthInfo(); }

  }

}

function handleMatt(val){

	if (val.length == 1){

		if (val == 1) { drawMattOxen(); }
		else if (val == 2) { drawMattFood(); }
		else if (val == 3) { drawMattClothing(); }
		else if (val == 4) { drawMattWorm(); }
		else if (val == 5) { drawMattWagonWheels(); }

	} else { return; }

}

function handleMattOxen(val){

  if (val.length > 0){

	var oxen = val * 40;

	// $40 per yoke
    if (oxen <= game_data.current_money){
	  game_data.current_money -= oxen;
	  matt_bill.total += oxen;
	  matt_bill.oxen_amt += oxen;
	  game_data.current_money.toFixed(2);
	  matt_bill.total.toFixed(2);
	  matt_bill.oxen_amt.toFixed(2);
	  game_data.num_oxen += val;
	  drawMattStorefront();
	} else { drawMattOxenInvalid(); }

  }

}

function handleMattFood(val){

  if (val.length > 0){

	// 20 cents per pound
	var food = val * .20;
	//alert(food);

	// $40 per yoke
    if (food <= game_data.current_money){
	  //alert("inside");
	  game_data.current_money -= food;
	  matt_bill.total += food;
	  matt_bill.food_amt += food;
	  game_data.current_money.toFixed(2);
	  matt_bill.total.toFixed(2);
	  matt_bill.food_amt.toFixed(2);
	  game_data.num_food += val;
	  drawMattStorefront();
	} else { drawMattFoodInvalid(); }

  }

}

function handleMattClothing(val){

  if (val.length > 0){

	// 20 cents per pound
	var clothing = val * 10;

	// $40 per yoke
    if (clothing <= game_data.current_money){

	  game_data.current_money -= clothing;
	  matt_bill.total += clothing;
	  matt_bill.clothing_amt += clothing;
	  game_data.current_money.toFixed(2);
	  matt_bill.total.toFixed(2);
	  matt_bill.food_amt.toFixed(2);
	  game_data.num_clothing += val;
	  drawMattStorefront();
	} else { drawMattClothingInvalid(); }

  }

}

function handleMattWorms(val){

  if (val.length > 0){

	// 20 cents per pound
	var worms = val * 2;

	// $40 per yoke
    if (worms <= game_data.current_money){

	  game_data.current_money -= worms;
	  matt_bill.total += worms;
	  matt_bill.worm_amt += worms;
	  game_data.current_money.toFixed(2);
	  matt_bill.total.toFixed(2);
	  matt_bill.worm_amt.toFixed(2);
	  game_data.num_worms += (val * 20);
	  drawMattStorefront();
	} else { drawMattWormInvalid(); }

  }

}

function handleMattWheels(val){

  if (val.length > 0){

	// 10 per
	var wheels = val * 10;

	// $40 per yoke
    if (wheels <= game_data.current_money){

	  game_data.current_money -= wheels;
	  matt_bill.total += wheels;
	  matt_bill.parts_amt += wheels;
	  game_data.current_money.toFixed(2);
	  matt_bill.total.toFixed(2);
	  matt_bill.worm_amt.toFixed(2);
	  game_data.num_wagon_wheels += val;
	  drawMattWagonAxles();
	} else { drawMattWagonWheelsInvalid(); }

  }

}

function handleMattAxles(val){

  if (val.length > 0){

	// 10 per
	var axles = val * 10;

	// $40 per yoke
    if (axles <= game_data.current_money){

	  game_data.current_money -= axles;
	  matt_bill.total += axles;
	  matt_bill.parts_amt += axles;
	  game_data.current_money.toFixed(2);
	  matt_bill.total.toFixed(2);
	  matt_bill.worm_amt.toFixed(2);
	  game_data.num_wagon_axles += val;
	  drawMattWagonTongues();
	} else { drawMattWagonAxlesInvalid(); }

  }

}

function handleMattTongues(val){

  if (val.length > 0){

	// 10 per
	var tongues = val * 10;

	// $40 per yoke
    if (tongues <= game_data.current_money){

	  game_data.current_money -= tongues;
	  matt_bill.total += tongues;
	  matt_bill.parts_amt += tongues;
	  game_data.current_money.toFixed(2);
	  matt_bill.total.toFixed(2);
	  matt_bill.worm_amt.toFixed(2);
	  game_data.num_wagon_tongues += val;
	  drawMattStorefront();
	} else { drawMattWagonTonguesInvalid(); }

  }

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
	document.getElementById("explain_points").setAttribute("type","hidden");
	document.getElementById("explain_points").setAttribute("autofocus","");
	document.getElementById("month").setAttribute("type","hidden");
	document.getElementById("month").setAttribute("autofocus","");
	document.getElementById("matt_text").setAttribute("type","hidden");
	document.getElementById("matt_text").setAttribute("autofocus","");
	document.getElementById("matt_oxen").setAttribute("type","hidden");
	document.getElementById("matt_oxen").setAttribute("autofocus","");
	document.getElementById("matt_food").setAttribute("type","hidden");
	document.getElementById("matt_food").setAttribute("autofocus","");
	document.getElementById("matt_clothing").setAttribute("type","hidden");
	document.getElementById("matt_clothing").setAttribute("autofocus","");
	document.getElementById("matt_worms").setAttribute("type","hidden");
	document.getElementById("matt_worms").setAttribute("autofocus","");
	document.getElementById("matt_wheels").setAttribute("type","hidden");
	document.getElementById("matt_wheels").setAttribute("autofocus","");
	document.getElementById("matt_axles").setAttribute("type","hidden");
	document.getElementById("matt_axles").setAttribute("autofocus","");
	document.getElementById("matt_tongues").setAttribute("type","hidden");
	document.getElementById("matt_tongues").setAttribute("autofocus","");
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

function showPartyTextBoxes(){

	document.getElementById("party1").setAttribute("type","text");
	document.getElementById("party1").setAttribute("value",game_data.leader_name);

	document.getElementById("party2").setAttribute("type","text");
	document.getElementById("party2").setAttribute("value",game_data.party1);

	document.getElementById("party3").setAttribute("type","text");
	document.getElementById("party3").setAttribute("value",game_data.party2);

	document.getElementById("party4").setAttribute("type","text");
	document.getElementById("party4").setAttribute("value",game_data.party3);

	document.getElementById("party5").setAttribute("type","text");
	document.getElementById("party5").setAttribute("value",game_data.party4);

}

function clearCanvas(){	ctx.clearRect(0,0,c.width,c.height); }
function titleFocus(){ document.getElementById("title").focus(); }
function profFocus(){ document.getElementById("prof").focus(); }
function leaderFocus(){ document.getElementById("leader").focus(); }
function partyCorrectFocus() { document.getElementById("party_correct").focus(); }
function explainPointsFocus() { document.getElementById("explain_points").focus(); }
function monthFocus() { document.getElementById("month").focus(); }
function mattFocus() { document.getElementById("matt_text").focus(); }
function mattOxenFocus() { document.getElementById("matt_oxen").focus(); }
function mattFoodFocus() { document.getElementById("matt_food").focus(); }
function mattClothingFocus() { document.getElementById("matt_clothing").focus(); }
function mattWormsFocus() { document.getElementById("matt_worms").focus(); }
function mattWheelsFocus() { document.getElementById("matt_wheels").focus(); }
function mattAxlesFocus() { document.getElementById("matt_axles").focus(); }
function mattTonguesFocus() { document.getElementById("matt_tongues").focus(); }
function sizeUpFocus(){ document.getElementById("size_up").focus(); }
function changePaceFocus(){ document.getElementById("change_pace").focus(); }
function changeRationFocus() { document.getElementById("change_ration").focus(); }
function changeRestFocus() { document.getElementById("change_ration").focus(); }
function attemptTradeFocus(){ document.getElementById("trade_text").focus(); }
function fishingFocus(){ document.getElementById("fishing").focus(); }
function fortFocus(){ document.getElementById("fort_menu").focus(); }

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

  if (game_data.party_text_selector == 1){ document.getElementById("party2").focus(); }
  else if (game_data.party_text_selector == 2){ document.getElementById("party3").focus(); }
  else if (game_data.party_text_selector == 3){ document.getElementById("party4").focus(); }
  else if (game_data.party_text_selector == 4){ document.getElementById("party5").focus(); }

}
