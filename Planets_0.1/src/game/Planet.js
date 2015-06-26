/*	Planet.js
 * 
 * 	Author: rszabad(si3ben)
 * 	Date: SS15, 8.6.15
 * 	Course: Test-driven Development mit JavaScript
 * 
 * 	Verwaltet Gruppen und die mit dem Spielablauf in zusammenhang stehenden Objekte Eroberung, Kampf, Produktion
 *  Hat einen von seiner Masse abhängigen Reiseradius, der beeinflusst, wie weit abfliegende Schiffe fliegen können 
 *
 */

function Planet(massA, xA, yA, planetIDA){ 

	this.mass = massA;
	this.travelRadius = this.mass * 30; //Errechnung des Reiseradius
	this.x = xA;
	this.y = yA; 
	this.owner = new Player(99);		//default
	this.presentGroups = [];			//anwesende Gruppen aller Spieler
	this.Conquest = undefined;
	this.Fight = undefined;
	this.Production = undefined;
	this.allAlone = true;				//Indikator, ob nur ein Spieler Schiffe auf dem Planeten hat
	this.typeOfProduction = 1;			//Schifftyp, der Produziert werden soll
	this.planetID = planetIDA;
	this.routesFromHere = [];			//Alle Routen, die von hier ausgehen
	
	//Führt die Checks zum Zustand des Planeten aus
	this.update = function(){
		
		this.checkGroups();
	
		this.checkConquest();
		
		this.checkFight();		//prüft den Fight nicht, triggert nur seine (Update() an)
		
		this.checkProduction();
	}
	
	
	//Schickt ausgewählte Gruppe auf Reise auf genannter Route
	this.sendGroupOnTravel = function(GroupA, RouteA, numberOfShips){		
		
		console.log("number of ships"+numberOfShips);
		if(numberOfShips > 0){
			if(numberOfShips < GroupA.ships.length){
				var tempGroup = this.splitGroup(GroupA, numberOfShips);
				RouteA.startTravel(tempGroup);
			}
			else{
				tempGroup = GroupA;
				RouteA.startTravel(tempGroup);
				this.removeGroup(GroupA);
			}
		}
		
		//this.removeGroup(GroupA);
	}

	this.splitGroup = function(GroupA, numberOfShips){		
		
		var tempShip = GroupA.ships.shift();
		
		var tempGroup = new Group(tempShip);
		console.log("***" );
		
		if(numberOfShips > 1){
			tempGroup.addShip(GroupA.ships.splice(0, (numberOfShips-1)));
		}
		return tempGroup;
	}
 
	//Ändert die Produktion reihum
	this.changeProduction = function(){
		
		switch(this.typeOfProduction){
		
		case 1: this.typeOfProduction = 2; break;
		case 2: this.typeOfProduction = 3; break;
		case 3: this.typeOfProduction = 1; break;
		somethingChanged("planet: " + this.planetID + " --> production changed");
		}
	
	
		this.stopProduction();	//stoppt und startet Produktion, damit neuer Schiffstyp produziert wird
		this.startProduction();  

		
	}
	
	//Besitzer ändern
	this.setOwner = function(ownerA){
	
		this.owner = ownerA;
		somethingChanged("planet: " + this.planetID + " --> owner changed");
	}
	
	//Fügt den anwesenden Gruppe eine Gruppe hinzu
	this.addGroup = function(groupA){
		this.presentGroups.push(groupA);
		somethingChanged("planet: " + this.planetID + " --> add group");
	}
	
	//entfernt eine Gruppe aus den anwesenden
	this.removeGroup = function(groupA){	
		this.presentGroups.splice(this.presentGroups.indexOf(groupA), 1); //entfernt gewünschte Gruppe und schließt die Lücke im Array
		somethingChanged("planet: " + this.planetID + " --> remove group");
	}
	
	//fasst die Schiffe zweier Gruppen in einer zusammen
	this.mergeGroups = function(groupA, groupB){		
		groupA.ships = groupA.ships.concat(groupB.ships);
		groupB.ships = [];
		groupB.destroyed = true;
		return groupA;
		
	}
	
	//Führt verschiedene Checks durch und reagiert
	this.checkGroups = function(){
		
		//Gleiche Schiffstypen in Gruppen zusammenfassen
		for(var i = 0; i < this.presentGroups.length; i++){
			if(this.presentGroups[i].destroyed == false){
				
				for(var o = i + 1; o < this.presentGroups.length; o++){
					if(this.presentGroups[i].owner.ID == this.presentGroups[o].owner.ID && this.presentGroups[i].type == this.presentGroups[o].type){
						this.presentGroups[i] = this.mergeGroups(this.presentGroups[i], this.presentGroups[o]);
						somethingChanged("planet: " + this.planetID + " --> merge group");
					}
				}
				
				
			}
		}
		
		//Leere Gruppen löschen
		for(var i = 0; i < this.presentGroups.length; i++){
			if(this.presentGroups[i].destroyed == true){
				this.removeGroup(this.presentGroups[i]);
			}
		}
		
		//Prüfen ob Gruppen mehrerer Spieler vorhanden
		if(this.presentGroups.length > 1){		
			this.allAlone = true;
			for(var i = 0; i < this.presentGroups.length - 1; i++){
				if(this.presentGroups[i].owner.ID != this.presentGroups[i + 1].owner.ID){
					this.allAlone = false;
					
				}
			}		
		}
		else{
			this.allAlone = true;
		}
			
		//Prüfen ob Gruppen vorhanden, Spieler allein (allAlone), Eroberung nicht bereits läuft, der Planet nicht schon im Besitz, dann starten
		if(this.presentGroups.length > 0){
			if(this.allAlone == true && !(this.Conquest instanceof Conquest) && (this.owner.ID != this.presentGroups[0].owner.ID)){ 
				this.startConquest();	
			}
		}
		
		//Prüfen ob Eroberung läuft und abgebrochen werden müsste (Schiffe mehrerer Spieler da oder keine Schiffe mehr da)
		if((this.allAlone == false && (this.Conquest instanceof Conquest)) || (this.presentGroups.length == 0 && (this.Conquest instanceof Conquest))){
			this.stopConquest();	
		} 
				
		//Prüfen ob nicht Allein, Kampf nicht bereits läuft, dann starten
		if(this.allAlone == false && !(this.Fight instanceof Fight)){
			this.startFight();  
		}
		
		//Prüfen ob Kampf läuft und abgebrochen werden müsste (Schiffe nur noch eines Spielers vorhanden)
		if((this.Fight instanceof Fight) && this.allAlone == true){
			this.stopFight();
		}
		
		//Prüfen ob Allein und Planet einen Besitzer hat und Produktion noch nicht läuft
		if(this.allAlone == true && this.owner.ID != 99 && !(this.Production instanceof Production) && !(this.Conquest instanceof Conquest) && !(this.Fight instanceof Fight)){
			this.startProduction();


		}
		
		//Prüfen ob laufende Produktion abgebrochen werden müsste (Schiffe mehrerer Spieler vorhanden)
		if(this.allAlone == false && (this.Production instanceof Production)){
			this.stopProduction();
		}
		
		//Prüfen ob laufende Produktion abgebrochen werden müsste (Schiffe nur eines Spielers vorhanden, diese aber nicht vom Planetenbesitzer)
		if(this.presentGroups.length > 0){
			if(this.allAlone == true && this.owner.ID != this.presentGroups[0].owner.ID && (this.Production instanceof Production)){
				this.stopProduction();
			}
		}
		
	}
	
	
	//"Start" und "Stop" der Verschiedenen Spielobjekte
	this.startConquest = function(){
		this.Conquest = new Conquest(this.mass, this.presentGroups);
		somethingChanged("planet: " + this.planetID + " --> start conquest");
	}
	
	this.stopConquest = function(){
		this.Conquest = undefined;
		somethingChanged("planet: " + this.planetID + " --> stop conquest");
	}
	
	this.startFight = function(){	
		this.Fight = new Fight(this.presentGroups);
		somethingChanged("planet: " + this.planetID + " --> start fight");
	}
	
	this.stopFight = function(){
		this.Fight = undefined;
		somethingChanged("planet: " + this.planetID + " --> stop fight");
	} 
	
	this.startProduction = function(){
		this.Production = new Production(this.mass, this.typeOfProduction);
		somethingChanged("planet: " + this.planetID + " --> start production");
	}
	
	this.stopProduction = function(){
		this.Production = undefined;
		somethingChanged("planet: " + this.planetID + " --> stop production");
	}
	


	
	//Prüft, ob Eroberung stattfindet und ob die Eroberungszeit abgelaufen ist
	this.checkConquest = function(){	
		if(this.Conquest instanceof Conquest){	
			var conq = this.Conquest.update();		
			if(conq == true){						//Wenn Eroberung abgelaufen, Änderung des Planetenbesitzers, Löschen des Eroberungsobjekts
				this.setOwner(this.presentGroups[0].owner);
				this.stopConquest();			
			}	
		}	
	}
	
	//Triggert das Fightobjekt, um sich upzudaten und evtl. Kämpfe vorzunehmen
	this.checkFight = function(){	
		if(this.Fight instanceof Fight){	
			this.Fight.update();			
		}	
	}
	
	//Prüft, ob Produktion stattfindet und ob Produktionszeit abgelaufen ist
	this.checkProduction = function(){
		if(this.Production instanceof Production){			
			var prod = this.Production.update();
			if(prod == true){						//Wenn Produktion fertig, Erstellen einer neuen Gruppe mit einem Schiff des entsprechenden Typs
				this.addGroup(new Group(new Ship(this.owner, this.typeOfProduction)));			
				this.stopProduction();				//Neustart der Produktion
				this.startProduction();	

			}	
		}
	}
}