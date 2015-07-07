/*	Planet_Test_Production.js
 * 
 * 	Author1: rszabad(si3ben)
 * 	Course: Test-driven Development mit JavaScript
 *
 */

AsyncTestCase("Planet_Test_Production", {   
	
	setUp: function() { 
		
		TestPlanet = new Planet(10, 200, 200);	
		TestPlanet.setOwner(new Player(1));
		
	}, 		
	tearDown: function() { },   
	
	
"test startProduction / Gruen, wenn keine Schiffe vorhanden, der Planet einen Besitzer hat und Produktion gestartet wird": function() {
		
		
		
		assertNotInstanceOf("startProduction", Production, TestPlanet.Production);		//Keine Produktion
		assertNotInstanceOf("startProduction", Group, TestPlanet.presentGroups[0]);		//Keine Schiffe
		
		TestPlanet.checkGroups();
 
		assertInstanceOf("startProduction", Production, TestPlanet.Production);			//Produktion
		
	},
	
"test startProduction / Gruen, wenn Schiffe vorhanden, der Planet einen Besitzer hat und Produktion gestartet wird": function() {
		
		
		
		var GroupA = new Group(new Ship(new Player(1), 1));
		TestPlanet.addGroup(GroupA);
		
		assertNotInstanceOf("startProduction", Production, TestPlanet.Production);		//Keine Produktion
		assertInstanceOf("startProduction", Group, TestPlanet.presentGroups[0]);		//Gruppe
		
		TestPlanet.checkGroups();
 
		assertInstanceOf("startProduction", Production, TestPlanet.Production);			//Produktion
		
	},
		
"test stopProduction / Gruen, wenn nur gegnerische Schiffe vorhanden und Produktion gestoppt wird": function() {
		
		
		
		assertNotInstanceOf("stopProduction", Production, TestPlanet.Production);		//Keine Produktion

		
		TestPlanet.checkGroups();
 
		assertInstanceOf("stopProduction", Production, TestPlanet.Production);			//Produktion gestartet
		
		var GroupA = new Group(new Ship(new Player(2), 2));								//Gegnerische Schiffe eintreffen
		TestPlanet.addGroup(GroupA);
		
		TestPlanet.checkGroups();
		
		assertNotInstanceOf("stopProduction", Production, TestPlanet.Production);		//Keine Produktion mehr
		
	},
	
"test stopProduction / Gruen, wenn Schiffe beider Spieler vorhanden und Produktion gestoppt wird": function() {
		
		
		
		var GroupB = new Group(new Ship(new Player(1), 1));								//Eigene Schiffe eintreffen
		TestPlanet.addGroup(GroupB);
		
		assertNotInstanceOf("stopProduction", Production, TestPlanet.Production);		//Keine Produktion
		assertInstanceOf("stopProduction", Group, TestPlanet.presentGroups[0]);			//Gruppe
		
		TestPlanet.checkGroups();
 
		assertInstanceOf("stopProduction", Production, TestPlanet.Production);			//Produktion gestartet
		
		var GroupA = new Group(new Ship(new Player(2), 2));								//Gegnerische Schiffe eintreffen
		TestPlanet.addGroup(GroupA);
		
		TestPlanet.checkGroups();
		
		assertNotInstanceOf("stopProduction", Production, TestPlanet.Production);		//Keine Produktion mehr
		
	},
	
	});