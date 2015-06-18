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
	isPlayedBy = 1; 			//Vorläufige Variable zur Angabe des Spielers, muss in den Gamecontroler beim Player ausgelagert werden
	
	this.universe = universeA;		//alle Planeten
	this.milkyways = [];				//alle Routen
	
	this.players = playersA;	//Spieler-Objekte
	this.gameOver = false;		
	var that = this; 			//this verweist in den callback-Funktionen auf etwas anderes, muss also extra mitgenommen werden

	//Erstellung aller Routen zwischen den Planeten in Abhängigkeit von deren ReiseRadius
	for(var i = 0; i < this.universe.length; i++){
		for(var o = 0; o < this.universe.length; o++){
			if(i != o){
				
				var x = this.universe[o].x - this.universe[i].x;
				var y = this.universe[o].y - this.universe[i].y; 
				
				var sum = Math.sqrt((x*x)+(y*y));

				if(sum <= this.universe[i].travelRadius){
					this.milkyways.push(new Route(this.universe[i],  this.universe[o], sum, i)); 
					this.milkyways[this.milkyways.length-1].distance = sum; 
				//	this.universe[i].routesFromHere.push(this.milkyways[this.milkyways.length-1]);
				}				
			}
		}	
	}
	
	//update ruft sich regelmäßig selbst auf und fragt in einer Kaskade von oben nach unten alle seine GameObjekte nach Änderungen ab (ruft deren update()-Funktionen auf)
	update = function(){  
				
		for(var i = 0; i < that.universe.length; i++ ){
			that.universe[i].update();	 		
		}
		
		that.gameOver = true;										//Prüfen ob alle Planeten einem Spieler gehören = Siegbedingung
		for(var i = 0; i < that.universe.length -1; i++ ){ 
			if(that.universe[i].owner.ID != that.universe[i+1].owner.ID){
				that.gameOver = false;
			}			
		}
		
		for(var i = 0; i < that.milkyways.length; i++ ){
			that.milkyways[i].update();
		}
		
		//drawField(universe, milkyways);		//Zeichnen der Spielfläche, sollte zum Gamecontroler beim Player/Client ausgelagert werden
		
		//if(that.gameOver == false){ 		//ACHTUNG: ausgeschalten, weil bei simplen Tests z.B. mit nur einem Planeten sofort Spielabbruch eintritt
			//console.log("GAMEOVER");		//MUSS also vor Abgabe eingeschalten werden
			setTimeout(update, 50);     	//Methode ruft sich selbst auf
		//} 
		
	}
	
	update();			//Einmaliges Aufrufen zum Start
	//drawButtons();		//Einmaliges Aufrufen zum Start

	
}