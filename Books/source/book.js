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
	name: "enyo.Book",
	kind: "Control",
	published: {
		//"fade", "slade", "simple", "pop"
		transition: "fade",
		//allow for an action cue that processes input while still animating. This also makes animations go one at a time.
		cue: false,
		//set to false if you don't want the content to be forced into absolute. 
		//NOTE: if set to false, the "simple" transition will be used.
		absolute: true
	},
	components: [
		//The animator kind which steps through animations:
		{
			kind: "enyo.Animator",
			easingFunction: enyo.easing.linear,
			//We give this long name so as not to get it mixed up with pages:
			name: "theAnimationMachineForBook",
			startValue: 0,
			endValue: 1,
			duration: 500,
			onStep: "handleAnimationStep",
			onEnd: "handleAnimationEnd"
		}
	],
	
	startAnimation: function(panes){
		if(this.transitioning){
			this._cue.push({
				"action": "startAnimation", 
				"arguments": {
					"number": number,
					"history": history || "",
					 "index": index || ""
				}
			});
			return;
		}
		
		if(this.cue){
			this.transitioning = true;
		}
		
		//REAL: FIXME
		var c = this.getControls();
		this._showingPane = c[panes.show];
		this._hidingPane = c[panes.hide];
		
		this.pane = panes.show;
		if(panes.history && panes.history === false){
			//No history
		}else{
			this.history.push(this.pane);
			this.historyPane = this.history.length - 1;
		}
		
		var t = enyo.Book.transitions[this.transition] || enyo.Book.transitions.fade;
		
		this.$.theAnimationMachineForBook.setEasingFunction(t.easing || enyo.easing.linear);
		
		this.$.theAnimationMachineForBook.setDuration(t.transition.duration || 500);
		
		this._showingPane.show();
		this._hidingPane.show();
		
		this.$.theAnimationMachineForBook.play();
	},
	handleAnimationStep: function(inSender){
		enyo.Book.transitions[this.transition].step({
			show: this._showingPane,
			hide: this._hidingPane
		}, inSender);
	},
	handleAnimationEnd: function(){
		this._hidingPane.hide();
		this._end();
	},
	
	statics: {
		transitions: {},
		//Add transition:
		transition: function(inSender){
			//Extract name: 
			var name = inSender.name;
			delete inSender.name;
			if(!enyo.Book.transitions[name]){
				var t = {};
				
				//Override Easing:
				if(inSender.easing){
					t.easing = inSender.easing;
				}
				
				//Import transition properties:
				t.transition = inSender.transition;
				
				//enyo.Animator messes things up if the duration is 0, so we set it to 1 ms.
				//NOTE: If you're using a 0ms transition, you're better off just setting before/after properties.
				t.transition.duration === 0 ? t.transition.duration = 1 : "";
				
				//Automatic step handling:
				if(inSender.auto && inSender.auto === true){
					if(t.directional){
						//TODO: Handle directional transitions:
					}else{
						
					}
					
					//Make from/visible/out transitions easier for repeating properies:
					if(t.transition.hidden){
						t.transition.from = t.transition.hidden;
						t.transition.out = t.transition.hidden;
						delete t.transition.hidden;
					}
					
					//This is a base utility function which builds the differences between properties.
					var buildDifferences = function(objV, objH){
						var differences = {}
						for(var x in objV){
							if(objV.hasOwnProperty(x)){
								if(x === "transform"){
									differences.transform = buildDifferences(objV.transform, objH.transform);
								}
								var use = false;
								var percent = false;
								if(typeof(objV[x]) === "number"){
									use = true;
								}else if(typeof(objV[x]) === "string" && objV[x].charAt(objV[x].length-1) === "%"){
									use = true;
									percent = true;
								}
								
								if(use === true){
									differences[x] = parseFloat(objV[x]) - parseFloat(objH[x]) + (percent ? "%" : 0);
								}
							}
						}
						return differences;
					}
					
					var differencesShow = buildDifferences(t.transition.visible, t.transition.from);
					var differencesHide = buildDifferences(t.transition.visible, t.transition.out);
					
					/*
					 * For numbers:
					 * ------------
					 * First, see how much difference exists between the two values (1 -> 0.7 = 0.3)
					 * See how much the inSender.value is, and use that as our scaler. It always goes from 0 to 1.
					 * Multiply the inSender.value and the first difference value (0.3), and that's what we set the property to.
					 */
					
					//TODO: Adjust for directional transitions:
					var moveThrough = t.transition;
					t.step = function(controls, inSender){
						for(var x in differencesShow){
							if(differencesShow.hasOwnProperty(x)){
								if(x === "transform"){
									var d = differencesShow[x];
									for(var y in d){
										if(d.hasOwnProperty(y)){
											var show = (1 - inSender.value)*differencesShow.transform[y];
											var hide = inSender.value*differencesHide.transform[y];
											
											enyo.dom.transformValue(controls.show, y, moveThrough.visible.transform[y] - show);
											enyo.dom.transformValue(controls.hide, y, moveThrough.visible.transform[y] - hide);
										}
									}
								}else{
									//TODO: Percents:
									if(typeof(differencesShow[x]) === "string" && differencesShow[x].charAt(visible[x].length-1) === "%"){
										console.log("parsing percent");
									}
									
									var show = (1 - inSender.value)*differencesShow[x];
									var hide = inSender.value*differencesHide[x];
									
									controls.show.applyStyle(x, moveThrough.visible[x] - show);
									controls.hide.applyStyle(x, moveThrough.visible[x] - hide);
								}
							}
						}
					}
				}else{
					//TODO: Do it yourself.
				}
				
				enyo.Book.transitions[name] = t;
			}else{
				return false;
			}
		}
	},
	
	//cue lets you "fade through black" with transitions, so that they don't occur on top of each other.
	transitioning: false,
	
	// Same thing as transitioning, but a level up.
	movementing: false,
	
	/*
	 * Transition direction for slade
	 * "back", "next"
	 */
	direction: "next",
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
		
		//Inherit:
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
		if(this.pane < number) {
			this.direction = "next";
		}else{
			this.direction = "back";
		}
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
		if(this.pane < this._getPageNumber(name)) {
			this.direction = "next";
		}else{
			this.direction = "back";
		}
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
					
					this.startAnimation({"show": this._getPageNumber(name), "hide": this.pane});
					
					//this._hidePane(this.pane);
					//this._showPane(this._getPageNumber(name));
				}else{
					this._end();
				}
			}
		}
	},
	
	back: function(){
		this.direction = "back";
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
		this.direction = "next";
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
			if(this.cue){
				this.transitioning = true;
			}
			
			var c = this.getControls()[number];
			
			c.show();
			if(this.transition != "slade"){
				c.addClass("enyo-book-" + this.transition + "-in");
			}else{
				if(this.direction == "next"){
					c.addClass("enyo-book-sladenext-in");
				}else{
					c.addClass("enyo-book-sladeback-in");
				}
			}
			
			this.pane = number;
			if(history !== true){
				this.history.push(this.pane);
				this.historyPane = this.history.length-1;
			}else{
				this.historyPane = index;
			}
		}
	},
	_hidePane: function(number){
		if(this.transitioning){
			this._cue.push({"action": "_hidePane", "arguments": number});
		}else{
			if(this.cue){
				this.transitioning = true;
			}
				
			var c = this.getControls()[number];
			if(this.transition != "slade"){
				c.addClass("enyo-book-" + this.transition + "-out");
			}else{
				if(this.direction == "next"){
					c.addClass("enyo-book-sladenext-out");
				}else{
					c.addClass("enyo-book-sladeback-out");
				}
			}
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