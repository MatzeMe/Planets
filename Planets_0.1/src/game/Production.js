/*	Production.js
 * 
 * 	Author: rszabad(si3ben)
 * 	Date: SS15, 8.6.15
 * 	Course: Test-driven Development mit JavaScript
 * 
 * 	Erstellt die anfängliche Produktionszeit aus der Masse und dem produzierten Schiffstyp und berechnet die noch übrige. Meldet Ende der Produktion.
 *  Wird immer dann erstellt, wenn Produziert wird und bei deren Unterbrechung oder Vollendung gelöscht und dann neu erstellt (Planet).
 *
 */
    
function Production(massA, typeA){ 
	
	this.type = typeA;								//gewünschter Schiffstyp
	this.productionStarted = Date.now();

	switch(this.type) {								//Berechnung der Schiffstypspezifischen Produktionszeit
    case 1: this.productionTime = 100000 / massA;
    		break;
    case 2: this.productionTime = 100000 / massA;
			break; 
    case 3: this.productionTime = 100000 / massA; 
			break;
	}

	this.remainingProductionTime = this.productionTime; 
	
	this.update = function(){	//Produktionszeit abgelaufen == true als Rückgabe
		
		this.remainingProductionTime = this.productionTime - (Date.now() - this.productionStarted);
		if(this.remainingProductionTime <= 0){
			this.remainingProductionTime = 0; 
			return true;
		}
		else{
			return false; 
		}
	}
	
}