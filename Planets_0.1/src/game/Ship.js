/*	Ship.js  
 * 
 * 	Author: rszabad(si3ben)
 * 	Date: SS15, 8.6.15
 * 	Course: Test-driven Development mit JavaScript
 * 
 * 	Hält je nach Schiffstyp andere Eigenschaften, die für weitere Berechnungen genutzt werden
 *
 */
 
function Ship(ownerA, typeA) { 
	
	this.owner = ownerA; 
	this.type = typeA;
	
	switch(this.type) {
    case 1:
    	this.speed = 30;
    	this.buildingTime = 10;
    	this.lifePoints = 10;
    	this.dealtDamage = 10;
        break;    
    case 2:
    	this.speed = 30;
    	this.buildingTime = 10;
    	this.lifePoints = 10;
    	this.dealtDamage = 10;
        break;  
    case 3:
    	this.speed = 30;
    	this.buildingTime = 10;
    	this.lifePoints = 10;
    	this.dealtDamage = 10;
    	break;
        
	}
};


