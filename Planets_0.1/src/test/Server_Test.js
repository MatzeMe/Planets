/*	Group_Test.js
 * 
 * 	Author1: rszabad(si3ben)
 * 	Course: Test-driven Development mit JavaScript
 *
 *	Testfälle nicht direkt voneinander abhängig. Für den Testablauf ist es aber wichtig, 
 *  dass alle Assertions korrekt ausgeführt werden, da sonst eventuelle keine 
 *  Socket Disconnects durchgeführt und nachfolgende Tests negativ beeinflusst werden.
 *  
 *  
 *  Ausgemertet mit Mocha
 */

var serv = require('../server.js'); // Unschön für die Konsolenausgabe, aber so
									// wird der Server jedes mal ordentlich
									// gestartet und beendet, inkl. aller
									// Socketverbindungen
serv.start(); // Beim manuellen Neustarten führte das immer wieder zu
				// Problemen --> Socket Disconnects

var should = require('should'); // Einbinden der node-plugins zum Testen
var assert = require('assert');
var request = require('supertest');
var express = require('express');
var io = require('socket.io-client');

var socketURL = 'http://127.0.0.1:8080'; // Einstellungen für
											// socket.io-client
var options = {
	transports : [ 'websocket' ],
	'force new connection' : true
};

// TESTFÄLLE SERVER-CLIENT-VERBINDUNG

