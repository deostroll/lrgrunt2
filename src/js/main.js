function pageLoad() {
	var container = document.getElementById('kinetic-stage');
	run(container);
}

window.addEventListener('load', pageLoad, false);
function tweenWrap(tween) {		
	var promise = new Promise(function(resolve){
		tween.onFinish = function() {
			resolve(tween);
		};		
	});	
	return promise;
}

function run(el) {
	var stage = new Kinetic.Stage({
		container: el,
		width: 300,
		height: 300
	});
	var layer = new Kinetic.Layer();
	var rect = new Kinetic.Rect({
		x: stage.getWidth()/2,
		y: stage.getHeight()/2,
		stroke: 'blue',
		height: 50,
		width: 50,		
		offset: {
			x:25, y: 25
		},
		rotation: 45
	});
	
	var rect2 = new Kinetic.Rect({
		x: stage.getWidth()/2,
		y: stage.getHeight()/2,
		height: 50,
		width: 50,
		offset: {x: 25, y: 25},
		stroke: 'red'			
	});
	
	layer.add(rect, rect2);
	stage.add(layer);
	
	var t1 = new Kinetic.Tween({
		node: rect,
		duration: 5,
		rotationDeg: 360 + 45,
		onFinish: function() {
			t2.play();
		}
	});

	var t2 = new Kinetic.Tween({
		node: rect2,
		duration: 5,
		rotationDeg: -360
	});

	setTimeout(t1.play.bind(t1), 3000);
}