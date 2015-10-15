function run(el) {
	var stage = new Kinetic.Stage({
		container: el,
		width: 300,
		height: 300
	});
	var center = { x: stage.getWidth()/2, y: stage.getHeight()/2 };
	var layer = new Kinetic.Layer();
	var params = {
		sides: 5,
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
			x: C.x,
			y: C.y,
			radius: params.dia/2,
			fill: colors[i].toString()
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
		visible: false
	});

	layer.add(rect);
	stage.add(layer);
	
}

function getRandomColors(n) {
	var Color = net.brehaut.Color;
	var red = Color("#ff0000");
	var arr = [];
	while(arr.length !== n) {
		var angle = parseInt(Math.random() * 360);
		if(arr.indexOf(angle) > -1) { continue; }
		arr.push(angle);
	}
	console.log(arr);
	return arr.map(function(a) {
		return red.shiftHue(a).darkenByRatio(0.1).desaturateByAmount(0.2).toString();
	});
}

// function hslToRgb(h, s, l) {
//     var r, g, b;

//     if (s == 0) {
//         r = g = b = l; // achromatic
//     } else {
//         var hue2rgb = function hue2rgb(p, q, t) {
//             if (t < 0) t += 1;
//             if (t > 1) t -= 1;
//             if (t < 1 / 6) return p + (q - p) * 6 * t;
//             if (t < 1 / 2) return q;
//             if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
//             return p;
//         }

//         var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
//         var p = 2 * l - q;
//         r = hue2rgb(p, q, h + 1 / 3);
//         g = hue2rgb(p, q, h);
//         b = hue2rgb(p, q, h - 1 / 3);
//     }

//     return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
// }