function Group(ShipA){ 
	
	this.Ships = [];
	this.Ships.push(ShipA);
	this.Owner = ShipA.Owner;	//Nimmt Werte des ersten Schiffes um Eigenschaften der Gruppe festzulegen
	this.Speed = ShipA.Speed;
	this.Type = ShipA.Type;
	this.Destroyed = false;
	
	//Stellt fest, ob ein Schiff oder ein Array übergeben wurde und pusht Schiffe in Gruppen-Array
	this.addShip = function(ShipB){
		if(ShipB instanceof Ship){
			this.Ships.push(ShipB);
		} 
		
		if(ShipB instanceof Array) {	
			for(var i = 0; i < ShipB.length; i++){
				this.Ships.push(ShipB[i]);
			}
		}
	} 
	
	//Entfernt gegebene Anzahl von Schiffen von hinten aus dem Array und setzt evtl. Zerstört-Flag falls Schiffe = 0
	this.removeShip = function(number){
		if(number >= this.Ships.length){
			number = this.Ships.length;
			this.destroyed = true;
		}
		for(var i = 0; i < number; i++){
			this.Ships.pop();
		}			
	}
	
}

