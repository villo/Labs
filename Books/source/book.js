/*
 * Enyo 2.0 Book
 * 
 * Contains "Pages", which can be viewed on demand.
 */

enyo.kind({
	name: "Book",
	kind: "Control",
	published: {
		
	},
	create: function(){
		this.setOwner = this.owner;
		this.pane = null;
		this.lazy = [];
		//OP
		this.history = [];
		this.historyPane = null;
		this.inherited(arguments);
		
		/*
		 * Make all of the Pages invisible to start out with.
		 */
		for(x in this.getControls()){
			if(this.getControls().hasOwnProperty(x)){
				this.getControls()[x].hide();
			}
		}
		this._showPane(0);
	},
	initComponents: function(){
		var c = [];
		for(x in this.components){
			if(this.components.hasOwnProperty(x)){
				/*
				 * Check for lazy pages. If it's lazy, push it to a var. If it's not, then k
				 */
				if(this.components[x].lazy && this.components[x].lazy == true){
					this.lazy.push(this.components[x]);
				}else{
					c.push(this.components[x]);
				}
			}
		}
		this.components = c;
		this.inherited(arguments);
	},
	pageNumber: function(number){
		this._hidePane(this.pane);
		this._showPane(number);
	},
	pageName: function(name){
		/*
		 * Check for lazy pages.
		 */
		if(this._paneIsLazy(name)){
			//Check for already rendered lazy views
			this._hidePane(this.pane);
			this.createComponent(this._getLazyPane(name));
			this.$[name].owner = this.owner;
			this.$[name].render();
			this._showPane(this._getPageNumber(name));
			this._deleteLazyPane(name);
		}else{
			this._hidePane(this.pane);
			this._showPane(this._getPageNumber(name));
		}
	},
	
	back: function(){
		this._hidePane(this.pane);
		this._showPane(this.history[this.historyPane-1], true, this.historyPane-1);
	},
	next: function(){
		this._hidePane(this.pane);
		this._showPane(this.history[this.historyPane+1], true, this.historyPane+1);
	},
	
	_paneIsLazy: function(name){
		var lazy = false;
		for(x in this.lazy){
			if(this.lazy.hasOwnProperty(x)){
				if(this.lazy[x].name === name){
					lazy = true;
				}
			}
		}
		return lazy;
	},
	_getLazyPane: function(name){
		var lazy = [];
		for(x in this.lazy){
			if(this.lazy.hasOwnProperty(x)){
				if(this.lazy[x].name === name){
					lazy = this.lazy[x];
				}
			}
		}
		return lazy;
	},
	_deleteLazyPane: function(name){
		for(x in this.lazy){
			if(this.lazy.hasOwnProperty(x)){
				if(this.lazy[x].name === name){
					delete this.lazy[x];
				}
			}
		}
		return true;
	},
	_getPageNumber: function(name){
		var number = null;
		for(x in this.getControls()){
			if(this.getControls().hasOwnProperty(x)){
				if(this.getControls()[x].name === name){
					number = x;
				}
			}
		}
		return number;
	},
	_showPane: function(number, history, index){
		this.getControls()[number].show();
		this.pane = number;
		if(history !== true){
			this.history.push(this.pane);
			this.historyPane = this.history.length-1;
		}else{
			this.historyPane = index;
		}
	},
	_hidePane: function(number){
		this.getControls()[number].hide();
	}
});