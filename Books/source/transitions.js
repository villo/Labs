//Add the "simple" transition:
enyo.Book.transition({
	name: "simple",
	auto: true,
	transition: {
		duration: 1,
		visible: {
			opacity: 1,
			display: "block"
		},
		hidden: {
			opacity: 0,
			display: "none"
		}
	}
});

//Add the "fade" transition:
enyo.Book.transition({
	name: "fade",
	auto: true,
	transition: {
		duration: 500,
		visible: {
			opacity: 1,
		},
		hidden: {
			//Need a matching pair value:
			opacity: 0
		}
	}
});

//Add the "pop" transition:
enyo.Book.transition({
	name: "pop",
	auto: true,
	easing: enyo.quadInOut,
	transition: {
		duration: 500,
		//Transitions properties:
		visible: {
			opacity: 1,
			transform: {
				scale: 1
			}
		},
		hidden: {
			opacity: 0,
			transform: {
				scale: 1.3
			}
		}
	}
});

//Add the "slade"
enyo.Book.transition({
	name: "slade",
	auto: true,
	directional: true,
	transition: {
		duration: 500,
		next: {
			visible: {
				opacity: 1,
				transform: {
					translateX: "0%"
				}
			},
			hidden: {
				opacity: 0,
				transform: {
					translateX: "50%"
				}
			}
		},
		back: {
			visible: {
				opacity: 1,
				scale: 1
			},
			hidden: {
				opacity: 0,
				scale: 0.7
			}
		}
	}
});