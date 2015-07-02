somethingChanged = function(){};

AsyncTestCase("Planet_Test", {   
	
	setUp: function() { 
		
		this.orig = somethingChanged;
		somethingChanged = function(){};
		
		TestPlanet = new Planet(10, 200, 200, 0);
		
	}, 		
	tearDown: function() { 
		
		somethingChanged = this.orig;
		
	},   
			
	
	
"test Initialisierung / Gruen wenn Planet korrekt initialisiert": function() {  

	
		
		assertNumber("Mass", TestPlanet.mass);
		assertNumber("TravelRadius", TestPlanet.travelRadius);
		assertNumber("x", TestPlanet.x);
		assertNumber("y", TestPlanet.y);
		assertInstanceOf("Owner", Player, TestPlanet.owner);
		assertArray("PresentGroups", TestPlanet.presentGroups);
		assertUndefined("Conquest", TestPlanet.Conquest);
		assertUndefined("Fight", TestPlanet.Fight);
		assertUndefined("Production", TestPlanet.Production);
		assertBoolean("allAlone", TestPlanet.allAlone);
		assertNumber("TypeOfProduction", TestPlanet.typeOfProduction);
		assertNumber("PlanetID", TestPlanet.planetID);
		assertArray("RoutesFromHere", TestPlanet.routesFromHere); 
		
	},  	

"test setOwner / Gruen wenn setOwner funktioniert": function() {  

		
		
		assertEquals("Owner", 99, TestPlanet.owner.ID);	//Vorher default Owner
		
		TestPlanet.setOwner(new Player(1));
		
		assertEquals("Owner", 1, TestPlanet.owner.ID);		//Hinterher
	
	}, 

"test addGroup / Gruen wenn 1 Gruppe zum Planeten hinzugefügt werden kann": function() {  

		
		var TestGroupPlanet = new Group(new Ship(new Player(1), 1));
		 
		assertUndefined("addGroup", TestPlanet.presentGroups[0]);
		assertUndefined("addGroup", TestPlanet.presentGroups[1]);
		
		TestPlanet.addGroup(TestGroupPlanet);
		
		assertInstanceOf("addGroup", Group, TestPlanet.presentGroups[0]);
		assertUndefined("addGroup", TestPlanet.presentGroups[1]);
		
	}, 	
	
"test addGroup / Gruen wenn mehrere Gruppen  zum Planeten hinzugefügt werden können": function() {  

		
		
		var TestGroupPlanet1 = new Group(new Ship(new Player(1), 1));
		var TestGroupPlanet2 = new Group(new Ship(new Player(1), 2));
		var TestGroupPlanet3 = new Group(new Ship(new Player(1), 3));
		
		assertUndefined("addGroup", TestPlanet.presentGroups[0]);
		assertUndefined("addGroup", TestPlanet.presentGroups[1]);
		assertUndefined("addGroup", TestPlanet.presentGroups[2]);
		assertUndefined("addGroup", TestPlanet.presentGroups[3]);
		
		TestPlanet.addGroup(TestGroupPlanet1);
		TestPlanet.addGroup(TestGroupPlanet2);
		TestPlanet.addGroup(TestGroupPlanet3);
		
		assertInstanceOf("addGroup", Group, TestPlanet.presentGroups[0]);
		assertInstanceOf("addGroup", Group, TestPlanet.presentGroups[1]);
		assertInstanceOf("addGroup", Group, TestPlanet.presentGroups[2]);
		assertUndefined("addGroup", TestPlanet.presentGroups[3]);

		
	}, 	
	
"test removeGroup / Gruen wenn Gruppen von Planeten entfernt werden können und leere Felder geschlossen werden": function() {  

		
				
		var TestGroupPlanet1 = new Group(new Ship(new Player(1), 1));
		var TestGroupPlanet2 = new Group(new Ship(new Player(1), 2));
		var TestGroupPlanet3 = new Group(new Ship(new Player(1), 3));
		
		assertUndefined("addGroup", TestPlanet.presentGroups[0]);
		assertUndefined("addGroup", TestPlanet.presentGroups[1]);
		assertUndefined("addGroup", TestPlanet.presentGroups[2]);
		assertUndefined("addGroup", TestPlanet.presentGroups[3]);
		
		TestPlanet.addGroup(TestGroupPlanet1);
		TestPlanet.addGroup(TestGroupPlanet2);
		TestPlanet.addGroup(TestGroupPlanet3);
		
		assertInstanceOf("removeGroup", Group, TestPlanet.presentGroups[0]);
		assertInstanceOf("removeGroup", Group, TestPlanet.presentGroups[1]);
		assertInstanceOf("removeGroup", Group, TestPlanet.presentGroups[2]);
		
		TestPlanet.removeGroup(TestGroupPlanet1);								//Gruppe1 an [0] wird gelöscht, Funktion schließt Lücke
		
		assertInstanceOf("removeGroup", Group, TestPlanet.presentGroups[0]);
		assertInstanceOf("removeGroup", Group, TestPlanet.presentGroups[1]);
		assertNotInstanceOf("removeGroup", Group, TestPlanet.presentGroups[2]);	//[2] leer
		
		assertEquals("removeGroup", 2, TestPlanet.presentGroups[0].type);		//Gruppe 2&3 aufgerückt
		assertEquals("removeGroup", 3, TestPlanet.presentGroups[1].type);
	}, 


	
"test mergeGroups / Gruen wenn 2 Gruppen des selben Typs zusammengefasst werden und Schiffe 1 mal vorhanden sind": function() {  

			
	
		var TestGroupPlanet1 = new Group(new Ship(new Player(1), 1));
		var TestGroupPlanet2 = new Group(new Ship(new Player(1), 1));
		
		var TestGroupPlanet1 = TestPlanet.mergeGroups(TestGroupPlanet1, TestGroupPlanet2);	//Zusammenfassen beider Gruppen in Gruppe1
		
		assertInstanceOf("mergeGroups", Group, TestGroupPlanet1);
		assertInstanceOf("mergeGroups", Ship,  TestGroupPlanet1.ships[0]);
		assertInstanceOf("mergeGroups", Ship,  TestGroupPlanet1.ships[1]);
		
		assertNotInstanceOf("mergeGroups", Ship, TestGroupPlanet2.ships[0]);
	}, 

"test checkGroups / Gruen wenn mehrere Gruppen gleichen Typs & Besitzers erkannt und zusammengefasst werden": function() {  

	
	
	var TestGroupPlanet1 = new Group(new Ship(new Player(1), 1));	
	var TestGroupPlanet2 = new Group(new Ship(new Player(1), 1));
	var TestGroupPlanet3 = new Group(new Ship(new Player(1), 3));	//Wird nicht mit beiden oberen zusammengefasst
	
	var TestGroupPlanet4 = new Group(new Ship(new Player(2), 1));
	var TestGroupPlanet5 = new Group(new Ship(new Player(2), 2));	//Wird nicht mit umgebenden zusammengefasst
	var TestGroupPlanet6 = new Group(new Ship(new Player(2), 1));
	
	TestPlanet.addGroup(TestGroupPlanet1);
	TestPlanet.addGroup(TestGroupPlanet2);
	TestPlanet.addGroup(TestGroupPlanet3); 
	TestPlanet.addGroup(TestGroupPlanet4); 
	TestPlanet.addGroup(TestGroupPlanet5);  
	TestPlanet.addGroup(TestGroupPlanet6);  
	 
	for(var i = 0; i < 6; i++){	//6 Gruppen vorhanden
		assertInstanceOf("checkGroups", Group, TestPlanet.presentGroups[i]);	
	}
	 
	TestPlanet.checkGroups(); 
	for(var i = 0; i < 4; i++){	//Noch 4 Gruppen vorhanden
		assertInstanceOf("checkGroups", Group, TestPlanet.presentGroups[i]);
	}
	assertNotInstanceOf("checkGroups", Group, TestPlanet.presentGroups[4]);
	
	assertEquals("checkGroups", 1, TestPlanet.presentGroups[0].owner.ID); 
	assertEquals("checkGroups", 1, TestPlanet.presentGroups[0].type); 
	
	assertEquals("checkGroups", 1, TestPlanet.presentGroups[1].owner.ID);
	assertEquals("checkGroups", 3, TestPlanet.presentGroups[1].type);
	
	assertEquals("checkGroups", 2, TestPlanet.presentGroups[2].owner.ID);
	assertEquals("checkGroups", 1, TestPlanet.presentGroups[2].type);
	
	assertEquals("checkGroups", 2, TestPlanet.presentGroups[3].owner.ID);
	assertEquals("checkGroups", 2, TestPlanet.presentGroups[3].type);
	},
	
	
	"test splitGroup / Gruen wenn Gruppe nach gegebener Schiffzahl korrekt in 2Gruppen aufgeteilt wird": function() {  
		
		
		
		var ProtoGroup = new Group(new Ship(new Player(1), 1));	//Gruppe erstellen

		for (var i = 0; i < 9; i++){
			ProtoGroup.addShip(new Ship(new Player(1), 1));		//Gruppe auf 10 Mitglieder vergrößern
		}
		
		var TestGroup1 = JSON.parse(JSON.stringify(ProtoGroup));
		var TestGroup2 = JSON.parse(JSON.stringify(ProtoGroup));
		var TestGroup3 = JSON.parse(JSON.stringify(ProtoGroup));
		
		assertEquals(1 ,ProtoGroup.owner.ID);
		for (var i = 0; i < 10; i++){
			assertNotUndefined(TestGroup3.ships[i]);
			assertEquals(1 ,TestGroup3.ships[i].owner.ID);
			assertEquals(1 ,TestGroup3.ships[i].type); 
		}
		assertUndefined(TestGroup3.ships[i+1]);  
		
		TestPlanet.addGroup(TestGroup1);
		var SplittedGroup = TestPlanet.splitGroup(TestGroup1, 5);		//In der Mitte aufteilen 5/5 
		assertEquals("SplitGroups", 5, SplittedGroup.ships.length);
		assertEquals("SplitGroups", 5, TestGroup1.ships.length);
		TestPlanet.removeGroup(TestGroup1);
		
		TestPlanet.addGroup(TestGroup2);
		var SplittedGroup = TestPlanet.splitGroup(TestGroup2, 1);		// 1/9
		assertEquals("SplitGroups", 1, SplittedGroup.ships.length);
		assertEquals("SplitGroups", 9, TestGroup2.ships.length);
		TestPlanet.removeGroup(TestGroup2);
		
		TestPlanet.addGroup(TestGroup3);
		var SplittedGroup = TestPlanet.splitGroup(TestGroup3, 10);		// 10/0
		assertEquals("SplitGroups", 10, SplittedGroup.ships.length);
		assertEquals("SplitGroups", 0, TestGroup3.ships.length);
		TestPlanet.removeGroup(TestGroup3);
		
	},
	
	
"test splitGroup / Gruen wenn Gruppe nach gegebener Schiffzahl korrekt in 2Gruppen aufgeteilt wird": function() {  
		
		
		
		var ProtoGroup = new Group(new Ship(new Player(1), 1));	//Gruppe erstellen

		for (var i = 0; i < 9; i++){
			ProtoGroup.addShip(new Ship(new Player(1), 1));		//Gruppe auf 10 Mitglieder vergrößern
		}
		
		var TestGroup1 = JSON.parse(JSON.stringify(ProtoGroup));
		var TestGroup2 = JSON.parse(JSON.stringify(ProtoGroup));
		var TestGroup3 = JSON.parse(JSON.stringify(ProtoGroup));
		var TestGroup4 = JSON.parse(JSON.stringify(ProtoGroup));
		
		assertEquals(1 ,ProtoGroup.owner.ID);
		for (var i = 0; i < 10; i++){
			assertNotUndefined(TestGroup3.ships[i]);
			assertEquals(1 ,TestGroup3.ships[i].owner.ID);
			assertEquals(1 ,TestGroup3.ships[i].type); 
		}
		assertUndefined(TestGroup3.ships[i+1]);  
		
		
		var TestStart = new Planet(10, 200, 200);
		var TestTarget = new Planet(10, 200, 300);
		var distance = 100;
		var ID = 5;
			
		var TestRoute = new Route(TestStart, TestTarget, distance, ID);
		
		TestPlanet.addGroup(TestGroup1);
		TestPlanet.addGroup(TestGroup2);
		TestPlanet.addGroup(TestGroup3);
		TestPlanet.addGroup(TestGroup4);
		
		assertEquals("send Group on travel", 10, TestGroup1.ships.length);
		TestPlanet.sendGroupOnTravel(TestGroup1, TestRoute, 5);		//10 Schiffe in Gruppe / 5 Gehen auf Reise		
		assertEquals("send Group on travel", 5, TestGroup1.ships.length);
		assertEquals("send Group on travel", 5, TestRoute.travelers[0].presentGroup.ships.length);
		
		assertEquals("send Group on travel", 10, TestGroup2.ships.length);
		TestPlanet.sendGroupOnTravel(TestGroup2, TestRoute, 0);		//10 Schiffe in Gruppe / 0 Gehen auf Reise		
		assertEquals("send Group on travel", 10, TestGroup2.ships.length);
		assertUndefined("send Group on travel", TestRoute.travelers[1]);
		
		assertEquals("send Group on travel", 10, TestGroup3.ships.length);
		TestPlanet.sendGroupOnTravel(TestGroup3, TestRoute, 10);		//10 Schiffe in Gruppe / 0 Gehen auf Reise		
		assertEquals("send Group on travel", 10, TestGroup3.ships.length);
		assertEquals("send Group on travel", 10, TestRoute.travelers[1].presentGroup.ships.length);
		//assertUndefined("send Group on travel", TestRoute.travelers[1]);
		
		assertEquals("send Group on travel", 10, TestGroup4.ships.length);
		TestPlanet.sendGroupOnTravel(TestGroup4, TestRoute, 11);		//10 Schiffe in Gruppe / 0 Gehen auf Reise		
		assertEquals("send Group on travel", 10, TestGroup4.ships.length);
		assertEquals("send Group on travel", 10, TestRoute.travelers[2].presentGroup.ships.length);  
				
	},
	
	
"test splitGroup / Gruen wenn Schiffe / Gruppe nach Aufteilung noch ihre Eigenschaften behalten haben": function() {  
		
		
		
		var ProtoGroup = new Group(new Ship(new Player(1), 1));	//Gruppe erstellen

		for (var i = 0; i < 9; i++){
			ProtoGroup.addShip(new Ship(new Player(1), 1));		//Gruppe auf 10 Mitglieder vergrößern
		}
		
		assertInstanceOf(Player, ProtoGroup.owner);
		assertEquals(1 ,ProtoGroup.owner.ID);
		for (var i = 0; i < 10; i++){
			assertNotUndefined(ProtoGroup.ships[i]);
			assertEquals(1 ,ProtoGroup.ships[i].owner.ID);
			assertEquals(1 ,ProtoGroup.ships[i].type); 
		}
		assertUndefined(ProtoGroup.ships[i+1]);  
		
		
		var TestStart = new Planet(10, 200, 200);
		var TestTarget = new Planet(10, 200, 300);
		var distance = 100;
		var ID = 5;
			
		var TestRoute = new Route(TestStart, TestTarget, distance, ID);
		
		TestPlanet.addGroup(ProtoGroup);
		
		TestPlanet.sendGroupOnTravel(ProtoGroup, TestRoute, 5);		//10 Schiffe in Gruppe / 5 Gehen auf Reise
		
		assertInstanceOf(Player, ProtoGroup.owner);
		assertEquals(1 ,ProtoGroup.owner.ID);
		for (var i = 0; i < 5; i++){
			assertNotUndefined(ProtoGroup.ships[i]);
			assertEquals(1 ,ProtoGroup.ships[i].owner.ID);
			assertEquals(1 ,ProtoGroup.ships[i].type); 
		}
		assertUndefined(ProtoGroup.ships[i+1]); 
		
		assertInstanceOf(Player, TestRoute.travelers[0].presentGroup.owner);
		assertEquals(1 ,TestRoute.travelers[0].presentGroup.owner.ID);
		for (var i = 0; i < 5; i++){
			assertInstanceOf(Ship, TestRoute.travelers[0].presentGroup.ships[i]);
			assertEquals(1 ,TestRoute.travelers[0].presentGroup.ships[i].owner.ID);
			assertEquals(1 ,TestRoute.travelers[0].presentGroup.ships[i].type); 
		}
		assertUndefined(TestRoute.travelers[0].presentGroup.ships[i+1]); 
		

				
	},

	
});