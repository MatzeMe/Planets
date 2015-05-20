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

		 var TestGroup = new Group(new Ship(new Owner(), 1));	
		 
		 var TestGroup2 = new Group(new Ship(new Owner(), 1));
		 TestGroup2.addShip(new Ship(new Owner, 1));
		 TestGroup2.addShip(new Ship(new Owner, 1));
		 
		 TestGroup.addShip(TestGroup2.Ships);
		 
		 assertInstanceOf("Ship2", Ship, TestGroup.Ships[1]);
		 assertInstanceOf("Ship3", Ship, TestGroup.Ships[2]);
		 assertInstanceOf("Ship4", Ship, TestGroup.Ships[3]);				   
	}, 	
	
	"test removeShip / Gruen wenn Anzahl an Schiffen entfernt werden kann": function() {  

		 var TestGroup = new Group(new Ship(new Owner(), 1));		
		 TestGroup.addShip(new Ship(new Owner, 1));
		 TestGroup.addShip(new Ship(new Owner, 1));
		 TestGroup.addShip(new Ship(new Owner, 1));
		 TestGroup.addShip(new Ship(new Owner, 1));				//5 Schiffe im Array
		 
		 TestGroup.removeShip(2);								//2 Hintersten Schiffe entfernen
		 
		 assertNotUndefined("Ship1", TestGroup.Ships[0]);
		 assertNotUndefined("Ship1", TestGroup.Ships[1]);
		 assertNotUndefined("Ship1", TestGroup.Ships[2]);
		 assertUndefined("Ship1", TestGroup.Ships[3]);
		 assertUndefined("Ship1", TestGroup.Ships[4]);
				   
	}, 	
	
});
