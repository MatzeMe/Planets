//Buttons für Travel
drawButtons = function(){
	
	
	
	//Überlagernde Buttonarea erzeugen
	killElement(document.getElementById("buttonArea")); 
	
	var buttonArea = document.createElement("div");
	buttonArea.setAttribute("id", "buttonArea");
	buttonArea.style.width = "1000px";
	buttonArea.style.height = "600px";
	buttonArea.style.backgroundColor = "black";  	
	var empty = document.createTextNode(" "); 
	buttonArea.appendChild(empty);    
	document.body.appendChild(buttonArea);
	that = this;
	
	for(var i = 0; i < Universe.length; i++){
	
		changeProduction = function(event){
			
			Universe[event.target.id].changeProduction();  
			console.log(event.target.id);	
		}
		
		setTravelFrom = function(event){
			
			TravelFrom = Universe[event.target.id];
			drawButtons();
		}
		
		setTravelTo = function(event){
			
			if(Universe[event.target.id] != TravelFrom){
				TravelTo = Universe[event.target.id];
				console.log(TravelTo);
				for(var y = 0; y < TravelFrom.routesFromHere.length; y++){
					if(TravelFrom.routesFromHere[y].Target == TravelTo){
					var tempTravel = TravelFrom.routesFromHere[y];
					console.log(tempTravel);
					}
				}
				for(var x = 0; x < TravelFrom.presentGroups.length; x++){
					if(TravelFrom.presentGroups[x].Owner.ID == isPlayedBy){ 
						TravelFrom.sendGroupOnTravel(TravelFrom.presentGroups[x], tempTravel);
					}
				}
			}
			
			TravelFrom = undefined;
			TravelTo = undefined;	
			drawButtons();
		}
		
	var btn = document.createElement("BUTTON");
	btn.setAttribute("id", i);
	if(TravelFrom == undefined){
		var t = document.createTextNode(Universe[i].planetID);        
		btn.appendChild(t);   
		btn.onclick=function(){ setTravelFrom(event); }; 
		buttonArea.appendChild(btn);
		
	}
	else{
		for(var f = 0; f < TravelFrom.routesFromHere.length; f++){ 
			if(TravelFrom.routesFromHere[f].Target == Universe[i]){
				var t = document.createTextNode(Universe[i].planetID);       
				btn.appendChild(t); 
				btn.onclick=function(){ setTravelTo(event); };
				
				buttonArea.appendChild(btn); 
			}
		}
		
		
	}
	btn.style.width = "20px";
	btn.style.height = "20px";
	var ButtonX = this.universe[i].x - this.universe[i].Mass*5 / 2 + this.universe[i].Mass*5 + 5;
	ButtonX += "px";
	btn.style.left = ButtonX;
	var ButtonY = this.universe[i].y - this.universe[i].Mass*5 / 2;
	ButtonY += "px";
	btn.style.top = ButtonY; 	
	btn.style.position = "absolute";
	
	
	var btn2 = document.createElement("BUTTON");
	btn2.setAttribute("id", i);
	
	btn2.onclick=function(){ changeProduction(event); };		
			
	btn2.style.width = "20px";
	btn2.style.height = "20px";
	var ButtonX = this.universe[i].x - this.universe[i].Mass*5 / 2 - 25;
	ButtonX += "px";
	btn2.style.left = ButtonX;
	var ButtonY = this.universe[i].y - this.universe[i].Mass*5 / 2;
	ButtonY += "px";
	btn2.style.top = ButtonY; 	
	btn2.style.position = "absolute";
	if(this.universe[i].Owner.ID == isPlayedBy){
	buttonArea.appendChild(btn2); 
	}	
	}

}

function killElement(element) {
		 if (element) {
		  var papa = element.parentNode;
		  if (papa) papa.removeChild(element); 
		 }
		}

