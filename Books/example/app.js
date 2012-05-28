enyo.kind({
	name: "BookTest",
	kind: "Control",
	components: [
		{tag: "div", style: "position:absolute; width:100%; height:24px", name: "buttonDiv", components:[
			{kind: "Button", onclick: "changeView", content: "1", view: 1},
			{kind: "Button", onclick: "changeView", content: "2", view: 2},
			{kind: "Button", onclick: "changeView", content: "3", view: 3},
			{kind: "Button", onclick: "changeView", content: "4", view: 4},
			{kind: "Button", onclick: "back", content: "Back"},
			{kind: "Button", onclick: "next", content: "Next"},
			{kind: "Button", onclick: "lazyView", content: "Lazy"},
			
			{tag: "span", style: "margin-left: 100px;", content: "Transition Name: "},
			
			{kind: "Input", value: "fade", name: "trans"},
			{kind: "Button", onclick: "changeTrans", content: "Set Transition"}
		]},
		
		{tag: "div", name: "bookDiv", style: "position:absolute; width:100%; top:24px; bottom:0;", components:[
			{kind: "Book", name: "Book", transition: "slade", style: "position:absolute; left:20px; right:20px; top:20px; bottom:20px;",
			components: [
				{name: "view1", tag: "h1", content: "Page number 1"},
				{name: "view2", tag: "h1", content: "Page number 2"},
				{name: "view3", tag: "h1", content: "Page number 3"},
				{name: "view4", tag: "h1", content: "Page number 4"},
				
				//Lazy pages must be called by name:
				{kind: "testPage", tag: "h1", name: "theLazyOne", lazy: true}
			]},
		]},
	],
	
	changeView: function(inSender){
		this.$.Book.pageName("view" + inSender.view);
		
		//This also works:
		//this.$.Book.pageNumber(inSender.view);
	},
	
	create: function(){
		this.inherited(arguments);
		this.changeTrans();
	},
	
	changeTrans: function(){
		this.$.Book.setTransition(this.$.trans.getValue())
	},
	
	back: function(){
		this.$.Book.back();
	},
	
	next: function(){
		this.$.Book.next();
	},
	
	lazyView: function(){
		this.$.Book.pageName("theLazyOne");
	}
});

enyo.kind({
	name: "testPage",
	kind: "Page",
	components: [
		{content: "Hello there! This was loaded lazily."}
	],
	create: function(){
		this.inherited(arguments);
		console.log("Loaded the lazy page.");
	}
});