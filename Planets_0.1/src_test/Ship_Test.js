var TestSchiff = new Ship(new Owner(), 1); 


TestCase("Ship_Test", {  
	setUp: function() { 
		
		}, 
		
		tearDown: function() { 

			},  

			

"test Initialisierung / Gruen wenn Owner & Type korrekt initialisiert": function() {  

	assertInstanceOf("Owner", Owner, TestSchiff.Owner);
	assertNumber("Type", TestSchiff.Type);
	assertTrue("TypeRange", (TestSchiff.Type == 1 || TestSchiff.Type == 2 || TestSchiff.Type == 3));
   
	},  
	
	
	
});
