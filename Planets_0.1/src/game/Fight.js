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
		var totalDMG = schiffsgruppe.ships[0].dealtDamage * schiffsgruppe.ships.length * 2;
		//totalDMG verdoppel da erste feindzielgruppe doppelten dmg kriegt
		
		// läuft priorität durch wegen schussreinfolge
		for ( var i = 0; i < 3; i++) {
			// läuft alle schiffe durch
			for ( var j = 0; j < this.contestants.length; j++) {
				if(schiffsgruppe.owner.ID != this.contestants[j].owner.ID){//prüft ob die besitzer verschieden sind
					if(this.contestants[j].type == feuerreinfolge[i]){//prüft ob der schiffstyp dem aktuellen ziel entspricht
						if(this.contestants[j].ship[0].lifePoints * this.contestants[j].ship.length >= totalDMG) {}
							ausgeteilterDMG[j] += totalDMG;
					} else {
								ausgeteilterDMG[j] += this.contestants[j].ship[0].lifePoints * this.contestants[j].ship.length;
								totalDMG -= this.contestants[j].ship[0].lifePoints * this.contestants[j].ship.length;
						}
						break; //um unötige durchläufe zu unterbrechen und zum nächsten ziel zu wechseln						
					}
				}			
			}
			totalDMG /= 2;
		}
	}

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
					ausgeteilterDMG[j] += kampfgruppe.ships[0].dealtDamage
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
	}	
	
	this.update = function() {
		// lässt kampf 3 sec warten
		this.remainingFightTime = this.fightTime
				- (Date.now() - this.fightStarted);
		if (this.remainingFightTime <= 0) {

			// setzt die fight time wieder neu das es nach 3 sec wieder startet
			this.fightStarted = Date.now();

			// lässt alle schiffe feuern
			for ( var i = 0; i < this.contestants.length; i++) {
				this.LockOnTargetAndFire(this.contestants[i]);
			}

			// verteilt schaden und removed zerstörte schiffe
			for ( var i = 0; i < this.contestants.length; i++) {
				if (this.ausgeteilterDMG[i] != null)
					this.contestants[i].removeShip(this.ausgeteilterDMG[i]
							/ this.contestants[i].ships[0].lifePoints);
			}
		}
	}

}
