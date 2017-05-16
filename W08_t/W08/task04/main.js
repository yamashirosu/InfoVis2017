function main()
{
    console.log("aaaa");
    var width = 500;
    var height = 500;

    var scene = new THREE.Scene();

    var fov = 45;
    var aspect = width / height;
    var near = 1;
    var far = 1000;
    var camera = new THREE.PerspectiveCamera( fov, aspect, near, far );
    camera.position.set( 0, 0, 5 );
    scene.add( camera );

    var light = new THREE.PointLight();
    light.position.set( 5, 5, 5 );
    scene.add( light );

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize( width, height );
    document.body.appendChild( renderer.domElement );

    // var uniforms = {
    //                     Ks: { type: "v3", value: new THREE.Vector3() },
    //                     Kd: { type: "v3", value: new THREE.Vector3() },
    //                     ambient:    { type: "v3", value: new THREE.Vector3() },
    //                     pointLightPosition: { type: "v3", value: new THREE.Vector3() },
    //                     lightPower: { type: "v3", value: new THREE.Vector3() },
    //                     s: {type: "f", value: 0},
    //                     m: {type: "f", value: 0}
    //                 };

    //                     uniforms.Ks.value = new THREE.Vector3( 0.95, 0.93, 0.88 );
    //         uniforms.Kd.value = (new THREE.Vector3( 0.50754, 0.50754, 0.50754 ));
    //         uniforms.ambient.value = (new THREE.Vector3( 0.5, 0.5, 0.5 ));
    //         uniforms.pointLightPosition.value = new THREE.Vector3(light.position.x, light.position.y, light.position.z);
    //         uniforms.lightPower.value = new THREE.Vector3( 7000.0, 7000.0, 7000.0 );
    //         uniforms.s.value = 0.5;
    //         uniforms.m.value = 0.1;

    var geometry = new THREE.TorusKnotGeometry( 1, 0.3, 100, 20 );

    var material = new THREE.ShaderMaterial({
        vertexColors: THREE.VertexColors,
        vertexShader: document.getElementById('phong.vert').text,
        fragmentShader: document.getElementById('phong.frag').text,
        uniforms: {
            light_position: { type: 'v3', value: light.position },
            Ks: { type: "v3", value: new THREE.Vector3( 0.95, 0.93, 0.88 ) },
            Kd: { type: "v3", value: new THREE.Vector3( 0.50754, 0.50754, 0.50754 ) },
            ambient:    { type: "v3", value: new THREE.Vector3( 0.5, 0.5, 0.5 ) },
            pointLightPosition: { type: "v3", value: new THREE.Vector3(light.position.x, light.position.y, light.position.z)},
            lightPower: { type: "v3", value: new THREE.Vector3( 0.0, 0.0, 0.0 ) },
            s: {type: "f", value: 0.5},
            m: {type: "f", value: 0.1}

        }
    });
    // Ks = new THREE.Vector3( 0.95, 0.93, 0.88 );
    // Kd = (new THREE.Vector3( 0.50754, 0.50754, 0.50754 ));
    // ambient = (new THREE.Vector3( 0.5, 0.5, 0.5 ));
    // pointLightPosition = new THREE.Vector3(light.position.x, light.position.y, light.position.z);
    // lightPower = new THREE.Vector3( 7000.0, 7000.0, 7000.0 );
    // s = 0.5;
    // m = 0.1;


    var torus_knot = new THREE.Mesh( geometry, material );
    scene.add( torus_knot );

    loop();

    function loop()
    {
        requestAnimationFrame( loop );
        torus_knot.rotation.x += 0.01;
        torus_knot.rotation.y += 0.01;
        renderer.render( scene, camera );
    }
}
