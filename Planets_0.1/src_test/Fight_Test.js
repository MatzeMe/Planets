AsyncTestCase("Fight_Test", {   
	
	setUp: function() { }, 		
	tearDown: function() { },   

			
"test Initialisierung / Gruen wenn Fight korrekt initialisiert": function() {  

		var Contestants = [new Group(new Ship(new Owner(1),1)), new Group(new Ship(new Owner(2),1))];
	
		var TestFight = new Fight(Contestants);
		
		assertInstanceOf("Contestants", Group, Contestants[0]);
		assertInstanceOf("Contestants", Group, Contestants[1]);
		assertUndefined("Contestants", Contestants[2]);
	
	},  	
	

});