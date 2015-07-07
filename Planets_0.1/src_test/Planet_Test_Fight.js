/*	Planet_Test_Fight.js
 * 
 * 	Author1: rszabad(si3ben)
 * 	Course: Test-driven Development mit JavaScript
 *
 */

AsyncTestCase("Planet_Test_Fight", {   
	
	setUp: function() { 
		
		this.orig = somethingChanged;
		somethingChanged = function(){};
		
		TestPlanet = new Planet(10, 200, 200);		
		
		TestGroupPlanet1 = new Group(new Ship(new Player(1), 1));
		TestGroupPlanet2 = new Group(new Ship(new Player(2), 1));	
		TestPlanet.addGroup(TestGroupPlanet1);		
		TestPlanet.addGroup(TestGroupPlanet2);
		
	}, 		
	tearDown: function() { 
		
		somethingChanged = this.orig;
		
	},      
	

	
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
		
		
		
		TestPlanet.checkGroups();		
		assertInstanceOf("startFight", Fight, TestPlanet.Fight);		//Kampf
		
		assertEquals("startFight", 1, TestPlanet.Fight.contestants[0].owner.ID);	//Die Beiden genauem Schiffe sind vorhanden
		assertEquals("startFight", 1, TestPlanet.Fight.contestants[0].type);		
		assertEquals("startFight", 2, TestPlanet.Fight.contestants[1].owner.ID);
		assertEquals("startFight", 1, TestPlanet.Fight.contestants[1].type);
		assertUndefined("startFight", TestPlanet.Fight.contestants[2]);				//Leer
		
		var TestGroupPlanet3 = new Group(new Ship(new Player(2), 3));	
		TestPlanet.addGroup(TestGroupPlanet3);	
		
		TestPlanet.checkGroups();	
		
		assertEquals("startFight", 1, TestPlanet.Fight.contestants[0].owner.ID);	//Die Drei genauen Schiffe sind vorhanden
		assertEquals("startFight", 1, TestPlanet.Fight.contestants[0].type);		
		assertEquals("startFight", 2, TestPlanet.Fight.contestants[1].owner.ID);
		assertEquals("startFight", 1, TestPlanet.Fight.contestants[1].type);
		assertEquals("startFight", 2, TestPlanet.Fight.contestants[2].owner.ID);
		assertEquals("startFight", 3, TestPlanet.Fight.contestants[2].type);
		assertUndefined("startFight", TestPlanet.Fight.contestants[3]);				//Leer
		
		
		
	},
	
"test stopFight / Gruen, wenn das Verlassen der letzten Gruppe eines der Spieler erkannt wird und der Kampf beendet wird": function() {
		
		
		
		TestPlanet.checkGroups();		
		assertInstanceOf("startFight", Fight, TestPlanet.Fight);
		
		TestPlanet.removeGroup(TestGroupPlanet2);
		
		TestPlanet.checkGroups();
		assertNotInstanceOf("startFight", Fight, TestPlanet.Fight);
	
	},
	
"test stopFight / Gruen, wenn das Verlassen der letzten Gruppe beider Spieler erkannt wird und der Kampf beendet wird": function() {
		
		
		TestPlanet.checkGroups();		
		assertInstanceOf("startFight", Fight, TestPlanet.Fight);
		
		TestPlanet.removeGroup(TestGroupPlanet1);
		TestPlanet.removeGroup(TestGroupPlanet2);
		
		TestPlanet.checkGroups();
		assertNotInstanceOf("startFight", Fight, TestPlanet.Fight);
	
	},
		
});