Books for Enyo 2
================

About
-----

Books aims to replicate the Pane kind found in Enyo 1. Books create a collection of "Pages", with given page numbers and names that you can move between.

How to Use
----------

Books works very similar to Panes. First, you create your Books container:
	{kind: "Book"}

Now you can add anything into the components block:
	{kind: "Book", components: [
	    {name: "pageOne", content: "Hello"},
	    {name: "pageTwo", content: "Oh, why you changed the page!"}
	]}
	
The first component in the components block is visible when the book loads. You can change the visible book using the pageName method: 

	this.$.book.pageName("pageTwo");

Additionally, you can use the pageNumber method to change pages:
	
	this.$.book.pageNumber(2);

Books also somewhat supports lazy pages:

	{name: "somePage", kind: "thePageContent", lazy: true}

However, using lazy pages is highly experimental, and may not work. Additionally, if you wish to load a lazy page, you must use the pageName function, pageNumber will not work.


Methods
-------
	
	- pageName(string) - Changes the visible page to the given page name.
	- pageNumber(number) - Changes the visible page to the given page number. 
	- back() - Moves back to the previously viewed page.
	- next() - Moves forward in the page stack. Will work after the "back" method is called.

Known Issues
------------

	- The "back" method will not move back to the page viewed when the Book loads.
	- The "pageNumber" method can break with lazy pages. The numbering system doesn't
	- Lazy pages have owner problems, so calling methods in lazy pages might not work as expected.
