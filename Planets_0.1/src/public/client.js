/*	client.js
 * 
 * 	Author2: rszabad(si3ben)
 * 	Course: Test-driven Development mit JavaScript
 * 
 *  Wird von index.html geladen
 * 	Verwaltet den ClientGameControler und die Ausgaben an den Spieler
 *  nimmt Eingaben vom Server und reagiert entsprechend darauf (Update Spielfeld / Update HTML-Ausgabe..)
 *	nimmt Eingaben des Spielers entgegen und gibt Sie an den Server weiter
 *
 */

$(document)
		.ready(
				function() {

					socket = io();
					var chosenMap = 0;
					var numberOfPlayers = 0;
					var state = 0;				//0 = Spielvorbereitung, 1 = Spiel, 2 = GameOver-Screen, nur für Ausgabe am Client von Belang
					var ClientGameControler1;
					iAmPlayer = 0;
					var winner;

					// Einmaliger Aufruf bei Spielstart, Client wird mitgeteilt, welcher Spieler er ist
					socket.on('createUniverse', function(data) {
						if (socket.id == data.player1) {
							iAmPlayer = 1;
						}
						if (socket.id == data.player2) {
							iAmPlayer = 2;
						}

						ClientGameControler1 = new ClientGameControler(data.Universe, iAmPlayer, document.getElementById("contents"), this);
						ClientGameControler1.milkyways = data.Milkyways;
						console.log("player " + iAmPlayer + ": universe created");
					});

					//Benachrichtigung mit String, der den Gewinner enthält
					socket.on('GameOver', function(data) {
						winner = data.winner;
					});

					//Updated die eigentlichen Spieldaten; wird vom Server immer bei Änderung verschickt
					//In der Zwischenzeit berechnet der Client die Vorgänge selbst; das hat keinerlei Auswirkung auf den Server
					socket.on('updateUniverse',	function(data) {
										try {
											ClientGameControler1.universe = data.Universe;		//Alle Planeten
											ClientGameControler1.setMilkyways(data.MilkyWays);	//Alle Routen zwischen den Planeten

											drawButtons(ClientGameControler1.universe, ClientGameControler1.milkyways);	//Einzeichnen der Buttons
										
											console.log("player " + iAmPlayer + ": universe updated");
										} catch (e) {

											console.log("Fehler beim erstellen des ClientGameControlers. Normal beim Spielstart.");
											// console.log(e); 
										}
									});

					//Aufruf bei Änderung am Zustand der Website (s.o. state)
					socket.on('updateClient', function(data) {

						chosenMap = data.chosenMap;
						numberOfPlayers = data.numberOfPlayers;
						player1 = data.player1;
						state = data.state;

						clientUpdate();	//Funktion zur grafischen Ausgabe der Website am Client
					});

					//Button auf Webseite zum Eröffnen einer Spielrunde
					function startButtonPressed() {

						socket.emit('ask for update', {});	//Bittet den Server um ein Clientupdate, um sicher zu gehen, dass die neuesten Daten angezeigt werden

						if (numberOfPlayers == 0) //Nur der erste Spieler kann eine Spielrunde eröffnen
						{
							socket.emit('startGame',{map : document.getElementById("selection").selectedIndex});	//der erste Spiele wählt die Karte bei eröffnen aus
						}
					}

					//Button auf der Webseite zum Beitreten der Spielrunde
					function joinButtonPressed() {

						socket.emit('ask for update', {});

						if (numberOfPlayers == 1);	//Nur der zweite Spieler kann beitreten
						{
							socket.emit('joinGame', {});
						}
					}

					//Sorgt für die grafische Ausgabe der Website am ClientBrowser
					function clientUpdate() { 

						console.log("state " + state);

						killElement(document.getElementById("contents"));		//Leeren der verschiedenen "Zeichenbereiche"
						killElement(document.getElementById("buttonArea"));		//Bereich für Buttons an den Planeten
						killElement(document.getElementById("controlArea"));	//Bereich für Kontrollkästchen und Schieberegler

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

						if (state == 0) {	//Eine Menge HTML Elemente zur Begrüßung und Levelwahl, etc.

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

							var btn = document.createElement("BUTTON"); 
							var t = document.createTextNode("Start"); 
							btn.appendChild(t); 
							btn.id = "start";
							btn.addEventListener("click", startButtonPressed);
							welcomeArea.appendChild(btn);

							var btn2 = document.createElement("BUTTON"); 
							var t = document.createTextNode("Join"); 
							btn2.appendChild(t); 
							
							btn2.id = "join";
							btn2.addEventListener("click", joinButtonPressed);
							welcomeArea.appendChild(btn2);

							var numbersOf = document .createTextNode("Number of players in game: " + numberOfPlayers);
							numberOf.appendChild(numbersOf);

							var choices = [ "Level 1", "Level 2", "Level 3", "Level 4", "Level 5" ];

							var map = "";

							if (numberOfPlayers > 0) {
								map = "Map chosen:";
								map += "<form>"
								map += "<select disabled>";
							} else {
								map = "Choose a map:"
								map += "<form>"
								map += "<select id = 'selection'>";
							}

							for (i = 0; i <= choices.length-1; i++) {
								if (i == chosenMap) {
									map += "<option value='" + i + "' selected>" + choices[i] + "</option>";
								} else {
									map += "<option value='" + i + "'>"	+ choices[i] + "</option>";
								}
							}
							map += "</select></form>";

							if (numberOfPlayers > 0) {	
								document.getElementById("start").disabled = true;		//Der erste Spieler kann nur "starten"
							}
							if (numberOfPlayers < 1 || numberOfPlayers > 1 || player1 == socket.id) {			//Der zweite Spieler nur noch "joinen"
								document.getElementById("join").disabled = true;		//Buttons werden sofort ausgegraut
							}

							choice.innerHTML = map;
							contents.appendChild(welcomeArea);
						}// Ende state 0

						if (state == 1) {
							//Hier bleibt es leer, da der GameControler seine eigene Funktion hat
							//um die Seite mit dem Spielfeld zu füllen
						}

						//Ausgabe des GameOver-Inhalts mit dem Gewinner
						if (state == 2) {

							var empty = document.createTextNode("");
							var welcome = document.createTextNode("Game Over!");
							var welcome2 = document.createTextNode("The winner is " + winner);

							welcomeArea.appendChild(welcome);
							var br = document.createElement("br");
							welcomeArea.appendChild(br);
							welcomeArea.appendChild(welcome2);
						}
					}
					$('#start').click(startButtonPressed);	//Verknüpfen der Buttons mit ihrer Funktionalität
					$('#join').click(joinButtonPressed);
				});
