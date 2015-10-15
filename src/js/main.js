function pageLoad() {
	var container = document.getElementById('kinetic-stage');
	run(container);
}

window.addEventListener('load', pageLoad, false);
function run(el) {
	var stage = new Kinetic.Stage({
		container: el,
		width: 300,
		height: 300
	});
	var center = { x: stage.getWidth()/2, y: stage.getHeight()/2 };
	var layer = new Kinetic.Layer();
	var params = {
		sides: 6,
		radius: 50,
		x: center.x,
		y: center.y
	};

	Object.defineProperty(params, 'theta', {
		enumerable: true,
		get: function() {			
			return 2 * Math.PI / this.sides;
		}
	});

	Object.defineProperty(params, 'dia', {
		enumerable: true,
		get: function() {
			return 2 * this.radius * Math.sin(Math.PI/this.sides);
		}
	});
	
	var polygon = new Kinetic.RegularPolygon({
		sides: params.sides,
		radius: params.radius,
		stroke: 'transparent',
		x: center.x,
		y: center.y
	});
	layer.add(polygon);

	var a90 = Math.PI / 2;
	var points = [];
	
	var colors = getRandomColors(params.sides);
	console.log(colors);
	for(var i = 0; i < params.sides; i++) {
		
		var C = {};
		C.x = params.x + params.radius * Math.cos(a90 + i * params.theta);
		C.y = params.y - params.radius * Math.sin(a90 + i * params.theta);
		points.push(C);
		var circle = new Kinetic.Circle({
			name: 'circle',
			x: C.x,
			y: C.y,
			radius: params.dia/2,
			fill: colors[i].toString(),
			visible: true,
			opacity: 0,
			scaleX: 0,
			scaleY: 0
		});		

		layer.add(circle);
	}

	var xarr = points.map(function(p) { return p.x; });
	var yarr = points.map(function(p) { return p.y; });
	//console.log(xarr, yarr);
	
	var max = function(arr) { return Math.max.apply(Math, arr); };
	var min = function(arr) { return Math.min.apply(Math, arr); };

	var w = max(xarr) - min(xarr);
	var h = max(yarr) - min(yarr);
	//console.log({w: w, h: h});
	var rect = new Kinetic.Rect({
		x: center.x,
		y: center.y,
		offset: { x: w/2 + params.dia/2, y: h/2 + params.dia/2 },
		height: h + params.dia,
		width: w + params.dia,
		stroke: 'red',
		visible:false
	});

	layer.add(rect);
	stage.add(layer);
	
	var circles = layer.get('.circle');
	var length = circles.length;	
	var noop = function() { console.log('done'); };
	var tarray;
	circles.map(function(c) {
		return new Kinetic.Tween({
			node: c,
			opacity: 1,
			duration: 0.5,
			scaleX: 1,
			scaleY: 1
		});
	})
	.forEach(function(tween, idx, tweenArrary){
		if(idx !== length - 1) {
			tween.onFinish = function() { tweenArrary[idx + 1].play(); };
		}
		else {
			tween.onFinish = noop;
		}
		tarray = tweenArrary;
	});

	var t = tarray[0];
	setTimeout(t.play.bind(t));
}

function getRandomColors(n) {
	var Color = net.brehaut.Color;

	var s = 0.5, l = 0.5;
	var dx = Math.floor(360 / n);
	var seed = Math.floor(Math.random() * 360);
	var arr = [];
	for(var i = 0; i < n; i++, seed += dx) {
		if(seed >= 360) {
			seed = 0;			
		}
		var a = {
			hue: seed,
			saturation: s,
			lightness: l
		};
		arr.push(Color(a).toString());
	}

	return arr;
}


// var TweenArray = function() {

// };

// TweenArray.prototype = Array.prototype;

// TweenArray.prototype.push = function() {
// 	var args = this.slice.call(arguments);
// 	var idx = this.length;
// 	for(var i = 0, j = args.length; i < j; i++) {
// 		this[idx] = args[i];
// 		if(i === j - 1) {
// 			args[i].onFinish = function() {

// 			};
// 		}
// 	}
// };