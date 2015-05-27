function GameControler(UniverseA, PlayersA){ 
	
	this.Universe = UniverseA;
	this.Players = PlayersA;
	this.GameOver = false;
	this.FrameRate = 30;

	this Milkyways = [];
	
	for(var i = 0; i < this.Universe.length; i++){
		for(var o = 0; o < this.Universe.length; o++){
			if(i != o){
				
				var x = this.Universe[o].x - this.Universe[i].x;
				var y = this.Universe[o].y - this.Universe[i].y;
				
				var sum = sqrt((x*x)+(y*y));
				
				if(sum >= this.Universe[i].TravelRadius){
					this.Milkyways.push(new Route(this.Universe[i],  this.Universe[o]));
				}				
			}
		}		
	}
}