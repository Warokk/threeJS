var geometry_bullet = new THREE.BoxBufferGeometry(2,2,40,1,1,1);
var material_bullet = new THREE.MeshBasicMaterial({color: "white"});

function bullet(object_lancant_la_bullet, velocity_origine, duree_de_vie_bullet, bullets_list){

	var my_bullet = new THREE.Mesh(geometry_bullet,material_bullet);
	
	my_bullet.position.copy(object_lancant_la_bullet.position);
	my_bullet.quaternion.copy(object_lancant_la_bullet.quaternion);

	my_bullet.velocity = velocity_origine;

	bullets_list.push(my_bullet);

	my_bullet.update = function(delta){
		my_bullet.translateZ( - velocity_origine * delta);
		duree_de_vie_bullet -= delta;
		if (duree_de_vie_bullet < 0 || my_bullet.position.length() > 2000){
			scene.remove(my_bullet);
			bullets_list.splice(bullets_list.indexOf(my_bullet), 1);
			my_bullet = null;
		}
	}
	
	return my_bullet;
}

