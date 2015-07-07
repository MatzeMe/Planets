/*	Group_Test.js
 * 
 * 	Author1: rszabad(si3ben)
 * 	Course: Test-driven Development mit JavaScript
 *
 */

TestCase("Group_Test", {   
	
	setUp: function() { 
		
		TestGroup = new Group(new Ship(new Player(1), 1));  
		TestGroup2 = new Group(new Ship(new Player(1), 1));
	}, 
	tearDown: function() { },  
		

	"test Initialisierung / Gruen wenn Group korrekt initialisiert": function() {  
		
		
		
		assertArray("Array", TestGroup.ships);
		assertInstanceOf("Owner", Player, TestGroup.owner);
		assertNumber("Speed", TestGroup.speed);
		assertEquals("Type", 1 || 2 || 3, TestGroup.type);	
		assertInstanceOf("Ship", Ship, TestGroup.ships[0]);
		assertFalse("Destroyed", TestGroup.destroyed);  
		
	},  
	
"test Initialisierung / Gruen wenn Group ohne Schiff korrekt initialisiert = sofort destroyed": function() {  
		
		var TestGroup = new Group();  

		assertTrue("Destroyed", TestGroup.destroyed);
		
	},  
	
	
"test addShip / Gruen wenn Schiff hinzugefuegt werden kann": function() {  

			
		
	 	TestGroup.addShip(new Ship(new Player(1), 1)); 
	 	
	 	assertInstanceOf("Ship2", Ship, TestGroup.ships[1]);				   
	}, 

	
"test addShip / Gruen wenn mehrere Schiffe (Gruppen) hinzugefuegt werden können": function() {  

		 var AnzahlErstellen = 5		//+1 weil Gruppe stets mit 1 Schiff erstellt wird
	

		 for(var i = 0; i < AnzahlErstellen; i++){
			 TestGroup2.addShip(new Ship(new Player(1), 1));
		 }
		 
		 TestGroup.addShip(TestGroup2.ships);
		 
		 for(var i = 0; i < TestGroup.ships.Length; i++){
		 assertInstanceOf("Ship", Ship, TestGroup.ships[i]);
		 }
		 assertUndefined("Ship", TestGroup.ships[TestGroup.ships.Length]);	//Platz nach den angenommenen Schiffen ist leer
	}, 	
	
	"test removeShip / Gruen wenn kleine Anzahl an Schiffen entfernt werden kann": function() {  

		var AnzahlErstellen = 5;	//+1 weil Gruppe stets mit 1 Schiff erstellt wird
		var AnzahlEntfernen = 3;	//Am Ende in der Gruppe: 3
		
		
		 
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
	
	
	"test removeShip / Gruen wenn größere Anzahl an Schiffen entfernt werden kann": function() {  

		var AnzahlErstellen = 3;	//+1 weil Gruppe stets mit 1 Schiff erstellt wird
		var AnzahlEntfernen = 7;	//Am Ende in der Gruppe: 0
		
	
		 
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
	
	"test removeShip / Gruen wenn Nicht-Auslöschung der Gruppe erkannt (Grenzwert)": function() {  

		var AnzahlErstellen = 7;	//+1 weil Gruppe stets mit 1 Schiff erstellt wird
		var AnzahlEntfernen = 7;	//Muss für den Testfall mindestens AnzahlErstellen + 1 sein, dann ist Gruppe leer = zerstört
		
	
		 
		 for(var i = 0; i < AnzahlErstellen; i++){
			 TestGroup.addShip(new Ship(new Player(1), 1));
		 }
		 
		 TestGroup.removeShip(AnzahlEntfernen);		//Hintersten Schiffe entfernen
		 
		 assertFalse(TestGroup.destroyed); 
		 
	}, 	
	
	
	"test removeShip / Gruen wenn Auslöschung der Gruppe erkannt (Grenzwert)": function() {  

		var AnzahlErstellen = 7;	//+1 weil Gruppe stets mit 1 Schiff erstellt wird
		var AnzahlEntfernen = 8;	//Muss für den Testfall mindestens AnzahlErstellen + 1 sein, dann ist Gruppe leer = zerstört
		
	
		 
		 for(var i = 0; i < AnzahlErstellen; i++){
			 TestGroup.addShip(new Ship(new Player(1), 1));
		 }
		 
		 TestGroup.removeShip(AnzahlEntfernen);		//Hintersten Schiffe entfernen
		 
		 assertTrue(TestGroup.destroyed); 
		 
	}, 	
	
	"test removeShip / Gruen wenn Auslöschung der Gruppe erkannt": function() {  

		var AnzahlErstellen = 3;	//+1 weil Gruppe stets mit 1 Schiff erstellt wird
		var AnzahlEntfernen = 8;	//Muss für den Testfall mindestens AnzahlErstellen + 1 sein, dann ist Gruppe leer = zerstört
			
		 
		 for(var i = 0; i < AnzahlErstellen; i++){
			 TestGroup.addShip(new Ship(new Player(1), 1));
		 }
		 
		 TestGroup.removeShip(AnzahlEntfernen);		//Hinterste Schiffe entfernen
		 
		 assertTrue(TestGroup.destroyed); 
		 
	}, 	
	
});
