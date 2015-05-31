function GameControler(UniverseA, PlayersA){ 
	
	TravelFrom = undefined;
	TravelTo = undefined;
	isPlayedBy = 1;
	Universe = UniverseA;
	Milkyways = [];
	
	this.Players = PlayersA;
	this.GameOver = false;
	this.FrameRate = 30;
	var that = this;
	this.last = Date.now();

	for(var i = 0; i < Universe.length; i++){
		for(var o = 0; o < Universe.length; o++){
			if(i != o){
				
				var x = Universe[o].x - Universe[i].x;
				var y = Universe[o].y - Universe[i].y;
				
				var sum = Math.sqrt((x*x)+(y*y));

				if(sum <= Universe[i].TravelRadius){
					Milkyways.push(new Route(Universe[i],  Universe[o], sum)); 
					Milkyways[Milkyways.length-1].distance = sum; 
					Universe[i].routesFromHere.push(Milkyways[Milkyways.length-1]);
				}				
			}
		}		
	}
		
	
	
	

	
	
	
	
	
	Update = function(){  
				
		for(var i = 0; i < Universe.length; i++ ){
			Universe[i].Update();	 		
		}
		
		that.GameOver = true;
		for(var i = 0; i < Universe.length -1; i++ ){ 
			if(Universe[i].Owner.ID != Universe[i+1].Owner.ID){
				that.GameOver = false;
			}			
		}
		
		for(var i = 0; i < Milkyways.length; i++ ){
			Milkyways[i].Update();
		}
		
		DrawField(Universe, Milkyways);
		
		//if(that.GameOver == false){ 
			//console.log("GAMEOVER");
			//Tu Was, das Spiel ist aus, mach dem ganzen eine Ende, los, tue es!
			setTimeout(Update, 1000);    
		//} 
		
	}
	
	Update();
	drawButtons();

	
}