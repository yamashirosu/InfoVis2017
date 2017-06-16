function main()
{
    var volume = new KVS.LobsterData();
    var screen = new KVS.THREEScreen();


    //volume.material.color = new THREE.Color("white");

    screen.init( volume, {
        width: window.innerWidth * 0.8,
        //width: window.innerWidth,
        height: window.innerHeight,
        targetDom: document.getElementById('display'),
        enableAutoResize: false
    });

    var bounds = Bounds( volume );
    screen.scene.add( bounds );

    
    var isovalue = 128;
    var surfaces = Isosurfaces( volume, isovalue );
    screen.scene.add( surfaces );
    var original_position_z = surfaces.position.z;
    
    document.addEventListener( 'mousemove', function() {
        screen.light.position.copy( screen.camera.position );
    });

    window.addEventListener( 'resize', function() {
        screen.resize( [ window.innerWidth * 0.8, window.innerHeight ] );
    });

    var slider = document.getElementById("speed");
    var speed = 0;
    var now_speed = 51;

    var btn0 = document.getElementById("robster_reset_button");
    btn0.addEventListener("click", resetposition, false);
    function resetposition(){
        screen.scene.remove(surfaces);
        surfaces = Isosurfaces( volume, isovalue );
        screen.scene.add( surfaces );
        speed = 0;
        now_speed = 10;
    }

    
    var btn2 = document.getElementById("robster_out_button");
    btn2.addEventListener("click", outposition, false);
    function outposition(){
        speed = now_speed;
    }

    var btn1 = document.getElementById("robster_stop_button");
    btn1.addEventListener("click", stopposition, false);
    function stopposition(){
        now_speed = speed
        speed = 0;
    }

    
    var btn3 = document.getElementById("robster_up_button");
    btn3.addEventListener("click", upposition, false);    
    function upposition(){
        if (now_speed >= 0) 
            speed = speed + 10;
        if (now_speed < 0) 
            speed = speed - 10;
        now_speed = speed
    }

    var btn4 = document.getElementById("robster_reverse_button");
    btn4.addEventListener("click", reverseposition, false);
    function reverseposition(){
        if (now_speed >= 0) 
            speed = speed - 10;
        if (now_speed < 0) 
            speed = speed + 10;
        now_speed = speed
        }

    var btn5 = document.getElementById("robster_vec_button");
    btn5.addEventListener("click", vecposition, false);
        function vecposition(){
            now_speed = -1 * now_speed
            if (speed != 0)
                speed = now_speed
        }


    loop();
    function loop()
    {
        requestAnimationFrame( loop.bind(screen) );
        if (screen.renderer == undefined)return;
        screen.trackball.handleResize();
        screen.renderer.render(screen.scene, screen.camera);
        screen.trackball.update();
        surfaces.position.z -= speed;

    }


}
