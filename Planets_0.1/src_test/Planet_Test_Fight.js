AsyncTestCase("Planet_Test_Fight", {   
	
	setUp: function() { }, 		
	tearDown: function() { },   
	
	/*
			/Fight erstellen, wenn eine partei dazukommt
			fight updaten, wenn eine partei dazubekommt
			fight updaten, wenn andere partei dazubekommt
			
						
			
			/fight beenden, wenn eine partei verlässt
			/fight beenden, wenn beide parteien verlassen
			
			
	
	*/
	
	"test startFight / Gruen, wenn erkannt wird, dass Gruppen verschiedener Besitzer da sind und Kampf gestartet wird": function() {
		
		var TestPlanet = new Planet(10, 200, 200);		
		
		var TestGroupPlanet1 = new Group(new Ship(new Player(1), 1));	
		TestPlanet.addGroup(TestGroupPlanet1);
		
		TestPlanet.checkGroups();
		assertNotInstanceOf("startFight", Fight, TestPlanet.Fight);		//Kein Kampf
		
		var TestGroupPlanet2 = new Group(new Ship(new Player(2), 1));	
		TestPlanet.addGroup(TestGroupPlanet2);
		
		TestPlanet.checkGroups();
 
		assertInstanceOf("startFight", Fight, TestPlanet.Fight);		//Kampf
		
	},
	
"test updateFight / Gruen, wenn das Eintreffen neuer Gruppen eines anderen Typs erkannt und updateFight ausgeführt wird": function() {
		
		var TestPlanet = new Planet(10, 200, 200);		
		
		var TestGroupPlanet1 = new Group(new Ship(new Player(1), 1));
		var TestGroupPlanet2 = new Group(new Ship(new Player(2), 1));	
		TestPlanet.addGroup(TestGroupPlanet1);		
		TestPlanet.addGroup(TestGroupPlanet2);
		
		TestPlanet.checkGroups();		
		assertInstanceOf("startFight", Fight, TestPlanet.Fight);		//Kampf
		
		assertEquals("startFight", 1, TestPlanet.Fight.Contestants[0].Owner.ID);	//Die Beiden genauem Schiffe sind vorhanden
		assertEquals("startFight", 1, TestPlanet.Fight.Contestants[0].Type);		
		assertEquals("startFight", 2, TestPlanet.Fight.Contestants[1].Owner.ID);
		assertEquals("startFight", 1, TestPlanet.Fight.Contestants[1].Type);
		assertUndefined("startFight", TestPlanet.Fight.Contestants[2]);				//Leer
		
		var TestGroupPlanet3 = new Group(new Ship(new Player(2), 3));	
		TestPlanet.addGroup(TestGroupPlanet3);	
		
		TestPlanet.checkGroups();	
		
		assertEquals("startFight", 1, TestPlanet.Fight.Contestants[0].Owner.ID);	//Die Drei genauen Schiffe sind vorhanden
		assertEquals("startFight", 1, TestPlanet.Fight.Contestants[0].Type);		
		assertEquals("startFight", 2, TestPlanet.Fight.Contestants[1].Owner.ID);
		assertEquals("startFight", 1, TestPlanet.Fight.Contestants[1].Type);
		assertEquals("startFight", 2, TestPlanet.Fight.Contestants[2].Owner.ID);
		assertEquals("startFight", 3, TestPlanet.Fight.Contestants[2].Type);
		assertUndefined("startFight", TestPlanet.Fight.Contestants[3]);				//Leer
		
		
		//Hier müsste noch geprüft werden, ob die sich daraufhin ändernden Parameter sich auch wirklich ändern. Dafür muss aber erst das eigentliche Kampfsystem stehen
		assertTrue(false);
		
	},
	
"test stopFight / Gruen, wenn das Verlassen der letzten Gruppe eines der Spieler erkannt wird und der Kampf beendet wird": function() {
		
		var TestPlanet = new Planet(10, 200, 200);		
		
		var TestGroupPlanet1 = new Group(new Ship(new Player(1), 1));
		var TestGroupPlanet2 = new Group(new Ship(new Player(2), 1));	
		TestPlanet.addGroup(TestGroupPlanet1);		
		TestPlanet.addGroup(TestGroupPlanet2);
		
		TestPlanet.checkGroups();		
		assertInstanceOf("startFight", Fight, TestPlanet.Fight);
		
		TestPlanet.removeGroup(TestGroupPlanet2);
		
		TestPlanet.checkGroups();
		assertNotInstanceOf("startFight", Fight, TestPlanet.Fight);
	
	},
	
"test stopFight / Gruen, wenn das Verlassen der letzten Gruppe beider Spieler erkannt wird und der Kampf beendet wird": function() {
		
		var TestPlanet = new Planet(10, 200, 200);		
		
		var TestGroupPlanet1 = new Group(new Ship(new Player(1), 1));
		var TestGroupPlanet2 = new Group(new Ship(new Player(2), 1));	
		TestPlanet.addGroup(TestGroupPlanet1);		
		TestPlanet.addGroup(TestGroupPlanet2);
		
		TestPlanet.checkGroups();		
		assertInstanceOf("startFight", Fight, TestPlanet.Fight);
		
		TestPlanet.removeGroup(TestGroupPlanet1);
		TestPlanet.removeGroup(TestGroupPlanet2);
		
		TestPlanet.checkGroups();
		assertNotInstanceOf("startFight", Fight, TestPlanet.Fight);
	
	},
	
});