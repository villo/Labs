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
	classes: "enyo-book",
	published: {
		//"fade", "slade", "slide", "spoode", "simple", "pop"
		transition: "fade",
		
		//No longer used:
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
				
				if(inSender.directional && inSender.directional === true){
					t.directional = true;
				}
				
				//Import transition properties:
				t.transition = inSender.transition;
				
				t.duration = inSender.duration || 500;
				
				//enyo.Animator messes things up if the duration is 0, so we set it to 1 ms.
				//NOTE: If you're using a 0ms transition, you're better off just setting before/after properties.
				t.duration === 0 ? t.duration = 1 : "";
				
				//Make from/visible/out transitions easier for repeating properies:
				if(t.transition.hidden){
					t.transition.from = t.transition.hidden;
					t.transition.out = t.transition.hidden;
					delete t.transition.hidden;
				}
				
				//Automatic step handling:
				if(inSender.auto && inSender.auto === true){
					//This is a base utility function which builds the differences between properties.
					var buildDifferences = function(objV, objH){
						var differences = {};
						for(var x in objV){
							if(objV.hasOwnProperty(x)){
								if(x === "transform"){
									differences.transform = buildDifferences(objV.transform, objH.transform);
								}
								//Parse for numbers, percents, degrees, and pixels:
								var use = false;
								var end = null;
								if(typeof(objV[x]) === "number"){
									use = true;
									end = 0;
								}else if(typeof(objV[x]) === "string" && objV[x].charAt(objV[x].length-1) === "%"){
									use = true;
									end = "%";
								}else if(typeof(objV[x]) === "string" && objV[x].substring(objV[x].length-3).toLowerCase() === "deg"){
									use = true;
									end = "deg";
								}else if(typeof(objV[x]) === "string" && objV[x].substring(objV[x].length-1).toLowerCase() === "px"){
									use = true;
									end = "px";
								}
								
								if(use === true){
									differences[x] = parseFloat(objV[x]) - parseFloat(objH[x]) + end;
								}
							}
						}
						return differences;
					}
						
					var differences = {};
					if(t.directional){
						differences = {
							next: {
								show: buildDifferences(t.transition.next.visible, t.transition.next.from),
								hide: buildDifferences(t.transition.next.visible, t.transition.next.out)
							},
							back: {
								show: buildDifferences(t.transition.back.visible, t.transition.back.from),
								hide: buildDifferences(t.transition.back.visible, t.transition.back.out)
							}
						}
					}else{
						differences = {
							show: buildDifferences(t.transition.visible, t.transition.from),
							hide: buildDifferences(t.transition.visible, t.transition.out)
						}
					}
					
					t.step = function(controls, inSender, direction){
						
						//Direciton handling:
						var diff = differences;
						var moveThrough = t.transition;
						if(t.directional){
							diff = differences[direction];
							moveThrough = t.transition[direction];
						}
						
						for(var x in diff.show){
							if(diff.show.hasOwnProperty(x)){
								if(x === "transform"){
									var d = diff.show[x];
									for(var y in d){
										if(d.hasOwnProperty(y)){
											
											var end = 0;
											if(typeof(d[y]) === "string" && d[y].charAt(d[y].length-1) === "%"){
												use = true;
												end = "%";
											}else if(typeof(d[y]) === "string" && d[y].substring(d[y].length-3).toLowerCase() === "deg"){
												use = true;
												end = "deg";
											}else if(typeof(d[y]) === "string" && d[y].substring(d[y].length-1).toLowerCase() === "px"){
												use = true;
												end = "px";
											}
											
											var show = (1 - inSender.value)*parseFloat(diff.show.transform[y]);
											var hide = inSender.value*parseFloat(diff.hide.transform[y]);
											
											if(controls.show){
												enyo.dom.transformValue(controls.show, y, parseFloat(moveThrough.visible.transform[y]) - show + (end));
											}
											if(controls.hide){
												enyo.dom.transformValue(controls.hide, y, parseFloat(moveThrough.visible.transform[y]) - hide + (end));
											}
										}
									}
								}else{
									//TODO: Percents:
									var percent = false;
									if(typeof(diff.show[x]) === "string" && diff.show[x].charAt(diff.show[x].length-1) === "%"){
										percent = true;
									}
									
									var end = 0;
									if(typeof(diff.show[x]) === "string" && diff.show[x].charAt(diff.show[x].length-1) === "%"){
										use = true;
										end = "%";
									}else if(typeof(diff.show[x]) === "string" && diff.show[x].substring(diff.show[x].length-3).toLowerCase() === "deg"){
										use = true;
										end = "deg";
									}else if(typeof(diff.show[x]) === "string" && diff.show[x].substring(diff.show[x].length-1).toLowerCase() === "px"){
										use = true;
										end = "px";
									}
									
									var show = (1 - inSender.value)*parseFloat(diff.show[x]);
									var hide = inSender.value*parseFloat(diff.hide[x]);
									
									if(controls.show){
										controls.show.applyStyle(x, parseFloat(moveThrough.visible[x]) - show + (end));
									}
									if(controls.hide){
										controls.hide.applyStyle(x, parseFloat(moveThrough.visible[x]) - hide + (end));
									}
								}
							}
						}
					}
				}else{
					t.step = inSender.step;
				}
				
				enyo.Book.transitions[name] = t;
			}else{
				return false;
			}
		}
	},
	
	// Same thing as transitioning, but a level up.
	movementing: false,
	
	//Transition direction ("back", "next")
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
		this.startAnimation({
			show: 0,
			hide: false
		});
	},
	
	startAnimation: function(panes){
		//We are moving:
		this.movementing = true;
		
		var c = this.getControls();
		this._showingPane = c[panes.show];
		this._hidingPane = c[panes.hide];
		
		if(panes.disableHistory && panes.disableHistory === true){
			//No history
			this.historyPane = panes.index;
		}else{
			this.history.push(parseInt(panes.show));
			this.historyPane = this.history.length - 1;
		}
		
		console.log(this.history);
		
		var t = enyo.Book.transitions[this.transition] || enyo.Book.transitions.fade;
		
		this.$.theAnimationMachineForBook.setEasingFunction(t.easing || enyo.easing.linear);
		
		this.$.theAnimationMachineForBook.setDuration(t.duration || 500);
		
		this._showingPane ? this._showingPane.show() : "";
		this._hidingPane ? this._hidingPane.show(): "";
		
		this.pane = panes.show;
		
		this.$.theAnimationMachineForBook.play();
	},
	
	handleAnimationStep: function(inSender){
		enyo.Book.transitions[this.transition].step({
			show: this._showingPane,
			hide: this._hidingPane
		}, inSender, this.direction);
	},
	
	handleAnimationEnd: function(){
		
		//This resets the styles applied to the element, so as to clear up the residue from animations.
		//FIXME: Allow for before/after styles to carry over.
		
		this._showingPane ? this._showingPane.domStyles = [] : "";
		this._showingPane ? this._showingPane.domStylesChanged() : "";
		
		this._hidingPane ? this._hidingPane.domStyles = [] : "";
		this._hidingPane ? this._hidingPane.domStylesChanged() : "";
		
		this._hidingPane ? this._hidingPane.hide() : "";
		
		this._end();
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
		//Adjust to array-friendly numbers:
		number = number-1;
		
		if(this.pane < number) {
			this.direction = "next";
		}else{
			this.direction = "back";
		}
		
		if(this.pane !== number){
			if(this.movementing){
				
			}else{	
				this.startAnimation({"show": number, "hide": this.pane});
			}
		}
	},
	pageName: function(name){
		//Establish Direction:
		if(this.pane < this._getPageNumber(name)) {
			this.direction = "next";
		}else{
			this.direction = "back";
		}
		
		if(this.movementing){
			//Do nothing.
		}else{
			/*
			 * Check for lazy pages.
			 */
			if(this._paneIsLazy(name)){
				//TODO:
				//Check for already rendered lazy views
				this._hidePane(this.pane);
				this.createComponent(this._getLazyPane(name), {owner: this.owner});
				this.getControls()[this._getPageNumber(name)].render();
				this._showPane(this._getPageNumber(name));
				this._deleteLazyPane(name);
			}else{
				if(this.pane !== this._getPageNumber(name)){
					this.startAnimation({
						"show": this._getPageNumber(name), 
						"hide": this.pane
					});
				}else{
					this._end();
				}
			}
		}
	},
	
	back: function(){
		this.direction = "back";
		if(this.movementing){
			
		}else{
			if(typeof(this.history[this.historyPane-1]) === "number"){
				this.startAnimation({
					show: this.history[this.historyPane-1], 
					hide: this.pane,
					disableHistory: true,
					index: this.historyPane-1
				});
			}else{
				return false;
			}
		}
	},
	next: function(){
		this.direction = "next";
		if(this.movementing){
			
		}else{
			if(typeof(this.history[this.historyPane+1]) === "number"){
				this.startAnimation({
					show: this.history[this.historyPane+1], 
					hide: this.pane,
					disableHistory: true,
					index: this.historyPane+1
				});
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
		return parseInt(number);
	},
	
	//Core utility show and hide functions
	_showPane: function(number, history, index){
		if(typeof(number) === "object"){
			var index = number.index;
			var history = number.history;
			var number = number.number;
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
	},
	_hidePane: function(number){
				
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
	},
	
	_end: function(){
		this.movementing = false;
	}
});