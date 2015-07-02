AsyncTestCase("Production_Test", {   
	
	setUp: function() { 
		
		this.clock = sinon.useFakeTimers();
		
		TestProduction = new Production(10, 1)
	}, 		
	tearDown: function() { 
		
		this.clock.restore(); 
		
	},   
	//   this.clock.tick(3010);
			
"test Initialisierung / Gruen wenn Produktion korrekt initialisiert": function() {   

	
	
	assertNumber("Type", TestProduction.type);
	assertNumber("ProductionTime", TestProduction.productionTime);
	assertNumber("RemainingProductionTime", TestProduction.remainingProductionTime);
	assertNumber("ProductionStarted", TestProduction.productionStarted); 
	
	},  	
	
	
"test Update() / Gruen wenn update() bool zurückliefert": function() {  

		
				
		assertBoolean("Update", TestProduction.update()); 
			
		},  

		
"test RemainingProductionTime / Gruen wenn RemainingProductionTime korrekt berechnet": function(queue) {  

	
	
	queue.call('Step 1: Update() wird in 3 Sekunden aufgerufen.', function(callbacks) {
	    var myCallback = callbacks.add(function() {
	    	TestProduction.update();
	    });
	    window.setTimeout(myCallback, 3000);
	    this.clock.tick(3010);
	 });
	
	queue.call('Step 2: Assert, dass RemainingProductionTime 7Sekunden beträgt', function() {
		assertTrue("RemainingProductionTime", (TestProduction.remainingProductionTime>6050 && TestProduction.remainingProductionTime < 7050));
	 });
	
	},  
	
	
"test RemainingProductionTime/Update() / Gruen wenn Update() fertige Produktion erkennt": function(queue) {  

			
		
		
		queue.call('Step 1: Update() wird in 9,0 Sekunden aufgerufen.', function(callbacks) {
		    var myCallback = callbacks.add(function() {
		    	TestProduction.update();
		    });
		    window.setTimeout(myCallback, 9000);
		    this.clock.tick(9010);
		 });
			
		queue.call('Step 2: Assert, dass Produktion noch nicht abgeschlossen', function() {
			assertFalse("False", TestProduction.update());
		 });
		
		queue.call('Step 3: Update() wird in 11,0 Sekunden aufgerufen.', function(callbacks) {   
		    var myCallback = callbacks.add(function() { 
		    	TestProduction.update();
		    });
		    window.setTimeout(myCallback, 2000);
		    this.clock.tick(2010);
		 });
		
		queue.call('Step 2: Assert, dass Produktion abgeschlossen', function() {
			assertTrue("True", TestProduction.update());
		 });	
		},  
});