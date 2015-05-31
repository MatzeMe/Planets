function GameControler(UniverseA, PlayersA){ 
	
	TravelFrom = undefined;
	TravelTo = undefined;
	
	this.Universe = UniverseA;
	this.Players = PlayersA;
	this.GameOver = false;
	this.FrameRate = 30;
	var that = this;
	this.last = Date.now();
	
	
	Milkyways = [];
	
	for(var i = 0; i < this.Universe.length; i++){
		for(var o = 0; o < this.Universe.length; o++){
			if(i != o){
				
				var x = this.Universe[o].x - this.Universe[i].x;
				var y = this.Universe[o].y - this.Universe[i].y;
				
				var sum = Math.sqrt((x*x)+(y*y));

				if(sum <= this.Universe[i].TravelRadius){
					Milkyways.push(new Route(this.Universe[i],  this.Universe[o], sum)); 
					Milkyways[Milkyways.length-1].distance = sum;
				}				
			}
		}		
	}
		
	
	
	

	
	
	
	
	
	Update = function(){  
				
		for(var i = 0; i < that.Universe.length; i++ ){
			that.Universe[i].Update();	 		
		}
		
		that.GameOver = true;
		for(var i = 0; i < that.Universe.length -1; i++ ){ 
			if(that.Universe[i].Owner.ID != that.Universe[i+1].Owner.ID){
				that.GameOver = false;
			}			
		}
		
		for(var i = 0; i < Milkyways.length; i++ ){
			Milkyways[i].Update();
		}
		
		Draw(that.Universe, Milkyways);
		
		//if(that.GameOver == false){ 
			//console.log("GAMEOVER");
			//Tu Was, das Spiel ist aus, mach dem ganzen eine Ende, los, tue es!
			setTimeout(Update, 500);  
		//} 
		
	}
	
	Update();

	
}