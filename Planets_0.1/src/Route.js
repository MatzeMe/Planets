function Route(startA, targetA, groupA){ 
	
	this.start = startA;
	this.target = targetA;
	this.travelers = []; 
	this.distance = GameControler.sum;				//Aus Planetenkoordinaten berechnen, Formel siehe Gamecontroler.js
	this.remainingDistance = distance;
	this.travelStart = Date.now();
	
	this.updateTravel = function(travelA)
	{ 
		//!!!! In jeder Route geht die eigene Update() ihre Travel-objekte durch und fragt deren Update ab
		this.travel = travelA; 

		for(int i = 0; i<travelers.length; i++)
		{
			if(updateTravel == true)
			{
				transferGroupToPlanet(travelers[i], target);
				endTravel(travelers[i]);
			}
		} 
		
	} 
	  
	
	this.startTravel = function(groupA)	// Erzeug das Travel-Objekt und  pusht die Traveler-Gruppe in das Array
	{  
		this.group = groupA;
		travelers.push(new Travel(group, target, distance)); 
	}
	
	this.transferGroupToPlanet = function(group, target) // Travelzeit ist um. Gruppe wird in Array des Zielplaneten geschrieben.
	{
		this.target.presentGroups.push(group);
		
	}
	
	
	
	this.endTravel = function(travel)  // Löschen des Travel-Objektes aus dem traveler-Array.
	{
		this.travelers.splice(this.travelers.indexof(travel.presentGroup),1);
	}
		
	

//	this.calculateDistance = function()  // Das macht der GameController
//	{
//		
//	}
	
}