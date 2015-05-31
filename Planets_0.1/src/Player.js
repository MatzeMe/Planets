function Player (IDA){
	
	this.ID = IDA;
	this.color;
	switch(this.ID) {
    case 1: this.color = "red"; break;
    case 2: this.color = "blue"; break;
    case 99: this.color = "white"; break;
	} 
	 
} ;   