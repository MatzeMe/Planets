AsyncTestCase("Planet_Test_Update", {   
	
	setUp: function() { 
		
		this.clock = sinon.useFakeTimers();
		
	}, 		
	tearDown: function() { 
		
		this.clock.restore(); 
		
	},   
 
	

	
"test checkConquest / Gruen, wenn Eroberung startet, den Besitzer des Planeten erfolgreich wechselt und danach gestoppt ist": function(queue) {
		
	var TestPlanet = new Planet(10, 200, 200);	
	TestPlanet.setOwner(new Player(1));
	
	var TestGroupPlanetA = new Group(new Ship(new Player(2), 1));					//Gegnerische Gruppe
	TestPlanet.addGroup(TestGroupPlanetA);
	
	assertNotInstanceOf("checkConquest", Conquest, TestPlanet.Conquest);		    //Keine Eroberung		
	
	TestPlanet.update();
		
	assertInstanceOf("checkConquest", Conquest, TestPlanet.Conquest);		        //Eroberung
		
	queue.call('Step 1: Assert, ob Owner noch alter Owner nach 9sek', function(callbacks) {
	    var myCallback = callbacks.add(function() {
	    	TestPlanet.update();
	    	console.log("conquesttimes");
	    	console.log(TestPlanet.Conquest.conquestTime);
	    	console.log(TestPlanet.Conquest.remainingConquestTime);
	    	assertEquals("checkConquest", 1, TestPlanet.owner.ID);
	    });
	    window.setTimeout(myCallback, 9000);
	    this.clock.tick(9010);
	 });
	
	queue.call('Step 2: Assert, ob Owner neuer Owner nach 11sek und Conquest gestoppt', function(callbacks) {
	    var myCallback = callbacks.add(function() {
	    	TestPlanet.update();
	    	assertEquals("checkConquest", 2, TestPlanet.owner.ID);
	    	assertNotInstanceOf("checkConquest", Conquest, TestPlanet.Conquest);
	    });
	    window.setTimeout(myCallback, 2000);
	    this.clock.tick(2010);
	 });			
	},
	
	"test RemainingProductionTime/Update() / Gruen wenn Update() fertige Produktion erkennt": function(queue) {  

		var TestPlanet = new Planet(10, 200, 200);
		TestPlanet.setOwner(new Player(1));
		assertNotInstanceOf("Group", Group, TestPlanet.presentGroups[0]);
		
		TestPlanet.update();
    	console.log(TestPlanet.Production.productionTime);
    	console.log(TestPlanet.Production.remainingProductionTime);
		
		var TestProduction = new Production(10, 1)	//(Planetenmasse, Schiffstyp)
														//Produktionszeit für Typ 1 + Planetenmasse 10 = 100.000 / 10 = 10000 millisek
		
		
		queue.call('Step 1: Update() wird in 9,0 Sekunden aufgerufen.', function(callbacks) {
		    var myCallback = callbacks.add(function() {
		    	TestPlanet.update();
		    	console.log(TestPlanet.Production.productionTime);
		    	console.log(TestPlanet.Production.remainingProductionTime);
		    });
		    window.setTimeout(myCallback, 9000);
		    this.clock.tick(9010);
		 });
			
		queue.call('Step 2: Assert, dass Produktion noch nicht abgeschlossen', function() {
			assertFalse("False", TestPlanet.Production.update());
		 });
		
		queue.call('Step 3: Assert, dass Produktion abgeschlossen, Update() wird in 11,0 Sekunden aufgerufen.', function(callbacks) {
		    var myCallback = callbacks.add(function() {
		    	assertTrue("True", TestPlanet.Production.update());
		    	TestPlanet.update();
		    	console.log(TestPlanet.Production.productionTime);
		    	console.log(TestPlanet.Production.remainingProductionTime);
		    });
		    window.setTimeout(myCallback, 2000);
		    this.clock.tick(2010);
		 });
		
		queue.call('Step 4: Assert, dass Produktion erneut gestartet', function() {
			assertFalse("False", TestPlanet.Production.update());
		 });	
		
		queue.call('Step 5: Assert, dass Schiff/Gruppe produziert wurde', function() {
			assertInstanceOf("Group", Group, TestPlanet.presentGroups[0]);
		 });
		
		}, 
	
	});