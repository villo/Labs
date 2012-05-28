/* 3D Transition Definitions- DO NOT USE THESE.
 * Their 2D equivalents will detect whether the host browser supports 3D transforms
 * and switch accordingly.
 */
 
//Add the "hflip3d"
enyo.Book.transition({
	name: "hflip3d",
	auto: true,
	directional: true,
	easing: enyo.easing.quadInOut,
	duration: 800,
	transition: {
		next: {
			from: {
				opacity: 0,
				transform: {
					translateZ: "-660px",
					rotateY: "180deg",
				}
			},
			visible: {
				opacity: 1,
				transform: {
					translateZ: "0px",
					rotateY: "0deg",
				}
			},
			out: {
				opacity: 0,
				transform: {
					translateZ: "-660px",
					rotateY: "-180deg",
				}
			},
		},
		back: {
			from: {
				opacity: 0,
				transform: {
					translateZ: "-660px",
					rotateY: "-180deg",
				}
			},
			visible: {
				opacity: 1,
				transform: {
					translateZ: "0px",
					rotateY: "0deg",
				}
			},
			out: {
				opacity: 0,
				transform: {
					translateZ: "-660px",
					rotateY: "180deg",
				}
			},
		}
	}
});

//Add the "boxturn3d"
enyo.Book.transition({
	name: "boxturn3d",
	auto: true,
	directional: true,
	easing: enyo.easing.quadInOut,
	duration: 600,
	transition: {
		before: {
			"-webkit-transform-origin": "50% 50% -" + (window.innerWidth/2) + "px",
			"-moz-transform-origin": "50% 50% -" + (window.innerWidth/2) + "px",
			"-o-transform-origin": "50% 50% -" + (window.innerWidth/2) + "px",
			"-ms-transform-origin": "50% 50% -" + (window.innerWidth/2) + "px"
		},
		next: {
			from: {
				opacity: 0,
				transform: {
					translateZ: "-150px",
					rotateY: "90deg"
				}
			},
			visible: {
				opacity: 1,
				transform: {
					translateZ: "-150px",
					rotateY: "0deg"
				}
			},
			out: {
				opacity: 0,
				transform: {
					translateZ: "-150px",
					rotateY: "-90deg"
				},
			},
		},
		back: {
			from: {
				opacity: 0,
				transform: {
					translateZ: "-150px",
					rotateY: "-90deg",
				}
			},
			visible: {
				opacity: 1,
				transform: {
					translateZ: "-150px",
					rotateY: "0deg",
				}
			},
			out: {
				opacity: 0,
				transform: {
					translateZ: "-150px",
					rotateY: "90deg",
				},
			},
		},
	}
});

//Add the "pageturn3d"
enyo.Book.transition({
	name: "pageturn3d",
	auto: true,
	directional: true,
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
				opacity: 1,
				transform: {
					rotateY: "0deg",
					translateZ: "-1px"
				}
			},
			visible: {
				opacity: 1,
				transform: {
					rotateY: "0deg",
					translateZ: "0px"
				}
			},
			out: {
				opacity: 0,
				transform: {
					rotateY: "-90deg",
					translateZ: "1px"
				},
			},
		},
		back: {
			from: {
				opacity: 0,
				transform: {
					rotateY: "-90deg",
					translateZ: "1px"
				}
			},
			visible: {
				opacity: 1,
				transform: {
					rotateY: "0deg",
					translateZ: "0px"
				}
			},
			out: {
				opacity: 1,
				transform: {
					rotateY: "0deg",
					translateZ: "-1px"
				},
			},
		},
	}
});

//Add the "pagespin3d"
enyo.Book.transition({
	name: "pagespin3d",
	auto: true,
	directional: true,
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