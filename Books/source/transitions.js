//Add the "simple" transition:
enyo.Book.transition({
	name: "simple",
	auto: true,
	transition: {
		duration: 1,
		visible: {
			opacity: 1
		},
		hidden: {
			opacity: 0
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
			opacity: 0
		}
	}
});

//Add the "pop" transition:
enyo.Book.transition({
	name: "pop",
	auto: true,
	easing: enyo.easing.expoOut,
	transition: {
		duration: 500,
		//Some animations use different in/out transitions, so you can define them here.
		//The book will automagically transition numerical values.
		from: {
			opacity: 0,
			transform: {
				scale: 0.7
			}
		},
		visible: {
			opacity: 1,
			transform: {
				scale: 1
			}
		},
		out: {
			opacity: 0,
			transform: {
				scale: 1.3
			}
		},
	}
});

//Add the "slade"
enyo.Book.transition({
	name: "slade",
	auto: true,
	directional: true,
	easing: enyo.easing.quadInOut,
	transition: {
		duration: 500,
		next: {
			from: {
				opacity: 0,
				transform: {
					translateX: "50%"
				}
			},
			visible: {
				opacity: 1,
				transform: {
					translateX: "0%"
				}
			},
			out: {
				opacity: 0,
				transform: {
					translateX: "-50%"
				}
			},
		},
		back: {
			from: {
				opacity: 0,
				transform: {
					translateX: "-50%"
				}
			},
			visible: {
				opacity: 1,
				transform: {
					translateX: "0%"
				}
			},
			out: {
				opacity: 0,
				transform: {
					translateX: "50%"
				}
			},
		}
	}
});