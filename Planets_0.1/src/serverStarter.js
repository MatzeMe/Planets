/*	serverStarter.js
 * 
 * 	Author1: rszabad(si3ben)
 * 	Course: Test-driven Development mit JavaScript
 *
 *	wird als Stand-Alone genutzt um den Server zu starten
 *
 */

var server = require('./server.js');
 
console.log("Starting web server...");
server.start();
console.log("Successfully started web server. Waiting for incoming connections...");