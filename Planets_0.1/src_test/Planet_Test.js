AsyncTestCase("Planet_Test", {   
	
	setUp: function() { }, 		
	tearDown: function() { },   

			
"test Initialisierung / Gruen wenn Planet korrekt initialisiert": function() {  

		var TestPlanet = new Planet(10, 200, 200); 
		
		assertNumber("Mass", TestPlanet.Mass);
		assertNumber("TravelRadius", TestPlanet.TravelRadius);
		assertNumber("x", TestPlanet.x);
		assertNumber("y", TestPlanet.y);
		assertBoolean("allAlone", TestPlanet.allAlone);
		
	},  	

"test setOwner / Gruen wenn setOwner funktioniert": function() {  

		var TestPlanet = new Planet(10, 200, 200);
		
		TestPlanet.setOwner(new Owner());
		
		assertInstanceOf("Owner", Owner, TestPlanet.Owner);
	
	}, 

"test addGroup / Gruen wenn 1 Gruppe zum Planeten hinzugefügt werden kann": function() {  

		var TestPlanet = new Planet(10, 200, 200);
		var TestGroupPlanet = new Group(new Ship(new Owner(), 1));
		
		TestPlanet.addGroup(TestGroupPlanet);
		
		assertInstanceOf("addGroup", Group, TestPlanet.presentGroups[0]);
		
	}, 	
	
"test addGroup / Gruen wenn mehrere Gruppen  zum Planeten hinzugefügt werden können": function() {  

		var TestPlanet = new Planet(10, 200, 200);
		
		var TestGroupPlanet1 = new Group(new Ship(new Owner(), 1));
		var TestGroupPlanet2 = new Group(new Ship(new Owner(), 2));
		var TestGroupPlanet3 = new Group(new Ship(new Owner(), 3));
		
		TestPlanet.addGroup(TestGroupPlanet1);
		TestPlanet.addGroup(TestGroupPlanet2);
		TestPlanet.addGroup(TestGroupPlanet3);
		
		assertInstanceOf("addGroup", Group, TestPlanet.presentGroups[0]);
		assertInstanceOf("addGroup", Group, TestPlanet.presentGroups[1]);
		assertInstanceOf("addGroup", Group, TestPlanet.presentGroups[2]);
		
	}, 	
	
"test removeGroup / Gruen wenn Gruppen von Planeten entfernt werden können": function() {  

		var TestPlanet = new Planet(10, 200, 200);
				
		var TestGroupPlanet1 = new Group(new Ship(new Owner(), 1));
		var TestGroupPlanet2 = new Group(new Ship(new Owner(), 2));
		var TestGroupPlanet3 = new Group(new Ship(new Owner(), 3));
		
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
		
		assertEquals("removeGroup", 2, TestPlanet.presentGroups[0].Type);		//Gruppe 2&3 aufgerückt
		assertEquals("removeGroup", 3, TestPlanet.presentGroups[1].Type);
	}, 


	
"test mergeGroups / Gruen wenn 2 Gruppen des selben Typs zusammengefasst werden und Schiffe 1 mal vorhanden sind": function() {  

		var TestPlanet = new Planet(10, 200, 200);		
	
		var TestGroupPlanet1 = new Group(new Ship(new Owner(), 1));
		var TestGroupPlanet2 = new Group(new Ship(new Owner(), 1));
		
		var TestGroupPlanet1 = TestPlanet.mergeGroups(TestGroupPlanet1, TestGroupPlanet2);	//Zusammenfassen beider Gruppen in Gruppe1
		
		assertInstanceOf("mergeGroups", Group, TestGroupPlanet1);
		assertInstanceOf("mergeGroups", Ship,  TestGroupPlanet1.Ships[0]);
		assertInstanceOf("mergeGroups", Ship,  TestGroupPlanet1.Ships[1]);
		
		assertNotInstanceOf("mergeGroups", Ship, TestGroupPlanet2.Ships[0]);
	}, 

"test checkGroups / Gruen wenn mehrere Gruppen gleichen Typs & Besitzers erkannt und zusammengefasst werden": function() {  

	var TestPlanet = new Planet(10, 200, 200);		
	
	var TestGroupPlanet1 = new Group(new Ship(new Owner(1), 1));	
	var TestGroupPlanet2 = new Group(new Ship(new Owner(1), 1));
	var TestGroupPlanet3 = new Group(new Ship(new Owner(1), 3));	//Wird nicht mit beiden oberen zusammengefasst
	
	var TestGroupPlanet4 = new Group(new Ship(new Owner(2), 1));
	var TestGroupPlanet5 = new Group(new Ship(new Owner(2), 2));	//Wird nicht mit umgebenden zusammengefasst
	var TestGroupPlanet6 = new Group(new Ship(new Owner(2), 1));
	
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
	
	assertEquals("checkGroups", 1, TestPlanet.presentGroups[0].Owner.ID); 
	assertEquals("checkGroups", 1, TestPlanet.presentGroups[0].Type); 
	
	assertEquals("checkGroups", 1, TestPlanet.presentGroups[1].Owner.ID);
	assertEquals("checkGroups", 3, TestPlanet.presentGroups[1].Type);
	
	assertEquals("checkGroups", 2, TestPlanet.presentGroups[2].Owner.ID);
	assertEquals("checkGroups", 1, TestPlanet.presentGroups[2].Type);
	
	assertEquals("checkGroups", 2, TestPlanet.presentGroups[3].Owner.ID);
	assertEquals("checkGroups", 2, TestPlanet.presentGroups[3].Type);
	},
	
	
});