shipsToText = function (tempPlanet) {
	 	
	var ret = [];
	var shi = [0,0,0,0,0,0]
	for(var i = 0; i < tempPlanet.presentGroups.length; i++)
	{
		
		if(tempPlanet.Owner.ID == 99){
		var ID0 = 1;
		}
		else{
			var ID0 = tempPlanet.Owner.ID;
		}
		
		if(ID0 == tempPlanet.presentGroups[i].Owner.ID){			
				if(tempPlanet.presentGroups[i].Type == 1){shi[0] = shi[0] + tempPlanet.presentGroups[i].Ships.length;}
				if(tempPlanet.presentGroups[i].Type == 2){shi[1] = shi[1] + tempPlanet.presentGroups[i].Ships.length;}
				if(tempPlanet.presentGroups[i].Type == 3){shi[2] = shi[2] + tempPlanet.presentGroups[i].Ships.length;}
		}
		else{
			if(tempPlanet.presentGroups[i].Type == 1){shi[3] = shi[3] + tempPlanet.presentGroups[i].Ships.length;}
			if(tempPlanet.presentGroups[i].Type == 2){shi[4] = shi[4] + tempPlanet.presentGroups[i].Ships.length;}
			if(tempPlanet.presentGroups[i].Type == 3){shi[5] = shi[5] + tempPlanet.presentGroups[i].Ships.length;}
		}
		
	}
	ret[0] = "" + shi[0] + " " + shi[1] + " " + shi[2];
	ret[1] = "" + shi[3] + " " + shi[4] + " " + shi[5];
	
	
	return ret;
	
	}

