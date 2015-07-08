function Fight(contestantsA)
{ 
	
	this.contestants = contestantsA;

	this.orderedContestants = [undefined, undefined, undefined, undefined, undefined, undefined];
	
	this.damagePerRound = [0,0,0,0,0,0];//Der Schaden, den diese Gruppe in diesem Durchgang erhalten wird (P1T1, P1T2, P1T3, P2T1, P2T2, P2T3)
	
	this.timeTillDestruction = [0,0,0,0,0,0];
	this.lastDestruction = [Date.now(),Date.now(),Date.now(),Date.now(),Date.now(),Date.now()];
	
	this.pool1 = 0;
	this.pool2 = 0;
	this.factor1 = 0;
	this.factor2 = 0;
	this.damagePerRound = [0,0,0,0,0,0];
	
	
	this.update = function(boole){
		
		this.countShips();
		
		this.battle(boole);
		
	}
	
	this.countShips = function(){
		this.orderedContestants = [undefined, undefined, undefined, undefined, undefined, undefined, ];
		for(var i = 0; i < this.contestants.length; i++){
			if(this.contestants[i].owner.ID == 1){
				if(this.contestants[i].type == 1){
					this.orderedContestants[0] = this.contestants[i];
				}
				if(this.contestants[i].type == 2){
					this.orderedContestants[1] = this.contestants[i];
				}
				if(this.contestants[i].type == 3){
					this.orderedContestants[2] = this.contestants[i];
				}
			}
			if(this.contestants[i].owner.ID == 2){
				if(this.contestants[i].type == 1){
					this.orderedContestants[3] = this.contestants[i];
				}
				if(this.contestants[i].type == 2){
					this.orderedContestants[4] = this.contestants[i];
				}
				if(this.contestants[i].type == 3){
					this.orderedContestants[5] = this.contestants[i];
				}
			}
		}
	}
		
	this.battle = function(boole){
		
		if(boole == true){
		this.pool1 = 0;
		this.pool2 = 0;
		this.factor1 = 0;
		this.factor2 = 0;
		this.damagePerRound = [0,0,0,0,0,0];
		this.damagePerRound = [0,0,0,0,0,0];//Der Schaden, den diese Gruppe in diesem Durchgang erhalten wird (P1T1, P1T2, P1T3, P2T1, P2T2, P2T3)
		
		this.timeTillDestruction = [0,0,0,0,0,0];
	
		if(this.orderedContestants[0] != undefined){		//Doppelten Schaden P1T1 gegen P2T2, falls nicht vorhanden, Schaden in Pool
			this.factor2++;
			if(this.orderedContestants[4] != undefined){
				this.damagePerRound[4] = (this.orderedContestants[0].ships.length * this.orderedContestants[0].ships[0].dealtDamage * 2);
			}
			else{
				this.pool1 += (this.orderedContestants[0].ships.length * this.orderedContestants[0].ships[0].dealtDamage);
			}
		}
		
		if(this.orderedContestants[1] != undefined){		//Doppelten Schaden P1T2 gegen P2T3, falls nicht vorhanden, Schaden in Pool
			this.factor2++;
			if(this.orderedContestants[5] != undefined){
				this.damagePerRound[5] = (this.orderedContestants[1].ships.length * this.orderedContestants[1].ships[0].dealtDamage * 2);
			}
			else{
				this.pool1 += (this.orderedContestants[1].ships.length * this.orderedContestants[1].ships[0].dealtDamage);
			}
		}
		
		if(this.orderedContestants[2] != undefined){		//Doppelten Schaden P1T3 gegen P2T1, falls nicht vorhanden, Schaden in Pool
			this.factor2++;
			if(this.orderedContestants[3] != undefined){
				this.damagePerRound[3] = (this.orderedContestants[2].ships.length * this.orderedContestants[2].ships[0].dealtDamage * 2);
			}
			else{
				this.pool1 += (this.orderedContestants[2].ships.length * this.orderedContestants[2].ships[0].dealtDamage);
			}
		}
		
		if(this.orderedContestants[3] != undefined){		//Doppelten Schaden P2T1 gegen P1T2, falls nicht vorhanden, Schaden in Pool
			this.factor1++;
			if(this.orderedContestants[1] != undefined){
				this.damagePerRound[1] = (this.orderedContestants[3].ships.length * this.orderedContestants[3].ships[0].dealtDamage * 2);
			}
			else{
				this.pool2 += (this.orderedContestants[3].ships.length * this.orderedContestants[3].ships[0].dealtDamage);
			}
		}
		
		if(this.orderedContestants[4] != undefined){		//Doppelten Schaden P2T2 gegen P1T3, falls nicht vorhanden, Schaden in Pool
			this.factor1++;
			if(this.orderedContestants[2] != undefined){
				this.damagePerRound[2] = (this.orderedContestants[4].ships.length * this.orderedContestants[4].ships[0].dealtDamage * 2);
			}
			else{
				this.pool2 += (this.orderedContestants[4].ships.length * this.orderedContestants[4].ships[0].dealtDamage);
			}
		}
		
		if(this.orderedContestants[5] != undefined){		//Doppelten Schaden P2T3 gegen P1T1, falls nicht vorhanden, Schaden in Pool
			this.factor1++;
			if(this.orderedContestants[0] != undefined){
				this.damagePerRound[0] = (this.orderedContestants[5].ships.length * this.orderedContestants[5].ships[0].dealtDamage * 2);
			}
			else{
				this.pool2 += (this.orderedContestants[5].ships.length * this.orderedContestants[5].ships[0].dealtDamage);
			}
		}
		
		//Schaden in Pool; egal, wem er zugefügt wird
		if(this.factor1 != 0){
			this.pool1 = this.pool1 / this.factor1;	//Wie viele Gruppen wird der Schaden aufgeteilt?
		}
		if(this.factor2 != 0){
			this.pool2 = this.pool2 / this.factor2;	//Wie viele Gruppen wird der Schaden aufgeteilt?
		}	
			
		for(var i = 0; i < 3; i++){
			if(this.orderedContestants[i] != undefined){
				this.damagePerRound[i] += this.pool2;	//Anteilig wird der erzeugte Schaden von Spieler 2 auf die Gruppen von Spieler 1 aufgeteilt
				this.timeTillDestruction[i] = (this.orderedContestants[i].ships.length * (this.orderedContestants[i].ships[0].lifePoints * 10000)) / (this.damagePerRound[i] * 10);
		
			}
		}
		
		for(var i = 3; i < 6; i++){
			if(this.orderedContestants[i] != undefined){
				this.damagePerRound[i] += this.pool1;
				this.timeTillDestruction[i] = (this.orderedContestants[i].ships.length * (this.orderedContestants[i].ships[0].lifePoints * 10000)) / (this.damagePerRound[i] * 10);
			}
		}
		 
		}
		
		for(var i = 0; i < 6; i++){
			if(this.orderedContestants[i] != undefined){
				if((this.timeTillDestruction[i] - (Date.now() - this.lastDestruction[i])) <= 0){
					this.orderedContestants[i].removeShip(1);
					somethingChanged("planet: " + this.planetID + " --> fight removed ship");
					this.lastDestruction[i] = Date.now();
				}
			}
		}
	}
	
} 