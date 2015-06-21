AsyncTestCase("Fight_Test", {   
	
	setUp: function() { }, 		
	tearDown: function() { },   

			
"test Initialisierung / Gruen wenn Fight korrekt initialisiert": function() {  

		var Contestants = [new Group(new Ship(new Player(1),1)), new Group(new Ship(new Player(2),1))];
	
		var TestFight = new Fight(Contestants);
		
		assertInstanceOf("Contestants", Group, Contestants[0]);
		assertInstanceOf("Contestants", Group, Contestants[1]);
		assertUndefined("Contestants", Contestants[2]);
	
	},  	
	
	"test feuert typ1 zuerst auf type 2": function() {
		
		var TestPlanet = new Planet(10, 200, 200);		
		
		var TestGroupPlanet1 = new Group(new Ship(new Player(1), 1));
		var TestGroupPlanet3 = new Group(new Ship(new Player(1), 2));
		var TestGroupPlanet2 = new Group(new Ship(new Player(2), 1));	
		TestPlanet.addGroup(TestGroupPlanet1);		
		TestPlanet.addGroup(TestGroupPlanet2);
		TestPlanet.addGroup(TestGroupPlanet3);
		
		TestPlanet.checkGroups();		
		assertInstanceOf("startFight", 1, TestPlanet.Fight.contestants.presentGroups[1].type);
		
		TestPlanet.checkGroups();
		assertNotInstanceOf("startFight", 1, TestPlanet.Fight.contestants.presentGroups[1].type);
	
	},
	
	
});