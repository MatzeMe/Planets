/*	Planet.js
 * 
 * 	Author: Patrik Schedel
 * 	Course: Test-driven Development mit JavaScript
 * 
 * 	verwaltet die kämpfe auf Planeten, es wird der Planet als input übergeben (zur code redundanz vermeidung, zugriff auf bereits bestehnde funktionen)
 *  kämpfe finden alle 3 sec statt. der kampf ist eine endlos schleife solange feindschiffe vorhanden sind.
 *  vor dem kampf müssen schiffsgruppen zusammengefasst werden,
 *  es muss von jedme schiff zuerst auf den favorisierten schiffstyp, dan auf den eigenen schiffstyp und dan auf den schlechten schiffstyp geschossen werden,
 *  der schaden an den schiffen muss gespeichert werden und erst nach dem alle schiffe gefeuert haben ausgeteilt werden
 *  es müssen schadensübergriffe von einem typ zum anderen berücksichtigt werden.
 *  
 *
 */

function Fight(contestantsA){ 
	
	this.contestants = contestantsA;
	
	// variable zum speichern des DMG
	this.ausgeteilterDMG = [];
	
	// variablen für die wartezeit
	this.fightStarted = Date.now();
	this.fightTime = 3000;
	this.remainingFightTime = this.fightTime;
		
	this.start = function {
		// lässt kampf 3 sec warten
		this.remainingFightTime = this.fightTime - (Date.now() - this.fightStarted);
		if(this.remainingFightTime <= 0){
			
		// setz gruppen zusammen so das es keine doppelten gibt
		this.contestants.checkGroups();
		
		//lässt alle schiffe feuern
		for(var i = 0; i < this.contestants.presentGroups.lenght;i++) {
			if(this.ausgeteilterDMG[i] != null)
				this.contestants.presentGroups[i].removeShip(this.ausgeteilterDMG[i]/this.contestants.presentGroups[i].ships.lifePoints);		
		}
		
		//verteilt schaden und removed zerstörte schiffe
		for(var i = 0; i < this.contestants.presentGroups.lenght;i++) {
			this.LockOnTargetAndFire(this.contestants.presentGroups[i]);				
		}
		
		
		// ruft den kampf wieder auf wenn noch feindschiffe vorhanden
		this.contestants.checkGroups();
		if(!this.contestants.allAlone)
			this.start();
		}
	}
	
	// zielschiff suchen unter berückstigung der priorität und auf diese gruppe feuern,
	// schaden in DMG array eintragen
	this.LockOnTargetAndFire = function(schiff) {
		var feuerreinfolge = []; //prioritäten reinfolge
		switch(schiff.type){ 
		//aufschlüsselung der prioritäten
		case 1:
			feuerreinfolge[0] = 2;
			feuerreinfolge[1] = 1;
			feuerreinfolge[2] = 3;
			break;
		case 2:
			feuerreinfolge[0] = 3;
			feuerreinfolge[1] = 2;
			feuerreinfolge[2] = 1;
			break;
		case 3:
			feuerreinfolge[0] = 1;
			feuerreinfolge[1] = 3;
			feuerreinfolge[2] = 2;
			break;
		}
		//läuft priorität durch wegen schussreinfolge
		for(var i = 0;i < 3;i++){
			//läuft alle schiffe durch
			for(var j = 0; j < this.contestants.presentGroups.lenght;j++) {
				//wenn schiffe von anderem besitzter und typ gleich der feuerpriorität
				if(schiff.owner != this.contestants.presentGroups[j].owner && this.contestants.presentGroups[j].type == feuerreinfolge[i]){
					ausgeteilterDMG[j] += schiff.ships.dealtDamage * schiff.ships.length + function {
						//setzt zusätzlichen schadne durch prioriät
						if(i == 0) return 2;
						if(i == 1) return 1;
						if(i == 2) return 0.5;
					}
					break;
				}
			}
		}
	}
	
}

