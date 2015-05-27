AsyncTestCase("Planet_Test_Update", {   
	
	setUp: function() { }, 		
	tearDown: function() { },   
	
	/*
 		this.Update = function(){
		
		this.checkGroups();
	
		this.checkConquest();
		
		this.checkProduction();
		
		//this.updateFight();
		 
		this.checkGroups();
	}
	
		/Conquest startet automatisch
		/Owner wechselt nicht vor erfolgreichem Conquest
		/Owner wechselt bei erfolgreichem Conquest
		/Conquest gestoppt
	
		//Production startet automatisch
		//Production nicht vor erfolgreichem abschließen als Ergebnis
		//Production hat Ergebnis (Ship) nach erfolgreichem Abschließen
		//Produktion stoppt und startet neu
	
	
	
	*/
	
"test checkConquest / Gruen, wenn Eroberung startet, den Besitzer des Planeten erfolgreich wechselt und danach gestoppt ist": function(queue) {
		
	var TestPlanet = new Planet(10, 200, 200);	
	TestPlanet.setOwner(new Player(1));
	
	var TestGroupPlanetA = new Group(new Ship(new Player(2), 1));					//Gegnerische Gruppe
	TestPlanet.addGroup(TestGroupPlanetA);
	
	assertNotInstanceOf("checkConquest", Conquest, TestPlanet.Conquest);		    //Keine Eroberung		
	
	TestPlanet.Update();
		
	assertInstanceOf("checkConquest", Conquest, TestPlanet.Conquest);		        //Eroberung
		
	queue.call('Step 1: Assert, ob Owner noch alter Owner nach 9sek', function(callbacks) {
	    var myCallback = callbacks.add(function() {
	    	TestPlanet.Update();
	    	console.log("conquesttimes");
	    	console.log(TestPlanet.Conquest.ConquestTime);
	    	console.log(TestPlanet.Conquest.RemainingConquestTime);
	    	assertEquals("checkConquest", 1, TestPlanet.Owner.ID);
	    });
	    window.setTimeout(myCallback, 9000);
	 });
	
	queue.call('Step 2: Assert, ob Owner neuer Owner nach 11sek und Conquest gestoppt', function(callbacks) {
	    var myCallback = callbacks.add(function() {
	    	TestPlanet.Update();
	    	assertEquals("checkConquest", 2, TestPlanet.Owner.ID);
	    	assertNotInstanceOf("checkConquest", Conquest, TestPlanet.Conquest);
	    });
	    window.setTimeout(myCallback, 2000);
	 });			
	},
	
	"test RemainingProductionTime/Update() / Gruen wenn Update() fertige Produktion erkennt": function(queue) {  

		var TestPlanet = new Planet(10, 200, 200);
		TestPlanet.setOwner(new Player(1));
		assertNotInstanceOf("Group", Group, TestPlanet.presentGroups[0]);
		
		TestPlanet.Update();
		console.log("000");
    	console.log(TestPlanet.Production.ProductionTime);
    	console.log(TestPlanet.Production.RemainingProductionTime);
		
		var TestProduction = new Production(10, 1)	//(Planetenmasse, Schiffstyp)
														//Produktionszeit für Typ 1 + Planetenmasse 10 = 100.000 / 10 = 10000 millisek
		
		
		queue.call('Step 1: Update() wird in 9,0 Sekunden aufgerufen.', function(callbacks) {
		    var myCallback = callbacks.add(function() {
		    	TestPlanet.Update();
		    	console.log("222");
		    	console.log(TestPlanet.Production.ProductionTime);
		    	console.log(TestPlanet.Production.RemainingProductionTime);
		    });
		    window.setTimeout(myCallback, 9000);
		 });
			
		queue.call('Step 2: Assert, dass Produktion noch nicht abgeschlossen', function() {
			assertFalse("False", TestPlanet.Production.Update());
		 });
		
		queue.call('Step 3: Assert, dass Produktion abgeschlossen, Update() wird in 11,0 Sekunden aufgerufen.', function(callbacks) {
		    var myCallback = callbacks.add(function() {
		    	assertTrue("True", TestPlanet.Production.Update());
		    	TestPlanet.Update();
		    	console.log("333");
		    	console.log(TestPlanet.Production.ProductionTime);
		    	console.log(TestPlanet.Production.RemainingProductionTime);
		    });
		    window.setTimeout(myCallback, 2000);
		 });
		
		queue.call('Step 4: Assert, dass Produktion erneut gestartet', function() {
			assertFalse("False", TestPlanet.Production.Update());
		 });	
		
		queue.call('Step 5: Assert, dass Schiff/Gruppe produziert wurde', function() {
			assertInstanceOf("Group", Group, TestPlanet.presentGroups[0]);
		 });
		
		}, 
	
	});