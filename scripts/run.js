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
		rotation: 45	
	});
	var line1 = new Kinetic.Line({
		x:0, 
		y:0,
		points:[0,0, stage.getWidth(), stage.getHeight()],
		stroke:'red'
	});
	var line2 = new Kinetic.Line({
		x:0, 
		y:stage.getHeight(),
		points:[0, 0, stage.getWidth(), -stage.getHeight()],
		stroke:'red'
	});
	rect.move({
		x:-rect.getWidth()/2,
		y:-rect.getHeight()/2
	});
	
	layer.add(rect, line1, line2);
	stage.add(layer);
	var angularSpeed = Math.PI;
	var anim = new Kinetic.Animation(function(frame){
		var diff = frame.timeDiff * angularSpeed / 500;
		rect.rotate(diff);
	}, layer);
	anim.start();
}