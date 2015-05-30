function Route(startA, targetA, distanceA){ 
	
	this.Start = startA;
	this.Target = targetA;
	this.travelers = []; 
	this.distance = distanceA;				

	
	this.Update = function()
	{ 

		for(var i = 0; i<this.travelers.length; i++)
		{
			if(this.travelers[i].update() == true)
			{
				this.transferGroupToPlanet(this.travelers[i].presentGroup, this.target);
				this.endTravel(this.travelers[i]);
			}
		} 
		
	} 
	 
	
	this.startTravel = function(groupA)	// Erzeug das Travel-Objekt und  pusht die Traveler-Gruppe in das Array
	{  
		this.travelers.push(new Travel(groupA, this.distance)); 
	}
	
	this.transferGroupToPlanet = function(groupB)
	{
		this.Target.presentGroups.push(groupB);
	}
	
	this.endTravel = function(travelA)  // L�schen des Travel-Objektes aus dem traveler-Array.
	{
		this.travelers.splice(this.travelers.indexOf(travelA),1);
	}
		
	
}