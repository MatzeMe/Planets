/*	Route.js
 * 
 *  Author1: mmeusel(MatzeMe)
 * 	Author2: rszabad(si3ben)
 * 	Date: SS15, 8.6.15
 * 	Course: Test-driven Development mit JavaScript
 * 
 * 	Wird zu Beginn erstellt und stellt die einmalige, gerichtete Verbindung zwischen 2 Planeten dar. 
 *  Verwaltet eine Reihe von Travel-Objekten, die auf der Route reisende Gruppen darstellen.
 *
 */

function Route(startA, targetA, distanceA, idA){  
	
	this.start = startA;		//Start der Route
	this.target = targetA;		//Ziel der Route
	this.travelers = []; 		//Travel-Objekte
	this.distance = distanceA;	//Länge der Route
	this.routeID = idA;

	this.update = function()	//Route ruft alle ihre Travel-Objekte auf
	{ 

		for(var i = 0; i<this.travelers.length; i++)
		{
			if(this.travelers[i].update() == true)	//Wenn Reise abgelaufen
			{
				this.transferGroupToPlanet(this.travelers[i].presentGroup, this.target);	//entsprechende Gruppe zum Zielplaneten transferieren 	
				this.endTravel(this.travelers[i]);											//Travel-Objekt löschen
			}
		} 
		
	} 
	 
	
	this.startTravel = function(groupA)	// Wird aufgerufen, wenn eine Gruppe auf Route reisen soll. Erzeugt das Travel-Objekt und  pusht die Traveler-Gruppe in das Array
	{  
		this.travelers.push(new Travel(groupA, this.distance)); 
		somethingChanged("planet: " + this.start.ID +" --> start travel");
	}
	
	this.transferGroupToPlanet = function(groupB)	//Transferiert gewünschte Gruppe zum Zielplaneten
	{
		this.target.presentGroups.push(groupB);
		somethingChanged("route: " + this.routeID +" --> transfer group to planet");
	}
	
	this.endTravel = function(travelA)  // Löschen des Travel-Objektes aus dem traveler-Array.
	{
		this.travelers.splice(this.travelers.indexOf(travelA),1);
		somethingChanged("route: " + this.routeID +" --> end travel");
	}
		
	
}