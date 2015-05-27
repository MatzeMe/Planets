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
	

	
		
			
	},  
	

"test NoTest": function(queue) {  //2Routen, weil Routen Einbahnstrassen sein können
		
	var TestUniverse =[new Planet(10, 300, 100), new Planet(15, 600, 200), new Planet(10, 150, 250), new Planet(20, 500, 350)];
	var TestPlayer=[new Player(1), new Player(2)] 
	
	var Group1 = new Group(new Ship(TestPlayer[0],1));
	var Group2 = new Group(new Ship(TestPlayer[1],1));
	
	TestUniverse[0].setOwner(TestPlayer[0]);
	TestUniverse[1].setOwner(TestPlayer[1]);

	var TestGC = new GameControler(TestUniverse, TestPlayer);
		
	queue.call('Step 1: Group1, Player1, auf Planet2', function(callbacks) {
		    var myCallback = callbacks.add(function() {
		    	console.log("Gruppe Spieler 1 auf Planet2 => Eroberung");
		    	TestUniverse[2].addGroup(Group1);
		    });
		    window.setTimeout(myCallback, 10000);
		 });
	
	queue.call('Step 2: 1 Gruppe, Player1 von Planet2 auf Planet0', function(callbacks) { 
	    var myCallback = callbacks.add(function() {
	    	console.log("Gruppe Spieler 1 auf Planet0 => Zusammenfassung der Schiffe in 1 Gruppe");
	    	var GroupTemp = TestUniverse[2].presentGroups[0];
	    	TestUniverse[2].removeGroup(GroupTemp);
	    	TestUniverse[0].addGroup(GroupTemp);
	    	
	    });
	    window.setTimeout(myCallback, 12000);
	 });	
	
	queue.call('Step 3: 1 Gruppe,Player1 von Planet0 auf Planet1', function(callbacks) { 
	    var myCallback = callbacks.add(function() {
	    	console.log("Gruppe Spieler 1 auf Planet1 => Kampf, Produktion wird eingestellt");
	    	var GroupTemp = TestUniverse[0].presentGroups[0];
	    	TestUniverse[0].removeGroup(GroupTemp);
	    	TestUniverse[1].addGroup(GroupTemp);
	    	
	    });
	    window.setTimeout(myCallback, 10000);
	 });	
	
	
	queue.call('Step 4: Eiinzige Gruppe, Player1 von Planet1 auf Planet0', function(callbacks) { 
	    var myCallback = callbacks.add(function() {
	    	console.log("Gruppe Spieler 1 zurück auf Planet0 => Produktion wird fortgesetzt");
	    	var GroupTemp = TestUniverse[1].presentGroups[1];
	    	TestUniverse[1].removeGroup(GroupTemp);
	    	TestUniverse[0].addGroup(GroupTemp);
	    	
	    });
	    window.setTimeout(myCallback, 10000);
	 });	
	},  
});
