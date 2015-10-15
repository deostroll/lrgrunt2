function pageLoad() {
	var container = document.getElementById('kinetic-stage');
	run(container);
}

function run(el) {
	var stage = new Kinetic.Stage({
		container: el,
		width: 400,
		height: 500
	});
	var layer = new Layer();
	var rect = new Kinetic.Rect({
		x: stage.getWidth()/2,
		y: stage.getHeight()/2,
		stroke: 'blue'
	});
	layer.add(rect);
	stage.add(layer);
}

window.addEventListener('load', pageLoad, false);