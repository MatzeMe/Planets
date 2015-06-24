TestCase("Ship_Test", {   
	
	setUp: function() { }, 		
	tearDown: function() { },   
			
"test Initialisierung / Gruen wenn Player korrekt initialisiert": function() {  

	var TestPlayer1 = new Player(1);
	var TestPlayer2 = new Player(2);
	var TestPlayer99 = new Player(99);
	
	
	assertNumber("ID", TestPlayer1.ID);
	assertString("Color", TestPlayer1.color);
	
	assertEquals("ID", 1, TestPlayer1.ID);
	assertEquals("ID", 2, TestPlayer2.ID);
	assertEquals("ID", 99, TestPlayer99.ID);
	
	assertEquals("Color", "red", TestPlayer1.color);
	assertEquals("Color", "blue", TestPlayer2.color);
	assertEquals("Color", "white", TestPlayer99.color);
	
	},  	
});
