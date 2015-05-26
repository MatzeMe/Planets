AsyncTestCase("Production_Test", {   
	
	setUp: function() { }, 		
	tearDown: function() { },   

			
"test Initialisierung / Gruen wenn Conquest korrekt initialisiert": function() {  

	var GroupA = new Group(new Ship(new Owner(), 1));
	for(var i = 0; i < 9; i++){
		GroupA.addShip(new Ship(new Owner, 1));
	}
	
	var TestConquest = new Conquest(10, GroupA)	
	
	assertNumber("Mass", TestConquest.Mass);
	assertInstanceOf("Conquerers", Group, TestConquest.Conquerors);
	assertNumber("ConquestStarted", TestConquest.ConquestStarted);
	assertNumber("ConquestTime", TestConquest.ConquestTime);
	assertNumber("RemainingConquestTime", TestConquest.RemainingConquestTime);
	
	},  	
	
	
"test Update() / Gruen wenn update() bool zurückliefert": function() {  

		var GroupA = new Group(new Ship(new Owner(), 1));
		var TestConquest = new Conquest(10, GroupA)	//(Planetenmasse, Schiffsgruppe)
				
		assertBoolean("Update", TestConquest.Update());
			
		},  

		
"test RemainingConquestTime / Gruen wenn RemainingConquestTime korrekt berechnet": function(queue) {  

	var GroupA = new Group(new Ship(new Owner(), 1)); 	//(Planetenmasse, Schiffsgruppe)	
	var TestConquest = new Conquest(10, GroupA)			//Eroberungszeitzeit für Planetenmasse 10 = 10.000 * 10 = 10000 millisek
												
	
	queue.call('Step 1: Update() wird in 3 Sekunden aufgerufen.', function(callbacks) {
	    var myCallback = callbacks.add(function() {
	    	TestConquest.Update();
	    });
	    window.setTimeout(myCallback, 3000);
	 });
	
	queue.call('Step 2: Assert, dass RemainingConquestTime 7 Sekunden beträgt', function() {
		assertTrue("RemainingConquestTime", (TestConquest.RemainingConquestTime>6050 && TestConquest.RemainingConquestTime < 7050));
	 });
	
	},  
	
	
"test RemainingConquestTime/Update() / Gruen wenn Update() fertige Eroberung erkennt": function(queue) {  

	var GroupA = new Group(new Ship(new Owner(), 1)); 	//(Planetenmasse, Schiffsgruppe)	
	var TestConquest = new Conquest(10, GroupA)			//Eroberungszeitzeit für Planetenmasse 10 = 10.000 * 10 = 10000 millisek
		
		
		queue.call('Step 1: Update() wird in 9,0 Sekunden aufgerufen.', function(callbacks) {
		    var myCallback = callbacks.add(function() {
		    	TestConquest.Update();
		    });
		    window.setTimeout(myCallback, 9000);
		 });
			
		queue.call('Step 2: Assert, dass Eroberung noch nicht abgeschlossen', function() {
			assertFalse("False", TestConquest.Update());
		 });
		
		queue.call('Step 3: Update() wird in 11,0 Sekunden aufgerufen.', function(callbacks) {
		    var myCallback = callbacks.add(function() {
		    	TestConquest.Update();
		    });
		    window.setTimeout(myCallback, 2000);
		 });
		
		queue.call('Step 2: Assert, dass Eroberung abgeschlossen', function() {
			assertTrue("True", TestConquest.Update());
		 });	
		},  
});