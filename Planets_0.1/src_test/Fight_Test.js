AsyncTestCase("Fight_Test", {   
	
	setUp: function() { //returned standart plani mit spieler 1 jeweils 1 schiff je typ
		var testPlanet = new Planet(10,200,200);
		
		var TestGroupPlanet1 = new Group(new Ship(new Player(1), 1));
		var TestGroupPlanet3 = new Group(new Ship(new Player(1), 2));
		var TestGroupPlanet2 = new Group(new Ship(new Player(1), 3));	
		TestPlanet.addGroup(TestGroupPlanet1);		
		TestPlanet.addGroup(TestGroupPlanet2);
		TestPlanet.addGroup(TestGroupPlanet3);
		
		return testPlanet
	}, 		
	tearDown: function() { },   

			
	"test Initialisierung / Gruen wenn Fight korrekt initialisiert": function() {  

		var Contestants = [new Group(new Ship(new Player(1),1)), new Group(new Ship(new Player(2),1))];
	
		var TestFight = new Fight(Contestants);
		
		assertInstanceOf("Contestants", Group, Contestants[0]);
		assertInstanceOf("Contestants", Group, Contestants[1]);
		assertUndefined("Contestants", Contestants[2]);
	
	},  	
	
	"test feuert typ1 zuerst auf type 2": function() {
		
		var TestPlanet = setUP();		
		
		var TestGroupPlanet1 = new Group(new Ship(new Player(2), 1));			
		TestPlanet.addGroup(TestGroupPlanet1);

		
		assertInstanceOf("startFight", 1, TestPlanet.Fight.contestants[1].type);
		
		TestPlanet.checkGroups();
		assertInstanceOf("startFight", 1, TestPlanet.Fight.contestants[1].type);
	
	},
	
	"test feuert typ2 zuerst auf type 3": function() {
		
		var TestPlanet = setUP();		
		
		var TestGroupPlanet1 = new Group(new Ship(new Player(2), 2));			
		TestPlanet.addGroup(TestGroupPlanet1);

				
		assertInstanceOf("startFight", 1, TestPlanet.Fight.contestants[2].type);
		
		TestPlanet.checkGroups();
		assertInstanceOf("startFight", 1, TestPlanet.Fight.contestants[2].type);
	
	},
	
	"test feuert typ3 zuerst auf type 1": function() {
		
		var TestPlanet = setUP();		
		
		var TestGroupPlanet1 = new Group(new Ship(new Player(2), 3));			
		TestPlanet.addGroup(TestGroupPlanet1);

				
		assertInstanceOf("startFight", 1, TestPlanet.Fight.contestants[0].type);
		
		TestPlanet.checkGroups();
		assertInstanceOf("startFight", 1, TestPlanet.Fight.contestants[0].type);
	
	},
	
	"test wird bei mehr feuerkraft als 1 typ verbraucht auf andere tpyen umgeschaltet": function() {
		
		var TestPlanet = setUP();		
		
		var TestGroupPlanet1 = new Group(new Ship(new Player(2), 3),new Ship(new Player(2), 3));			
		TestPlanet.addGroup(TestGroupPlanet1);

				
		assertInstanceOf("startFight", 1, TestPlanet.Fight.contestants[3].type);
		
		TestPlanet.checkGroups();
		assertInstanceOf("startFight", 1, TestPlanet.Fight.contestants[3].type);
	
	},
	
	"test (nachträglich) wir feuerprio erstellt " : function(){
		
		assert(setSchussreinfolge(1));
	},
	
	"test (nachträglich) feuerprio für typ 1 " : function(){
		var testfolge = setSchussreinfolge(1);
		assertEquals(2,testfolge[0]);
		assertEquals(1,testfolge[1]);
		assertEquals(3,testfolge[2]);
	},
	
	"test (nachträglich) feuerprio für typ 2 " : function(){
		var testfolge = setSchussreinfolge(2);
		assertEquals(3,testfolge[0]);
		assertEquals(2,testfolge[1]);
		assertEquals(1,testfolge[2]);
	},
	
	"test (nachträglich) feuerprio für typ 3 " : function(){
		var testfolge = setSchussreinfolge(3);
		assertEquals(1,testfolge[0]);
		assertEquals(3,testfolge[1]);
		assertEquals(2,testfolge[2]);
	},
	
	
});