//Add the "simple" transition:
enyo.Book.transition({
	name: "simple",
	auto: true,
	duration: 1,
	transition: {
		//We don't need to apply any styles, as Books will automatically show/hide the pages.
		visible: {},
		hidden: {}
	}
});

//Add the "fade" transition:
enyo.Book.transition({
	name: "fade",
	auto: true,
	duration: 500,
	transition: {
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
	duration: 500,
	transition: {
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
		}
	}
});

//Add the "slade"
enyo.Book.transition({
	name: "slade",
	auto: true,
	directional: true,
	easing: enyo.easing.quadInOut,
	duration: 500,
	transition: {
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

//Add the "slide"
enyo.Book.transition({
	name: "slide",
	auto: true,
	directional: true,
	easing: enyo.easing.quadInOut,
	duration: 500,
	transition: {
		next: {
			from: {
				transform: {
					translateX: "100%"
				}
			},
			visible: {
				transform: {
					translateX: "0%"
				}
			},
			out: {
				transform: {
					translateX: "-100%"
				}
			},
		},
		back: {
			from: {
				transform: {
					translateX: "-100%"
				}
			},
			visible: {
				transform: {
					translateX: "0%"
				}
			},
			out: {
				transform: {
					translateX: "100%"
				}
			},
		}
	}
});

//Add "spoode" (spin/zoom/fade) transition:
enyo.Book.transition({
	name: "spoode",
	auto: true,
	duration: 500,
	easing: enyo.easing.quadInOut,
	directional: true,
	transition: {
		next: {
			from: {
				opacity: 0,
				transform: {
					translateX: "100%",
					translateY: "100%",
					rotate: "45deg",
					scale: 0
				}
			},
			visible: {
				opacity: 1,
				transform: {
					translateX: "0%",
					translateY: "0%",
					rotate: "0deg",
					scale: 1
				}
			},
			out: {
				opacity: 0,
				transform: {
					translateX: "-100%",
					translateY: "-100%",
					rotate: "-45deg",
					scale: 2
				}
			}
		},
		back: {
			from: {
				opacity: 0,
				transform: {
					translateX: "-100%",
					translateY: "-100%",
					rotate: "-45deg",
					scale: 2
				}
			},
			visible: {
				opacity: 1,
				transform: {
					translateX: "0%",
					translateY: "0%",
					rotate: "0deg",
					scale: 1
				}
			},
			out: {
				opacity: 0,
				transform: {
					translateX: "100%",
					translateY: "100%",
					rotate: "45deg",
					scale: 0
				}
			}
		}
	}
});
