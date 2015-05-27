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
	 * 	framerate korrekt 
	 *  
	 */	
	

"test Initialisierung / Gruen wenn Gamecontroler korrekt initialisiert": function() {   
	
		var TestUniverse =[new Planet(10, 300, 300), new Planet(10, 500, 200)];
		var TestPlayer=[new Player(1), new Player(2)] 
		
		TestUniverse[0].setOwner(TestPlayer[0]);
		TestUniverse[1].setOwner(TestPlayer[1]);
	
		var TestGC = new GameControler(TestUniverse, TestPlayer);
	
		assertInstanceOf("Planet", Planet, TestGC.Universe[0]);
		assertInstanceOf("Planet", Planet, TestGC.Universe[1]);
		assertNotInstanceOf("Planet", Planet, TestGC.Universe[2]);
		
		assertInstanceOf("Route", Route, TestGC.Milkyways[0]);
		assertInstanceOf("Route", Route, TestGC.Milkyways[1]); 
		assertNotInstanceOf("Route", Route, TestGC.Milkyways[2]); 
		
		assertInstanceOf("Player", Player, TestGC.Players[0]); 
		assertInstanceOf("Player", Player, TestGC.Players[1]);
		assertNotInstanceOf("Player", Player, TestGC.Players[2]);
		
		assertFalse("GameOver", TestGC.GameOver); 
		
		assertNumber("FrameRate", TestGC.FrameRate);
			
	},  
	
"test Verbindung / Gruen wenn 2 Planeten durch genau 2 Routen verbunden": function() {  //2Routen, weil Routen Einbahnstrassen sein können
		
		var TestUniverse = [new Planet(10, 350, 350), new Planet(10, 400, 350)];	//TravelRadius momentan: Mass * 30
		var TestPlayer=[new Player(1), new Player(2)] 
		
		TestUniverse[0].setOwner(TestPlayer[0]);
		TestUniverse[1].setOwner(TestPlayer[1]);
	
		var TestGC = new GameControler(TestUniverse, TestPlayer);
		
		assertInstanceOf("Route", Route, TestGC.Milkyways[0]);
		assertInstanceOf("Route", Route, TestGC.Milkyways[1]); 
		assertNotInstanceOf("Route", Route, TestGC.Milkyways[2]); 
		
		assertEquals("Start1", TestGC.Universe[0], TestGC.Milkyways[0].Start);
		assertEquals("Target1", TestGC.Universe[1], TestGC.Milkyways[0].Target);
		
		assertEquals("Start2", TestGC.Universe[1], TestGC.Milkyways[1].Start);
		assertEquals("Target2", TestGC.Universe[0], TestGC.Milkyways[1].Target);
		
	},  
	
	
"test Verbindung / Gruen wenn 2 Planeten durch genau 1 Route verbunden wegen unterschiedlichem TravelRadius": function() {  //2Routen, weil Routen Einbahnstrassen sein können
		
		var TestUniverse = [new Planet(10, 200, 350), new Planet(5, 400, 350)];	//TravelRadius momentan: Mass * 30: Planet1 -> 300, Planet2 -> 150
		var TestPlayer=[new Player(1), new Player(2)] 
		
		TestUniverse[0].setOwner(TestPlayer[0]);
		TestUniverse[1].setOwner(TestPlayer[1]);
	
		var TestGC = new GameControler(TestUniverse, TestPlayer);
		
		assertInstanceOf("Route", Route, TestGC.Milkyways[0]); 
		assertNotInstanceOf("Route", Route, TestGC.Milkyways[1]); 
		
		assertEquals("Start1", TestGC.Universe[0], TestGC.Milkyways[0].Start);
		assertEquals("Target1", TestGC.Universe[1], TestGC.Milkyways[0].Target);		
	},  
	
"test Sieg / Gruen wenn Kein Sieg festgestellt wird, solange nicht alle Planeten einem Spieler gehören": function(queue) {  //2Routen, weil Routen Einbahnstrassen sein können
		
		var TestUniverse = [new Planet(10, 200, 350), new Planet(5, 400, 350), new Planet(5, 400, 350)];	//TravelRadius momentan: Mass * 30: Planet1 -> 300, Planet2 -> 150
		var TestPlayer=[new Player(1), new Player(2)] 
		
		TestUniverse[0].setOwner(TestPlayer[0]);
		TestUniverse[1].setOwner(TestPlayer[1]);
	
		var TestGC = new GameControler(TestUniverse, TestPlayer);
		
		
		assertFalse(TestGC.GameOver);		
		TestUniverse[1].setOwner(TestPlayer[0]);
		
		queue.call('Step 1: Kurz warten und prüfen ob Spiel vorbei', function(callbacks) {
		    var myCallback = callbacks.add(function() {
		    	assertFalse(TestGC.GameOver);
		    });
		    window.setTimeout(myCallback, 500); 
		 });
		
		
	},  
	
"test Sieg / Gruen wenn Sieg festgestellt wird, wenn alle Planeten einem Spieler gehören": function(queue) {  //2Routen, weil Routen Einbahnstrassen sein können
		
		var TestUniverse = [new Planet(10, 200, 350), new Planet(5, 400, 350)];	//TravelRadius momentan: Mass * 30: Planet1 -> 300, Planet2 -> 150
		var TestPlayer=[new Player(1), new Player(2)] 
		
		TestUniverse[0].setOwner(TestPlayer[0]);
		TestUniverse[1].setOwner(TestPlayer[1]);
	
		var TestGC = new GameControler(TestUniverse, TestPlayer);
		
	queue.call('Step 1: Kurz warten und prüfen ob Spiel vorbei', function(callbacks) {
		    var myCallback = callbacks.add(function() {
		    	assertFalse(TestGC.GameOver);
		    	TestUniverse[1].setOwner(TestPlayer[0]);
		    });
		    window.setTimeout(myCallback, 500);
		 });
	
	queue.call('Step 2: Kurz warten und erneut Prüfen', function(callbacks) {
	    var myCallback = callbacks.add(function() {
	    	assertTrue(TestGC.GameOver);
	    });
	    window.setTimeout(myCallback, 500);
	 });		
	},  
	
});
