//gameServer = function(){

express = require('express');
app = express();
server = require('http').createServer(app);
io = require('socket.io').listen(server);
conf = require('./config.json');

var numberOfPlayers = 0;
var chosenMap = 0;
//var ids = 300;
var player1 = undefined;
var player2 = undefined;
state = 0;

var ServerUniverse;
var ServerMilkyways;
var ServerPlayer;
var ServerGameControler;  
 
var fs = require('fs');
eval(fs.readFileSync('game/Planet.js')+'');
eval(fs.readFileSync('game/Player.js')+'');
eval(fs.readFileSync('game/GameControler.js')+'');
eval(fs.readFileSync('game/Conquest.js')+'');
eval(fs.readFileSync('game/Draw.js')+'');
eval(fs.readFileSync('game/Fight.js')+'');
eval(fs.readFileSync('game/Group.js')+'');
eval(fs.readFileSync('game/Production.js')+'');
eval(fs.readFileSync('game/Route.js')+'');
eval(fs.readFileSync('game/Ship.js')+'');
eval(fs.readFileSync('game/Travel.js')+'');

var GameControler1 = undefined;
var allClients =[];


function somethingChanged(string) {
	
	console.log(string);
	//console.log("uni: " + ServerUniverse);
	//console.log("milky: " + ServerMilkyways);
	io.sockets.emit('updateUniverse', {Universe: ServerUniverse, MilkyWays: ServerMilkyways});

}



// Webserver
// auf den Port x schalten
server.listen(conf.port);
app.configure(function(){
	// statische Dateien ausliefern
	app.use(express.static(__dirname + '/public'));
	app.use(express.static(__dirname + '/'));
});



// wenn der Pfad / aufgerufen wird
app.get('/', function (req, res) {
	
		res.sendfile(__dirname + '/public/index.html');		
		
});


// Websocket




