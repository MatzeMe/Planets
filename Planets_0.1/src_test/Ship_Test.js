TestCase("Ship_Test", {   
	
	setUp: function() { }, 		
	tearDown: function() { },   

			
"test Initialisierung / Gruen wenn Schiff korrekt initialisiert": function() {  

	var TestSchiff = new Ship(new Player(1), 1);
	
	assertInstanceOf("Owner", Player, TestSchiff.owner);
	assertNumber("Type", TestSchiff.type);
	assertNumber("Speed", TestSchiff.speed);
	assertNumber("BuildingTime", TestSchiff.buildingTime);
	assertNumber("LifePoints", TestSchiff.lifePoints);
	assertNumber("DealtDamage", TestSchiff.dealtDamage);
	assertTrue("TypeRange", (TestSchiff.type == 1 || TestSchiff.type == 2 || TestSchiff.type == 3));   
	},  	
});
