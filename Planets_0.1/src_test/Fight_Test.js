AsyncTestCase("Fight_Test", {   
	
	setUp: function() {
		
		this.clock = sinon.useFakeTimers(Date.now());
		
		var testGroup1 = new Group(new Ship(new Player(1), 1));
		var testGroup2 = new Group(new Ship(new Player(2), 1));
		var testGroup3 = new Group(new Ship(new Player(1), 2));
		var testGroup4 = new Group(new Ship(new Player(2), 2));
		var testGroup5 = new Group(new Ship(new Player(1), 3));
		var testGroup6 = new Group(new Ship(new Player(2), 3));
		
		var testContestants = [];
		
		testContestants.push(testGroup1);
		testContestants.push(testGroup2);  
		testContestants.push(testGroup3);
		testContestants.push(testGroup4);  
		testContestants.push(testGroup5);
		testContestants.push(testGroup6);  
		
		testFight = new Fight(testContestants);
		
	}, 		
	tearDown: function() { 
		
		this.clock.restore(); 
		
	},   
	
	
	"test Sortieren / Gruen, wenn die ungeordneten Gruppen sortiert werden": function() {  
		
		testFight.update(true);
	
		assertEquals(1, testFight.orderedContestants[0].owner.ID);
		assertEquals(1, testFight.orderedContestants[1].owner.ID);
		assertEquals(1, testFight.orderedContestants[2].owner.ID);
		assertEquals(2, testFight.orderedContestants[3].owner.ID);
		assertEquals(2, testFight.orderedContestants[4].owner.ID);
		assertEquals(2, testFight.orderedContestants[5].owner.ID);
		
		assertEquals(1, testFight.orderedContestants[0].type);
		assertEquals(2, testFight.orderedContestants[1].type);
		assertEquals(3, testFight.orderedContestants[2].type);
		assertEquals(1, testFight.orderedContestants[3].type);
		assertEquals(2, testFight.orderedContestants[4].type);
		assertEquals(3, testFight.orderedContestants[5].type);		
	},
	
	
	"test Battle / Gruen, wenn der Schaden für die Runde korrekt berechnet wird": function() {  
		
		testFight.update(true);
		
		assertEquals(0, testFight.pool1);
		assertEquals(0, testFight.pool2);
		
		assertEquals(3, testFight.factor1);
		assertEquals(3, testFight.factor2);
		
		//Hier für alle mit der Formel für den Schadenboni, da jede Gruppe ihr bevorzugtes Ziel hat, mit aktueller Gruppenvorbereitung
		//damagePerRound = Anzahl Schiffe in AngreiferGruppe * erzeugter Schaden pro Schiff * 2); 
		// 		1 * 10 * 2 = 20
		assertEquals(20, testFight.damagePerRound[0]);
		assertEquals(20, testFight.damagePerRound[1]);
		assertEquals(20, testFight.damagePerRound[2]);
		assertEquals(20, testFight.damagePerRound[3]);
		assertEquals(20, testFight.damagePerRound[4]);
		assertEquals(20, testFight.damagePerRound[5]);
		
	},
	
	"test Battle / Gruen, wenn der Schaden für die Runde korrekt berechnet wird": function() {  
		
	
		var testGroup1 = new Group(new Ship(new Player(1), 1));
		//var testGroup2 = new Group(new Ship(new Player(2), 1));
		var testGroup3 = new Group(new Ship(new Player(1), 2));
		var testGroup4 = new Group(new Ship(new Player(2), 2));
		var testGroup5 = new Group(new Ship(new Player(1), 3));
		var testGroup6 = new Group(new Ship(new Player(2), 3));
		
		var testContestants2 = [];
		
		testContestants2.push(testGroup1);
		//testContestants2.push(testGroup2);  
		testContestants2.push(testGroup3);
		testContestants2.push(testGroup4);  
		testContestants2.push(testGroup5);
		testContestants2.push(testGroup6);  
		
		testFight2 = new Fight(testContestants2);
		
		testFight2.update(true);
		
	
		
		assertEquals(5, testFight2.pool1);	//10 / 2
		assertEquals(0, testFight2.pool2);
		
		assertEquals(2, testFight2.factor1);
		assertEquals(3, testFight2.factor2);
		
		//Hier für alle mit der Formel für den Schadenboni, da jede Gruppe ihr bevorzugtes Ziel hat, mit aktueller Gruppenvorbereitung
		//damagePerRound = Anzahl Schiffe in AngreiferGruppe * erzeugter Schaden pro Schiff * 2); 
		// 		1 * 10 * 2 = 20
		assertEquals(20, testFight2.damagePerRound[0]);
		assertEquals(0, testFight2.damagePerRound[1]);
		assertEquals(20, testFight2.damagePerRound[2]);
		assertEquals(0, testFight2.damagePerRound[3]);
		assertEquals(25, testFight2.damagePerRound[4]);
		assertEquals(25, testFight2.damagePerRound[5]);
		
	},
	
"test Battle / Gruen, wenn der Schaden für die Runde korrekt berechnet wird": function() {  
		
	
	
		var testGroup1 = new Group(new Ship(new Player(1), 1));
		//var testGroup2 = new Group(new Ship(new Player(2), 1));
		var testGroup3 = new Group(new Ship(new Player(1), 2));
		var testGroup4 = new Group(new Ship(new Player(2), 2));
		var testGroup5 = new Group(new Ship(new Player(1), 3));
		//var testGroup6 = new Group(new Ship(new Player(2), 3));
		
		var testContestants2 = [];
		
		testContestants2.push(testGroup1);
		//testContestants2.push(testGroup2);  
		testContestants2.push(testGroup3);
		testContestants2.push(testGroup4);  
		testContestants2.push(testGroup5);
		//testContestants2.push(testGroup6);  
		
		testFight2 = new Fight(testContestants2);
		
		testFight2.update(true);
		
		
		
		assertEquals(20, testFight2.pool1);	//20 / 1
		assertEquals(0, testFight2.pool2);
		
		assertEquals(1, testFight2.factor1);
		assertEquals(3, testFight2.factor2);
		
		//Hier für alle mit der Formel für den Schadenboni, da jede Gruppe ihr bevorzugtes Ziel hat, mit aktueller Gruppenvorbereitung
		//damagePerRound = Anzahl Schiffe in AngreiferGruppe * erzeugter Schaden pro Schiff * 2); 
		// 		1 * 10 * 2 = 20
		assertEquals(0, testFight2.damagePerRound[0]);
		assertEquals(0, testFight2.damagePerRound[1]);
		assertEquals(20, testFight2.damagePerRound[2]);
		assertEquals(0, testFight2.damagePerRound[3]);
		assertEquals(40, testFight2.damagePerRound[4]);
		assertEquals(0, testFight2.damagePerRound[5]);
		
	},
	
"test Battle / Gruen, wenn der Schaden für die Runde korrekt berechnet wird": function() {  

	
		var testGroup1 = new Group(new Ship(new Player(1), 1));
		//var testGroup2 = new Group(new Ship(new Player(2), 1));
		var testGroup3 = new Group(new Ship(new Player(1), 2));
		//var testGroup4 = new Group(new Ship(new Player(2), 2));
		var testGroup5 = new Group(new Ship(new Player(1), 3));
		//var testGroup6 = new Group(new Ship(new Player(2), 3));
		
		var testContestants2 = [];
		
		testContestants2.push(testGroup1);
		//testContestants2.push(testGroup2);  
		testContestants2.push(testGroup3);
		//testContestants2.push(testGroup4);  
		testContestants2.push(testGroup5);
		//testContestants2.push(testGroup6);  
		
		testFight2 = new Fight(testContestants2);
		
		testFight2.update(true);
		

		
		assertEquals(30, testFight2.pool1);	//20 / 1
		assertEquals(0, testFight2.pool2);
		
		assertEquals(0, testFight2.factor1);
		assertEquals(3, testFight2.factor2);
		
		//Hier für alle mit der Formel für den Schadenboni, da jede Gruppe ihr bevorzugtes Ziel hat, mit aktueller Gruppenvorbereitung
		//damagePerRound = Anzahl Schiffe in AngreiferGruppe * erzeugter Schaden pro Schiff * 2); 
		// 		1 * 10 * 2 = 20
		assertEquals(0, testFight2.damagePerRound[0]);
		assertEquals(0, testFight2.damagePerRound[1]);
		assertEquals(0, testFight2.damagePerRound[2]);
		assertEquals(0, testFight2.damagePerRound[3]);
		assertEquals(0, testFight2.damagePerRound[4]);
		assertEquals(0, testFight2.damagePerRound[5]);
		
	},

	"test Battle / Gruen, wenn die Gesamtzeit bis zur Zerstörung der Gruppe korrekt berechnet wird": function() {  
		
		var testGroup1 = new Group(new Ship(new Player(1), 1));
		//var testGroup2 = new Group(new Ship(new Player(2), 1));
		var testGroup3 = new Group(new Ship(new Player(1), 2));
		var testGroup4 = new Group(new Ship(new Player(2), 2));
		var testGroup5 = new Group(new Ship(new Player(1), 3));
		var testGroup6 = new Group(new Ship(new Player(2), 3));
		
		var testContestants2 = [];
		
		testContestants2.push(testGroup1);
		//testContestants2.push(testGroup2);  
		testContestants2.push(testGroup3);
		testContestants2.push(testGroup4);  
		testContestants2.push(testGroup5);
		testContestants2.push(testGroup6);  
		
		testFight2 = new Fight(testContestants2);
		
		testFight2.update(true);
		
		
		//timeTillDestruction = (Anzahl Schiffe Angriffene Gruppe * Lebenspunkte pro Schiff * 10000)) / (Schaden pro Runde * 10); 
		assertEquals(500, testFight2.timeTillDestruction[0]);
		assertEquals(0, testFight2.timeTillDestruction[1]);
		assertEquals(500, testFight2.timeTillDestruction[2]);
		assertEquals(0, testFight2.timeTillDestruction[3]);
		assertEquals(400, testFight2.timeTillDestruction[4]);
		assertEquals(400, testFight2.timeTillDestruction[5]);
		
	},
		

	"test Battle / Gruen, wenn die Gesamtzeit bis zur Zerstörung der Gruppe korrekt berechnet wird": function() {  
		
		var testGroup1 = new Group(new Ship(new Player(1), 1));
		//var testGroup2 = new Group(new Ship(new Player(2), 1));
		var testGroup3 = new Group(new Ship(new Player(1), 2));
		var testGroup4 = new Group(new Ship(new Player(2), 2));
		var testGroup5 = new Group(new Ship(new Player(1), 3));
		//var testGroup6 = new Group(new Ship(new Player(2), 3));
		
		var testContestants2 = [];
		
		testContestants2.push(testGroup1);
		//testContestants2.push(testGroup2);  
		testContestants2.push(testGroup3);
		testContestants2.push(testGroup4);  
		testContestants2.push(testGroup5);
		//testContestants2.push(testGroup6);  
		
		testFight2 = new Fight(testContestants2);
		
		testFight2.update(true);
		
			
		//timeTillDestruction = (Anzahl Schiffe Angriffene Gruppe * Lebenspunkte pro Schiff * 10000)) / (Schaden pro Runde * 10); 
		assertEquals(0, testFight2.timeTillDestruction[0]);
		assertEquals(0, testFight2.timeTillDestruction[1]);
		assertEquals(500, testFight2.timeTillDestruction[2]);
		assertEquals(0, testFight2.timeTillDestruction[3]);
		assertEquals(250, testFight2.timeTillDestruction[4]);
		assertEquals(0, testFight2.timeTillDestruction[5]);
		
	},
	

	"test Battle / Gruen, wenn die Gesamtzeit bis zur Zerstörung der Gruppe korrekt berechnet wird": function() {  
		

		
		var testGroup1 = new Group(new Ship(new Player(1), 1));
		//var testGroup2 = new Group(new Ship(new Player(2), 1));
		var testGroup3 = new Group(new Ship(new Player(1), 2));
		//var testGroup4 = new Group(new Ship(new Player(2), 2));
		var testGroup5 = new Group(new Ship(new Player(1), 3));
		//var testGroup6 = new Group(new Ship(new Player(2), 3));
		
		var testContestants2 = [];
		
		testContestants2.push(testGroup1);
		//testContestants2.push(testGroup2);  
		testContestants2.push(testGroup3);
		//testContestants2.push(testGroup4);  
		testContestants2.push(testGroup5);
		//testContestants2.push(testGroup6);  
		
		testFight2 = new Fight(testContestants2);
		
		testFight2.update(true);
		
		//timeTillDestruction = (Anzahl Schiffe Angriffene Gruppe * Lebenspunkte pro Schiff * 10000)) / (Schaden pro Runde * 10); 
		assertEquals(0, testFight.timeTillDestruction[0]);
		assertEquals(0, testFight.timeTillDestruction[1]);
		assertEquals(0, testFight.timeTillDestruction[2]);
		assertEquals(0, testFight.timeTillDestruction[3]);
		assertEquals(0, testFight.timeTillDestruction[4]);
		assertEquals(0, testFight.timeTillDestruction[5]);
		
	},
	

	"test Battle / Gruen, wenn die Gesamtzeit bis zur Zerstörung der Gruppe korrekt berechnet wird": function() {  
		
		testFight.update(true);
	
		//this.timeTillDestruction = [0,0,0,0,0,0];
		//this.lastDestruction = [Date.now(),Date.now(),Date.now(),Date.now(),Date.now(),Date.now()];
		
		//timeTillDestruction = (Anzahl Schiffe Angriffene Gruppe * Lebenspunkte pro Schiff * 10000)) / (Schaden pro Runde * 10); 
		//		1 * 10 * 10000 / 20 * 10
		//			100000ms	/ 200 = 500			--> Es dauert bei Schadensboni 0.5sek um Gruppe zu zerstören
		assertEquals(500, testFight.timeTillDestruction[0]);
		assertEquals(500, testFight.timeTillDestruction[1]);
		assertEquals(500, testFight.timeTillDestruction[2]);
		assertEquals(500, testFight.timeTillDestruction[3]);
		assertEquals(500, testFight.timeTillDestruction[4]);
		assertEquals(500, testFight.timeTillDestruction[5]);
		
	},
	
	"test Erkennen der Zerstörung eines Schiffs ": function(queue) {  
 		
		testFight.update(true);
		
		assertNotUndefined(1, testFight.orderedContestants[0].ships[0]);
		assertNotUndefined(1, testFight.orderedContestants[1].ships[0]);
		assertNotUndefined(1, testFight.orderedContestants[2].ships[0]);
		assertNotUndefined(1, testFight.orderedContestants[3].ships[0]);
		assertNotUndefined(1, testFight.orderedContestants[4].ships[0]);
		assertNotUndefined(1, testFight.orderedContestants[5].ships[0]);
		
		//Alle Schiffe sollten nach 500ms zerstört sein
		
				queue.call('Step 1: kurz vor 500ms sind Schiffe noch vorhanden', function(callbacks) {
				    var myCallback = callbacks.add(function() { 
				    	testFight.update(false);
				    	assertNotUndefined(1, testFight.orderedContestants[0].ships[0]);
				    	assertNotUndefined(1, testFight.orderedContestants[1].ships[0]);
				    	assertNotUndefined(1, testFight.orderedContestants[2].ships[0]);
				    	assertNotUndefined(1, testFight.orderedContestants[3].ships[0]);
				    	assertNotUndefined(1, testFight.orderedContestants[4].ships[0]);
				    	assertNotUndefined(1, testFight.orderedContestants[5].ships[0]);
			
				    });
				    window.setTimeout(myCallback, 490);
				    this.clock.tick(491); 
				 });
			
				queue.call('Step 2: kurz nach 500ms sind Schiffe zerstört', function(callbacks) {
				    var myCallback = callbacks.add(function() { 
				    	testFight.update(false);
				    	assertUndefined(1, testFight.orderedContestants[0].ships[0]);
				    	assertUndefined(1, testFight.orderedContestants[1].ships[0]);
				    	assertUndefined(1, testFight.orderedContestants[2].ships[0]);
				    	assertUndefined(1, testFight.orderedContestants[3].ships[0]);
				    	assertUndefined(1, testFight.orderedContestants[4].ships[0]);
				    	assertUndefined(1, testFight.orderedContestants[5].ships[0]);
				    });
				    window.setTimeout(myCallback, 20);
				    this.clock.tick(21); 
				 });
				
				}, 
				
	"test Erkennen der Zerstörung eines Schiffs ": function(queue) {  
 		
		var testGroup1 = new Group(new Ship(new Player(1), 1));
		//var testGroup2 = new Group(new Ship(new Player(2), 1));
		var testGroup3 = new Group(new Ship(new Player(1), 2));
		var testGroup4 = new Group(new Ship(new Player(2), 2));
		var testGroup5 = new Group(new Ship(new Player(1), 3));
		var testGroup6 = new Group(new Ship(new Player(2), 3));
		
		var testContestants2 = [];
		
		testContestants2.push(testGroup1);
		//testContestants2.push(testGroup2);  
		testContestants2.push(testGroup3);
		testContestants2.push(testGroup4);  
		testContestants2.push(testGroup5);
		testContestants2.push(testGroup6);  
		
		testFight2 = new Fight(testContestants2);
		
		testFight2.update(true);
		
		//500 0 500 0 400 400 Zerstörung nach ms
		
				queue.call('Step 1: kurz vor 400ms sind Schiffe noch vorhanden', function(callbacks) {
				    var myCallback = callbacks.add(function() { 
				    	testFight2.update(false);
		
				    	assertNotUndefined(1, testFight2.orderedContestants[0].ships[0]);
				    	assertNotUndefined(1, testFight2.orderedContestants[1].ships[0]);
				    	assertNotUndefined(1, testFight2.orderedContestants[2].ships[0]);
				    	assertUndefined(1, testFight2.orderedContestants[3]);
				    	assertNotUndefined(1, testFight2.orderedContestants[4].ships[0]);
				    	assertNotUndefined(1, testFight2.orderedContestants[5].ships[0]); 

				    });
				    window.setTimeout(myCallback, 390);
				    this.clock.tick(391); 
				 });
			
				queue.call('Step 2: kurz nach 400ms sind erste Schiffe zerstört', function(callbacks) {
				    var myCallback = callbacks.add(function() { 
				    	testFight2.update(false);
		
				    	assertNotUndefined(1, testFight2.orderedContestants[0].ships[0]);
				    	assertNotUndefined(1, testFight2.orderedContestants[1].ships[0]);
				    	assertNotUndefined(1, testFight2.orderedContestants[2].ships[0]);
				    	assertUndefined(1, testFight2.orderedContestants[3]);
				    	assertUndefined(1, testFight2.orderedContestants[4].ships[0]);
				    	assertUndefined(1, testFight2.orderedContestants[5].ships[0]); 
				    });
				    window.setTimeout(myCallback, 20); 
				    this.clock.tick(21); 
				 });
				
			
				}, 	
				
			
	
});