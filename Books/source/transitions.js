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
			},
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
					translateX: "50%",
					translateZ: "0"
				}
			},
			visible: {
				opacity: 1,
				transform: {
					translateX: "0%",
					translateZ: "0"
				}
			},
			out: {
				opacity: 0,
				transform: {
					translateX: "-50%",
					translateZ: "0"
				}
			},
		},
		back: {
			from: {
				opacity: 0,
				transform: {
					translateX: "-50%",
					translateZ: "0"
				}
			},
			visible: {
				opacity: 1,
				transform: {
					translateX: "0%",
					translateZ: "0"
				}
			},
			out: {
				opacity: 0,
				transform: {
					translateX: "50%",
					translateZ: "0"
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
					translateX: "100%",
					translateZ: "0"
				}
			},
			visible: {
				transform: {
					translateX: "0%",
					translateZ: "0"
				}
			},
			out: {
				transform: {
					translateX: "-100%",
					translateZ: "0"
				}
			},
		},
		back: {
			from: {
				transform: {
					translateX: "-100%",
					translateZ: "0"
				}
			},
			visible: {
				transform: {
					translateX: "0%",
					translateZ: "0"
				}
			},
			out: {
				transform: {
					translateX: "100%",
					translateZ: "0"
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

//Add the "hflip"
enyo.Book.transition({
	name: "hflip",
	auto: true,
	directional: true,
	has3d: true,
	easing: enyo.easing.quadInOut,
	duration: 800,
	transition: {
		next: {
			from: {
				opacity: -1,
				transform: {
					scaleX: -1,
				}
			},
			visible: {
				opacity: 1,
				transform: {
					scaleX: 1,
				}
			},
			out: {
				opacity: -1,
				transform: {
					scaleX: -1,
				}
			},
		},
		back: {
			from: {
				opacity: -1,
				transform: {
					scaleX: -1,
				}
			},
			visible: {
				opacity: 1,
				transform: {
					scaleX: 1,
				}
			},
			out: {
				opacity: -1,
				transform: {
					scaleX: -1,
				}
			},
		}
	}
});

//Add the "boxturn"
enyo.Book.transition({
	name: "boxturn",
	auto: true,
	directional: true,
	has3d: true,
	easing: enyo.easing.quadInOut,
	duration: 800,
	transition: {
		next: {
			from: {
				opacity: 0,
				transform: {
					translateX: "50%",
					scaleX: 0,
				}
			},
			visible: {
				opacity: 1,
				transform: {
					translateX: "0%",
					scaleX: 1,
				}
			},
			out: {
				opacity: 0,
				transform: {
					translateX: "-50%",
					scaleX: 0,
				},
			},
		},
		back: {
			from: {
				opacity: 0,
				transform: {
					translateX: "-50%",
					scaleX: 0,
				}
			},
			visible: {
				opacity: 1,
				transform: {
					translateX: "0%",
					scaleX: 1,
				}
			},
			out: {
				opacity: 0,
				transform: {
					translateX: "50%",
					scaleX: 0,
				},
			},
		},
	}
});

//Add the "pageturn"
//FIXME: Lower page shouldn't be transparent,
//but I'm having z-sorting issues so this is an acceptable fix for now
enyo.Book.transition({
	name: "pageturn",
	auto: true,
	directional: true,
	has3d: true,
	easing: enyo.easing.quadInOut,
	duration: 800,
	transition: {
		next: {
			from: {
				opacity: 0,
				transform: {
					translateX: "0%",
					scaleX: 1,
				}
			},
			visible: {
				opacity: 1,
				transform: {
					translateX: "0%",
					scaleX: 1,
				}
			},
			out: {
				opacity: 0,
				transform: {
					translateX: "-50%",
					scaleX: 0,
				},
			},
		},
		back: {
			from: {
				opacity: 0,
				transform: {
					translateX: "-50%",
					scaleX: 0,
				}
			},
			visible: {
				opacity: 1,
				transform: {
					translateX: "0%",
					scaleX: 1,
				}
			},
			out: {
				opacity: 0,
				transform: {
					translateX: "0%",
					scaleX: 1,
				},
			},
		},
	}
});

//Add the "pagespin"
enyo.Book.transition({
	name: "pagespin",
	auto: true,
	directional: true,
	has3d: true,
	easing: enyo.easing.quadInOut,
	duration: 800,
	transition: {
		before: {
			"-webkit-transform-origin": "0% 50% 0",
			"-moz-transform-origin": "0% 50% 0",
			"-o-transform-origin": "0% 50% 0",
			"-ms-transform-origin": "0% 50% 0"
		},
		next: {
			from: {
				opacity: 0,
				transform: {
					rotateY: "90deg",
				}
			},
			visible: {
				opacity: 1,
				transform: {
					rotateY: "0deg",
				}
			},
			out: {
				opacity: 0,
				transform: {
					rotateY: "-90deg",
				},
			},
		},
		back: {
			from: {
				opacity: 0,
				transform: {
					rotateY: "-90deg",
				}
			},
			visible: {
				opacity: 1,
				transform: {
					rotateY: "0deg",
				}
			},
			out: {
				opacity: 0,
				transform: {
					rotateY: "90deg",
				},
			},
		},
	}
});