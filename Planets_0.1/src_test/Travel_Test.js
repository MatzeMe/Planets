AsyncTestCase("Travel_Test", {   
	
	setUp: function() { }, 		 
	tearDown: function() { },   

			
"test Initialisierung / Gruen wenn Travel korrekt initialisiert": function() {  

	var GroupA = new Group(new Ship(new Player(1), 1));
	
	for(var i = 0; i < 9; i++){
		GroupA.addShip(new Ship(new Player(1), 1));
	}
	
	var TestTravel = new Travel(GroupA, 100)	//traveltime = distance / group.speed -> 100 / 30 = 3,3sek 	
		
	assertNumber("distance", TestTravel.distance);
	assertInstanceOf("presentGroup", Group, TestTravel.presentGroup);
	assertNumber("TravelStarted", TestTravel.travelStarted);
	assertNumber("TravelTime", TestTravel.travelTime);
	assertNumber("RemainingTravelTime", TestTravel.remainingTravelTime); 
	assertFalse("targetReached", TestTravel.targetReached); 
	
	},  	
	
	
"test Update() / Gruen wenn update() bool zurückliefert": function() {  

		var GroupA = new Group(new Ship(new Player(1), 1));
		var TestTravel = new Travel(GroupA, 100)	//traveltime = distance / group.speed -> 100 / 30 = 3,3sek
				
		assertBoolean("Update", TestTravel.update());  
			
		},  

		
"test RemainingTravelTime / Gruen wenn RemainingTravelTime korrekt berechnet": function(queue) {  

	var GroupA = new Group(new Ship(new Player(1), 1)); 	//(Planetenmasse, Schiffsgruppe)	
	var TestTravel = new Travel(GroupA, 150)	//traveltime = distance / group.speed -> 150 / 30 = 5sek
			
	
	queue.call('Step 1: Update() wird in 3 Sekunden aufgerufen.', function(callbacks) {
	    var myCallback = callbacks.add(function() {
	    	TestTravel.update();
	    });
	    window.setTimeout(myCallback, 3000);
	 });
	
	queue.call('Step 2: Assert, dass RemainingTravelTime 2 Sekunden beträgt', function() {
		assertTrue("RemainingTravelTime", (TestTravel.remainingTravelTime>1800 && TestTravel.remainingTravelTime < 2200));
	 
	});
	
	},  
	
	
"test RemainingTravelTime/Update() / Gruen wenn Update() fertige Reise erkennt": function(queue) {  
 
	var GroupA = new Group(new Ship(new Player(1), 1)); 	//(Planetenmasse, Schiffsgruppe)	
	var TestTravel = new Travel(GroupA, 150)	//traveltime = distance / group.speed * 1000-> 150 / 30 * 1000= 5000millisek
		
		
		queue.call('Step 1: Update() wird in 4,0 Sekunden aufgerufen.', function(callbacks) {
		    var myCallback = callbacks.add(function() { 
		    	TestTravel.update();
		    });
		    window.setTimeout(myCallback, 4000);
		 });
			
		queue.call('Step 2: Assert, dass Reise noch nicht abgeschlossen', function() {
			assertFalse("False", TestTravel.update());
		 });
		
		queue.call('Step 3: Update() wird in 6,0 Sekunden aufgerufen.', function(callbacks) {
		    var myCallback = callbacks.add(function() {
		    	TestTravel.update();
		    });
		    window.setTimeout(myCallback, 2000);
		 });
		
		queue.call('Step 2: Assert, dass Reise abgeschlossen', function() {
			assertTrue("True", TestTravel.update());
		 });	
		},  
});