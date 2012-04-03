/* 
 * Copyright (c) 2012 Villo Labs

 * Permission is hereby granted, free of charge, to any person obtaining a copy 
 * of this software and associated documentation files (the "Software"), to 
 * deal in the Software without restriction, including without limitation the 
 * rights to use, copy, modify, merge, publish, distribute, sublicense, and/or 
 * sell copies of the Software, and to permit persons to whom the Software is 
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in 
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE 
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN 
 * THE SOFTWARE.
 */


enyo.kind({
	name: "Book",
	kind: "Control",
	published: {
		//"fade", "simple", "pop"
		transition: "fade",
		//allow for an action cue that processes input while still animating. This also makes animations go one at a time.
		cue: false,
		//set to false if you don't want the content to be forced into absolute. 
		//NOTE: if set to false, the "simple" transition will be used.
		absolute: true
	},
	transitions: {
		//Timing for transition properties.
		"simple": 0,
		"fade": 500,
		"pop": 500
	},
	/*
	 * cue lets you "fade through black" with transitions, so that they don't occur on top of each other.
	 */
	transitioning: false,
	/*
	 * Same thing as transitioning, but a level up.
	 */
	movementing: false,
	defaultKind: "Page",
	create: function(){
		if(this.absolute === false){
			//Swap for controls.
			this.defaultKind = "Control";
			this.transition = "simple";
		}
		
		this.setOwner = this.owner;
		this.pane = null;
		this.lazy = [];
		//OP
		this.history = [];
		this.historyPane = null;
		this.inherited(arguments);
		
		// Make all of the Pages invisible to start out with.
		for(x in this.getControls()){
			if(this.getControls().hasOwnProperty(x)){
				this.getControls()[x].hide();
			}
		}
	},
	
	rendered: function(){
		this.inherited(arguments);
		this._showPane(0, true);
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
				
				if(this.absolute === false){
					if(this.components[x].absolute = false);
				}
			}
		}
		this.components = c;
		this.inherited(arguments);
	},
	pageNumber: function(number){
		if(this.pane !== number){
			if(this.movementing){
				if(this.cue){
					this._cue({
						"action": "pageNumber",
						"arguments": number
					});
				}
			}else{
				this.movementing = true;
				this._hidePane(this.pane);
				this._showPane(number);
			}
		}
	},
	pageName: function(name){
		if(this.movementing){
			if(this.cue){
				this._cue.push({
					"action": "pageName",
					"arguments": name
				});
			}
		}else{
			this.movementing = true;
			/*
			 * Check for lazy pages.
			 */
			if(this._paneIsLazy(name)){
				//Check for already rendered lazy views
				this._hidePane(this.pane);
				this.createComponent(this._getLazyPane(name), {owner: this.owner});
				this.getControls()[this._getPageNumber(name)].render();
				this._showPane(this._getPageNumber(name));
				this._deleteLazyPane(name);
			}else{
				if(this.pane !== this._getPageNumber(name)){
					this._hidePane(this.pane);
					this._showPane(this._getPageNumber(name));
				}else{
					this._end();
				}
			}
		}
	},
	
	back: function(){
		if(this.movementing){
			if(this.cue){
				this._cue.push({
					"action": "back",
					"arguments": ""
				});
			}
		}else{
			if(this.history[this.historyPane-1]){
				this._hidePane(this.pane);
				this._showPane(this.history[this.historyPane-1], true, this.historyPane-1);
			}else{
				return false;
			}
		}
	},
	next: function(){
		if(this.movementing){
			if(this.cue){
				this._cue.push({
					"action": "next",
					"arguments": ""
				});
			}
		}else{
			if(this.history[this.historyPane+1]){
				this._hidePane(this.pane);
				this._showPane(this.history[this.historyPane+1], true, this.historyPane+1);
			}else{
				return false;
			}
		}
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
	
	//Set up the cue, which we can use to push actions that we need to delay.
	_cue: [],
	
	//Core utility show and hide functions
	_showPane: function(number, history, index){
		//Extract from cued functions:
		if(typeof(number) === "object"){
			var index = number.index;
			var history = number.history;
			var number = number.number;
		}
		if(this.transitioning){
			this._cue.push({
				"action": "_showPane", 
				"arguments": {
					"number": number,
					"history": history || "",
					 "index": index || ""
				}
			});
		}else{
			if(this.cue)
				this.transitioning = true;
				
			var c = this.getControls()[number];
			c.show();
			c.addClass("enyo-book-" + this.transition + "-in");
			
			this.pane = number;
			if(history !== true){
				this.history.push(this.pane);
				this.historyPane = this.history.length-1;
			}else{
				this.historyPane = index;
			}
			
			window.setTimeout(enyo.bind(this, function(){
				c.show();
				c.removeClass("enyo-book-" + this.transition + "-in");
				this._end();
			}), this.transitions[this.transition]);
		}
	},
	_hidePane: function(number){
		if(this.transitioning){
			this._cue.push({"action": "_hidePane", "arguments": number});
		}else{
			if(this.cue)
				this.transitioning = true;
				
			var c = this.getControls()[number];
			c.addClass("enyo-book-" + this.transition + "-out");
			window.setTimeout(enyo.bind(this, function(){
				c.hide();
				c.removeClass("enyo-book-" + this.transition + "-out");
				this._end();
			}), this.transitions[this.transition]);
		}
	},
	
	_end: function(){
		this.movementing = false;
		this.transitioning = false;
		this._startCue();
	},
	
	_startCue: function(){
		if(this._cue.length >= 1){
			var action = this._cue[0].action;
			var args = this._cue[0].arguments;
			this._cue.splice(0, 1)
			this[action](args);
		}
	}
});