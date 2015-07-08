/*	ClientGameControler.js
 * 
 * 	Author: rszabad(si3ben)
 * 	Date: SS15, 8.6.15
 * 	Course: Test-driven Development mit JavaScript
 * 
 * 	GameController, der beim Client ausgeführt wird, um ihm die dynamische Anzeige des Spielfelds zu ermöglichen
 *  wird bei Bedarf vom Server geupdated
 *  hat leicht veränderte Funktionalität zum eigentlichen GameController am Server
 *  alles Spielgeschehen wird vom Server kontrolliert! und hier nur abgebildet
 * 
 */

function ClientGameControler(universeA, playerA, contentsA, creatorObject){ 
		
	this.universe = universeA;			//Planeten
	this.milkyways = [];				//Routen

	this.gameOver = false;		
	var that = this; 					//this verweist in den callback-Funktionen auf etwas anderes, muss also extra mitgenommen werden

	travelFrom = undefined;				//Von den Travel-Buttons erreichbare Variable, muss in den Gamecontroler beim Player ausgelagert werden
	travelTo = undefined;				//Von den Travel-Buttons erreichbare Variable, muss in den Gamecontroler beim Player ausgelagert werden
	isPlayedBy = playerA; 				//Vorläufige Variablezur Angabe des Spielers, muss in den Gamecontroler beim Player ausgelagert werden
	client = creatorObject;
	
	cont = contentsA;
	
	rangeValue = 100;
	checkboxes = [true, true, true];
	
	//Übernahme aller Routen
	this.setMilkyways = function(milky){
		for(var i = 0; i < this.milkyways.length; i++){
			this.milkyways[i].travelers = [];
			this.milkyways[i].travelers = milky[i].travelers.concat();
		}
	}
	
	
	
	//update berechnet verbleibende Zeiten für Spielvorgänge damit diese ausgegeben werden können
	//und weißt zeichnen der Spielfläche an
	update = function(){  
			
		for(var i = 0; i < that.universe.length; i++){		
			if(that.universe[i].Conquest != undefined){
				that.universe[i].Conquest.remainingConquestTime = that.universe[i].Conquest.conquestTime - (Date.now() - that.universe[i].Conquest.conquestStarted);	//Eroberungszeit abgelaufen == true als Rückgabe			
				if(that.universe[i].Conquest.remainingConquestTime < 0){
					that.universe[i].Conquest.remainingConquestTime = 0;
				}
			}
			
			if(that.universe[i].Production != undefined){			
				that.universe[i].Production.remainingProductionTime = that.universe[i].Production.productionTime - (Date.now() - that.universe[i].Production.productionStarted);
				if(that.universe[i].Production.remainingProductionTime < 0){
					that.universe[i].Production.remainingProductionTime = 0;
				}
			}		
		}
		
		for(var m = 0; m < that.milkyways.length; m++){
			if(that.milkyways[m] != undefined){
			for(var n = 0; n < that.milkyways[m].travelers.length; n++){
				
				that.milkyways[m].travelers[n].remainingTravelTime = that.milkyways[m].travelers[n].travelTime - (Date.now() - that.milkyways[m].travelers[n].travelStarted);
				if(that.milkyways[m].travelers[n].remainingTravelTime < 0){
					that.milkyways[m].travelers[n].remainingTravelTime = 0;
				}
			}
		}}
			
		
		
		drawField(that.universe, that.milkyways);		//Zeichnen der Spielfläche, sollte zum Gamecontroler beim Player/Client ausgelagert werden
	
		setTimeout(update, 50);     	//Methode ruft sich selbst auf
	
	}
	
	update();										//Einmaliges Aufrufen zum Start
	drawButtons(this.universe, this.milkyways);		//Einmaliges Aufrufen zum Start

	
}