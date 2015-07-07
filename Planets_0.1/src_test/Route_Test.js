/*	Route_Test.js
 * 
 * 	Author1: rszabad(si3ben)
 * 	Course: Test-driven Development mit JavaScript
 *
 */

AsyncTestCase("Planet_Test_Conquest", {   
	
	setUp: function() { }, 		
	tearDown: function() { },   
	
	
	"test Initialisierung / Gruen, wenn Route korrekt Initialisiert": function() {  

		var TestPlanet1 = new Planet(10, 200, 200);
		var TestPlanet2 = new Planet(10, 200, 300);
		var distance = 100;
		var ID = 5;
			
		var TestRoute = new Route(TestPlanet1, TestPlanet2, distance, ID);
		
		assertInstanceOf("Planet1",Planet,TestRoute.Start);
		assertInstanceOf("Planet2",Planet,TestRoute.Target); 
				 
		assertArray("travelers[]", TestRoute.travelers);
		
		assertNumber("distance", TestRoute.distance);
		
		assertNumber("ID", TestRoute.routeID);
		
	},
	
	
	"test startTravel / Gruen, wenn Travel-Objekt nach Beginn der Reise einer Gruppe vorhanden": function() {  

		var TestStart = new Planet(10, 200, 200);
		var TestTarget = new Planet(10, 200, 300);
		var distance = 100;
		var ID = 5;
		
		var TestGroup = new Group(new Ship(new Player(1), 1));	
			
		var TestRoute = new Route(TestStart, TestTarget, distance, ID);
		
		assertUndefined("Travelers", TestRoute.travelers[0]);
		
		TestRoute.startTravel(TestGroup);
		
		assertInstanceOf("Travelers", Travel, TestRoute.travelers[0]);
		
	},
	
	
"test transferGroupToPlanet / Gruen, wenn wenn Gruppe per Funktion auf Target-Planeten geschoben": function() {  

		var TestStart = new Planet(10, 200, 200);
		var TestTarget = new Planet(10, 200, 300);
		var distance = 100;
		var ID = 5;
		
		var TestGroup = new Group(new Ship(new Player(1), 1));	
			
		var TestRoute = new Route(TestStart, TestTarget, distance, ID);
		
		assertUndefined("Group", TestTarget.presentGroups[0]);
				
		TestRoute.transferGroupToPlanet(TestGroup);
		
		assertInstanceOf("Group", Group, TestTarget.presentGroups[0]);
		
		
	},
	

"test endTravel / Gruen, wenn Travel-Objekt aus travelers-Array verschwunden": function() {  

		var TestStart = new Planet(10, 200, 200);
		var TestTarget = new Planet(10, 200, 300);
		var distance = 100;
		var ID = 5;
		
		var TestGroup1 = new Group(new Ship(new Player(1), 1));
		var TestGroup2 = new Group(new Ship(new Player(1), 2));
		var TestGroup3 = new Group(new Ship(new Player(1), 3));
		
		var TestRoute = new Route(TestStart, TestTarget, distance, ID);
		
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
	
	
	
	
"test update / Gruen, wenn Update Ende gestarteter Reise erkennt, Gruppe auf Planeten überträgt, Travel-Objekt zerstört": function(queue) {  
		 
		
		var TestStart = new Planet(10, 200, 200);
		var TestTarget = new Planet(10, 200, 300);
		var distance = 150;
		
		var TestGroup1 = new Group(new Ship(new Player(1), 1));
		
		var TestRoute = new Route(TestStart, TestTarget, distance);
		
		assertUndefined(TestRoute.travelers[0]);
		TestRoute.startTravel(TestGroup1);
		assertInstanceOf(Travel, TestRoute.travelers[0]);
		
		assertUndefined(TestRoute.Target.presentGroups[0]);
		assertInstanceOf(Group, TestRoute.travelers[0].presentGroup);
		//traveltime = distance / group.speed -> 150 / 30  * 1000= 5000milisek 	
			
			queue.call('Step 1: Update() wird in 4,0 Sekunden aufgerufen, Reisestatus wird überprüft', function(callbacks) {
			    var myCallback = callbacks.add(function() { 
			    	
			    	TestRoute.Update();
			    	assertInstanceOf(Travel, TestRoute.travelers[0]);
			    });
			    window.setTimeout(myCallback, 4000); 
			 });
		
			queue.call('Step 2: Update() wird in 6,0 Sekunden aufgerufen, Reisestatus wird überprüft', function(callbacks) {
			    var myCallback = callbacks.add(function() { 
			    	TestRoute.Update();
			    	assertUndefined(TestRoute.travelers[0]);
			    	assertInstanceOf(Group, TestRoute.Target.presentGroups[0]);
			    });
			    window.setTimeout(myCallback, 2000); 
			 });
			
			
			},  
	
});