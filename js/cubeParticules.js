function creer_cube_particules(rayon_cube,nombre_particules){
	var geometry_particules = new THREE.Geometry();
	for (var i = 0; i < nombre_particules; i++){
		var position_particules = new THREE.Vector3
					(	rayon_cube*(Math.random()-0.5)*2,
						rayon_cube*(Math.random()-0.5)*2,
						rayon_cube*(Math.random()-0.5)*2
					);
		geometry_particules.vertices.push(position_particules);
	}
	var material_particules = new THREE.PointsMaterial({color:"white",size:0.7});
	var cube_particules = new THREE.Points(geometry_particules,material_particules);
	return cube_particules;
}

function update_cube_particules(cube_particules,rayon_cube,camera_position,camera_velocity){
	//console.log(cube_particules);
	for (var i = 0; i < cube_particules.geometry.vertices.length; i++){
		var particule = cube_particules.geometry.vertices[i];
		particule.sub(camera_velocity);
		if (particule.x > rayon_cube){
			particule.x = -rayon_cube+1;
			particule.y = rayon_cube*(Math.random()-0.5)*2;
			particule.z = rayon_cube*(Math.random()-0.5)*2;
		}
		if (particule.x < -rayon_cube){
			particule.x = +rayon_cube-1;
			particule.y = rayon_cube*(Math.random()-0.5)*2;
			particule.z = rayon_cube*(Math.random()-0.5)*2;
		}
		if (particule.y > rayon_cube){
			particule.y = -rayon_cube+1;
			particule.x = rayon_cube*(Math.random()-0.5)*2;
			particule.z = rayon_cube*(Math.random()-0.5)*2;
		}
		if (particule.y < -rayon_cube){
			particule.y = +rayon_cube-1;
			particule.x = rayon_cube*(Math.random()-0.5)*2;
			particule.z = rayon_cube*(Math.random()-0.5)*2;
		}
		if (particule.z > rayon_cube){
			particule.z = -rayon_cube+1;
			particule.x = rayon_cube*(Math.random()-0.5)*2;
			particule.z = rayon_cube*(Math.random()-0.5)*2;
		}
		if (particule.z < -rayon_cube){
			particule.z = +rayon_cube-1;
			particule.x = rayon_cube*(Math.random()-0.5)*2;
			particule.z = rayon_cube*(Math.random()-0.5)*2;
		}
	}
	cube_particules.position.copy(camera_position);
	cube_particules.geometry.verticesNeedUpdate = true;
	
}