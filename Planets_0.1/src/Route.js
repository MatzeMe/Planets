function Route(startA, targetA, distanceA){ 
	
	this.Start = startA;
	this.Target = targetA;
	this.travelers = []; 
	this.distance = distanceA;				//Aus Planetenkoordinaten berechnen, Formel siehe Gamecontroler.js
	this.remainingDistance = this.distance;
	this.travelStart = Date.now();
	
	this.Update = function(travelA)
	{ 
		//!!!! In jeder Route geht die eigene Update() ihre Travel-objekte durch und fragt deren Update ab
		this.travel = travelA; 

		for(var i = 0; i<this.travelers.length; i++)
		{
			if(updateTravel == true)
			{
				transferGroupToPlanet(travelers[i], target);
				endTravel(travelers[i]);
			}
		} 
		
	} 
	/*  
	
	this.startTravel = function(groupA)	// Erzeug das Travel-Objekt und  pusht die Traveler-Gruppe in das Array
	{  
		this.group = groupA;
		travelers.push(new Travel(group, target, distance)); 
	}
	
	this.transferGroupToPlanet = function(group, target) // Travelzeit ist um. Gruppe wird in Array des Zielplaneten geschrieben.
	{
		this.target.presentGroups.push(group);
		
	}
	
	
	
	this.endTravel = function(travel)  // L�schen des Travel-Objektes aus dem traveler-Array.
	{
		this.travelers.splice(this.travelers.indexof(travel.presentGroup),1);
	}
		
	

//	this.calculateDistance = function()  // Das macht der GameController
//	{
//		
//	}
	*/
}