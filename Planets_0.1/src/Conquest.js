function Conquest(MassA, ConquerorsA){ 
	
	this.Mass = MassA;
	this.Conquerors = ConquerorsA;
	this.ConquestStarted = Date.now();
	this.ConquestTime = 1000 * this.Mass; 
	this.RemainingConquestTime = this.ConquestTime;
	
	
	this.Update = function(){
		
		this.RemainingConquestTime = this.ConquestTime - (Date.now() - this.ConquestStarted);
		if(this.RemainingConquestTime <= 0){
			this.RemainingConquestTime = 0; 
			return true;
		}
		else{
			return false; 
		}
		
		
		
		
		

	}
	
}