describe('Server-Test',	function() {

			var url = '127.0.0.1:8080';
			request = request(url);

			describe('Connect',	function() {
				
						it('should return 200 after connect', function(done) {
							request.get('/').expect(200).end(function(err, res) {
										if (err)
											return done(err);
										done();
									});
						});

						it('should return default data for game-menu and 1 connected socket', function(done) { 	// Ein Spieler verbindet sich; 
																									
									var client1 = io.connect(socketURL, options);
									
									client1.on('connect', function(data) {				
										client1.on('updateClient', function(data) {

											data.numberOfPlayers.should.equal(0);
											data.chosenMap.should.equal(0);
											should.not.exist(data.player1); // should.js Syntax unterstützt Test auf Undefinednicht; Workaround aus Doku
											data.state.should.equal(0);
											data.connectedPlayers.should.equal(1);
											
											client1.disconnect();
											done();		//bezeichnet das Ende dieses Testfalls #Asynchron
										});
									});
								});

						it('should return default data for game-menu and 3 connected sockets',function(done) { // Drei Spieler verbinden sich
						
									var client1 = io.connect(socketURL, options);
									var client2 = io.connect(socketURL, options);
									var client3 = io.connect(socketURL, options);

									client3.on('connect', function(data) {
										client3.on('updateClient', function(data) {

											data.numberOfPlayers.should	.equal(0);
											data.chosenMap.should.equal(0);
											should.not.exist(data.player1); 
											data.state.should.equal(0);
											data.connectedPlayers.should.equal(3);

											client1.disconnect();
											client2.disconnect();
											client3.disconnect();
											done();
										});
									});
								});
					});

			describe('Disconnect',function() {

						it('should decrement the number of connectedPlayers after a disconnect',function(done) { 
									var client1 = io.connect(socketURL, options);
									var client2 = io.connect(socketURL, options);
									var client3 = io.connect(socketURL, options);

									client2.on('connect', function(data) {
										client2.on('updateClient', function(data) {			//wartet auf update
											if (data.message == "disconnect") {				//reagiert hier nur auf updates mit Label "disconnect"
												data.connectedPlayers.should.equal(2);
												
												client1.disconnect();
												client2.disconnect();
												done();
											}
										});

										client3.on('connect', function(data) {
											client3.disconnect();
										});
									});
								});

						it('should abort started game if player 1 disconnects',function(done) { // Erkennbar an Default für Variablen. eg chosenMap, player1, state

									var client1 = io.connect(socketURL, options);
									var client2 = io.connect(socketURL, options);

									client1.on('connect', function(data) {
										client1.emit('startGame', {map : 3});			//startet Spiel mit Level 3
									});

									client2.on('connect', function(data) {
										client2.on('updateClient', function(data) {		//wartet auf disconnect
											if (data.message == "disconnect") {			
												data.chosenMap.should.equal(0);
												should.not.exist(data.player1);
												data.state.should.equal(0);
												
												client2.disconnect();
												done();
											}
										});

										client2.emit('joinGame', {});					//Tritt Spiel bei
										client1.disconnect();							//Spieler 1 disconnect
									});
								});

						it('should abort started game if player 2 disconnects',function(done) { // Erkennbar an Default für
								
									var client1 = io.connect(socketURL, options);
									var client2 = io.connect(socketURL, options);

									client1.on('connect', function(data) {
										client1.on('updateClient', function(data) {

											if (data.message == "disconnect") {
												data.chosenMap.should.equal(0);
												should.not.exist(data.player1);
												data.state.should.equal(0);
												
												client1.disconnect();
												done();
											}
										});
										client1.emit('startGame', {id : client1.id,map : 3});
									});

									client2.on('connect', function(data) {
										client2.emit('joinGame', {
											id : client2.id
										});
										client2.disconnect();
									});
								});
					});

			describe('Start Game',function() {

						it('should return a Player1 after game has been Started and deliver game variables (Client3 by socket.id)',function(done) { // Gestartet heißt hier, dass Spieler1 auf Start geklickt hat. Das eigentliche Spiel startet nach Klick von S2 auf Join

									var client3 = io.connect(socketURL, options);
									var client1 = io.connect(socketURL, options);
									var client2 = io.connect(socketURL, options);

									client1.on('connect', function(data) {
										client1.on('updateClient', function(data) {
											if (data.player1 != undefined) { // updateClient wird vom Server öfter ausgeschickt. Assertions erst, nachdem der Server die ID des startenden Spielers mitschickt
																			
												data.player1.should.equal(client3.id);
												data.numberOfPlayers.should.equal(1);
												data.chosenMap.should.equal(3);
												data.state.should.equal(0);
												data.connectedPlayers.should.equal(3);

												client1.disconnect();
												client2.disconnect();
												client3.disconnect();
												done();
											}
										});

										client3.emit('startGame', {id : client3.id, map : 3});
									});
								});

						it('should not change anything if another player emits a startGame again',function(done) { 

									var client1 = io.connect(socketURL, options);
									var client2 = io.connect(socketURL, options);

									client1.on('connect', function(data) {
										client1.emit('startGame', {map : 2}); // Starten des Spiels mit Level 3

									});

									client2.on('connect',function(data) {
											client1.on('updateClient',function(data) {
														if (data.message == "gameAlreadyStarted") {	//Wartet auf benachrichtigung zu bereits gestartetem Spiel
															data.player1.should.equal(client1.id);
															data.numberOfPlayers.should.equal(1);
															data.chosenMap.should.equal(2);
															data.state.should.equal(0);

															client1.disconnect();
															client2.disconnect();
															done();
														}
											});
											client2.emit('startGame',{id : client1.id,map : 4}); // erneutes Starten des Spiels mit Level 4								
										});
								});

						it('should start map0 if submitted mapNumber is not within offered maps (0-4)',function(done) { 

									var client1 = io.connect(socketURL, options);
									
									client1.on('connect', function(data) {
										client1.on('updateClient', function(data) {

											if (data.player1 != undefined) { 
												data.chosenMap.should.equal(0);
												
												client1.disconnect();
												done();
											}
										});
										client1.emit('startGame', {	map : 5});
									});
								});

						it('should start map0 if submitted mapNumber is not within offered maps (0-4)',function(done) { 
											
									var client1 = io.connect(socketURL, options);

									client1.on('connect', function(data) {
										client1.on('updateClient', function(data) {

											if (data.player1 != undefined) { 
												data.chosenMap.should.equal(0);
												
												client1.disconnect();
												done();
											}
										});
										client1.emit('startGame', {map : -1	});
									});
								});
					});

			describe('Start Game',function() {

						it('should only be possible to join if a game has been started before',function(done) {

									var client1 = io.connect(socketURL, options);

									client1.on('connect', function(data) {

										client1.on('updateClient', function(data) {	//Default-Werte am Server noch vorhanden, kein Spiel vorhanden

											should.not.exist(data.player1);
											data.numberOfPlayers.should.equal(0);
											data.chosenMap.should.equal(0);
											data.state.should.equal(0);
											data.connectedPlayers.should.equal(1);
											
											client1.disconnect();
											done();
										});
										client1.emit('joinGame', {});
									});
								});

						it('should change state, number of players after a join',function(done) {
							

									var client1 = io.connect(socketURL, options);
									var client2 = io.connect(socketURL, options);

									client1.on('connect', function(data) {
										client1.emit('startGame', {map : 3});
									});

									client2.on('connect', function(data) {
										client2.on('updateClient', function(data) {
											if (data.numberOfPlayers == 2) {
												data.numberOfPlayers.should.equal(2);
												data.chosenMap.should.equal(3);
												data.state.should.equal(1);
												data.player1.should.equal(client1.id);
												data.connectedPlayers.should.equal(2);
												
												client1.disconnect();
												client2.disconnect();
												done();
											}
										});
										client2.emit('joinGame', {});
									});
								});

						it('should emit the Universe and players after a join',function(done) {

									var client1 = io.connect(socketURL, options);
									var client2 = io.connect(socketURL, options);

									client1.on('connect',function(data) {

														client1.emit('startGame',{map : 3});
														client2.on('connect',function(data) {
																			client2.on('createUniverse',function(data) {

																								should.exist(data.Universe);
																								should.exist(data.Milkyways);
																								data.player1.should.equal(client1.id);
																								data.player2.should.equal(client2.id);
																								
																								client1.disconnect();
																								client2.disconnect();
																								done();
																							});

																			client2.emit('joinGame',{});
																		});
													});
								});

						it('should not do anything if join is submitted twice', function(done) { // Kann an Player 2 ID abgelesen werden, die wird vom Join-Auslösenden Socket genommen
								
									var client1 = io.connect(socketURL, options);
									var client2 = io.connect(socketURL, options);
									var client3 = io.connect(socketURL, options);

									client1.on('connect',function(data) {

														client1.emit('startGame',{map : 3});

														client2.on('connect',function(data) {

																			client2.emit('joinGame',{});
																			client3.on('connect',function(data) {
																								client3.on('createUniverse',function(data) {

																													should.exist(data.Universe);
																													should.exist(data.Milkyways);
																													data.player1.should.equal(client1.id);
																													data.player2.should.equal(client2.id);
																													client1.disconnect();
																													client2.disconnect();
																													client3.disconnect();
																													done();

																												});

																								client3.emit('joinGame',{});
																								client3.emit('ask for update',{});	//Update muss manuell angefragt werden
																							});
																		});
													});
								});
					});

			describe('Change Production',function() {

						it('should not be possible to change players production (wrong Socket)',function(done) {	//Im Server wurden zur Überprüfung mit Rückgabe eingefügt, die Ausstiegspunkte bei der Überprüfung markieren.
																													//Passen die zum eingebauten Fehler --> grün
									var client1 = io.connect(socketURL, options);
									var client2 = io.connect(socketURL, options);
									var client3 = io.connect(socketURL, options);

									client1.on('connect',function(data) {
													client1.on('prodChanged',function(data) {
																			data.message.should.equal("wrong Socket");
																			
																			client1.disconnect();
																			client2.disconnect();
																			client3.disconnect();
																			done();
																		});

														client1.emit('startGame',{map : 0});
													});

									client2.on('connect', function(data) {
										client2.emit('joinGame', {id : client2.id});
									});

									client3.on('connect', function(data) {client3.emit('Production', {planetID : 0, playerNR : 1 }); // client3 ist weder player1 noch player2 --> Socketfehler
									});

								});

						it('should not be possible to change players production (wrong Playernumber)',function(done) {

									var client1 = io.connect(socketURL, options);
									var client2 = io.connect(socketURL, options);
					

									client1.on('connect',function(data) {
														client1.on('prodChanged',
																		function(data) {
																			data.message.should.equal("wrong Playernumber"); // bezieht sich auf Spieler 1
																													
																			client1.disconnect();
																			client2.disconnect();																	
																			done();
																		});
														client1.emit('startGame',{map : 0});
													});

									client2.on('connect', function(data) {
										client2.emit('joinGame', {});
										client2.emit('Production', {planetID : 0, playerNR : 2}); //Vorgelagert zu SocketPrüfung, Planet 0 gehört zu playerNR 1
									});
								});

						it('should not be possible to change players production (wrong Planet)',
								function(done) {

									var client1 = io.connect(socketURL, options);
									var client2 = io.connect(socketURL, options);
									var client3 = io.connect(socketURL, options);

									client1.on('connect',function(data) {
														client1.on('prodChanged',
																		function(data) {
																			data.message.should.equal("wrong Planet");
																			
																			client1.disconnect();
																			client2.disconnect();
																			client3.disconnect();
																			done();
																		});

														client1.emit('startGame',{map : 0});
													});

									client2.on('connect', function(data) {
										client2.emit('joinGame', {});

										client1.emit('Production', {planetID : 1, playerNR : 1});
									});
								});

						it('should be possible to change own production',
								
								function(done) {

									var client1 = io.connect(socketURL, options);
									var client2 = io.connect(socketURL, options);
									var client3 = io.connect(socketURL, options);

									client1.on('connect',function(data) {
														client1.on('prodChanged',function(data) {
															
																			data.message.should.equal("Player 1 Production Changed");
																			
																			client1.disconnect();
																			client2.disconnect();
																			client3.disconnect();
																			done();
																		});

														client1.emit('startGame',{map : 0});
													});

									client2.on('connect', function(data) {
										client2.emit('joinGame', {});
										client1.emit('Production', {planetID : 0, playerNR : 1});	//Spieler1 ändert Produktion an eigenem Planeten
									});
								});
					});

			describe('Start Travel',function() {

				

						it('should not be possible to send foreign troops on travels (wrong socket)',function(done) {

									var client1 = io.connect(socketURL, options);
									var client2 = io.connect(socketURL, options);
									var client3 = io.connect(socketURL, options);

									client1.on('connect', function(data) {
										client1.on('travelGo', function(data) {
											data.message.should.equal("wrong Socket");
											client1.disconnect();
											client2.disconnect();
											client3.disconnect();
											done();
										});

										client1.emit('startGame', {map : 0});
									});

									client2.on('connect', function(data) {
										client2.emit('joinGame', {});
									});
									client3.on('connect', function(data) {
										client3.emit('Travel', {planetID : 0, playerID : 1, playerNR : 1});	//Client 3 ist weder player1 noch player2
									});
								});

						it('should not be possible to send foreign troops on travels (wrong playernumber)',
								function(done) {

							var client1 = io.connect(socketURL, options);
							var client2 = io.connect(socketURL, options);
							var client3 = io.connect(socketURL, options);

									client1.on('connect',function(data) {
										client1.on('travelGo',function(data) {
																			data.message.should.equal("wrong Playernumber"); // bezieht sich auf Spieler 1
																													
																			client1.disconnect();
																			client2.disconnect();
																			client3.disconnect();
																			done();
																		});

														client1.emit('startGame',{map : 0});
													});

									client2.on('connect', function(data) {
										client2.emit('joinGame', {});
										client2.emit('Travel', {planetID : 0,playerID : 2,playerNR : 2});	//Eigentlich kein Fehler, player2 könnte Truppen auf Planet0 haben; "wrong Playernumber" signalisiert, dass erkannt wurde, dass der befehl nicht von player1 kam
									});
								});

						it('should be possible to send own Troops', function(done) {

							var client1 = io.connect(socketURL, options);
							var client2 = io.connect(socketURL, options);
							var client3 = io.connect(socketURL, options);

							client1.on('connect', function(data) {
								client1.on('travelGo', function(data) {
									data.message.should.equal("Player 1 Travel started");
									
									client1.disconnect();
									client2.disconnect();
									client3.disconnect();
									done();
								});

								client1.emit('startGame', {map : 0});
							});

							client2.on('connect', function(data) {
								client2.emit('joinGame', {id : client2.id
								});

								client1.emit('Travel', {planetID : 0,playerID : 1,playerNR : 1});
							});
						});
					});

			describe('Game Over',function() {

						it('should recognize when one player has won, state should then be 2',
								function(done) { // Gegentest ist jeder andere Durchlauf, da diese bei GameOver nicht ordnungsgemäß laufen würden

									var client1 = io.connect(socketURL, options);
									var client2 = io.connect(socketURL, options);
									var client3 = io.connect(socketURL, options);

									client1.on('connect', function(data) {
										client1.on('GameOver', function(data) {					//5.	Server stellt GameOver fest und benachrichtigt Clients
											data.winner.should.equal("Player 1");				//6.	Player 1 sollte Sieger sein

											client1.on('updateClient',function(data) {			//7.	Server setzt state = 2 und benachrichtigt Clients

														data.state.should.equal(2);
														
														client1.disconnect();
														client2.disconnect();
														client3.disconnect();
														done();
													});
										});

										client1.emit('startGame', {map : 0});					//1.	Spiel eröffnen
									});

									client2.on('connect', function(data) {
										client2.emit('joinGame', {});							//2.	Spiel beitreten
									});

									client3.on('connect', function(data) {
										client3.on('createUniverse', function(data) {			//3.	Server liefert Spiel
											serv.setOwerForTesting();							//4.	exportierte Funktion setzt Besitz aller Planeten auf player 1
										});
									});

								});
					});
		});
