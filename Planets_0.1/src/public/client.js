$(document).ready(function(){
    // WebSocket
    socket = io();
    var chosenMap = 0;
    var numberOfPlayers = 0;
    id = 0;
    var state = 0;
    var ClientGameControler1;
    iAmPlayer = 0;
    
 
    
    //Client holt sich eine ID vom Server
    socket.on('getID', function(data){
    	
    	if(id == 0){
    		id = data;
    	}
    	console.log("id = " +id);
    });
    
    
socket.on('createUniverse', function(data){
    	
    	if(socket.id == data.player1){
    		iAmPlayer = 1;
    	}
    	if(socket.id == data.player2){
    		iAmPlayer = 2;
    	}   
    	

      	
    	ClientGameControler1 = new ClientGameControler(data.Universe, iAmPlayer, document.getElementById("contents"), this);
    	
    	ClientGameControler1.milkyways = data.Milkyways;
    	
    	console.log("player " + iAmPlayer + ": universe created");
    	
    	
    });
    
    socket.on('updateUniverse', function(data){
      	 	
 
    	
    	try{
    		
    		ClientGameControler1.universe = data.Universe;
        	
        	//ClientGameControler1.milkyways = data.MilkyWays;
        	ClientGameControler1.setMilkyways(data.MilkyWays);
        	
        	drawButtons(ClientGameControler1.universe, ClientGameControler1.milkyways);
        	
        	console.log("player " + iAmPlayer + ": universe updated");
        	
        	drawButtons(ClientGameControler1.universe, ClientGameControler1.milkyways);
    		
    	}
    	catch(e){
    		
    		console.log("Fehler beim erstellen des ClientGameControlers. Normal beim Spielstart.");
    		//console.log(e);
    	}
    	
    });
    
    //Wird immer aufgerufen, wenn sich etwas geändert hat, passt Ausgabe an die States an 0 = Spielvorbereitung, 1 = Spiel, 
    socket.on('updateClient', function(data){
    	    	
    	chosenMap = data.chosenMap;
    	numberOfPlayers = data.numberOfPlayers;
    	player1 = data.player1;
    	state = data.state;
    	
    	clientUpdate();

    });
    

    
    function startButtonPressed(){
    	  	
    	socket.emit('ask for update', 'asd');
       	
    	console.log("starbutton");
    	
    	if(numberOfPlayers == 0);
    	{
    		socket.emit('startGame', {id: id, map: document.getElementById("selection").selectedIndex});
    	}
   	
    }
    
    function joinButtonPressed(){
	  	
    	socket.emit('ask for update', 'asd');
    	
    	console.log("joinbutton");
    	
    	if(numberOfPlayers == 1);
    	{
    		socket.emit('joinGame', {id: id});
 	}
   	
    }
    
   
    function clientUpdate(){
        	
    	console.log("state " +state);

		killElement(document.getElementById("contents"));
		killElement(document.getElementById("buttonArea"));
		killElement(document.getElementById("controlArea"));
		
		contents = document.createElement("div");
		contents.id = "contents";

		var empty = document.createTextNode(" ");
		contents.appendChild(empty);	
		
		document.body.appendChild(contents);
		

		killElement(document.getElementById("welcomeArea"));

		var welcomeArea = document.createElement("div");
		welcomeArea.id = "welcomeArea";

		var empty = document.createTextNode(" ");
		welcomeArea.appendChild(empty);

		contents.appendChild(welcomeArea);
    
if(state == 0){
		
		var empty = document.createTextNode("");
    	var welcome = document.createTextNode("Welcome!");
    	var welcome2 = document.createTextNode("Choose a map and start a game or join in..");
    	
    	var numberOf = document.createElement("numberOf");
    	var choice = document.createElement("choice");
		
    	welcomeArea.appendChild(welcome);   
    	var br = document.createElement("br");
    	welcomeArea.appendChild(br);
    	welcomeArea.appendChild(welcome2); 
    	
    	var br = document.createElement("br");
    	welcomeArea.appendChild(br); 
    	var br = document.createElement("br");
    	welcomeArea.appendChild(br); 
    	
    	welcomeArea.appendChild(numberOf); 
    	var br = document.createElement("br");
    	welcomeArea.appendChild(br); 
    	var br = document.createElement("br");
    	welcomeArea.appendChild(br); 
    	
    	welcomeArea.appendChild(choice); 
    	
    	var br = document.createElement("br");
    	welcomeArea.appendChild(br); 
    	var br = document.createElement("br");
    	welcomeArea.appendChild(br); 
        
    	var btn = document.createElement("BUTTON");        // Create a <button> element
    	var t = document.createTextNode("Start");       // Create a text node
    	btn.appendChild(t);                                // Append the text to <button>
    	btn.id = "start";
    	btn.addEventListener("click", startButtonPressed);
    	welcomeArea.appendChild(btn); 
    	
    	var btn2 = document.createElement("BUTTON");        // Create a <button> element
    	var t = document.createTextNode("Join");       // Create a text node
    	btn2.appendChild(t);                                // Append the text to <button>
    	btn2.id = "join";
    	btn2.addEventListener("click", joinButtonPressed);
    	welcomeArea.appendChild(btn2); 
    	
    	var numbersOf = document.createTextNode("Number of players in game: " + numberOfPlayers); 
    	numberOf.appendChild(numbersOf);  
    	
    	var choices = ["Level 1","Level 2","Level 3","Level 4","Level 5"];
    	
    	var map = "";
    	
    	if(numberOfPlayers > 0){
    		map = "Map chosen:";
    		map += "<form>"
    		map += "<select disabled>";
    	}
    	else{
    		map = "Choose a map:"
    		map += "<form>"
    		map += "<select id = 'selection'>";
    	}
    	
    	
        for(i = 0; i <= choices.length; i++) {
        	if(i == chosenMap){
        		map += "<option value='"+ i +"' selected>" + choices[i] + "</option>";
        	}
        	else{
        		map += "<option value='"+ i +"'>" + choices[i] + "</option>";
        	}
        }
        map += "</select></form>";
    	
        if(numberOfPlayers > 0){
    		document.getElementById("start").disabled = true;
    	}
        if(numberOfPlayers > 1 || player1 == id){
    		document.getElementById("join").disabled = true;
    	}
        	        
        choice.innerHTML = map; 
        
        contents.appendChild(welcomeArea);
        
        
        
}//Ende state 0


if(state == 1){
	
	
	
}

    
    }
    
    $('#start').click(startButtonPressed);
    $('#join').click(joinButtonPressed);
});
