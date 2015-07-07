/*	Player.js
 * 
 * 	Author: rszabad(si3ben)
 * 	Date: SS15, 8.6.15
 * 	Course: Test-driven Development mit JavaScript
 * 
 * 	Minimales Spielerobjekt mit ID und zugehöriger Farbe
 *  ID 99 zur Vereinfachung der Handhabung z.B. unbeanspruchter Planeten
 *
 */

function Player (IDA){
	
	this.ID = IDA;
	this.color;
	switch(this.ID) {
    case 1: this.color = "red"; break;
    case 2: this.color = "blue"; break;
    case 99: this.color = "white"; break;
	} 
	  
} ;   