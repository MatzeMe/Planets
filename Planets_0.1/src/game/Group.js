/*	Group.js
 * 
 * 	Author: rszabad(si3ben)
 * 	Date: SS15, 8.6.15
 * 	Course: Test-driven Development mit JavaScript
 * 
 * 	Hält alle Schiffe eines Typs, eines Spielers an einem Ort.
 *
 */
   
function Group(shipA){ 
	 
	if(shipA == undefined){
		this.destroyed = true;
	}
	else{
	this.ships = [];
	this.ships.push(shipA);
	this.owner = shipA.owner;	//Nimmt Werte des ersten Schiffes um Eigenschaften der Gruppe festzulegen
	this.speed = shipA.speed;
	this.dmgPerShip = shipA.dealtDamage;
	this.lpPerShip = shipA.lifePoints;
	this.type = shipA.type;
	this.destroyed = false;		//Flag um Zerstörung == keine Schiffe vorhanden anzuzeigen
	}
	
	 
	//Stellt fest, ob ein Schiff oder ein Array von Schiffen übergeben wurde und pusht Schiff(e) in Gruppen-Array
	this.addShip = function(shipB){
		if(shipB instanceof Ship){
			this.ships.push(shipB);
		} 
		
		if(shipB instanceof Array) {	
			for(var i = 0; i < shipB.length; i++){
				this.ships.push(shipB[i]);
			}
		}
	} 
	
	//Entfernt gegebene Anzahl von Schiffen von hinten aus dem Array und setzt evtl. Zerstört-Flag falls Schiffe = 0
	this.removeShip = function(number){
		if(number >= this.ships.length){
			number = this.ships.length;
		}
		for(var i = 0; i < number; i++){
			this.ships.pop();
		}		
		if(this.ships.length <= 0){
			this.destroyed = true;
		}
	}
	
}

