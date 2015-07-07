/*	server.js
 * 
 * 	Author1: rszabad(si3ben)
 * 	Course: Test-driven Development mit JavaScript
 *
 *	Verwaltet die Webausgabe und die Ordnung von GameController, Clients, states,...
 *
 */

quiet = true;	//Konsolenausgabe bei Mocha-Test sehr störend; sind mit true ausgeschalten

express = require('express');
app = express();
server = require('http').createServer(app);
io = require('socket.io').listen(server);
conf = require('./config.json');

					

var numberOfPlayers = 0;
var chosenMap = 0;
var player1 = undefined;
var player2 = undefined;
state = 0;					//0 = Spielvorbereitung, 1 = Spiel, 2 = GameOver-Screen

var ServerUniverse;
var ServerMilkyways;
var ServerPlayer;
var ServerGameControler;   
 
//Einbinden der Dateien mit den Spiele"Klassen"
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

//Level erstellen
UniversalCatalog = [];

UniversalCatalog.push([new Planet(15, 300, 100, 0), new Planet(15, 600, 100, 1), new Planet(10, 150, 350, 2), new Planet(10, 750, 350, 3), new Planet(20, 450, 250, 4)]);
UniversalCatalog.push([new Planet(15, 300, 100, 0), new Planet(10, 150, 250, 1), new Planet(15, 600, 200, 2), new Planet(20, 500, 350, 3)]);
UniversalCatalog.push([new Planet(15, 300, 100, 0), new Planet(10, 150, 250, 1), new Planet(20, 500, 350, 2), new Planet(15, 600, 200, 3)]);
UniversalCatalog.push([new Planet(15, 300, 100, 0), new Planet(15, 600, 200, 1), new Planet(10, 150, 250, 2), new Planet(20, 500, 350, 3)]);
UniversalCatalog.push([new Planet(15, 300, 100, 0), new Planet(15, 600, 200, 1), new Planet(10, 150, 250, 2), new Planet(20, 500, 350, 3)]);

var GameControler1 = undefined;
var allClients =[];					//alle Socket.IDs

//Wird an verschiedenen stellen in der Spielelogik aufgerufen, um dem Server zu signalisieren, dass sich signifikante Änderungen ergeben haben (Schiffsproduktion, Reise abgeschlossen..)
function somethingChanged(string) {
	
	if(quiet == false){console.log(string);}	//Beschreibung zum Aufrufgrund

	io.sockets.emit('updateUniverse', {Universe: ServerUniverse, MilkyWays: ServerMilkyways});	//updateUniverse aktualisiert die Spieldaten am Client
		
	if(string == "GameOver1"){								//Sieg Spieler 1
		
		if(quiet == false){console.log(server -- > "Shutting Game Down");}
		player1 = undefined;								//ff Zurücksetzen des Servers
		player2 = undefined;
		numberOfPlayers = 0;
		chosenMap = 0;
		GameControler1 = null;
		state = 2;											//GameOverScreen
		io.sockets.emit('GameOver', {winner: "Player 1"}); 	//Gewinner übermitteln
		io.sockets.emit('updateClient', {numberOfPlayers: numberOfPlayers, chosenMap: chosenMap, player1: player1, state: state, connectedPlayers: allClients.length, message: "disconnect"});	//updateClient aktualisiert am Client Daten zum Status der Website s.o. state und dazugehörigen Anzeigedaten
		
		UniversalCatalog = [];	//Zurücksetzen der Levels sonst bleibt alter Spielfortschritt erhalten

		UniversalCatalog.push([new Planet(15, 300, 100, 0), new Planet(15, 600, 100, 1), new Planet(10, 150, 350, 2), new Planet(10, 750, 350, 3), new Planet(20, 450, 250, 4)]);
		UniversalCatalog.push([new Planet(15, 300, 100, 0), new Planet(10, 150, 250, 1), new Planet(15, 600, 200, 2), new Planet(20, 500, 350, 3)]);
		UniversalCatalog.push([new Planet(15, 300, 100, 0), new Planet(10, 150, 250, 1), new Planet(20, 500, 350, 2), new Planet(15, 600, 200, 3)]);
		UniversalCatalog.push([new Planet(15, 300, 100, 0), new Planet(15, 600, 200, 1), new Planet(10, 150, 250, 2), new Planet(20, 500, 350, 3)]);
		UniversalCatalog.push([new Planet(15, 300, 100, 0), new Planet(15, 600, 200, 1), new Planet(10, 150, 250, 2), new Planet(20, 500, 350, 3)]);

		var waiter = function(){	//Nach 5 Sekunden GameOver-Screen wird wieder auf Spielvorbereitung geschalten
			state = 0;
			io.sockets.emit('updateClient', {numberOfPlayers: numberOfPlayers, chosenMap: chosenMap, player1: player1, state: state, connectedPlayers: allClients.length, message: "disconnect"});
		}
		setTimeout(waiter, 5000);
	}
	
	if(string == "GameOver2"){								
		if(quiet == false){console.log(server -- > "Shutting Game Down")};
		player1 = undefined;								
		player2 = undefined;
		numberOfPlayers = 0;
		chosenMap = 0;
		GameControler1 = null;
		state = 2;											
		io.sockets.emit('GameOver', {winner: "Player 2"}); 	
		io.sockets.emit('updateClient', {numberOfPlayers: numberOfPlayers, chosenMap: chosenMap, player1: player1, state: state, connectedPlayers: allClients.length, message: "disconnect"});	//updateClient aktualisiert am Client Daten zum Status der Website s.o. state und dazugehörigen Anzeigedaten
		
		UniversalCatalog = [];	

		UniversalCatalog.push([new Planet(15, 300, 100, 0), new Planet(15, 600, 100, 1), new Planet(10, 150, 350, 2), new Planet(10, 750, 350, 3), new Planet(20, 450, 250, 4)]);
		UniversalCatalog.push([new Planet(15, 300, 100, 0), new Planet(10, 150, 250, 1), new Planet(15, 600, 200, 2), new Planet(20, 500, 350, 3)]);
		UniversalCatalog.push([new Planet(15, 300, 100, 0), new Planet(10, 150, 250, 1), new Planet(20, 500, 350, 2), new Planet(15, 600, 200, 3)]);
		UniversalCatalog.push([new Planet(15, 300, 100, 0), new Planet(15, 600, 200, 1), new Planet(10, 150, 250, 2), new Planet(20, 500, 350, 3)]);
		UniversalCatalog.push([new Planet(15, 300, 100, 0), new Planet(15, 600, 200, 1), new Planet(10, 150, 250, 2), new Planet(20, 500, 350, 3)]);

		var waiter = function(){	
			state = 0;
			io.sockets.emit('updateClient', {numberOfPlayers: numberOfPlayers, chosenMap: chosenMap, player1: player1, state: state, connectedPlayers: allClients.length, message: "disconnect"});
		}
		setTimeout(waiter, 5000);
	}
}

