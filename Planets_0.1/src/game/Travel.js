/*	Travel.js
 * 
 *  Author1: mmeusel(MatzeMe)
 * 	Author2: rszabad(si3ben)
 * 	Date: SS15, 8.6.15
 * 	Course: Test-driven Development mit JavaScript
 * 
 * 	Wird immer erstellt, wenn eine Gruppe eine Reise auf einer Route antritt. Berechnet die Reisezeit aus dem Schiffstyp und der Länge und die noch verbleibende Reisezeit-
 *
 */

/*
 * fehler funden, wenn ich mehre schiffstypen habe, diese als 1 gruppe versenden möchte werden sie Travelmäßig in jeweils eine eigene gruppe gepackt,
 * somit gibt es pro schiffstyp mindestens 1 Travel und jede gruppe kommt für sich selber an
 * ich bin mir nicht sicher, ich dachte es wäre so gedacht, das die schiffe einen flotten verband bilden und dan eben mit der geschwindigkeit
 * des langsamsten schiffes reisen,
 * 
 * 
 */



function Travel(groupA, distanceA)
{
	this.distance = distanceA;	//Länge der Route
	this.presentGroup = groupA;	//Gruppe auf Reise
	this.targetReached = false;
	this.travelTime = this.distance / this.presentGroup.speed * 1000;
	this.remainingTravelTime = this.travelTime;
	this.travelStarted = Date.now();  
		
	
	this.update = function(){//Gibt True zurück wenn Reisezeit abgelaufen
		
		this.remainingTravelTime = this.travelTime - (Date.now() - this.travelStarted);
		if(this.remainingTravelTime <= 0){
			this.remainingTravelTime = 0; 
			return true;
		}
		else{
			return false; 
		}
	}
		  
} 