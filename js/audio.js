//CE FICHIER audio.js, PERMET DE CHARGER DES FICHIERS AUDIOS
//UN ANALYSER SPECTRAL POUR LE FICHIER AUDIO, ETC...

//EXEMPLE:
//lancer_audio("audio/gros_son.wav");
//var data = data_from_analyser();
//var volume_actuel = calculer_volume(data);
//console.log(calculer_volume(data));
//mon_objet.scale.set(volume_actuel,volume_actuel,volume_actuel);

var analyser = null;
var audio = null;
var biquad_filter = null;

function lancer_audio(nom_morceau) {
  console.log("j'essaie de lancer: " + nom_morceau);
  if (true) {
    var listener = new THREE.AudioListener();
    camera.add(listener);
    sound = new THREE.Audio(listener);
    var audioLoader = new THREE.AudioLoader();
    audioLoader.load(nom_morceau, function(buffer) {

      //LE TEMPS EN SECONDES OU DOIT DEMARRER LE SON
      sound.offset = 220;

      sound.setBuffer(buffer);
      sound.setLoop(true);
      sound.setVolume(1.0);
      sound.play();
      console.log("réussite!");

      //VOUS POUVEZ AJOUTER UN ANALYSEUR
      analyser = new THREE.AudioAnalyser(sound, 512);     

      //VOUS POUVEZ AJOUTER UN FILTRE PASSE-HAUT / PASSE-BAS / PASSE-BANDE
      /*
      if (biquad_filter == null) {
        biquad_filter = new BiquadFilterNode(sound.context);
        biquad_filter.type = "bandpass";
        //biquad_filter.Q = 100;
        biquad_filter.frequency.value = 100;
        biquad_filter.gain.value = 1000;
        if (biquad_filter != null) {
          sound.setFilter(biquad_filter);
        }
      }
      */

      return sound;    
    });
  }
}

//RETOURNE UN TABLEAU CONTENANT LES VALEURS DE L'ANALYSEUR SPECTRAL
function data_from_analyser(){
  return analyser.getFrequencyData();
}

//FONCTION QUI CALCULE LE VOLUME EN FONCTION DE data RETOURNEE PAR LA FONCTION data_from_analyser.
function calculer_volume(data){
  var volume = 0;
  for (var i = 0; i < data.length; i++){
    volume += data[i] * Math.log2((1+i) / data.length * 22000);
  }
  return volume/data.length;
}

//SI VOUS AVEZ UN CANVAS DANS VOTRE FICHIER HTML, VOUS POUVEZ DESSINER LE SPECTRE DU SON EN UTILISANT CETTE FONCTION
//data CORRESPOND ICI A LA VALEUR RETOURNEE PAR LA FONCTION data_from_analyser
function draw_data(data,canvas){
  var canvas_width = canvas.width;
  var canvas_height = canvas.height;
  var ctx = canvas.getContext('2d');
  ctx.clearRect(0,0,canvas_width,canvas_height);
  for (var z = 1; z < data.length - 1; z++) {
    var freq = 22000 * (i+1) / data.length;
    ctx.fillStyle = 'rgb(' + Math.min(data[z], 255) + ',' + Math.max(0, Math.min(255 - data[z], 255)) + ', 0)';
    ctx.strokeStyle = 'rgb(' + Math.min(data[z], 255) + ',' + Math.max(0, Math.min(255 - data[z], 255)) + ', 0)';
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.moveTo(z / data.length * canvas_width, canvas_height);
    ctx.lineTo(z / data.length * canvas_width, canvas_height - data[z] * Math.log2((1+z) / data.length * 22000) / 256 * canvas_height*1  / 1 / 10);
    ctx.stroke();
  }
}