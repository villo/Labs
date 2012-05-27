// enyo.Animator isn't included in the current beta releases of Enyo, so include it here if it doesn't already exist.

if(!enyo.Animator){
	enyo.kind({
		name: "enyo.Animator",
		kind: "Component",
		published: {
			//* Animation duration in milliseconds
			duration: 350, 
			startValue: 0,
			endValue: 1,
			//* node which must be visible in order for the animation to continue
			//* this reference is destroyed when animation ceases
			node: null,
			easingFunction: enyo.easing.cubicOut
		},
		events: {
			//* Fires when an animation step occurs.
			onStep: "",
			//* Fires when the animation finishes normally.
			onEnd: "",
			//* Fires when the animation is prematurely stopped.
			onStop: ""
		},
		//* @protected
		constructed: function() {
			this.inherited(arguments);
			this._next = enyo.bind(this, "next");
		},
		destroy: function() {
			this.stop();
			this.inherited(arguments);
		},
		//* @public
		//* Play the animation
		//* inProps {Object} for convenience inProps will be mixed directly into this object.
		play: function(inProps) {
			this.stop();
			if (inProps) {
				enyo.mixin(this, inProps);
			}
			this.t0 = this.t1 = enyo.now();
			this.value = this.startValue;
			this.job = true;
			this.requestNext();
			return this;
		},
		//* Stop the animation; fires the onStop event.
		stop: function() {
			if (this.isAnimating()) {
				this.cancel();
				this.fire("onStop");
				return this;
			}
		},
		//* Returns true if animation is in progress
		isAnimating: function() {
			return Boolean(this.job);
		},
		//* @protected
		requestNext: function() {
			this.job = enyo.requestAnimationFrame(this._next, this.node);
		},
		cancel: function() {
			enyo.cancelRequestAnimationFrame(this.job);
			this.node = null;
			this.job = null;
		},
		shouldEnd: function() {
			return (this.dt >= this.duration);
		},
		next: function() {
			this.t1 = enyo.now();
			this.dt = this.t1 - this.t0;
			// time independent
			var f = this.fraction = enyo.easedLerp(this.t0, this.duration, this.easingFunction);
			this.value = this.startValue + f * (this.endValue - this.startValue);
			if (f >= 1 || this.shouldEnd()) {
				this.value = this.endValue;
				this.fraction = 1;
				this.fire("onStep");
				this.fire("onEnd");
				this.cancel();
			} else {
				this.fire("onStep");
				this.requestNext();
			}
		},
		fire: function(inEventName) {
			var fn = this[inEventName];
			if (enyo.isString(fn)) {
				this.bubble(inEventName);
			} else if (fn) {
				fn.call(this.context || window, this);
			}
		}
	});
}