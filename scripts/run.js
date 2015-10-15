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
		}	
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
	var angularSpeed = Math.PI;
	var anim = new Kinetic.Animation(function(frame){
		var diff = frame.timeDiff * angularSpeed/10;
		rect.rotate(diff);
		rect2.rotate(-diff/2);
	}, layer);
	anim.start();
}