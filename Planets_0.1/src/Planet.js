function Planet(MassA, xA, yA, planetIDA){ 

	this.Mass = MassA;
	this.TravelRadius = this.Mass * 30; 
	this.x = xA;
	this.y = yA; 
	this.Owner = new Player(99);
	this.presentGroups = [];
	this.Conquest;
	this.Fight;
	this.Production;
	this.allAlone = true;
	this.TypeOfProduction = 1;
	this.planetID = planetIDA;
	var type = this.TypeOfProduction;
	var that = this;
	
	this.changeProduction = function(){
		
		switch(that.TypeOfProduction){
		
		case 1: that.TypeOfProduction = 2; break;
		case 2: that.TypeOfProduction = 3; break;
		case 3: that.TypeOfProduction = 1; break;
		
		}
	
		
		that.stopProduction();
		that.startProduction();
		
	}
	
	this.setOwner = function(OwnerA){
	
		this.Owner = OwnerA;
	}
	
	this.addGroup = function(GroupA){
		
		this.presentGroups.push(GroupA);
	}
	
	this.removeGroup = function(GroupA){
		
		this.presentGroups.splice(this.presentGroups.indexOf(GroupA), 1);
		
	}
	
	this.mergeGroups = function(GroupA, GroupB){
		
		
		GroupA.Ships = GroupA.Ships.concat(GroupB.Ships);
		GroupB.Ships = [];
		GroupB.Destroyed = true;
		return GroupA;
		
	}
	
	this.checkGroups = function(){
		
		//Gleiche Gruppen zusammenfassen
		for(var i = 0; i < this.presentGroups.length; i++){
			if(this.presentGroups[i].Destroyed == false){
				
				for(var o = i + 1; o < this.presentGroups.length; o++){
					if(this.presentGroups[i].Owner.ID == this.presentGroups[o].Owner.ID && this.presentGroups[i].Type == this.presentGroups[o].Type){
						this.presentGroups[i] = this.mergeGroups(this.presentGroups[i], this.presentGroups[o]);
					}
				}
				
				
			}
		}
		
		//Leere Gruppen zusammenfassen
		for(var i = 0; i < this.presentGroups.length; i++){
			if(this.presentGroups[i].Destroyed == true){
				this.removeGroup(this.presentGroups[i]);
			}
		}
		
		//Prüfen ob Gruppen mehrere Spieler vorhanden
		if(this.presentGroups.length > 1){		
			this.allAlone = true;
			for(var i = 0; i < this.presentGroups.length - 1; i++){
				if(this.presentGroups[i].Owner.ID != this.presentGroups[i + 1].Owner.ID){
					this.allAlone = false;
				}
			}		
		}
		else{
			this.allAlone = true;
		}
			
		//Prüfen ob Allein, Eroberung nicht bereits läuft, der Planet nicht schon im Besitz, dann starten
		if(this.presentGroups.length > 0){
			if(this.allAlone == true && !(this.Conquest instanceof Conquest) && (this.Owner.ID != this.presentGroups[0].Owner.ID)){ 
				this.startConquest();	
			}
		}
		
		//Prüfen ob Eroberung läuft und abgebrochen werden müsste
		if((this.allAlone == false && (this.Conquest instanceof Conquest)) || (this.presentGroups.length == 0 && (this.Conquest instanceof Conquest))){
			this.stopConquest();	
		} 
				
		//Prüfen ob nicht Allein, Kampf nicht bereits läuft, dann starten
		if(this.allAlone == false && !(this.Fight instanceof Fight)){
			this.startFight();  
		}
		if((this.Fight instanceof Fight) && this.allAlone == true){
			this.stopFight();
		}
		
		if(this.allAlone == true && this.Owner.ID != 99 && !(this.Production instanceof Production)){
			this.startProduction();
		}
		
		if(this.allAlone == false && (this.Production instanceof Production)){
			this.stopProduction();
		}
		
		if(this.presentGroups.length > 0){
			if(this.allAlone == true && this.Owner.ID != this.presentGroups[0].Owner.ID && (this.Production instanceof Production)){
				this.stopProduction();
			}
		}
		
	}
	
	this.startConquest = function(){
		this.Conquest = new Conquest(this.Mass, this.presentGroups);
	}
	
	this.stopConquest = function(){
		this.Conquest = undefined;
	}
	
	this.startFight = function(){
		
		this.Fight = new Fight(this.presentGroups);
 
	}
	
	this.stopFight = function(){
		this.Fight = undefined;
	}
	
	this.startProduction = function(){
		
		this.Production = new Production(this.Mass, this.TypeOfProduction);
 
	}
	
	this.stopProduction = function(){
		this.Production = undefined;
	}
	

	
	
	
this.Update = function(){
		
		this.checkGroups();
	
		this.checkConquest();
		
		this.checkProduction();
		
		//this.updateFight();
		 
		//this.checkGroups();
	}
	
	this.checkConquest = function(){	
		if(this.Conquest instanceof Conquest){	
			var conq = this.Conquest.Update();		
			if(conq == true){
				this.setOwner(this.presentGroups[0].Owner);
				this.stopConquest();			
			}	
		}	
	}
	
	this.checkProduction = function(){	
		if(this.Production instanceof Production){


			var prod = this.Production.Update();


			if(prod == true){
				this.addGroup(new Group(new Ship(this.Owner, this.TypeOfProduction)));
				
				
				
				this.stopProduction();
				this.startProduction();				
			}	
		}
	}
	
	this.Move = function(){
		
		if(TravelFrom == undefined){
			TravelFrom = that;
			console.log(that.planetID);
		}
		else if(TravelTo == undefined){
			TravelTo = that;
			console.log(that.planetID);
		}
		if(TravelFrom != undefined && TravelTo != undefined)
		{
			console.log("Travel1");
			console.log(TravelFrom.planetID);
			console.log(TravelTo.planetID);
			for(var o = 0; o < Milkyways.length; o++) {
				if(Milkyways[o].Start.planetID == TravelFrom.planetID && Milkyways[o].Target.planetID == TravelTo.planetID){
					console.log("Travel2");
					for(var y = 0; y < Milkyways[o].Start.presentGroups.length; y++){
						Milkyways[o].startTravel(Milkyways[o].Start.presentGroups[y]);
						Milkyways[o].Start.removeGroup(Milkyways[o].Start.presentGroups[y]);
					}
				}
				
			}
		
			TravelFrom = undefined;
			TravelTo = undefined;
		
		}
	}
	
	
}