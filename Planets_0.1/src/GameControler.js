/*	GameControler.js
 * 
 * 	Author: rszabad(si3ben)
 * 	Date: SS15, 8.6.15
 * 	Course: Test-driven Development mit JavaScript
 * 
 * 	Vorläufiger Gamecontroler zur Verwaltung des Spieles und Spielablaufs
 */

function GameControler(universeA, playersA){ 
	
	travelFrom = undefined;		//Von den Travel-Buttons erreichbare Variable, muss in den Gamecontroler beim Player ausgelagert werden
	travelTo = undefined;		//Von den Travel-Buttons erreichbare Variable, muss in den Gamecontroler beim Player ausgelagert werden
	isPlayedBy = 1; 			//Vorläufige Variablezur Angabe des Spielers, muss in den Gamecontroler beim Player ausgelagert werden
	
	universe = universeA;		//alle Planeten
	milkyways = [];				//alle Routen
	
	this.players = playersA;	//Spieler-Objekte
	this.gameOver = false;		
	var that = this; 			//this verweist in den callback-Funktionen auf etwas anderes, muss also extra mitgenommen werden

	//Erstellung aller Routen zwischen den Planeten in Abhängigkeit von deren ReiseRadius
	for(var i = 0; i < universe.length; i++){
		for(var o = 0; o < universe.length; o++){
			if(i != o){
				
				var x = universe[o].x - universe[i].x;
				var y = universe[o].y - universe[i].y; 
				
				var sum = Math.sqrt((x*x)+(y*y));

				if(sum <= universe[i].travelRadius){
					milkyways.push(new Route(universe[i],  universe[o], sum)); 
					milkyways[milkyways.length-1].distance = sum; 
					universe[i].routesFromHere.push(milkyways[milkyways.length-1]);
				}				
			}
		}		
	}
	
	//update ruft sich regelmäßig selbst auf und fragt in einer Kaskade von oben nach unten alle seine GameObjekte nach Änderungen ab (ruft deren update()-Funktionen auf)
	update = function(){  
				
		for(var i = 0; i < universe.length; i++ ){
			universe[i].update();	 		
		}
		
		that.gameOver = true;										//Prüfen ob alle Planeten einem Spieler gehören = Siegbedingung
		for(var i = 0; i < universe.length -1; i++ ){ 
			if(universe[i].owner.ID != universe[i+1].owner.ID){
				that.gameOver = false;
			}			
		}
		
		for(var i = 0; i < milkyways.length; i++ ){
			milkyways[i].update();
		}
		
		drawField(universe, milkyways);		//Zeichnen der Spielfläche, sollte zum Gamecontroler beim Player/Client ausgelagert werden
		
		//if(that.gameOver == false){ 		//ACHTUNG: ausgeschalten, weil bei simplen Tests z.B. mit nur einem Planeten sofort Spielabbruch eintritt
			//console.log("GAMEOVER");		//MUSS also vor Abgabe eingeschalten werden
			setTimeout(update, 50);     	//Methode ruft sich selbst auf
		//} 
		
	}
	
	update();			//Einmaliges Aufrufen zum Start
	drawButtons();		//Einmaliges Aufrufen zum Start

	
}