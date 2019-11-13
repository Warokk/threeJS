function init(){
    // init scene
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.01, 100000);
    scene.add(camera);
    camera.position.set(0, 300, -1000);
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    // init renderer
    renderer = new THREE.WebGLRenderer({
        canvas: document.getElementById("game_canvas"),
        sortObjects: true,
        antialias: true,
        localClippingEnabled: false,
        powerPreference: "high-performance",
        logarithmicDepthBuffer: true,
        precision: "highp"
    });
    renderer.setPixelRatio(1.0);
    renderer.setSize(window.innerWidth * 1.0, window.innerHeight * 1.0);
    renderer.setClearColor(new THREE.Color(0xff0088ff), 0.0);

    // mouse lock
    pointerlockConfiguration();

    // border
    var geometry_bordure = new THREE.IcosahedronGeometry(2000, 4);
    var material_bordure_1 = new THREE.MeshBasicMaterial({color: "white", wireframe: true});
    var material_bordure_2 = new THREE.MeshBasicMaterial({
        color: "black",
        wireframe: false,
        side: THREE.DoubleSide
    });
    var materials_bordure = [material_bordure_1, material_bordure_2];
    bordure = THREE.SceneUtils.createMultiMaterialObject(geometry_bordure, materials_bordure);
    scene.add(bordure);

    var light = new THREE.PointLight("white", 1, 100000);
        light.position.set(0, 4000, 0);
        //camera.add(light);
        scene.add(light);
        lights.push(light);

    // terrain
    var geometry_terrain = new THREE.PlaneGeometry(5000, 5000, 128, 128);
    var material_terrain = new THREE.MeshLambertMaterial({
        wireframe: false,
        color: "white",
        vertexColors: THREE.FaceColors
    });
    geometry_terrain.computeFaceNormals();
    for (var i = 0; i < geometry_terrain.faces.length; i++) {
        var face = geometry_terrain.faces[i];
        var p_a = geometry_terrain.vertices[face.a];
        var p_b = geometry_terrain.vertices[face.b];
        var p_c = geometry_terrain.vertices[face.c];
        var centroid = p_a.clone().add(p_b).add(p_c);
        centroid.multiplyScalar(1 / 3);
        var color = new THREE.Color((1 + centroid.x / 5000) / 2, (1 + centroid.y / 3000) / 2, (1 + centroid.z / 4000) / 2);
        face.color = color;
    }
    terrain = new THREE.Mesh(geometry_terrain, material_terrain);
    scene.add(terrain);

    // terrain geometry
    if (terrain != null & false) {
        var geometry_terrain = terrain.geometry;

        for (var i = 0; i < geometry_terrain.vertices.length; i++) {
            var v = geometry_terrain.vertices[i];
            //v.z = Math.sin(0 / 500 + v.x / 100 + v.y / 110) * 100;
            //v.z = Math.random()*1000;
            //v.z = v.length();

            v.z = 1+ noise_xyz.noise(v.x/1000, v.y/1000, 0)*200;
        }
        geometry_terrain.verticesNeedUpdate = true;
        geometry_terrain.computeFaceNormals();
        geometry_terrain.computeVertexNormals();
    }
}