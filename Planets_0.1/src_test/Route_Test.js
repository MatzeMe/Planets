AsyncTestCase("Planet_Test_Conquest", {   
	
	setUp: function() { }, 		
	tearDown: function() { },   
	
	
	/*
	 * this.Start = startA;
	this.Target = targetA;
	this.travelers = []; 
	this.distance = distanceA;
	 * 
	 * 	Planeten in start und target
	 * 	travelers ist array
	 * 	distance  == number
	 * 
	 *  starttravel
	 *  travel-objekt vorhanden
	 *  
	 *  transfergroupToPlanet
	 *  gruppe auf planet vorhanden
	 *  
	 *  endtravel
	 *  reise-objekt aus travellers verschwunden
	 * 
	 */
	
	"test Initialisierung / Gruen, wenn Route korrekt Initialisiert": function() {  

		var TestPlanet1 = new Planet(10, 200, 200);
		var TestPlanet2 = new Planet(10, 200, 300);
		var distance = 100;
			
		var TestRoute = new Route(TestPlanet1, TestPlanet2, distance);
		
		assertInstanceOf("Planet1",Planet,TestRoute.Start);
		assertInstanceOf("Planet2",Planet,TestRoute.Target); 
				 
		assertArray("travelers[]", TestRoute.travelers);
		
		assertNumber("distance", TestRoute.distance);
		
	},
	
	
	"test startTravel / Gruen, wenn Travel-Objekt nach Ausführung vorhanden": function() {  

		var TestStart = new Planet(10, 200, 200);
		var TestTarget = new Planet(10, 200, 300);
		var distance = 100;
		
		var TestGroup = new Group(new Ship(new Player(1), 1));	
			
		var TestRoute = new Route(TestStart, TestTarget, distance);
		
		assertUndefined("Travelers", TestRoute.travelers[0]);
		
		TestRoute.startTravel(TestGroup);
		
		assertInstanceOf("Travelers", Travel, TestRoute.travelers[0]);
		
	},
	
	
"test transferGroupToPlanet / Gruen, wenn wenn Gruppe per Funktion auf Target-Planeten geschoben": function() {  

		var TestStart = new Planet(10, 200, 200);
		var TestTarget = new Planet(10, 200, 300);
		var distance = 100;
		
		var TestGroup = new Group(new Ship(new Player(1), 1));	
			
		var TestRoute = new Route(TestStart, TestTarget, distance);
		
		assertUndefined("Group", TestTarget.presentGroups[0]);
				
		TestRoute.transferGroupToPlanet(TestGroup);
		
		assertInstanceOf("Group", Group, TestTarget.presentGroups[0]);
		
		
	},
	

"test endTravel / Gruen, wenn Travel-Objekt aus travelers verschwunden": function() {  

		var TestStart = new Planet(10, 200, 200);
		var TestTarget = new Planet(10, 200, 300);
		var distance = 100;
		
		var TestGroup1 = new Group(new Ship(new Player(1), 1));
		var TestGroup2 = new Group(new Ship(new Player(1), 2));
		var TestGroup3 = new Group(new Ship(new Player(1), 3));
		
		var TestRoute = new Route(TestStart, TestTarget, distance);
		
		TestRoute.startTravel(TestGroup1);
		TestRoute.startTravel(TestGroup2);
		TestRoute.startTravel(TestGroup3);
		
		assertEquals("Gruppe", TestGroup1, TestRoute.travelers[0].presentGroup);
		assertEquals("Gruppe", TestGroup2, TestRoute.travelers[1].presentGroup);
		assertEquals("Gruppe", TestGroup3, TestRoute.travelers[2].presentGroup);
		assertUndefined(TestRoute.travelers[3]);
		
		TestRoute.endTravel(TestRoute.travelers[1]);
		
		assertEquals("Gruppe", TestGroup1, TestRoute.travelers[0].presentGroup);
		assertEquals("Gruppe", TestGroup3, TestRoute.travelers[1].presentGroup);
		assertUndefined(TestRoute.travelers[2]);
		
	},
	
	"test update / Gruen, wenn Update Ende gestarteter Reise erkennt, Gruppe auf Planeten überträgt, Travel-Objekt zerstört": function() {  

		assertTrue(false);
		
	},
	
});