io.sockets.on('connection', function (socket) {
	
	
	allClients.push(socket);
	
	//socket.emit('getID', ids);
	//ids++;
	console.log("server --> user connected " + socket.id);
	if(numberOfPlayers < 2){
		io.sockets.emit('updateClient', {numberOfPlayers: numberOfPlayers, chosenMap: chosenMap, player1: player1, state: state});
	}
	else{
		socket.emit('updateClient', {numberOfPlayers: numberOfPlayers, chosenMap: chosenMap, player1: player1, state: state});
		io.sockets.emit('createUniverse', {Universe: ServerGameControler.universe, Milkyways: ServerGameControler.milkyways, player1: player1, player2: player2});
	}
	socket.on('disconnect', function(){
		
		var i = allClients.indexOf(socket);
		allClients.splice(i,1);
		
		console.log('server --> user disconnected ' + socket.id);
		
		if(socket.id == player1 || socket.id == player2){
			console.log('server --> player disconnected ' + socket.id);
			
			player1 = undefined;
			player2 = undefined;
			numberOfPlayers = 0;
			chosenMap = 0;
			//GameControler1.gameOver = true;
			GameControler1 = null;
				
			state = 0;
			
			io.sockets.emit('updateClient', {numberOfPlayers: numberOfPlayers, chosenMap: chosenMap, player1: player1, state: state});
	
			console.log('server --> game aborted');
		}
		
	    
	  });
	
	socket.on('ask for update', function(msg){
		//console.log(msg);
		io.sockets.emit('updateClient', {numberOfPlayers: numberOfPlayers, chosenMap: chosenMap, player1: player1, state: state});
		//console.log("asked for and updated");
		
		/*setInterval(function(){
			io.sockets.emit('updateUniverse', {Universe: ServerUniverse, MilkyWays: ServerMilkyways});
			console.log("forced update");
			}, 500);
		*/
	  });
	
	
	
	socket.on('Travel', function(data){
		
		
		var numberOfShips = [0,0,0];
		var numberFromPercentage = [0,0,0];
		
		for(var i = 0; i < ServerGameControler.universe[data.planetID].presentGroups.length; i++){	//Auszählen der Schiffe	
			if(ServerGameControler.universe[data.planetID].presentGroups[i].owner.ID == data.playerID){
				if(ServerGameControler.universe[data.planetID].presentGroups[i].type == 1){
					numberOfShips[0] += ServerGameControler.universe[data.planetID].presentGroups[i].ships.length;
				}
				if(ServerGameControler.universe[data.planetID].presentGroups[i].type == 2){
					numberOfShips[1] += ServerGameControler.universe[data.planetID].presentGroups[i].ships.length;
				}
				if(ServerGameControler.universe[data.planetID].presentGroups[i].type == 3){
					numberOfShips[2] += ServerGameControler.universe[data.planetID].presentGroups[i].ships.length;
				}
			}	
		}
		

					
			
		for (var i = 0; i < 3; i++){
			numberFromPercentage[i] = Math.round(numberOfShips[i] / 100 * data.percentage);
		}
		

		
		//Prüfen, ob Befehl von Spieler 1 oder 2 kommt und das mit der socket.ID verifiziert werden kann
		if(data.playerNR == 1){
			if(player1 == socket.id){
				for(var i = 0; i < ServerGameControler.universe[data.planetID].presentGroups.length; i++){
					if(ServerGameControler.universe[data.planetID].presentGroups[i].owner.ID == data.playerID && data.shipTypes[(ServerGameControler.universe[data.planetID].presentGroups[i].type-1)] == true){
						ServerGameControler.universe[data.planetID].sendGroupOnTravel(ServerGameControler.universe[data.planetID].presentGroups[i], ServerGameControler.milkyways[data.routeID], numberFromPercentage[(ServerGameControler.universe[data.planetID].presentGroups[i].type-1)]);
					}
				}
			}
			
		}
		else{
			if(player2 == socket.id){		
				for(var i = 0; i < ServerGameControler.universe[data.planetID].presentGroups.length; i++){
					if(ServerGameControler.universe[data.planetID].presentGroups[i].owner.ID == data.playerID && data.shipTypes[(ServerGameControler.universe[data.planetID].presentGroups[i].type-1)] == true){
						ServerGameControler.universe[data.planetID].sendGroupOnTravel(ServerGameControler.universe[data.planetID].presentGroups[i], ServerGameControler.milkyways[data.routeID], numberFromPercentage[(ServerGameControler.universe[data.planetID].presentGroups[i].type-1)]);
					}
				}
			}
				
		}
		
		
		
		//console.log("traveled");
	  });

	//Prüfen ob Eingabe von Spieler 1 oder 2 kommt und durch Socket.id verifiziert werden kann
	socket.on('Production', function(data){
		if(data.playerNR == 1){
			if(player1 == socket.id){
				if(ServerGameControler.universe[data.planetID].owner.ID == 1){
					ServerGameControler.universe[data.planetID].changeProduction();
				}
			}
		}
		if(data.playerNR == 2){
			if(player2 == socket.id){
				if(ServerGameControler.universe[data.planetID].owner.ID == 2){
					ServerGameControler.universe[data.planetID].changeProduction();
				}
			}
		}
		
		
	  });
	
	
	socket.on('startGame', function (data) {
				
		if(numberOfPlayers == 0){
			numberOfPlayers++;
			player1 = socket.id;
			chosenMap = data.map;
			io.sockets.emit('updateClient', {numberOfPlayers: numberOfPlayers, chosenMap: chosenMap, player1: player1, state: state});
		}		
	});	
	
	socket.on('joinGame', function (data) {
		
		//Level erstellen
		UniversalCatalog = [];

		UniversalCatalog.push([new Planet(15, 300, 100, 0), new Planet(15, 600, 200, 1), new Planet(10, 150, 250, 2), new Planet(20, 500, 350, 3)]);
		UniversalCatalog.push([new Planet(15, 300, 100, 0), new Planet(10, 150, 250, 1), new Planet(15, 600, 200, 2), new Planet(20, 500, 350, 3)]);
		UniversalCatalog.push([new Planet(15, 300, 100, 0), new Planet(10, 150, 250, 1), new Planet(20, 500, 350, 2), new Planet(15, 600, 200, 3)]);
		UniversalCatalog.push([new Planet(15, 300, 100, 0), new Planet(15, 600, 200, 1), new Planet(10, 150, 250, 2), new Planet(20, 500, 350, 3)]);
		UniversalCatalog.push([new Planet(15, 300, 100, 0), new Planet(15, 600, 200, 1), new Planet(10, 150, 250, 2), new Planet(20, 500, 350, 3)]);
		
		
		if(numberOfPlayers == 1){
			numberOfPlayers++;
			player2 = socket.id;
			state = 1;
			io.sockets.emit('updateClient', {numberOfPlayers: numberOfPlayers, chosenMap: chosenMap, player1: player1, state: state});
			
			
			
			//Spiel starten //Noch ohne Levelauswahl
			ServerUniverse = UniversalCatalog[chosenMap];
			ServerPlayer=[new Player(1), new Player(2)] 
			
			ServerUniverse[0].setOwner(ServerPlayer[0]);
			ServerUniverse[1].setOwner(ServerPlayer[1]); 
		
			ServerGameControler = new GameControler(ServerUniverse, ServerPlayer);	
			ServerMilkyways = ServerGameControler.milkyways;
			
			io.sockets.emit('createUniverse', {Universe: ServerGameControler.universe, Milkyways: ServerGameControler.milkyways, player1: player1, player2: player2});
			console.log("server --> universe "+ chosenMap +" created and shipped");
			
		}		
	});	
	
});



// Portnummer in die Konsole schreiben
console.log('Server running: http://127.0.0.1:' + conf.port + '/');
//}

//exports.gameServer = gameServer;

//gameServer();