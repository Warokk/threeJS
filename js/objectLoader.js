//UNE FONCTION QUI PERMET DE CHARGER DES OBJETS DE TYPE .obj, AVEC UN MATERIAL ASSOCIE .mtl
//LE .mtl BUGGE PARFOIS, VOUS POUVEZ REMPLACER LE MATERIAL PAR UN MATERIAL A VOUS.

//POUR QUE CA FONCTIONNE, IL FAUT AJOUTER

//<script src="js/OBJLoader.js"></script>
//<script src="js/MTLLoader.js"></script>
//<script src="js/objectLoader.js"></script>

//AUX IMPORTS DANS VOTRE index.html

function load_medieval(){
  var mtlLoaderMedieval = new THREE.MTLLoader();
  var loader = new THREE.OBJLoader();
  mtlLoaderMedieval.load("obj/medieval/" + "Sword_Golden" + ".mtl", function(
    materials) {
    materials.preload();
    loader.setMaterials(materials);
    loader.load("obj/medieval/" + "Sword_Golden" + ".obj", function(object) {
       epee = object;
       epee.position.z -= 3.5;
       epee.position.x += 1.4;
       epee.position.y -= 0.5;
       epee.rotation.y += Math.PI/2;
       camera.add(epee);
      return object;
    },
    function(xhr) {},
    function(error) {});
  });
}