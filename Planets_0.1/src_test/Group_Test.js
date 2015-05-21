TestCase("Group_Test", {   
	
	setUp: function() { }, 
	tearDown: function() { },  

		

"test Initialisierung / Gruen wenn Group korrekt initialisiert": function() {  
	
		var TestGroup = new Group(new Ship(new Owner(), 1));  
		
		assertArray("Array", TestGroup.Ships);
		assertInstanceOf("Owner", Owner, TestGroup.Owner);
		assertNumber("Speed", TestGroup.Speed);	
		assertInstanceOf("ships", Ship, TestGroup.Ships[0]);
	},  
	
	
"test addShip / Gruen wenn Schiff hinzugefuegt werden kann": function() {  

		var TestGroup = new Group(new Ship(new Owner(), 1));	
		
	 	TestGroup.addShip(new Ship(new Owner, 1)); 
	 	
	 	assertInstanceOf("Ship2", Ship, TestGroup.Ships[1]);				   
	}, 

	
"test addShip / Gruen wenn mehrere Schiffe (Gruppen) hinzugefuegt werden können": function() {  

		 var AnzahlErstellen = 5		//+1 weil Gruppe stets mit 1 Schiff erstellt wird
	
		 var TestGroup = new Group(new Ship(new Owner(), 1));	 		 
		 var TestGroup2 = new Group(new Ship(new Owner(), 1));
		 
		 for(var i = 0; i < AnzahlErstellen; i++){
			 TestGroup2.addShip(new Ship(new Owner, 1));
		 }
		 
		 TestGroup.addShip(TestGroup2.Ships);
		 
		 for(var i = 0; i < TestGroup.Ships.Length; i++){
		 assertInstanceOf("Ship", Ship, TestGroup.Ships[i]);
		 }
	}, 	
	
	"test removeShip / Gruen wenn Anzahl an Schiffen entfernt werden kann": function() {  

		var AnzahlErstellen = 0;	//+1 weil Gruppe stets mit 1 Schiff erstellt wird
		var AnzahlEntfernen = 7;
		
		 var TestGroup = new Group(new Ship(new Owner(), 1));		
		 
		 for(var i = 0; i < AnzahlErstellen; i++){
			 TestGroup.addShip(new Ship(new Owner(), 1));
		 }
		 
		 TestGroup.removeShip(AnzahlEntfernen);		//Hintersten Schiffe entfernen
		 
		 for(var i = 0; i < AnzahlErstellen + 1 - AnzahlEntfernen; i++){
			 assertNotUndefined("Ship", TestGroup.Ships[i]);
		 }
		 
		 for(var i =  AnzahlErstellen + 1 - AnzahlEntfernen; i < AnzahlErstellen + 1; i++){
			 assertUndefined("Ship", TestGroup.Ships[i]);
		 }
		 
	}, 	
	
	"test removeShip / Gruen wenn Auslöschung der Gruppe erkannt": function() {  

		var AnzahlErstellen = 7;	//+1 weil Gruppe stets mit 1 Schiff erstellt wird
		var AnzahlEntfernen = 8;	//Muss für den Testfall mindestens AnzahlErstellen + 1 sein, dann ist Gruppe leer = zerstört
		
		 var TestGroup = new Group(new Ship(new Owner(), 1));		
		 
		 for(var i = 0; i < AnzahlErstellen; i++){
			 TestGroup.addShip(new Ship(new Owner(), 1));
		 }
		 
		 TestGroup.removeShip(AnzahlEntfernen);		//Hintersten Schiffe entfernen
		 
		 assertTrue(TestGroup.destroyed); 
		 
	}, 	
	
});
