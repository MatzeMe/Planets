

function Group(Shipa){
	
	this.Ships = [];
	this.Ships.push(Shipa);
	this.Owner = Shipa.Owner;	//Nimmt Werte des ersten Schiffes um Eigenschaften der Gruppe festzulegen
	this.Speed = Shipa.Speed;
	this.Type = Shipa.Type;
	this.Destroyed = false;
	
	//Stellt fest, ob ein Schiff oder ein Array übergeben wurde und pusht Schiffe in Gruppen-Array
	this.addShip = function(Shipb){
		if(Shipb instanceof Ship){
			this.Ships.push(Shipb);
		} 
		
		if(Shipb instanceof Array) {	
			for(var i = 0; i < Shipb.length; i++){
				this.Ships.push(Shipb[i]);
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

