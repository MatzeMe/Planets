TestCase("GameControler_Test", {   
	
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
	
		var TestUniverse = [new Planet(10, 350, 350), new Planet(10, 400, 350)];
		var TestPlayer=[new Player(1), new Player(2)] 
		
		TestUniverse[0].setOwner(TestPlayer[0]);
		TestUniverse[1].setOwner(TestPlayer[1]);
	
		var TestGC = new GameControler(TestUniverse, TestPlayer);
		
		assertInstanceOf("Planet", Planet, TestGC.Universe[0]);
		assertInstanceOf("Planet", Planet, TestGC.Universe[1]);
		
		assertInstanceOf("Route", Route, TestGC.Milkyways[0]);
		assertNotInstanceOf("Route", Route, TestGC.Milkyways[1]);
		
		assertInstanceOf("Player", Player, TestGC.Milkyways[0]);
		assertInstanceOf("Player", Player, TestGC.Milkyways[1]);
		
		assertFalse("GameOver", TestGC.GameOver);
		
		assertNumber("FrameRate", TestGC.FrameRate);
	},  
	
"test Verbindung / Gruen wenn 2 Planeten durch genau 2 Routen verbunden": function() {  //2Routen, weil Routen Einbahnstrassen sein können
		
		var TestUniverse = [new Planet(10, 350, 350), new Planet(10, 400, 350)];
		var TestPlayer=[new Player(1), new Player(2)] 
		
		TestUniverse[0].setOwner(TestPlayer[0]);
		TestUniverse[1].setOwner(TestPlayer[1]);
	
		var TestGC = new GameControler(TestUniverse, TestPlayer);
		
	},  
	
});
