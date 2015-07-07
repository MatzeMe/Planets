/*	GameControler.js 
 * 
 * 	Author: rszabad(si3ben)
 * 	Date: SS15, 8.6.15
 * 	Course: Test-driven Development mit JavaScript
 * 
 * 	GameController zur Steuerung des eigentlichen Spielflusses
 *  erstellt aus den vorgegebenen Planeten ein Spielfeld mit verbindenden Routen zwischen den Planeten
 *  und fragt die Planeten und Routen regelmäßig auf Änderungen ab
 */

function GameControler(universeA, playersA){ 
		
	this.universe = universeA;		//alle Planeten
	this.milkyways = [];			//alle Routen
	
	this.players = playersA;		//Spieler-Objekte
	this.gameOver = false;		
	var that = this; 				//this verweist in den callback-Funktionen auf etwas anderes, muss also extra mitgenommen werden

	this.routeCounter = 0;			//IDs für Routen
	
	//Erstellung aller Routen zwischen den Planeten in Abhängigkeit von deren ReiseRadius
	for(var i = 0; i < this.universe.length; i++){
		for(var o = 0; o < this.universe.length; o++){
			if(i != o){
				
				var x = this.universe[o].x - this.universe[i].x;
				var y = this.universe[o].y - this.universe[i].y; 
				
				var sum = Math.sqrt((x*x)+(y*y));

				if(sum <= this.universe[i].travelRadius){
					this.milkyways.push(new Route(this.universe[i],  this.universe[o], sum, this.routeCounter)); 
					this.milkyways[this.milkyways.length-1].distance = sum; 
					this.universe[i].routesFromHere.push(this.routeCounter);
					this.routeCounter++;
				}				
			}
		}	
	}
	
	//update ruft sich regelmäßig selbst auf und fragt in einer Kaskade von oben nach unten alle seine GameObjekte nach Änderungen ab (ruft deren update()-Funktionen auf)
	update = function(){  
			
		if(state == 1){													//Solange Spiel laufen soll
			for(var i = 0; i < that.universe.length; i++ ){
				that.universe[i].update();	 		
			} 
			
			that.gameOver = true;										//Prüfen ob alle Planeten einem Spieler gehören = Siegbedingung
			var tempArray = [];
			for(var i = 0; i < that.universe.length; i++ ){ 
				if(that.universe[i].owner.ID != 99){
					 tempArray.push(that.universe[i].owner.ID);
				}			
			}
			for(var i = 0; i <  tempArray.length-1; i++ ){ 
				if(tempArray[i] != tempArray[i+1]){
					that.gameOver = false;
				}
			}
			if(that.gameOver == true)
				{
					somethingChanged("GameOver"+tempArray[0]);			//Benachrichtigen des Servers bei GameOver
				}
		
			
			for(var i = 0; i < that.milkyways.length; i++ ){
				that.milkyways[i].update();
			}
			
			setTimeout(update, 50);     	//Methode ruft sich selbst auf
		}	
	}
	
	update();			//Einmaliges Aufrufen zum Start
}