function DrawField(universeA, milkywaysA){  

	var that = this;
	this.milkyways = milkywaysA;
	this.universe = universeA;
	
	//Planeten, Routen, Textfelder einzeichnen
	this.drawPlanets = function(){	
		for(var i = 0; i < this.universe.length; i++){
			
			//Schiffe zählen & zu Text
			var tempShips = shipsToText(this.universe[i]);
				
			//Position & Größe
			var PlanetID = "Planet" + i;
			var PlanetSize = this.universe[i].Mass*5 + "px";	
			var PlanetX = this.universe[i].x - this.universe[i].Mass*5 / 2;
			PlanetX += "px";
			var PlanetY = this.universe[i].y - this.universe[i].Mass*5 / 2;
			PlanetY += "px";
			
			//Style-Angaben
			var drawPlanet = document.createElement("div");
			drawPlanet.setAttribute("id", PlanetID);
			drawPlanet.style.width = PlanetSize;
			drawPlanet.style.height = PlanetSize;					
			drawPlanet.style.left = PlanetX;
			drawPlanet.style.top = PlanetY; 	
			drawPlanet.style.position = "absolute";  	
			drawPlanet.style.backgroundColor = this.universe[i].Owner.color;    			
			
			//Wenn Planet keinen Besitzer hat
			if(this.universe[i].Owner.ID == 99){
				//Kein Besitzer, aber wird erobert
				if(this.universe[i].Conquest instanceof Conquest){
					//Einzeiliges Display Conquest
					var drawEnemies = document.createElement("div");	 	
					//drawEnemies.style.width = PlanetSize;
					drawEnemies.style.height = "15px";							
					drawEnemies.style.left = PlanetX;
					PlanetY = this.universe[i].y - this.universe[i].Mass*5 / 2 + 5 + this.universe[i].Mass*5;
					PlanetY += "px";
					drawEnemies.style.top = PlanetY; 				
					drawEnemies.style.position = "absolute";  
					drawEnemies.style.backgroundColor = this.universe[i].presentGroups[0].Owner.color;
								
					var newContent = document.createTextNode(tempShips[0] + " " + this.universe[i].Conquest.RemainingConquestTime); 
					drawEnemies.appendChild(newContent);
					drawingArea.appendChild(drawEnemies);  
									
				}	
				//Kein Besitzer, aber Kampf findet statt
				if(this.universe[i].Fight instanceof Fight){
					//Zweizeiliges Display Kampf
					var drawEnemies = document.createElement("div");	 	
					drawEnemies.style.width = PlanetSize;
					drawEnemies.style.height = "15px";							
					drawEnemies.style.left = PlanetX;
					PlanetY = this.universe[i].y - this.universe[i].Mass*5 / 2 + 5 + this.universe[i].Mass*5;
					PlanetY += "px";
					drawEnemies.style.top = PlanetY; 				
					drawEnemies.style.position = "absolute";  
					drawEnemies.style.backgroundColor = "red";
					
					var newContent = document.createTextNode(tempShips[0]);
					drawEnemies.appendChild(newContent);
					drawingArea.appendChild(drawEnemies);  
					
					var drawEnemies = document.createElement("div");	 	
					drawEnemies.style.width = PlanetSize;
					drawEnemies.style.height = "15px";							
					drawEnemies.style.left = PlanetX;
					PlanetY = this.universe[i].y - this.universe[i].Mass*5 / 2 + 5 + this.universe[i].Mass*5 + 15;
					PlanetY += "px";
					drawEnemies.style.top = PlanetY; 				
					drawEnemies.style.position = "absolute";  
					drawEnemies.style.backgroundColor = "blue";
					
					var newContent = document.createTextNode(tempShips[0]);
					drawEnemies.appendChild(newContent);
					drawingArea.appendChild(drawEnemies);  
				}	
			}
			else{//Wenn Planet Besitzer hat
				
				//Schiffe auf Planeten
				var newContent = document.createTextNode(tempShips[0]);
				drawPlanet.appendChild(newContent);
				var br = document.createElement("br"); 
				drawPlanet.appendChild(br);
				
				//Produktion auf Planeten
				if(this.universe[i].Production instanceof Production){
				var newContent = document.createTextNode(this.universe[i].TypeOfProduction + " " + this.universe[i].Production.RemainingProductionTime);
				drawPlanet.appendChild(newContent);
				}
				else{
					var newContent = document.createTextNode(this.universe[i].TypeOfProduction + " -----");
					drawPlanet.appendChild(newContent);
				}
				if(this.universe[i].Conquest instanceof Conquest){
					//Einzeiliger Anhang, wenn Planet Besitzer hat und Eroberung stattfindet
					var drawEnemies = document.createElement("div");	 	
					drawEnemies.style.height = "15px";							
					drawEnemies.style.left = PlanetX;
					PlanetY = this.universe[i].y - this.universe[i].Mass*5 / 2 + 5 + this.universe[i].Mass*5;
					PlanetY += "px";
					drawEnemies.style.top = PlanetY; 				
					drawEnemies.style.position = "absolute";  
					drawEnemies.style.backgroundColor = this.universe[i].presentGroups[0].Owner.color;
								
					var newContent = document.createTextNode(tempShips[1] + " " + this.universe[i].Conquest.RemainingConquestTime);
					drawEnemies.appendChild(newContent); 
					drawingArea.appendChild(drawEnemies);  
									
				}	
				
				if(this.universe[i].Fight instanceof Fight){
					//Einzeiliger Anhang, wenn Planet Besitzer hat und Kampf stattfindet
					var drawEnemies = document.createElement("div");	 	
					drawEnemies.style.width = PlanetSize;
					drawEnemies.style.height = "15px";							
					drawEnemies.style.left = PlanetX;
					PlanetY = this.universe[i].y - this.universe[i].Mass*5 / 2 + 5 + this.universe[i].Mass*5;
					PlanetY += "px";
					drawEnemies.style.top = PlanetY; 				
					drawEnemies.style.position = "absolute";  
					if(this.universe[i].Owner.color.valueOf() == "red".valueOf()){
						drawEnemies.style.backgroundColor = "blue";
					}
					else
						{
							drawEnemies.style.backgroundColor = "red";
						}
					
					var newContent = document.createTextNode(tempShips[1]);
					drawEnemies.appendChild(newContent);
					drawingArea.appendChild(drawEnemies);  				
				}			
			}
			drawingArea.appendChild(drawPlanet);  
		}
	}
	
	//Routen Einzeichnen
	this.drawMilkyWays = function(){
		
		for(var i = 0; i < milkyways.length; i++){
			
			var RouteID = "Route" + i;
			var RouteSize = milkyways[i].distance + "px"; 
			var RouteX = milkyways[i].Start.x + "px";			
			var RouteY = milkyways[i].Start.y + "px";
			var angle  = Math.atan2(milkyways[i].Target.y - milkyways[i].Start.y, milkyways[i].Target.x - milkyways[i].Start.x) * 180 / Math.PI;
			
			var drawRoute = document.createElement("div");
			drawRoute.setAttribute("id", RouteID);
			drawRoute.style.width = RouteSize;
			drawRoute.style.height = "16px";
			
			drawRoute.style.transformOrigin = "0 0";
			drawRoute.style.transform = "rotate(" + angle + "deg)";
			
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
	}
	
	
	
		
		//Zeichenfläche löschen
		killElement(document.getElementById("DrawingArea")); 
		
		//Zeichenfläche erzeugen
		var drawingArea = document.createElement("div");
		drawingArea.setAttribute("id", "DrawingArea");
		drawingArea.style.width = "1000px";
		drawingArea.style.height = "600px";
		drawingArea.style.backgroundColor = "black";  	
		var empty = document.createTextNode(" "); 
		drawingArea.appendChild(empty);   
		drawingArea.onselectstart=new Function ("return false");
		document.body.appendChild(drawingArea); 
		
		//Routen einzeichnen 
		this.drawMilkyWays();  
		
		this.drawPlanets();
					
		}

