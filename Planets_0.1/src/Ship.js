function Ship(Owner, Type) {
	
	var Owner, Type, BuildingTime, LifePoints, DealtDamage;
	
	this.Owner = Owner;
	this.Type = Type;
	
	switch(Type) {
    case 1:
    	this.BuildingTime = 10;
    	this.LifePoints = 10;
    	this.DealtDamage = 10;
        break;    
    case 2:
    	this.BuildingTime = 20;
    	this.LifePoints = 20;
    	this.DealtDamage = 20;
        break;  
    case 3:
    	this.BuildingTime = 30;
    	this.LifePoints = 30;
    	this.DealtDamage = 30;
    	break;
   /* default:   
    	this.BuildingTime = 10;
		this.LifePoints = 10;
		this.DealtDamage = 10;
		this.Type = 1; */
        
	}
}


