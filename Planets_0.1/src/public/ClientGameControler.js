/*	GameControler.js
 * 
 * 	Author: rszabad(si3ben)
 * 	Date: SS15, 8.6.15
 * 	Course: Test-driven Development mit JavaScript
 * 
 * 	Vorläufiger Gamecontroler zur Verwaltung des Spieles und Spielablaufs
 */


	


function ClientGameControler(universeA, playerA, contentsA, creatorObject){ 
	
	
	this.universe = universeA;		//Planeten
	this.milkyways = [];				//Routen

	this.gameOver = false;		
	var that = this; 			//this verweist in den callback-Funktionen auf etwas anderes, muss also extra mitgenommen werden

	travelFrom = undefined;		//Von den Travel-Buttons erreichbare Variable, muss in den Gamecontroler beim Player ausgelagert werden
	travelTo = undefined;		//Von den Travel-Buttons erreichbare Variable, muss in den Gamecontroler beim Player ausgelagert werden
	isPlayedBy = playerA; 			//Vorläufige Variablezur Angabe des Spielers, muss in den Gamecontroler beim Player ausgelagert werden
	client = creatorObject;
	
	cont = contentsA;
	
	rangeValue = 100;
	checkboxes = [true, true, true];
	
	//Erstellung aller Routen zwischen den Planeten in Abhängigkeit von deren ReiseRadius
	
	this.setMilkyways = function(milky){
	
		for(var i = 0; i < this.milkyways.length; i++){
			
			this.milkyways[i].travelers = [];
			this.milkyways[i].travelers = milky[i].travelers.concat();
			
		}
		
		/*for(var i = 0; i < this.universe.length; i++){
			for(var o = 0; o < this.universe.length; o++){
				if(i != o){
					
					var x = this.universe[o].x - this.universe[i].x;
					var y = this.universe[o].y - this.universe[i].y; 
					
					var sum = Math.sqrt((x*x)+(y*y));
	
					if(sum <= this.universe[i].travelRadius){
						this.milkyways.push(new Route(this.universe[i],  this.universe[o], sum, i)); 
						this.milkyways[this.milkyways.length-1].distance = sum; 
						this.universe[i].routesFromHere.push(this.milkyways[this.milkyways.length-1]);
					}				
				}
			}
			
			
			//console.log("CCC" + this.universe[i].routesFromHere);
			
		}	*/
		
	}
	
	
	
	//update ruft sich regelmäßig selbst auf und fragt in einer Kaskade von oben nach unten alle seine GameObjekte nach Änderungen ab (ruft deren update()-Funktionen auf)
	update = function(){  
				
		
		/*for(var i = 0; i < that.universe.length; i++){
			for(var o = 0; o < that.universe.length; o++){
				if(i != o){
					
					var x = that.universe[o].x - that.universe[i].x;
					var y = that.universe[o].y - that.universe[i].y; 
					
					var sum = Math.sqrt((x*x)+(y*y));

					if(sum <= that.universe[i].travelRadius){
						that.milkyways.push(new Route(that.universe[i],  that.universe[o], sum, i)); 
						that.milkyways[that.milkyways.length-1].distance = sum; 
						that.universe[i].routesFromHere.push(that.milkyways[that.milkyways.length-1]);
					}				
				}
			}	
		}*/
		
		/*for(var i = 0; i < that.universe.length; i++ ){
			//that.universe[i].update();	
		}
		
		that.gameOver = true;										//Prüfen ob alle Planeten einem Spieler gehören = Siegbedingung
		for(var i = 0; i < that.universe.length -1; i++ ){ 
			if(that.universe[i].owner.ID != that.universe[i+1].owner.ID){
				that.gameOver = false;
			}			
		}
		
		for(var i = 0; i < that.milkyways.length; i++ ){
			//that.milkyways[i].update();
		}
		*/
		
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
		
		//if(that.gameOver == false){ 		//ACHTUNG: ausgeschalten, weil bei simplen Tests z.B. mit nur einem Planeten sofort Spielabbruch eintritt
			//console.log("GAMEOVER");		//MUSS also vor Abgabe eingeschalten werden
			setTimeout(update, 100);     	//Methode ruft sich selbst auf
		//} 
		
		/*for(var i = 0; i < that.universe.length; i++ ){
			console.log("Planet" + i + that.universe[i].Conquest);
		}*/
	}
	
	update();			//Einmaliges Aufrufen zum Start
	drawButtons(this.universe, this.milkyways);		//Einmaliges Aufrufen zum Start

	
}