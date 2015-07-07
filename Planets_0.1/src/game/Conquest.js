/*	Conquest.js
 * 
 * 	Author: rszabad(si3ben)
 * 	Date: SS15, 8.6.15
 * 	Course: Test-driven Development mit JavaScript
 * 
 * 	Erstellt die anfängliche Eroberungszeit aus der Masse und berechnet die noch übrige. Meldet Ende der Eroberung.
 *  Wird immer dann erstellt, wenn eine Eroberung stattfindet und bei deren Unterbrechung gelöscht (Planet).
 *  (Ursprünglich war angedacht, die Eroberungszeit mit steigender Anzahl der Schiffe zu verkürzen)
 */
      
function Conquest(massA, conquerorsA){ 
	 
	this.mass = massA;
	this.conquerors = conquerorsA;
	this.conquestStarted = Date.now();
	this.conquestTime = 1000 * this.mass; 
	this.remainingConquestTime = this.conquestTime;
	
	this.update = function(){
		
		this.remainingConquestTime = this.conquestTime - (Date.now() - this.conquestStarted);	//Eroberungszeit abgelaufen == true als Rückgabe
		if(this.remainingConquestTime <= 0){
			this.remainingConquestTime = 0; 
			return true;
		}
		else{
			return false; 
		}
	}
	
}