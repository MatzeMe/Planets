function Planet(MassA, xA, yA){ 

	this.Mass = MassA;
	this.TravelRadius = this.Mass * 30;
	this.x = xA;
	this.y = yA;
	this.Owner;
	this.presentGroups = [];
	
	this.setOwner = function(OwnerA){
	
		this.Owner = OwnerA;
	}
	
	this.addGroup = function(GroupA){
		
		this.presentGroups.push(GroupA);
	}
	
	this.removeGroup = function(GroupA){
		
		this.presentGroups.splice(this.presentGroups.indexOf(GroupA), 1);
		console.log("asd"); 
		
	}
	
	this.mergeGroups = function(GroupA, GroupB){
		
		
		GroupA.Ships = GroupA.Ships.concat(GroupB.Ships);
		GroupB.Ships = [];
		GroupB.Destroyed = true;
		return GroupA;
		
	}
	
	this.checkGroups = function(){
		
		//Gleiche Gruppen zusammenfassen
		for(var i = 0; i < this.presentGroups.length; i++){
			if(this.presentGroups[i].Destroyed == false){
				
				for(var o = i + 1; o < this.presentGroups.length; o++){
					if(this.presentGroups[i].Owner.ID == this.presentGroups[o].Owner.ID && this.presentGroups[i].Type == this.presentGroups[o].Type){
						this.presentGroups[i] = this.mergeGroups(this.presentGroups[i], this.presentGroups[o]);
					}
				}
				
				
			}
		}
		
		//Leere Gruppen zusammenfassen
		for(var i = 0; i < this.presentGroups.length; i++){
			if(this.presentGroups[i].Destroyed == true){
				this.removeGroup(this.presentGroups[i]);
			}
		}
	}
	
}