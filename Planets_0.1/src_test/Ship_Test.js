TestCase("Ship_Test", {   
	
	setUp: function() { }, 		
	tearDown: function() { },   

			
"test Initialisierung / Gruen wenn Schiff korrekt initialisiert": function() {  

	var TestSchiff = new Ship(new Player(1), 1);
	
	assertInstanceOf("Owner", Player, TestSchiff.Owner);
	assertNumber("Type", TestSchiff.Type);
	assertNumber("Speed", TestSchiff.Speed);
	assertNumber("BuildingTime", TestSchiff.BuildingTime);
	assertNumber("LifePoints", TestSchiff.LifePoints);
	assertNumber("DealtDamage", TestSchiff.DealtDamage);
	assertTrue("TypeRange", (TestSchiff.Type == 1 || TestSchiff.Type == 2 || TestSchiff.Type == 3));   
	},  	
});
