enyo.kind({
	name: "BookTest",
	kind: "Control",
	components: [
		{kind: "Button", onclick: "changeView", content: "1", view: 1},
		{kind: "Button", onclick: "changeView", content: "2", view: 2},
		{kind: "Button", onclick: "changeView", content: "3", view: 3},
		{kind: "Button", onclick: "changeView", content: "4", view: 4},
		{kind: "Button", onclick: "back", content: "Back"},
		{kind: "Button", onclick: "next", content: "Next"},
		{kind: "Button", onclick: "lazyView", content: "Lazy"},
		
		{kind: "Book", name: "Book", components: [
			{name: "view1", tag: "h1", content: "Page number 1"},
			{name: "view2", tag: "h1", content: "Page number 2"},
			{name: "view3", tag: "h1", content: "Page number 3"},
			{name: "view4", tag: "h1", content: "Page number 4"},
			//Lazy pages must be called by name:
			{kind: "testPage", name: "theLazyOne", lazy: true}
		]},
	],
	
	changeView: function(inSender){
		this.$.Book.pageName("view" + inSender.view);
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
		{tag: "h1", content: "Hello there! This was loaded lazely."}
	],
	create: function(){
		this.inherited(arguments);
		console.log("Loaded the lazy page.");
	}
});