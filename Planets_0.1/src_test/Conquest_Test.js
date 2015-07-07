/*	Conquest_Test.js
 * 
 * 	Author1: rszabad(si3ben)
 * 	Course: Test-driven Development mit JavaScript
 *
 */

AsyncTestCase("Conquest_Test", {   
	
	setUp: function() { 
		
		this.clock = sinon.useFakeTimers(Date.now());
		
		GroupA = new Group(new Ship(new Player(1), 1));
		for(var i = 0; i < 9; i++){
			GroupA.addShip(new Ship(new Player(1), 1));
		}
		
		TestConquest = new Conquest(10, GroupA); 
		
	}, 		
	tearDown: function() { 
		
		this.clock.restore(); 
		
	},   
	  

			
"test Initialisierung / Gruen wenn Conquest korrekt initialisiert": function() {  

	
	assertNumber("Mass", TestConquest.mass);
	assertInstanceOf("Conquerers", Group, TestConquest.conquerors);
	assertNumber("ConquestStarted", TestConquest.conquestStarted);
	
	assertNumber("ConquestTime", TestConquest.conquestTime);
	assertEquals("ConquestTime", 10000, TestConquest.conquestTime);
	
	assertNumber("RemainingConquestTime", TestConquest.remainingConquestTime);
	assertEquals("RemainingConquestTime", 10000, TestConquest.remainingConquestTime); 
	},  	
	
	
"test Update() / Gruen wenn update() bool zurückliefert": function() {  


				
		assertBoolean("Update", TestConquest.update());
			
		},  

		
"test RemainingConquestTime / Gruen wenn RemainingConquestTime korrekt berechnet": function(queue) {  


												
	
	queue.call('Step 1: Update() wird in 3 Sekunden aufgerufen.', function(callbacks) {
	    var myCallback = callbacks.add(function() {
	    	TestConquest.update();
	    });
	    window.setTimeout(myCallback, 3000);
	    this.clock.tick(3010);
	 });
	
	queue.call('Step 2: Assert, dass RemainingConquestTime ~7 Sekunden beträgt', function() {
		assertTrue("RemainingConquestTime", (TestConquest.remainingConquestTime>6050 && TestConquest.remainingConquestTime < 7050));
	 });
	
	},  
	
	
"test RemainingConquestTime/Update() / Gruen wenn Update() fertige Eroberung erkennt": function(queue) {  

		
		
		queue.call('Step 1: Update() wird in 9,0 Sekunden aufgerufen.', function(callbacks) {
		    var myCallback = callbacks.add(function() { 
		    	TestConquest.update();
		    });
		    window.setTimeout(myCallback, 9000);
		    this.clock.tick(9010);
		 });
			
		queue.call('Step 2: Assert, dass Eroberung noch nicht abgeschlossen', function() {
			assertFalse("False", TestConquest.update());
		 });
		
		queue.call('Step 3: Update() wird in 11,0 Sekunden aufgerufen.', function(callbacks) {
		    var myCallback = callbacks.add(function() {
		    	TestConquest.update();
		    });
		    window.setTimeout(myCallback, 2000);
		    this.clock.tick(2010);
		 });
		
		queue.call('Step 2: Assert, dass Eroberung abgeschlossen', function() {
			assertTrue("True", TestConquest.update());
		 });	
		},  
});