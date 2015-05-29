function Travel(groupA, distanceA)
{
	this.distance = distanceA;	//Zahl
	this.presentGroup = groupA;	//Group-Objekt
	this.targetReached = false;	//bool
	this.travelTime = this.distance / this.presentGroup.Speed * 1000;			//float/millis 
	this.remainingTravelTime = this.travelTime;
	this.travelStarted = Date.now();  
		
	
	this.update = function(){
		
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