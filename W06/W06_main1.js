function main()
{
    var vertices = [[0,0,0],
                    [0,0,1],
                    [0,1,0],
                    [0,1,1],
                    [1,0,0],
                    [1,1,0],
                    [1,1,1],
                    [1,0,1],
                   ];
    var faces = [[0,1,3],[0,3,2],[1,7,3],[3,7,6],[0,4,1],[1,4,7],[0,2,4],[2,5,4],[6,7,4],[4,5,6],[2,3,5],[3,6,5]];
    var width = 500;
    var height = 500;

    var scene = new THREE.Scene();
    var fov = 45;
    var aspect = width / height;
    var near = 1;
    var far = 100;
    var camera = new THREE.PerspectiveCamera( fov, aspect, near, far );

    var light = new THREE.PointLight( 0xffffff );
    light.position.set( 1, 1, 5);
    scene.add( light );

    camera.position.set( 0, 0, 5 );
    scene.add( camera );

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize( width, height );
    document.body.appendChild( renderer.domElement );

    var v0 = new THREE.Vector3().fromArray(vertices[0]);
    var v1 = new THREE.Vector3().fromArray(vertices[1]);
    var v2 = new THREE.Vector3().fromArray(vertices[2]);
    var v3 = new THREE.Vector3().fromArray(vertices[3]);
    var v4 = new THREE.Vector3().fromArray(vertices[4]);
    var v5 = new THREE.Vector3().fromArray(vertices[5]);
    var v6 = new THREE.Vector3().fromArray(vertices[6]);
    var v7 = new THREE.Vector3().fromArray(vertices[7]);

    var geometry = new THREE.Geometry();
    geometry.vertices.push(v0);
    geometry.vertices.push(v1);
    geometry.vertices.push(v2);
    geometry.vertices.push(v3);
    geometry.vertices.push(v4);
    geometry.vertices.push(v5);
    geometry.vertices.push(v6);
    geometry.vertices.push(v7);

    for(i=0;i<12;i++){
    var id = faces[i];
    var f = new THREE.Face3(id[0],id[1],id[2]);
    geometry.faces.push(f);
    }

    var material = new THREE.MeshLambertMaterial();
    material.vertexColors = THREE.FaceColors;
    for(i = 0;i<12;i++){
        geometry.faces[i].vertexColors.push(new THREE.Color(1,0,0));
        geometry.faces[i].vertexColors.push(new THREE.Color(1,0,0));
        geometry.faces[i].vertexColors.push(new THREE.Color(0,0,0));
    }
    geometry.computeFaceNormals();
    material.side = THREE.DoubleSide;
    var triangle = new THREE.Mesh(geometry,material);
    scene.add(triangle);
    loop();

    function loop()
    {
        requestAnimationFrame( loop );
        triangle.rotation.x += 0.04;
        triangle.rotation.y += 0.04;
        renderer.render( scene, camera);
    }

}
