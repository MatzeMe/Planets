function Production(MassA, TypeA){ 
	
	this.Type = TypeA;
	this.ProductionRunning = true;

	switch(this.Type) {
    case 1: this.RemainingProductionTime = 100000 / MassA;
    		break;
    case 2: this.RemainingProductionTime = 200000 / MassA;
			break; 
    case 3: this.RemainingProductionTime = 300000 / MassA;
			break;
	}

	this.Update = function(){
		
		return true;
	}
	
}
//console.log(Date.now()); 