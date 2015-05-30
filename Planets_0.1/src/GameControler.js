function GameControler(UniverseA, PlayersA){ 
	
	this.Universe = UniverseA;
	this.Players = PlayersA;
	this.GameOver = false;
	this.FrameRate = 30;
	var that = this;
	this.last = Date.now();
	
	
	this.Milkyways = [];
	
	for(var i = 0; i < this.Universe.length; i++){
		for(var o = 0; o < this.Universe.length; o++){
			if(i != o){
				
				var x = this.Universe[o].x - this.Universe[i].x;
				var y = this.Universe[o].y - this.Universe[i].y;
				
				var sum = Math.sqrt((x*x)+(y*y));

				if(sum <= this.Universe[i].TravelRadius){
					this.Milkyways.push(new Route(this.Universe[i],  this.Universe[o], sum)); 
					this.Milkyways[this.Milkyways.length-1].distance = sum;
				}				
			}
		}		
	}
		
	function killElement(element) {
		 if (element) {
		  var papa = element.parentNode;
		  if (papa) papa.removeChild(element);
		 }
		}

	this.Draw = function(){
	
		killElement(document.getElementById("DrawingArea")); 
		
		var drawingArea = document.createElement("div");
		drawingArea.setAttribute("id", "DrawingArea");
		drawingArea.style.width = "800px";
		drawingArea.style.height = "600px";
		drawingArea.style.backgroundColor = "black"; 
		
		var newContent = document.createTextNode(" "); 
		drawingArea.appendChild(newContent);    
		
for(var i = 0; i < this.Milkyways.length; i++){
			
		    var RouteID = "Planet" + i;
			var RouteSize = this.Milkyways[i].distance + "px";
			var RouteX = this.Milkyways[i].Start.x + "px";			
			var RouteY = this.Milkyways[i].Start.y + "px";
			var angle  = Math.atan2(this.Milkyways[i].Target.y - this.Milkyways[i].Start.y, this.Milkyways[i].Target.x - this.Milkyways[i].Start.x) * 180 / Math.PI;
			
			var drawRoute = document.createElement("div");
			drawRoute.setAttribute("id", RouteID);
			drawRoute.style.width = RouteSize;
			drawRoute.style.height = "16px";
			
			drawRoute.style.transformOrigin = "0 0";
			drawRoute.style.transform = "rotate(" + angle + "deg)"; te
			
			drawRoute.style.left = RouteX;
			drawRoute.style.top = RouteY; 
			
			drawRoute.style.position = "absolute";
			
			drawRoute.style.backgroundImage = "url('https://dl.dropboxusercontent.com/u/17359888/Arrows.png')";   
			drawRoute.style.backgroundPosition = "top left";
			drawRoute.style.backgroundRepeat = "repeat-x"; 
			
			drawRoute.style.backgroundColor = "#0066FF"; 
			var newContent = document.createTextNode(" "); 
			drawRoute.appendChild(newContent);   
			drawingArea.appendChild(drawRoute); 
			
		}
		
		for(var i = 0; i < this.Universe.length; i++){
			
			
			
			var PlanetID = "Planet" + i;
			var PlanetSize = this.Universe[i].Mass*3 + "px";
			
			var PlanetX = this.Universe[i].x - this.Universe[i].Mass*3 / 2;
			PlanetX += "px";
			var PlanetY = this.Universe[i].y - this.Universe[i].Mass*3 / 2;
			PlanetY += "px";
			 
			
			var drawPlanet = document.createElement("div");
			drawPlanet.setAttribute("id", PlanetID);
			drawPlanet.style.width = PlanetSize;
			drawPlanet.style.height = PlanetSize;
			
			 
			console.log("asd");
			console.log(drawPlanet.style.backgroundImage); 
			
			drawPlanet.style.left = PlanetX;
			drawPlanet.style.top = PlanetY; 
			
			drawPlanet.style.position = "absolute";  
			
			drawPlanet.style.backgroundColor = "#00FF99";    
			var newContent = document.createTextNode(" "); 
			drawPlanet.appendChild(newContent);   
			drawingArea.appendChild(drawPlanet);  
			
			
			
			var textPlanet = document.createElement("div");
			
			var textSize = "Masse: " + this.Universe[i].Mass;
			var textX = this.Universe[i].x - this.Universe[i].Mass*3 / 2;
			textX += "px";
			var textY = this.Universe[i].y - this.Universe[i].Mass*3 / 2 + this.Universe[i].Mass*3;
			textY += "px";
		
			textPlanet.style.left = textX;
			textPlanet.style.top = textY; 
			textPlanet.style.position = "absolute";
			textPlanet.style.color = "#ffffff";
			
			var numberGroups1 = 0;
			var numberShips1 = 0;
			
			for(var o = 0; o < this.Universe[i].presentGroups.length; o++){
				 if(this.Universe[i].presentGroups[o].Owner.ID == 1){
					 numberGroups1++;
					 numberShips1 += this.Universe[i].presentGroups[o].Ships.length; 
				 }
			}
			
			var numberGroups2 = 0;
			var numberShips2 = 0;
			
			for(var o = 0; o < this.Universe[i].presentGroups.length; o++){
				 if(this.Universe[i].presentGroups[o].Owner.ID == 2){
					 numberGroups2++;
					 numberShips2 += this.Universe[i].presentGroups[o].Ships.length; 
				 }
			}
			
			var planetText = document.createTextNode(PlanetID);
			textPlanet.appendChild(planetText);
			var br = document.createElement("br");
			textPlanet.appendChild(br);
			planetText = document.createTextNode(textSize);
			textPlanet.appendChild(planetText);
			var br = document.createElement("br");
			textPlanet.appendChild(br);
			planetText = document.createTextNode("Besitzer: " + this.Universe[i].Owner.ID);
			textPlanet.appendChild(planetText);
			var br = document.createElement("br");
			textPlanet.appendChild(br);
			planetText = document.createTextNode("Player 1: ");
			textPlanet.appendChild(planetText);
			var br = document.createElement("br");
			textPlanet.appendChild(br);
			planetText = document.createTextNode(numberGroups1 + " Gruppen");
			textPlanet.appendChild(planetText);
			var br = document.createElement("br"); 
			textPlanet.appendChild(br);
			planetText = document.createTextNode(numberShips1 + " Schiffe");
			textPlanet.appendChild(planetText);
			var br = document.createElement("br"); 
			textPlanet.appendChild(br);
			planetText = document.createTextNode("Player 2: ");
			textPlanet.appendChild(planetText);
			var br = document.createElement("br");
			textPlanet.appendChild(br);
			planetText = document.createTextNode(numberGroups2 + " Gruppen");
			textPlanet.appendChild(planetText);
			var br = document.createElement("br"); 
			textPlanet.appendChild(br);
			planetText = document.createTextNode(numberShips2 + " Schiffe");
			textPlanet.appendChild(planetText);
			var br = document.createElement("br"); 
			textPlanet.appendChild(br);
			if(this.Universe[i].Production == undefined){
				planetText = document.createTextNode("Produziert: ---");
				textPlanet.appendChild(planetText);
			}
			else{
				planetText = document.createTextNode("Produziert: " + this.Universe[i].TypeOfProduction);
				textPlanet.appendChild(planetText);	
			}
			var br = document.createElement("br"); 
			textPlanet.appendChild(br);
			
			if(this.Universe[i].Conquest == undefined){
			planetText = document.createTextNode("Wird erobert von: ---");
			textPlanet.appendChild(planetText);
			}
			else{
				planetText = document.createTextNode("Wird erobert von: " + this.Universe[i].TypeOfProduction);
				textPlanet.appendChild(planetText);
			}
			var br = document.createElement("br"); 
			textPlanet.appendChild(br); 
			if(this.Universe[i].Fight == undefined){
				planetText = document.createTextNode("Kampf: False");
				textPlanet.appendChild(planetText);
				}
				else{
					planetText = document.createTextNode("Kampf: True "); 
					textPlanet.appendChild(planetText);
				}
			
			drawingArea.appendChild(textPlanet);
		}
		
		
		
		document.body.appendChild(drawingArea);
			
	}
	
	
	Update = function(){  
		
		/*console.log("time waited for update");
		console.log(Date.now()-that.last);
		that.last = Date.now();*/
		
		for(var i = 0; i < that.Universe.length; i++ ){
			that.Universe[i].Update();	 		
		}
		
		that.GameOver = true;
		for(var i = 0; i < that.Universe.length -1; i++ ){
			if(that.Universe[i].Owner.ID != that.Universe[i+1].Owner.ID){
				that.GameOver = false;
			}			
		}
		
		for(var i = 0; i < that.Milkyways.length; i++ ){
			that.Milkyways[i].Update();
		}
		
		that.Draw();
		
		//if(that.GameOver == false){
			//console.log("GAMEOVER");
			//Tu Was, das Spiel ist aus, mach dem ganzen eine Ende, los, tue es!
			setTimeout(Update, 50); 
		//}
		
		
		 
		
	}
	
	Update();

	
}