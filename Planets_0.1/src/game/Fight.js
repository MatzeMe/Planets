/*	Planet.js
 * 
 * 	Author: Patrik Schedel
 * 	Course: Test-driven Development mit JavaScript
 * 
 * 	verwaltet die kämpfe auf Planeten, es wird die gruppe der schiffe übergeben, planet regruppiert vorher so das von jedem schiffstyp pro Owner nur einer vorhanden ist
 *  kämpfe finden alle 3 sec statt, update wird regelmäßig im planeten aufgerufen
 *  es muss von jedme schiff zuerst auf den favorisierten schiffstyp, dan auf den eigenen schiffstyp und dan auf den schlechten schiffstyp geschossen werden, (funktion lockonTargetandFire)
 *  der schaden an den schiffen muss gespeichert werden und erst nach dem alle schiffe gefeuert haben ausgeteilt werden (schadensarry)
 *  es müssen schadensübergriffe von einem typ zum anderen berücksichtigt werden. (fehlt noch, idee für umstetzung?)
 *  
 *
 */

function Fight(contestantsA) {

	this.contestants = contestantsA;

	// variable zum speichern des DMG
	this.ausgeteilterDMG = [];

	// variablen für die wartezeit
	this.fightStarted = Date.now();
	this.fightTime = 3000;
	this.remainingFightTime = this.fightTime;

	// prioritäten reinfolge, auf welches schiff welcher typ zuerst feuert
	this.setSchussreinfolge = function(type) {
		var feuerreinfolge = [];
		switch (type) {
		// aufschlüsselung der prioritäten
		case 1: //typ 1 zuerst auf 2, dan auf sich selbst, dan auf 3
			feuerreinfolge[0] = 2;
			feuerreinfolge[1] = 1;
			feuerreinfolge[2] = 3;
			break;
		case 2://typ 2 zuerst auf 3, dan auf sich selbst, dan auf 1
			feuerreinfolge[0] = 3;
			feuerreinfolge[1] = 2;
			feuerreinfolge[2] = 1;
			break;
		case 3://typ 3 zuerst auf 1, dan auf sich selbst, dan auf 2
			feuerreinfolge[0] = 1;
			feuerreinfolge[1] = 3;
			feuerreinfolge[2] = 2;
			break;
		}
		return feuerreinfolge;
	}
	
	// überhang schaden wird nun auf andere schiffsgruppen übertragen, schaden wird ins dmgarray eingetragen
	this.FirePerShip = function(schiffsgruppe) {
		var feuerreinfolge = this.setSchussreinfolge(schiffsgruppe.type);
		var totalDMG = schiffsgruppe.dmgPerShip * schiffsgruppe.ships.length * 2;
		console.log("Fight: dealtDMG " + schiffsgruppe.dmgPerShip + " stückzahl schiffe " + schiffsgruppe.ships.length)
		//totalDMG verdoppel da erste feindzielgruppe doppelten dmg kriegt
		
		// läuft priorität durch wegen schussreinfolge
		for ( var i = 0; i < 3; i++) {
			// läuft alle schiffe durch
			for ( var j = 0; j < this.contestants.length; j++) {
				//prüft ob die besitzer verschieden sind und flotte nicht bereits zerstört
				if(schiffsgruppe.owner.ID != this.contestants[j].owner.ID && !this.contestants[j].destroyed){
					//prüft ob der schiffstyp dem aktuellen ziel entspricht
					if(this.contestants[j].type == feuerreinfolge[i] ){
						//prüft ob schaden auf weitere schiffsgruppe übertragen werden muss
						console.log("schiffstype " + schiffsgruppe.type + " feuert auf " + this.contestants[j].type);
						console.log("schiffslebenspunkte des ziels " + this.contestants[j].lpPerShip);
						console.log("totalDMG " + totalDMG + " prio " + i	);
						if((this.contestants[j].lpPerShip * this.contestants[j].ships.length) >= totalDMG) {
							//trägt schaden ein					
							this.ausgeteilterDMG[j] += totalDMG;
							totalDMG = 0;
							i = 4; // abbruch bedingung da aller schaden ausgeteilt
							break; // abbruch bedingung da aller schaden ausgeteilt
					} else {
						//trägt DMG für schiffsgruppe ein
						this.ausgeteilterDMG[j] += this.contestants[j].lpPerShip * this.contestants[j].ships.length;
						//träg verbleibenden schaden ein
						totalDMG -= this.contestants[j].lpPerShip * this.contestants[j].ships.length;
						}
						//um unötige durchläufe zu unterbrechen und zum nächsten ziel zu wechseln
						break; 						
					}
				}
			totalDMG /= 2; //halbiert dmg mit sinkender priorität
			}
			
		}
	}
/* funktion alt, neue funktion oben
	// zielschiff suchen unter berückstigung der priorität und auf diese gruppe
	// feuern,
	// schaden in DMG array eintragen
	this.LockOnTargetAndFire = function(kampfgruppe) {
		var feuerreinfolge = this.setSchussreinfolge(kampfgruppe.type); 

		// läuft priorität durch wegen schussreinfolge
		for ( var i = 0; i < 3; i++) {
			// läuft alle schiffe durch
			for ( var j = 0; j < this.contestants.length; j++) {
				// wenn schiffe von anderem besitzter und typ gleich der
				// feuerpriorität
				if (kampfgruppe.owner != this.contestants[j].owner
						&& this.contestants[j].type == feuerreinfolge[i]) {
					this.ausgeteilterDMG[j] += kampfgruppe.ships[0].dealtDamage
							* kampfgruppe.ships.length * function() {
								// setzt zusätzlichen schadne durch prioriät
								if (i == 0)
									return 2;
								if (i == 1)
									return 1;
								if (i == 2)
									return 0.5;
							}
					break;
				}
			}
		}
	}	*/
	
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
		for(var i = 0; i < this.contestants.length; i++){
			if(this.contestants[i].destroyed == false){
				
				for(var o = i + 1; o < this.contestants.length; o++){
					if(this.contestants[i].owner.ID == this.contestants[o].owner.ID && this.contestants[i].type == this.contestants[o].type){
						this.contestants[i] = this.mergeGroups(this.contestants[i], this.contestants[o]);
					}
				}
				
				
			}
		}
		
		//Leere Gruppen löschen
		for(var i = 0; i < this.contestants.length; i++){
			if(this.contestants[i].destroyed == true){
				this.removeGroup(this.contestants[i]);
			}
		}
	}
	
	this.update = function() {
		// lässt kampf 3 sec warten 
		this.remainingFightTime = this.fightTime
				- (Date.now() - this.fightStarted);
		if (this.remainingFightTime <= 0) {
			
			//prüft gruppen vor dem kampf
			//this.checkGroups();

			// setzt die fight time wieder neu das es nach 3 sec wieder startet
			this.fightStarted = Date.now();
			
			//setzt dmgarray auf null, fals schon schaden von vorherigen runden eingetragen
			for(var i =0; i < this.contestants.length; i++) {
				this.ausgeteilterDMG[i] = 0;
			}

			// lässt alle schiffe feuern
			for ( var i = 0; i < this.contestants.length; i++) {
				console.log("schiffgruppe " + i + " owner " + this.contestants[i].owner.ID)
				if(!this.contestants[i].destroyed) //prüfe ob flotte nicht bereits zerstört
				this.FirePerShip(this.contestants[i]);
			}

			// verteilt schaden und removed zerstörte schiffe
			for ( var i = 0; i < this.contestants.length; i++) {
				if (this.ausgeteilterDMG[i] != 0) {
					console.log("schiffgruppe " + i + "owner" + this.contestants[i].owner.ID + "removeShpis" + this.ausgeteilterDMG[i] / this.contestants[i].lpPerShip);
					if(!this.contestants[i].destroyed) //nur der sicherheithalber, eigentlich dürften hier keine zerstörten flotten auftauchen, da dies 0 dmg erhalten
					this.contestants[i].removeShip(this.ausgeteilterDMG[i] / this.contestants[i].lpPerShip);
				}
			}
		}
	}
}