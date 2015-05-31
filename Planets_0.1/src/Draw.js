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

function Draw(universeA, milkywaysA){  

	var that = this;
	
	this.milkyways = milkywaysA;
	this.universe = universeA;
	
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
			//var newContent = document.createTextNode(" ");	//sichtbar machen
			//drawPlanet.appendChild(newContent);  
			
			//Funktionalität
			if(this.universe[i].Owner.ID != 99){
				drawPlanet.addEventListener("dblclick", this.universe[i].changeProduction);
			}
			
			
			//drawPlanet.onclick=function(){Move(tempPlanet.valueOf())};
			drawPlanet.addEventListener("click", this.universe[i].Move);
			//drawPlanet.onclick=function(){Move(that.universe[i]); console.log(this.universe[i])};
			
			
			
			if(this.universe[i].Owner.ID == 99){ 
							
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
			else{
				
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
								
					var newContent = document.createTextNode(tempShips[1] + " " + this.universe[i].Conquest.RemainingConquestTime);
					drawEnemies.appendChild(newContent); 
					drawingArea.appendChild(drawEnemies);  
									
				}	
				
				if(this.universe[i].Fight instanceof Fight){
					//Einzeiliges Display Kampf
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
			
			
		}}
	
		
		//Zeichenfläche löschen
		killElement(document.getElementById("DrawingArea")); 
		
		//Zeichenfläche erzeugen
		var drawingArea = document.createElement("div");
		drawingArea.setAttribute("id", "DrawingArea");
		drawingArea.style.width = "1000px";
		drawingArea.style.height = "600px";
		drawingArea.style.backgroundColor = "black";  
		
		//drawingArea.addEventListener ("selectstart", "return false;");
		drawingArea.onselectstart=function(){return false;};
		//drawingArea.addEventListener("select", myScript);
		
		var empty = document.createTextNode(" "); 
		drawingArea.appendChild(empty);    
		document.body.appendChild(drawingArea);
		
		//Routen einzeichnen 
		this.drawMilkyWays();  
		
		this.drawPlanets();
					
		}
		