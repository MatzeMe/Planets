AsyncTestCase("GameControler_Test", {   
	
	setUp: function() { }, 
	tearDown: function() { },  

	/*
	 * 	initialisierung
	 * 
	 *
	 * 	planeten durch routen verbunden
	 * 
	 * 	sieg feststellen
	 * 
	 * 	framerate korrekt  
	 *  
	 */	
	
 
	

"test NoTest": function(queue) {  //2Routen, weil Routen Einbahnstrassen sein können
		
	var TestUniverse =[new Planet(15, 300, 100, 0), new Planet(15, 600, 200, 1), new Planet(10, 150, 250, 2), new Planet(20, 500, 350, 3)];
	var TestPlayer=[new Player(1), new Player(2)] 
	
	var Group1 = new Group(new Ship(TestPlayer[0],1));
	var Group2 = new Group(new Ship(TestPlayer[1],1)); 
	var Group3 = new Group(new Ship(TestPlayer[0],1)); 
	var Group4 = new Group(new Ship(TestPlayer[0],1));
	
	TestUniverse[0].setOwner(TestPlayer[0]);
	TestUniverse[1].setOwner(TestPlayer[1]); 
	

	var TestGC = new GameControler(TestUniverse, TestPlayer);
	
	Universe[2].addGroup(Group1); 
	Universe[0].addGroup(Group2); 
	Universe[0].addGroup(Group3); 
	Universe[0].addGroup(Group4); 
	
	console.log("schiffe");
	console.log(Universe[0].presentGroups);
	
	queue.call('Step 1: Group1, Player1, auf Planet2', function(callbacks) {
	    var myCallback = callbacks.add(function() {

	    });
	    window.setTimeout(myCallback, 1000); 
	 });
	queue.call('Step 2: Group1, Player1, auf Planet2', function(callbacks) {
	    var myCallback = callbacks.add(function() {

	    });
	    window.setTimeout(myCallback, 20000);  
	 });
	
	queue.call('Step 2: Group1, Player1, auf Planet2', function(callbacks) {
	    var myCallback = callbacks.add(function() {

	    });
	    window.setTimeout(myCallback, 20000);  
	 });
	
	queue.call('Step 2: Group1, Player1, auf Planet2', function(callbacks) {
	    var myCallback = callbacks.add(function() {

	    });
	    window.setTimeout(myCallback, 20000);  
	 });
	
	queue.call('Step 2: Group1, Player1, auf Planet2', function(callbacks) {
	    var myCallback = callbacks.add(function() {

	    });
	    window.setTimeout(myCallback, 20000);  
	 });
	
	},  
});
