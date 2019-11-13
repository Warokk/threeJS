function animation(){
    delta_time = Date.now() - last_time;
    last_time = Date.now();
    fps = parseInt(1000 / delta_time);

    update_character_controls(delta_time);

    var distance_camera_to_0_0_0 = camera.position.length();
    if (camera.position.length() > (2000 - 10)) {
        camera.position.setLength(2000 - 10);
    }

    document.getElementById("fps_counter").innerHTML = fps;
    render();
    requestAnimationFrame(animation);
}