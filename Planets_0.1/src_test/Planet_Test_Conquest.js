AsyncTestCase("Planet_Test_Conquest", {   
	
	setUp: function() { }, 		
	tearDown: function() { },   
	
	
	"test checkGroups / Gruen, wenn erkannt wird, dass Gruppen nur eines Besitzers da sind und Eroberung gestartet wird": function() {  

		var TestPlanet = new Planet(10, 200, 200);		
		
		var TestGroupPlanet1 = new Group(new Ship(new Player(1), 1));	
		var TestGroupPlanet2 = new Group(new Ship(new Player(1), 1)); 
		var TestGroupPlanet3 = new Group(new Ship(new Player(1), 3));	
			
		TestPlanet.addGroup(TestGroupPlanet1);
		TestPlanet.addGroup(TestGroupPlanet2);
		TestPlanet.addGroup(TestGroupPlanet3);
		
		for(var i = 0; i < 3; i++){	//3 Gruppen vorhanden
			assertInstanceOf("checkGroups", Group, TestPlanet.presentGroups[i]);	   
		}
		
		assertNotInstanceOf("checkGroups", Conquest, TestPlanet.Conquest);	//Eroberung noch nicht gestartet
		
		TestPlanet.checkGroups();
		 
		assertInstanceOf("checkGroups", Conquest, TestPlanet.Conquest);		//Eroberung gestartet
				
	},
	
	
	"test checkGroups / Gruen, wenn gestartete Eroberung nach Ankunft von Feinden abgebrochen wird": function() {  

		var TestPlanet = new Planet(10, 200, 200);		
		
		var TestGroupPlanet1 = new Group(new Ship(new Player(1), 1));
		var TestGroupPlanet2 = new Group(new Ship(new Player(2), 1));
			
		TestPlanet.addGroup(TestGroupPlanet1);
		assertInstanceOf("checkGroups1", Group, TestPlanet.presentGroups[0]);	
		

		assertNotInstanceOf("checkGroups2", Conquest, TestPlanet.Conquest);		//Eroberung noch nicht gestartet	
		TestPlanet.checkGroups();		
		assertInstanceOf("checkGroups3", Conquest, TestPlanet.Conquest);		//Eroberung gestartet
		
		TestPlanet.addGroup(TestGroupPlanet2);
		assertInstanceOf("checkGroups4", Group, TestPlanet.presentGroups[1]);
		

		assertInstanceOf("checkGroups5", Conquest, TestPlanet.Conquest);		//Eroberung läuft noch	

		TestPlanet.checkGroups();
		assertNotInstanceOf("checkGroups6", Conquest, TestPlanet.Conquest);		//Eroberung abgebrochen    
				
	},
	
"test checkGroups / Gruen, wenn gestartete Eroberung nach Abzug aller Schiffe abgebrochen wird": function() {   

		var TestPlanet = new Planet(10, 200, 200);		
		
		var TestGroupPlanet1 = new Group(new Ship(new Player(1), 1));
			
		TestPlanet.addGroup(TestGroupPlanet1);
		assertInstanceOf("checkGroups1", Group, TestPlanet.presentGroups[0]);	
		

		assertNotInstanceOf("checkGroups2", Conquest, TestPlanet.Conquest);		//Eroberung noch nicht gestartet	
		TestPlanet.checkGroups();		
		assertInstanceOf("checkGroups3", Conquest, TestPlanet.Conquest);		//Eroberung gestartet
		
		TestPlanet.removeGroup(TestGroupPlanet1);
		assertNotInstanceOf("checkGroups4", Group, TestPlanet.presentGroups[0]);
		

		assertInstanceOf("checkGroups5", Conquest, TestPlanet.Conquest);		//Eroberung läuft noch	
		TestPlanet.checkGroups();
		assertNotInstanceOf("checkGroups6", Conquest, TestPlanet.Conquest);		//Eroberung abgebrochen    
				
	},
	
"test checkGroups / Gruen, wenn erkannt wird, dass Gruppen nur eines Besitzers da sind und Eroberung nicht gestartet wird, weil der Planet schon im Besitz ist": function() {  

		var TestPlanet = new Planet(10, 200, 200);		
		TestPlanet.setOwner(new Player(1));
		
		
		var TestGroupPlanet1 = new Group(new Ship(new Player(1), 1));	
		var TestGroupPlanet2 = new Group(new Ship(new Player(1), 1));
		var TestGroupPlanet3 = new Group(new Ship(new Player(1), 3));	
			
		TestPlanet.addGroup(TestGroupPlanet1);
		TestPlanet.addGroup(TestGroupPlanet2);
		TestPlanet.addGroup(TestGroupPlanet3);
		
		for(var i = 0; i < 3; i++){	//3 Gruppen vorhanden
			assertInstanceOf("checkGroups", Group, TestPlanet.presentGroups[i]);	
		}
		
		assertNotInstanceOf("checkGroups", Conquest, TestPlanet.Conquest);	//Eroberung noch nicht gestartet
		
		TestPlanet.checkGroups();
		
		assertNotInstanceOf("checkGroups", Conquest, TestPlanet.Conquest);		//Eroberung gestartet
				
	},

	
"test checkGroups / Gruen, wenn gestartete Eroberung nach Abzug aller Schiffe abgebrochen wird": function() {   

		var TestPlanet = new Planet(10, 200, 200);	
		TestPlanet.setOwner(new Player(1));
		
		var TestGroupPlanet1 = new Group(new Ship(new Player(2), 1));
			
		TestPlanet.addGroup(TestGroupPlanet1);
		assertInstanceOf("checkGroups1", Group, TestPlanet.presentGroups[0]);	
		

		assertNotInstanceOf("checkGroups2", Conquest, TestPlanet.Conquest);		//Eroberung noch nicht gestartet	
		TestPlanet.checkGroups();		 
		assertInstanceOf("checkGroups3", Conquest, TestPlanet.Conquest);		//Eroberung gestartet
		
		TestPlanet.removeGroup(TestGroupPlanet1);
		assertNotInstanceOf("checkGroups4", Group, TestPlanet.presentGroups[0]);
		

		assertInstanceOf("checkGroups5", Conquest, TestPlanet.Conquest);		//Eroberung läuft noch	
		TestPlanet.checkGroups();
		assertNotInstanceOf("checkGroups6", Conquest, TestPlanet.Conquest);		//Eroberung abgebrochen    
				
	},
	
});