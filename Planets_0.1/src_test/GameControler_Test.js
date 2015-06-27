state = 1;
somethingChanged = function(){};

AsyncTestCase("GameControler_Test", {   
	
	setUp: function() { }, 
	tearDown: function() { },  

	/*
	 * 	initialisierung
	 * 
	 *
	 * 	planeten durch routen verbunden
	 * 
	 * 	sieg feststellen
	 * 
	 * 	
	 *  
	 */	
		
	

"test Initialisierung / Gruen wenn Gamecontroler korrekt initialisiert": function() {   
	
		var TestUniverse =[new Planet(10, 300, 300), new Planet(10, 500, 200)];
		var TestPlayer=[new Player(1), new Player(2)] 
		
		TestUniverse[0].setOwner(TestPlayer[0]);
		TestUniverse[1].setOwner(TestPlayer[1]);
	
		var TestGC = new GameControler(TestUniverse, TestPlayer);
	
		assertInstanceOf("Planet", Planet, TestGC.universe[0]);
		assertInstanceOf("Planet", Planet, TestGC.universe[1]);
		assertNotInstanceOf("Planet", Planet, TestGC.universe[2]);
		
		assertInstanceOf("Route", Route, TestGC.milkyways[0]);
		assertInstanceOf("Route", Route, TestGC.milkyways[1]); 
		assertNotInstanceOf("Route", Route, TestGC.milkyways[2]); 
		
		assertInstanceOf("Player", Player, TestGC.players[0]); 
		assertInstanceOf("Player", Player, TestGC.players[1]);
		assertNotInstanceOf("Player", Player, TestGC.players[2]);
		
		assertFalse("GameOver", TestGC.gameOver); 		
		assertNumber("RouteCounter", TestGC.routeCounter);
			
	},  
	
"test Verbindung / Gruen wenn 2 Planeten durch genau 2 Routen verbunden und korrekt initialisiert wurden": function() {  //2Routen, weil Routen Einbahnstrassen sein können
		
		var TestUniverse = [new Planet(10, 350, 350), new Planet(10, 400, 350)];	//TravelRadius momentan: Mass * 30
		var TestPlayer=[new Player(1), new Player(2)] 
		
		TestUniverse[0].setOwner(TestPlayer[0]);
		TestUniverse[1].setOwner(TestPlayer[1]);
	
		var TestGC = new GameControler(TestUniverse, TestPlayer);
		
		assertInstanceOf("Route", Route, TestGC.milkyways[0]);
		assertInstanceOf("Route", Route, TestGC.milkyways[1]); 
		assertNotInstanceOf("Route", Route, TestGC.milkyways[2]); 
		
		assertEquals("Start1", TestGC.universe[0], TestGC.milkyways[0].start);
		assertEquals("Target1", TestGC.universe[1], TestGC.milkyways[0].target);
		
		assertEquals("Start2", TestGC.universe[1], TestGC.milkyways[1].start);
		assertEquals("Target2", TestGC.universe[0], TestGC.milkyways[1].target);
		
		assertEquals("Distance1", 50, TestGC.milkyways[0].distance);
		assertEquals("ID1", 0, TestGC.milkyways[0].routeID);
		
		assertEquals("Distance2", 50, TestGC.milkyways[1].distance);
		assertEquals("ID2", 1, TestGC.milkyways[1].routeID);
		
	},  
	
	
"test Verbindung / Gruen wenn 2 Planeten durch genau 1 Route verbunden wegen unterschiedlichem TravelRadius": function() {  //2Routen, weil Routen Einbahnstrassen sein können
		
		var TestUniverse = [new Planet(10, 200, 350), new Planet(5, 400, 350)];	//TravelRadius momentan: Mass * 30: Planet1 -> 300, Planet2 -> 150
		var TestPlayer=[new Player(1), new Player(2)] 
		
		TestUniverse[0].setOwner(TestPlayer[0]);
		TestUniverse[1].setOwner(TestPlayer[1]);
	
		var TestGC = new GameControler(TestUniverse, TestPlayer);
		
		assertInstanceOf("Route", Route, TestGC.milkyways[0]); 
		assertNotInstanceOf("Route", Route, TestGC.milkyways[1]); 
		
		assertEquals("Start1", TestGC.universe[0], TestGC.milkyways[0].start);
		assertEquals("Target1", TestGC.universe[1], TestGC.milkyways[0].target);		
	},  
	
"test Verbindung / Gruen wenn 2 Planeten durch genau 0 Route verbunden wegen TravelRadius": function() {  //2Routen, weil Routen Einbahnstrassen sein können
		
		var TestUniverse = [new Planet(5, 200, 350), new Planet(5, 400, 350)];	//TravelRadius momentan: Mass * 30: Planet1 -> 150, Planet2 -> 150
		var TestPlayer=[new Player(1), new Player(2)] 
		
		TestUniverse[0].setOwner(TestPlayer[0]);
		TestUniverse[1].setOwner(TestPlayer[1]);
	
		var TestGC = new GameControler(TestUniverse, TestPlayer);
		
		assertUndefined("Route", TestGC.milkyways[0]); 
		assertUndefined("Route", TestGC.milkyways[1]); 
				
	}, 
	
	
"test Sieg / Gruen wenn Sieg festgestellt wird, wenn alle Planeten einem Spieler gehören": function(queue) {  //2Routen, weil Routen Einbahnstrassen sein können
		
		var TestUniverse = [new Planet(10, 200, 350), new Planet(5, 400, 350)];	//TravelRadius momentan: Mass * 30: Planet1 -> 300, Planet2 -> 150
		var TestPlayer=[new Player(1), new Player(2)] 
		
		TestUniverse[0].setOwner(TestPlayer[0]);
		TestUniverse[1].setOwner(TestPlayer[1]);
	
		var TestGC = new GameControler(TestUniverse, TestPlayer);
		
	queue.call('Step 1: Kurz warten und prüfen ob Spiel vorbei', function(callbacks) {
		    var myCallback = callbacks.add(function() {
		    	assertFalse(TestGC.gameOver);
		    	TestUniverse[1].setOwner(TestPlayer[0]);
		    });
		    window.setTimeout(myCallback, 500);
		 });
	
	queue.call('Step 2: Kurz warten und erneut Prüfen', function(callbacks) {
	    var myCallback = callbacks.add(function() {
	    	assertTrue(TestGC.gameOver);
	    });
	    window.setTimeout(myCallback, 500); 
	 });		
	},  
	
"test Sieg / Gruen wenn Sieg festgestellt wird, wenn alle Planeten einem Spieler gehören außer Neutralem am Ende des Arrays": function(queue) {  //2Routen, weil Routen Einbahnstrassen sein können
		
		var TestUniverse = [new Planet(10, 200, 350), new Planet(5, 400, 350), new Planet(5, 300, 350)];	//TravelRadius momentan: Mass * 30: Planet1 -> 300, Planet2 -> 150
		var TestPlayer=[new Player(1), new Player(2)] 
		
		TestUniverse[0].setOwner(TestPlayer[0]);
		TestUniverse[1].setOwner(TestPlayer[1]);
		
	
		var TestGC = new GameControler(TestUniverse, TestPlayer);
		
	queue.call('Step 1: Kurz warten und prüfen ob Spiel vorbei', function(callbacks) {
		    var myCallback = callbacks.add(function() {
		    	assertFalse(TestGC.gameOver);
		    	TestUniverse[1].setOwner(TestPlayer[0]);
		    });
		    window.setTimeout(myCallback, 500);
		 });
	
	queue.call('Step 2: Kurz warten und erneut Prüfen', function(callbacks) {
	    var myCallback = callbacks.add(function() {
	    	assertTrue(TestGC.gameOver);
	    });
	    window.setTimeout(myCallback, 500); 
	 });		
	},  
	
"test Sieg / Gruen wenn Sieg festgestellt wird, wenn alle Planeten einem Spieler gehören außer Neutralem in der Mitte des Arrays": function(queue) {  //2Routen, weil Routen Einbahnstrassen sein können
		
		var TestUniverse = [new Planet(10, 200, 350), new Planet(5, 400, 350), new Planet(5, 300, 350)];	//TravelRadius momentan: Mass * 30: Planet1 -> 300, Planet2 -> 150
		var TestPlayer=[new Player(1), new Player(2)] 
		
		TestUniverse[0].setOwner(TestPlayer[0]);
		TestUniverse[2].setOwner(TestPlayer[1]);
		
	
		var TestGC = new GameControler(TestUniverse, TestPlayer);
		
	queue.call('Step 1: Kurz warten und prüfen ob Spiel vorbei', function(callbacks) {
		    var myCallback = callbacks.add(function() {
		    	assertFalse(TestGC.gameOver);
		    	TestUniverse[2].setOwner(TestPlayer[0]);
		    });
		    window.setTimeout(myCallback, 500);
		 });
	
	queue.call('Step 2: Kurz warten und erneut Prüfen', function(callbacks) {
	    var myCallback = callbacks.add(function() {
	    	assertTrue(TestGC.gameOver);
	    });
	    window.setTimeout(myCallback, 500); 
	 });		
	},  
	
	
"test Sieg / Gruen wenn Sieg festgestellt wird, wenn alle Planeten einem Spieler gehören außer Neutralem am Anfang des Arrays": function(queue) {  //2Routen, weil Routen Einbahnstrassen sein können
		
		var TestUniverse = [new Planet(10, 200, 350), new Planet(5, 400, 350), new Planet(5, 300, 350)];	//TravelRadius momentan: Mass * 30: Planet1 -> 300, Planet2 -> 150
		var TestPlayer=[new Player(1), new Player(2)] 
		
		TestUniverse[1].setOwner(TestPlayer[0]);
		TestUniverse[2].setOwner(TestPlayer[1]);
		
	
		var TestGC = new GameControler(TestUniverse, TestPlayer);
		
	queue.call('Step 1: Kurz warten und prüfen ob Spiel vorbei', function(callbacks) {
		    var myCallback = callbacks.add(function() {
		    	assertFalse(TestGC.gameOver);
		    	TestUniverse[2].setOwner(TestPlayer[0]);
		    });
		    window.setTimeout(myCallback, 500);
		 });
	
	queue.call('Step 2: Kurz warten und erneut Prüfen', function(callbacks) {
	    var myCallback = callbacks.add(function() {
	    	assertTrue(TestGC.gameOver);
	    });
	    window.setTimeout(myCallback, 500); 
	 });		
	},  
});
