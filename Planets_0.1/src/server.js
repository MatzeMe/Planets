var express = require('express')
,   app = express()
,   server = require('http').createServer(app)
,   io = require('socket.io').listen(server)
,   conf = require('./config.json');

var numberOfPlayers = 0;
var chosenMap = 1;
var ids = 300;
var player1 = undefined;
var player2 = undefined;
var state = 0;

var ServerUniverse;
var ServerMilkyways;
var ServerPlayer;
var ServerGameControler;

/*var GameControlerA = require('./game/GameControler.js');
var ConquestA = require('./game/Conquest.js');
var DrawA = require('./game/Draw.js');
var FightA = require('./game/Fight.js');
var GroupA = require('./game/Group.js');
var PlanetA = require('./game/Planet.js');
var PlayerA = require('./game/Player.js');
var ProductionA = require('./game/Production.js');
var RouteA = require('./game/Route.js');
var ShipA = require('./game/Ship.js');
var TravelA = require('./game/Travel.js');
*/

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

var GameControler1;



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
	
	socket.emit('getID', ids);
	ids++;
	console.log("user connected");
	io.sockets.emit('updateClient', {numberOfPlayers: numberOfPlayers, chosenMap: chosenMap, player1: player1, state: state});
	
	socket.on('disconnect', function(){
	    console.log('user disconnected');
	  });
	
	socket.on('ask for update', function(msg){
		console.log("asked for update");
		io.sockets.emit('updateClient', {numberOfPlayers: numberOfPlayers, chosenMap: chosenMap, player1: player1, state: state});
		console.log("updated");
		
		/*setInterval(function(){
			io.sockets.emit('updateUniverse', {Universe: ServerUniverse, MilkyWays: ServerMilkyways});
			console.log("forced update");
			}, 250);*/
		
	  });
	
	
	
	socket.on('Travel', function(data){
		console.log("asked for travel");
		
		//{planetID: travelFrom.planetID, routeID: tempRoute.routeID, playerID: isPlayedBy}
		
		//this.sendGroupOnTravel = function(GroupA, RouteA){
		
		console.log(data.planetID + ", " + data.routeID + ", " + data.playerID);
		
		for(var i = 0; i < ServerGameControler.universe[data.planetID].presentGroups.length; i++){
			if(ServerGameControler.universe[data.planetID].presentGroups[i].owner.ID == data.playerID){
				ServerGameControler.universe[data.planetID].sendGroupOnTravel(ServerGameControler.universe[data.planetID].presentGroups[i], ServerGameControler.milkyways[data.routeID]);
			}
		}
		
		console.log("traveled");
	  });

	
	socket.on('Production', function(data){
		console.log("asked for production");
		
		//socket.emit('Production', {planetID: event.target.id});
		
		ServerGameControler.universe[data.planetID].changeProduction();
		
	  });
	
	
	socket.on('startGame', function (data) {
				
		if(numberOfPlayers == 0){
			numberOfPlayers++;
			player1 = data.id;
			chosenMap = data.map;
			io.sockets.emit('updateClient', {numberOfPlayers: numberOfPlayers, chosenMap: chosenMap, player1: player1, state: state});
		}		
	});	
	
	socket.on('joinGame', function (data) {
		
		if(numberOfPlayers == 1){
			numberOfPlayers++;
			player2 = data.id;
			state = 1;
			io.sockets.emit('updateClient', {numberOfPlayers: numberOfPlayers, chosenMap: chosenMap, player1: player1, state: state});
			
			//Spiel starten //Noch ohne Levelauswahl
			ServerUniverse =[new Planet(15, 300, 100, 0), new Planet(15, 600, 200, 1), new Planet(10, 150, 250, 2), new Planet(20, 500, 350, 3)];
			ServerPlayer=[new Player(1), new Player(2)] 
			
			ServerUniverse[0].setOwner(ServerPlayer[0]);
			ServerUniverse[1].setOwner(ServerPlayer[1]); 
		
			ServerGameControler = new GameControler(ServerUniverse, ServerPlayer);	
			ServerMilkyways = ServerGameControler.milkyways;
			
			
			io.sockets.emit('createUniverse', {Universe: ServerGameControler.universe, Milkyways: ServerGameControler.milkyways, player1: player1, player2: player2});
			console.log("universe created and shipped");
			
		}		
	});	
	
});



// Portnummer in die Konsole schreiben
console.log('Der Server läuft nun unter http://127.0.0.1:' + conf.port + '/');