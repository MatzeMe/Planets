function Travel(groupA, targetA, distanceA)
{
	this.distance = distanceA;	//Zahl
	this.presentGroup = groupA;	//Group-Objekt
	this.target = targetA;	//Planet-Objekt
	this.targetReached = false;	//bool
	this.travelTime;			//float/millis 
	this.remainingTravelTime;
	this.travelStart = Date.now(); 
		
	
	this.calculateTravelTime = function() //Berechnet aus Entfernung und Geschwindigkeit der Gruppe die Reisezeit
	{
		this.travelTime = (distance / presentGroup.speed);
	}
	
	
	this.updateTravel = function() // �berpr�ft, ob die Reisezeit abgelaufen ist. Wenn ja -> true. Sonst false.
	{
		this.remainingTravelTime = this.travelTime - (Date.now() - this.travelStart);
		if(this.remainingTravelTime <= 0)
			{
				this.remainingTravelTime = 0;
				return true;
			} 
		else
			return false; 
	}
		  
} 