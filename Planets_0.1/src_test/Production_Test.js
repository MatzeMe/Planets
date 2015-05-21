TestCase("Production_Test", {   
	
	setUp: function() { }, 		
	tearDown: function() { },   

			
"test Initialisierung / Gruen wenn Produktion korrekt initialisiert": function() {  

	var TestProduction = new Production(100, 1)	//(Planetenmasse, Schiffstyp)
	
	assertNumber("Type", TestProduction.Type);
	assertBoolean("ProductionRunning", TestProduction.ProductionRunning);
	assertNumber("RemainingProductionTime", TestProduction.RemainingProductionTime);
	
	},  	
	
	
"test Update() / Gruen wenn update() bool zurückliefert": function() {  

		var TestProduction = new Production(100, 1)	//(Planetenmasse, Schiffstyp)
				
		assertBoolean("Update", TestProduction.Update());
		
	
		//If calculateremaining time = correct 
		
		//Update returns right bool
		
		//console.log(Date.now()); 
		
		},  

"test RemainingProductionTime / Gruen wenn RemainingProductionTime korrekt berechnet": function() {  

	var TestProduction = new Production(100, 1)	//(Planetenmasse, Schiffstyp)
													//Produktionszeit für Typ1 = 10.000 millisek (testweise)
	
	setTimeout(TestProduction.Update(), 3000);		//Update von RemainingProductionTime nach 3.000 millisek
	assertEquals("RemainingProductionTime", 7000, TestProduction.RemainingProductionTime);
	console.log(TestProduction.RemainingProductionTime);
	

	
	//Update returns right bool
	
	//console.log(Date.now()); 
	
	},  
	
	
"test RemainingProductionTime/Update() / Gruen wenn Update() fertige Produktion erkennt": function() {  

		var TestProduction = new Production(100, 1)	//(Planetenmasse, Schiffstyp)
														//Produktionszeit für Typ 1 + Planetenmasse 100 = 100.000 / 100 = 10000 millisek
		
		setTimeout(TestProduction.Update(), 9500);		
		assertFalse("False",TestProduction.Update());
		
		setTimeout(TestProduction.Update(), 10500);		
		assertTrue("True",TestProduction.Update());
		
		

		

		
		
		
		},  
});