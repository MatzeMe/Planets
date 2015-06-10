TestCase("Group_Test", {   
	
	setUp: function() { }, 
	tearDown: function() { },  

		

"test Initialisierung / Gruen wenn Group korrekt initialisiert": function() {  
	
		var TestGroup = new Group(new Ship(new Player(1), 1));  
		
		assertArray("Array", TestGroup.ships);
		assertInstanceOf("Owner", Player, TestGroup.owner);
		assertNumber("Speed", TestGroup.speed);	
		assertInstanceOf("ships", Ship, TestGroup.ships[0]);
	},  
	
	
"test addShip / Gruen wenn Schiff hinzugefuegt werden kann": function() {  

		var TestGroup = new Group(new Ship(new Player(1), 1));	
		
	 	TestGroup.addShip(new Ship(new Player(1), 1)); 
	 	
	 	assertInstanceOf("Ship2", Ship, TestGroup.ships[1]);				   
	}, 

	
"test addShip / Gruen wenn mehrere Schiffe (Gruppen) hinzugefuegt werden können": function() {  

		 var AnzahlErstellen = 5		//+1 weil Gruppe stets mit 1 Schiff erstellt wird
	
		 var TestGroup = new Group(new Ship(new Player(1), 1));	 		 
		 var TestGroup2 = new Group(new Ship(new Player(1), 1));
		 
		 for(var i = 0; i < AnzahlErstellen; i++){
			 TestGroup2.addShip(new Ship(new Player(1), 1));
		 }
		 
		 TestGroup.addShip(TestGroup2.ships);
		 
		 for(var i = 0; i < TestGroup.ships.Length; i++){
		 assertInstanceOf("Ship", Ship, TestGroup.ships[i]);
		 }
	}, 	
	
	"test removeShip / Gruen wenn Anzahl an Schiffen entfernt werden kann": function() {  

		var AnzahlErstellen = 0;	//+1 weil Gruppe stets mit 1 Schiff erstellt wird
		var AnzahlEntfernen = 7;
		
		 var TestGroup = new Group(new Ship(new Player(1), 1));		
		 
		 for(var i = 0; i < AnzahlErstellen; i++){
			 TestGroup.addShip(new Ship(new Player(1), 1));
		 }
		 
		 TestGroup.removeShip(AnzahlEntfernen);		//Hintersten Schiffe entfernen
		 
		 for(var i = 0; i < AnzahlErstellen + 1 - AnzahlEntfernen; i++){
			 assertNotUndefined("Ship", TestGroup.ships[i]);
		 }
		 
		 for(var i =  AnzahlErstellen + 1 - AnzahlEntfernen; i < AnzahlErstellen + 1; i++){
			 assertUndefined("Ship", TestGroup.ships[i]);
		 }
		 
	}, 	
	
	"test removeShip / Gruen wenn Auslöschung der Gruppe erkannt": function() {  

		var AnzahlErstellen = 7;	//+1 weil Gruppe stets mit 1 Schiff erstellt wird
		var AnzahlEntfernen = 8;	//Muss für den Testfall mindestens AnzahlErstellen + 1 sein, dann ist Gruppe leer = zerstört
		
		 var TestGroup = new Group(new Ship(new Player(1), 1));		
		 
		 for(var i = 0; i < AnzahlErstellen; i++){
			 TestGroup.addShip(new Ship(new Player(1), 1));
		 }
		 
		 TestGroup.removeShip(AnzahlEntfernen);		//Hintersten Schiffe entfernen
		 
		 assertTrue(TestGroup.destroyed); 
		 
	}, 	
	
});
