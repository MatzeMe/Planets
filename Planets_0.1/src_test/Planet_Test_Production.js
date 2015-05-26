AsyncTestCase("Planet_Test_Production", {   
	
	setUp: function() { }, 		
	tearDown: function() { },   
	
	/*
	 *		/Produktion starten, wenn keine Schiffe & Owner != undefined
	 		/Produktion starten, wenn eigene Schiffe & Owner != undefined
	 		
	 		/Produktion stoppen, wenn nur Gegner anwesend
			/Produktion stoppen, wenn eigene Schiffe & Gegner anwesend
 			
			
	
	*/
	
"test startProduction / Gruen, wenn keine Schiffe vorhanden, der Planet einen Besitzer hat und Produktion gestartet wird": function() {
		
		var TestPlanet = new Planet(10, 200, 200);	
		TestPlanet.setOwner(new Owner(1));
		
		assertNotInstanceOf("startProduction", Production, TestPlanet.Production);		//Keine Produktion
		assertNotInstanceOf("startProduction", Group, TestPlanet.presentGroups[0]);		//Keine Schiffe
		
		TestPlanet.checkGroups();
 
		assertInstanceOf("startProduction", Production, TestPlanet.Production);			//Produktion
		
	},
	
"test startProduction / Gruen, wenn Schiffe vorhanden, der Planet einen Besitzer hat und Produktion gestartet wird": function() {
		
		var TestPlanet = new Planet(10, 200, 200);		
		TestPlanet.setOwner(new Owner(1));
		
		var GroupA = new Group(new Ship(new Owner(1), 1));
		TestPlanet.addGroup(GroupA);
		
		assertNotInstanceOf("startProduction", Production, TestPlanet.Production);		//Keine Produktion
		assertInstanceOf("startProduction", Group, TestPlanet.presentGroups[0]);		//Gruppe
		
		TestPlanet.checkGroups();
 
		assertInstanceOf("startProduction", Production, TestPlanet.Production);			//Produktion
		
	},
		
"test stopProduction / Gruen, wenn nur gegnerische Schiffe vorhanden und Produktion gestoppt wird": function() {
		
		var TestPlanet = new Planet(10, 200, 200);		
		TestPlanet.setOwner(new Owner(1));
		
		assertNotInstanceOf("stopProduction", Production, TestPlanet.Production);		//Keine Produktion

		
		TestPlanet.checkGroups();
 
		assertInstanceOf("stopProduction", Production, TestPlanet.Production);			//Produktion gestartet
		
		var GroupA = new Group(new Ship(new Owner(2), 2));								//Gegnerische Schiffe eintreffen
		TestPlanet.addGroup(GroupA);
		
		TestPlanet.checkGroups();
		
		assertNotInstanceOf("stopProduction", Production, TestPlanet.Production);		//Keine Produktion mehr
		
	},
	
"test stopProduction / Gruen, wenn Schiffe beider Spieler vorhanden und Produktion gestoppt wird": function() {
		
		var TestPlanet = new Planet(10, 200, 200);		
		TestPlanet.setOwner(new Owner(1));
		
		var GroupB = new Group(new Ship(new Owner(1), 1));								//Eigene Schiffe eintreffen
		TestPlanet.addGroup(GroupB);
		
		assertNotInstanceOf("stopProduction", Production, TestPlanet.Production);		//Keine Produktion
		assertInstanceOf("stopProduction", Group, TestPlanet.presentGroups[0]);			//Gruppe
		
		TestPlanet.checkGroups();
 
		assertInstanceOf("stopProduction", Production, TestPlanet.Production);			//Produktion gestartet
		
		var GroupA = new Group(new Ship(new Owner(2), 2));								//Gegnerische Schiffe eintreffen
		TestPlanet.addGroup(GroupA);
		
		TestPlanet.checkGroups();
		
		assertNotInstanceOf("stopProduction", Production, TestPlanet.Production);		//Keine Produktion mehr
		
	},
	
	});