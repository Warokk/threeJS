



function handleFiles(files) {
  var imageType = /^image\//;
  for (var i = 0; i < files.length; i++) {
    var file = files[i];
    if (!imageType.test(file.type)) {
      alert("veuillez sélectionner une image");
    } else {

      console.log(files[i]);
      /*
      if (i == 0) {
        document.getElementById("preview").innerHTML = '';
      }
      */


   //   var img = document.createElement("img");

      var img = document.getElementById("preview");
      img.src = "images/" + files[i].name;


/*
     // img.classList.add("obj");
     // img.file = file;
      var reader = new FileReader();


      reader.onload = (function(aImg) {
        return function(e) {
          console.log(toString(e));
         // document.getElementById("preview").src = e.target.result;
         //  chercher_visage();
         //  console.log(toString(e));
        //  var userImageURL = URL.createObjectURL( e.target.files[0] );
           aImg.src = e.target.result; 
        };
      })(img);

      reader.readAsDataURL(file);

      */
      
    }
  }
}





function resize_face_contour_range() {
  var viewportOffsetPreview = document.getElementById("preview").getBoundingClientRect();
  //document.getElementById("left_ear").style.left = document.getElementById("positionGauche").value * viewportOffsetPreview.width + "px";
  //document.getElementById("right_ear").style.left = document.getElementById("positionDroite").value * viewportOffsetPreview.width + "px";
  //document.getElementById("front").style.top = document.getElementById("positionHaute").value * viewportOffsetPreview.height + "px";
  //document.getElementById("menton").style.top = document.getElementById("positionBas").value * viewportOffsetPreview.height + "px";
  resize_face_contour();
  chercher_visage();
}

function resize_face_contour() {
  // console.log("resize!!");
  var viewportOffsetPreview = document.getElementById("preview").getBoundingClientRect();
  var viewportOffsetLeftEar = document.getElementById("left_ear").getBoundingClientRect();
  var viewportOffsetRightEar = document.getElementById("right_ear").getBoundingClientRect();
  var viewportOffsetFront = document.getElementById("front").getBoundingClientRect();
  var viewportOffsetMenton = document.getElementById("menton").getBoundingClientRect();
  var milieu_visage_horizontal = (viewportOffsetLeftEar.left +viewportOffsetRightEar.left) / 2 - viewportOffsetPreview.left;
  var milieu_visage_vertical = (viewportOffsetFront.top + viewportOffsetMenton.top) / 2 - viewportOffsetPreview.top;
  var largeur_visage = Math.abs(viewportOffsetRightEar.left - viewportOffsetLeftEar.left) * 1;
  var hauteur_visage = Math.abs(viewportOffsetMenton.top - viewportOffsetFront.top);
  document.getElementById("face_contour").style.width = largeur_visage + "px";
  document.getElementById("face_contour").style.left = viewportOffsetLeftEar.right + "px";
  document.getElementById("face_contour").style.height = hauteur_visage + "px";
  document.getElementById("face_contour").style.top = viewportOffsetFront.top + "px";
  document.getElementById("face_contour").style.position = "fixed";
  // var img_test = ;
  var img_test = new Image();
  //img_test.src = document.getElementById("preview").src;

  img_test.src = "images/jacques-chirac.jpeg";

  var c = document.getElementById("preview_cropped");
  var ctx = c.getContext("2d");
  var top_left_x = img_test.width * ((viewportOffsetLeftEar.left - viewportOffsetPreview.left) / viewportOffsetPreview.width);
  var top_left_y = img_test.height * ((viewportOffsetFront.top - viewportOffsetPreview.top) / viewportOffsetPreview.height);
  
  //var img_test_width = img_test.width * ((viewportOffsetRightEar.left - viewportOffsetLeftEar.left) / viewportOffsetPreview.width);
  //var img_test_height = img_test.height * ((viewportOffsetMenton.top - viewportOffsetFront.top) / viewportOffsetPreview.height);
  
  var img_test_width = 100;
  var img_test_height = 100;
  //ctx.clearRect(0, 0, 256, 256);
  //ctx.setTransform(1, 0, 0, 1, 0, 0);
  //ctx.translate(-128,-128);
  //ctx.rotate(20 / 100);
  //img_test.style.transform = "rotate(" + ( (Date.now() / 1000) % 360) + "deg)";
  /*
  $('#imagePreview')
    .css('transform', 'rotate(' + ((document.getElementById("rotationPhoto")
      .value) * 180) + 'deg)');
    */
 // ctx.clearRect(0, 0, document.getElementById("preview_cropped").width, document.getElementById("preview_cropped").height);
  /*
  ctx.drawImage(
              img_test,
              0,
              0,
              15,
              15,
              0, 
              0, 
              20, 
              20
              );
              */

  /*
  ctx.drawImage(
              img_test,
              top_left_x,
              top_left_y,
              img_test_width,
              img_test_height,
              0, 
              0, 
              document.getElementById("preview_cropped").width, 
              document.getElementById("preview_cropped").height
              );
  */
  
    
  /*
 // var grad = ctx.createRadialGradient(0, 128, 128, 256, 128, 128);
 var my_gradient = ctx.createLinearGradient(0, 0, 0, 256);
  my_gradient.addColorStop(0, "black");
my_gradient.addColorStop(1, "white");
  
  ctx.fillStyle = my_gradient;
  ctx.fillRect(0,0,document.getElementById("preview_cropped").width,document.getElementById("preview_cropped").height);
  
  
  ctx.fillStyle = "green";
  ctx.fillRect(80,100,8,8);

  ctx.fillStyle = "green";
  ctx.fillRect(168,100,8,8);

  ctx.fillStyle = "blue";
  ctx.fillRect(122,120,12,32);

  ctx.fillStyle = "red";
  ctx.fillRect(110,190,36,16);
  */

  //ctx.fillStyle = "green";
  //ctx.fillRect(150,10,60,35);
  
  console.log("img_test: "+img_test);
  console.log("top_left_x: "+top_left_x);
  console.log("top_left_y: "+top_left_y);
  console.log("img_test_width: "+img_test_width);
  console.log("img_test_height: "+img_test_height);
}


function chercher_visage() {
  if (mesh_visage_plan != null){
    camera.remove(mesh_visage_plan);
  }
  var canvas_resize = document.getElementById("preview_cropped");
  var ctx = canvas_resize.getContext("2d");
  var loader = new THREE.TextureLoader();
  var face_heightmap = loader.load("images/king.jpg");
  var image_data = canvas_resize.toDataURL();
  console.log(image_data);
  var texture = loader.load(image_data);
  var material = new THREE.MeshPhysicalMaterial({
    wireframe: false,
    bumpMap: texture,
    bumpScale: 0.1,
    displacementMap: face_heightmap,
    displacementScale: 10,
    map: texture,
    side: THREE.DoubleSide,
    transparent: true
  });
  var geometry_plan = new THREE.PlaneGeometry(15, 20, 128, 128);
  mesh_visage_plan = new THREE.Mesh(geometry_plan, material);
  mesh_visage_plan.position.z -= 20;
  mesh_visage_plan.position.x -= 10;
  mesh_visage_test = new THREE.Object3D();
  mesh_visage_test.add(mesh_visage_plan);
  camera.add(mesh_visage_plan)
}



