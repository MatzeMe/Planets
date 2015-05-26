AsyncTestCase("Production_Test", {   
	
	setUp: function() { }, 		
	tearDown: function() { },   

			
"test Initialisierung / Gruen wenn Produktion korrekt initialisiert": function() {  

	var TestProduction = new Production(10, 1)	//(Planetenmasse, Schiffstyp)
	
	assertNumber("Type", TestProduction.Type);
	assertBoolean("ProductionRunning", TestProduction.ProductionRunning);
	assertNumber("ProductionTime", TestProduction.ProductionTime);
	assertNumber("RemainingProductionTime", TestProduction.RemainingProductionTime);
	assertNumber("ProductionStarted", TestProduction.ProductionStarted);
	
	},  	
	
	
"test Update() / Gruen wenn update() bool zurückliefert": function() {  

		var TestProduction = new Production(10, 1)	//(Planetenmasse, Schiffstyp)
				
		assertBoolean("Update", TestProduction.Update());
			
		},  

		
"test RemainingProductionTime / Gruen wenn RemainingProductionTime korrekt berechnet": function(queue) {  

	var TestProduction = new Production(10, 1)	//(Planetenmasse, Schiffstyp)
												//Produktionszeit für Typ 1 + Planetenmasse 10 = 100.000 / 10 = 10000 millisek
	
	queue.call('Step 1: Update() wird in 3 Sekunden aufgerufen.', function(callbacks) {
	    var myCallback = callbacks.add(function() {
	    	TestProduction.Update();
	    });
	    window.setTimeout(myCallback, 3000);
	 });
	
	queue.call('Step 2: Assert, dass RemainingProductionTime 7Sekunden beträgt', function() {
		assertTrue("RemainingProductionTime", (TestProduction.RemainingProductionTime>6050 && TestProduction.RemainingProductionTime < 7050));
	 });
	
	},  
	
	
"test RemainingProductionTime/Update() / Gruen wenn Update() fertige Produktion erkennt": function(queue) {  

		var TestProduction = new Production(10, 1)	//(Planetenmasse, Schiffstyp)
														//Produktionszeit für Typ 1 + Planetenmasse 10 = 100.000 / 10 = 10000 millisek
		
		
		queue.call('Step 1: Update() wird in 9,0 Sekunden aufgerufen.', function(callbacks) {
		    var myCallback = callbacks.add(function() {
		    	TestProduction.Update();
		    });
		    window.setTimeout(myCallback, 9000);
		 });
			
		queue.call('Step 2: Assert, dass Produktion noch nicht abgeschlossen', function() {
			assertFalse("False", TestProduction.Update());
		 });
		
		queue.call('Step 3: Update() wird in 11,0 Sekunden aufgerufen.', function(callbacks) {
		    var myCallback = callbacks.add(function() {
		    	TestProduction.Update();
		
		    });
		    window.setTimeout(myCallback, 2000);
		 });
		
		queue.call('Step 2: Assert, dass Produktion abgeschlossen', function() {
			assertTrue("True", TestProduction.Update());
		 });	
		},  
});