//startet den Server von außen, wird exportiert
function start(){
	server.listen(conf.port);
	app.configure(function(){
		// statische Dateien ausliefern
		app.use(express.static(__dirname + '/public'));
		app.use(express.static(__dirname + '/'));
	});
	
	app.get('/', function (req, res) {
		res.sendfile(__dirname + '/public/index.html');		 	
	});
	
	//Portnummer an Konsole ausgeben
	console.log('Server running: http://127.0.0.1:' + conf.port + '/');
}


function stop(){
	server.close();
}

function setOwerForTesting(){	//setzt die beiden ersten Planeten auf Spieler 1 zur Siegsimulation beim Testen
	ServerUniverse = UniversalCatalog[chosenMap];
	ServerPlayer=[new Player(1), new Player(2)] 
	
	ServerUniverse[0].setOwner(ServerPlayer[0]);
	ServerUniverse[1].setOwner(ServerPlayer[0]); 

	ServerGameControler = new GameControler(ServerUniverse, ServerPlayer);	
	ServerMilkyways = ServerGameControler.milkyways;
}

//Bei Verbindung neuer Clients
io.sockets.on('connection', function (socket) {
	
	allClients.push(socket);	//Speichern der Socket.id

	if(quiet == false){console.log("server --> user connected " + socket.id);}
	
	if(numberOfPlayers < 2){	// bei mehr als 2Spieler läuft das Spiel, neue Anmeldungen bekommen das Spielfeld ebenfalls zur Verfügung gestellt, können also zuschauen
		io.sockets.emit('updateClient', {numberOfPlayers: numberOfPlayers, chosenMap: chosenMap, player1: player1, state: state, connectedPlayers: allClients.length, message: "connect"});
	}
	else{
		socket.emit('updateClient', {numberOfPlayers: numberOfPlayers, chosenMap: chosenMap, player1: player1, state: state, connectedPlayers: allClients.length});
		socket.emit('createUniverse', {Universe: ServerGameControler.universe, Milkyways: ServerGameControler.milkyways, player1: player1, player2: player2});
	}
	
	
	socket.on('disconnect', function(){		// Bei disconnect
		
		var i = allClients.indexOf(socket);	//Socket.id aus Array löschen
		allClients.splice(i,1);
		if(quiet == false){console.log('server --> user disconnected ' + socket.id);}
		
		if(socket.id == player1 || socket.id == player2){	//Hat einer der Player disconnected wird der Server zurückgesetzt
			if(quiet == false){console.log('server --> player disconnected ' + socket.id);}
			
			player1 = undefined;
			player2 = undefined;
			numberOfPlayers = 0;
			chosenMap = 0;
			GameControler1 = null;				
			state = 0;
			
			UniversalCatalog = [];	

			UniversalCatalog.push([new Planet(15, 300, 100, 0), new Planet(15, 600, 100, 1), new Planet(10, 150, 350, 2), new Planet(10, 750, 350, 3), new Planet(20, 450, 250, 4)]);
			UniversalCatalog.push([new Planet(15, 300, 100, 0), new Planet(10, 150, 250, 1), new Planet(15, 600, 200, 2), new Planet(20, 500, 350, 3)]);
			UniversalCatalog.push([new Planet(15, 300, 100, 0), new Planet(10, 150, 250, 1), new Planet(20, 500, 350, 2), new Planet(15, 600, 200, 3)]);
			UniversalCatalog.push([new Planet(15, 300, 100, 0), new Planet(15, 600, 200, 1), new Planet(10, 150, 250, 2), new Planet(20, 500, 350, 3)]);
			UniversalCatalog.push([new Planet(15, 300, 100, 0), new Planet(15, 600, 200, 1), new Planet(10, 150, 250, 2), new Planet(20, 500, 350, 3)]);
			
			io.sockets.emit('updateClient', {numberOfPlayers: numberOfPlayers, chosenMap: chosenMap, player1: player1, state: state, connectedPlayers: allClients.length, message: "disconnect"});
			if(quiet == false){console.log('server --> game aborted');}
		}
		else{				//Hat ein Zuschauer disconnected oder das Spiel läuft, geschieht nichts
			if(state == 0){
			io.sockets.emit('updateClient', {numberOfPlayers: numberOfPlayers, chosenMap: chosenMap, player1: player1, state: state, connectedPlayers: allClients.length, message: "disconnect"});
			}
		}
	    
	  });
	
	//Hilfsfunktion um den Server zu gewünschter Zeit zu Updates zu zwingen
	socket.on('ask for update', function(msg){
		io.sockets.emit('updateClient', {numberOfPlayers: numberOfPlayers, chosenMap: chosenMap, player1: player1, state: state, connectedPlayers: allClients.length, message: "asked"});
	  });
	
	socket.on('Travel', function(data){	//Dem Spieler steht zur Auswahl, welche Schiffstypen er auf Reisen schicken möchte, außerdem welchen Prozentsatz seiner Schiffe am Startplaneten (25, 50, 75, 100)
										//Hier wird nach Reiseaufruf die genaue Zahl berechnet und dann gegebenenfalls die Reise im GameControler veranlasst
		
		var numberOfShips = [0,0,0];
		var numberFromPercentage = [0,0,0];
		
		for(var i = 0; i < ServerGameControler.universe[data.planetID].presentGroups.length; i++){					//Auszählen der Schiffe am Planeten des aufrufenden Spielers	
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
			numberFromPercentage[i] = Math.round(numberOfShips[i] / 100 * data.percentage);							//Berechnen des Prozentsatzen an Schiffen, das geschickt wird
		}
		

		
		//Prüfen, ob Befehl von Spieler 1 oder 2 kommt und das mit der socket.ID verifiziert werden kann
		//travelGo-emits dienen nur dem Testen
		if(data.playerNR == 1){
			if(player1 == socket.id){
				io.sockets.emit('travelGo', {message: "Player 1 Travel started"});
				for(var i = 0; i < ServerGameControler.universe[data.planetID].presentGroups.length; i++){
					if(ServerGameControler.universe[data.planetID].presentGroups[i].owner.ID == data.playerID && data.shipTypes[(ServerGameControler.universe[data.planetID].presentGroups[i].type-1)] == true){
						ServerGameControler.universe[data.planetID].sendGroupOnTravel(ServerGameControler.universe[data.planetID].presentGroups[i], ServerGameControler.milkyways[data.routeID], numberFromPercentage[(ServerGameControler.universe[data.planetID].presentGroups[i].type-1)]);
						//sendGroupOnTravel startet Reise für die Gruppen
					}
				}
			}	
			else{
	 			io.sockets.emit('travelGo', {message: "wrong Socket"});
	 		}
		}
		else
		{
 			io.sockets.emit('travelGo', {message: "wrong Playernumber"});
 		}
		
		if(data.playerNR == 2){
			if(player2 == socket.id){		
				for(var i = 0; i < ServerGameControler.universe[data.planetID].presentGroups.length; i++){
					if(ServerGameControler.universe[data.planetID].presentGroups[i].owner.ID == data.playerID && data.shipTypes[(ServerGameControler.universe[data.planetID].presentGroups[i].type-1)] == true){
						ServerGameControler.universe[data.planetID].sendGroupOnTravel(ServerGameControler.universe[data.planetID].presentGroups[i], ServerGameControler.milkyways[data.routeID], numberFromPercentage[(ServerGameControler.universe[data.planetID].presentGroups[i].type-1)]);
					}
				}
			}		
		}

	  });
	
	//Prüfen ob Eingabe von Spieler 1 oder 2 kommt und durch Socket.id verifiziert werden kann
	socket.on('Production', function(data){// Der Spieler kann über einen Button am Planeten steuern, welcher Schiffstyp produziert werden soll. Schiffstypen rollen durch.	
		if(data.playerNR == 1){
			if(player1 == socket.id){
				if(ServerGameControler.universe[data.planetID].owner.ID == 1){
					ServerGameControler.universe[data.planetID].changeProduction();				//Umschalten der Produktion nach Prüfung
					io.sockets.emit('prodChanged', {message: "Player 1 Production Changed"});
				}
				else{
		 			io.sockets.emit('prodChanged', {message: "wrong Planet"});
		 		}
			}
			else{
	 			io.sockets.emit('prodChanged', {message: "wrong Socket"});
	 		}
		}
 		else{
 			io.sockets.emit('prodChanged', {message: "wrong Playernumber"});
 		}	
		//prodChanged-emits nur für das Testen	
 			
		if(data.playerNR == 2){
			if(player2 == socket.id){
				if(ServerGameControler.universe[data.planetID].owner.ID == 2){
					ServerGameControler.universe[data.planetID].changeProduction();
					io.sockets.emit('prodChanged', {message: "Player 2 Production Changed"});
				}
			}
		}
		
		
	  });
	
	//Button zum Eröffnen des Spiels wurde gedrückt
	socket.on('startGame', function (data) {	//startGame eröffnet das Spiel nur, eigentlicher Spielstart nach joinGame!
	
		if(player1 == undefined){				//Prüfung, ob nicht schon eines besteht
			player1 = socket.id;
			numberOfPlayers++;	
			if(data.map >= 0 && data.map < 5){	//Default-Level falls falscher Level-Modifikator
				chosenMap = data.map;
			}
			else{
				chosenMap = 0;
			}
			io.sockets.emit('updateClient', {numberOfPlayers: numberOfPlayers, chosenMap: chosenMap, player1: player1, state: state, connectedPlayers: allClients.length, message: "startGame"});
			if(quiet == false){console.log("server --> game started");}
		}		
		else{
			io.sockets.emit('updateClient', {numberOfPlayers: numberOfPlayers, chosenMap: chosenMap, player1: player1, state: state, connectedPlayers: allClients.length, message: "gameAlreadyStarted"});
		}
	});	
	
	//Button zum Beitreten und Starten des Spiels wurde gedrückt
	socket.on('joinGame', function (data) {		
		
		if(numberOfPlayers == 1){	//Prüfung ob schon ein Spiel eröffnet wurde
			numberOfPlayers++;
			player2 = socket.id;
			state = 1;
			
			io.sockets.emit('updateClient', {numberOfPlayers: numberOfPlayers, chosenMap: chosenMap, player1: player1, state: state, connectedPlayers: allClients.length, message: "joinGame"});	//Update der Clients mit state 1 = Spiel
		
			ServerUniverse = UniversalCatalog[chosenMap];	//Vorbereiten des gewählten Levels
			ServerPlayer=[new Player(1), new Player(2)] 
			
			ServerUniverse[0].setOwner(ServerPlayer[0]);
			ServerUniverse[1].setOwner(ServerPlayer[1]); 
		
			ServerGameControler = new GameControler(ServerUniverse, ServerPlayer);		//erschaffen des GameControllers am Server
			ServerMilkyways = ServerGameControler.milkyways;							//berechnen der Routen, diese werden im Hinblick auf etwaige Erweiterung um Random-Map-Modus berechnet, nicht zu beginn angegeben
			
			io.sockets.emit('createUniverse', {Universe: ServerGameControler.universe, Milkyways: ServerGameControler.milkyways, player1: player1, player2: player2});	//Verteilen der Spielwelt
			if(quiet == false){console.log("server --> universe "+ chosenMap +" created and shipped");		}
		}		
	});	
});

exports.start = start;
exports.stop = stop;
exports.server = server;
exports.setOwerForTesting = setOwerForTesting;