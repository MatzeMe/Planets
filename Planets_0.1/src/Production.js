function Production(MassA, TypeA){ 
	
	this.Type = TypeA;
	this.ProductionRunning = true;
	this.ProductionStarted = Date.now();

	switch(this.Type) {
    case 1: this.ProductionTime = 100000 / MassA;
    		break;
    case 2: this.ProductionTime = 200000 / MassA;
			break; 
    case 3: this.ProductionTime = 300000 / MassA;
			break;
	}

	this.RemainingProductionTime = this.ProductionTime;
	
	this.Update = function(){
		
		this.RemainingProductionTime = this.ProductionTime - (Date.now() - this.ProductionStarted);
		if(this.RemainingProductionTime <= 0){
			this.RemainingProductionTime = 0;
			return true;
		}
		else{
			return false;
		}
	}
	
}
//console.log(Date.now()); 