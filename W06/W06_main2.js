    var vertices = [[-1,-1,-1],
                    [-1,-1,1],
                    [-1,1,-1],
                    [-1,1,1],
                    [1,-1,-1],
                    [1,1,-1],
                    [1,1,1],
                    [1,-1,1],
                   ];
    var faces = [[0,1,3],[0,3,2],[1,7,3],[3,7,6],[0,4,1],[1,4,7],[0,2,4],[2,5,4],[6,7,4],[4,5,6],[2,3,5],[3,6,5]];
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

    var material = new THREE.MeshBasicMaterial();
    material.vertexColors = THREE.FaceColors;
    //geometry.computeFaceNormals();
    var triangle = new THREE.Mesh(geometry,material);
    scene.add(triangle);
    loop();

    function loop()
    {
        requestAnimationFrame( loop );
        triangle.rotation.x += 0.01;
        triangle.rotation.y += 0.01;
        renderer.render( scene, camera );
    }


function mouse_down_event( event )
{
    var mouse = new THREE.Vector2();
    var x_win = event.clientX;
    var y_win = event.clientY;
    var vx = renderer.domElement.offsetLeft;
    var vy = renderer.domElement.offsetTop;
    var vw = renderer.domElement.width;
    var vh = renderer.domElement.height;

    var x_NDC = 2 * (x_win -vx) / vw - 1;
    var y_NDC = - (2 * (y_win -vy) / vh) + 1;
    var p_NDC = new THREE.Vector3(x_NDC, y_NDC, 1)
    var p_wld = p_NDC.unproject(camera)

    var direction = camera.getWorldDirection();
    var raycaster = new THREE.Raycaster(camera.position, direction);
    var intersects = raycaster.intersectObject( triangle );
    if(intersects.length > 0)
    {
        console.log(intersects[0].faceIndex);
        intersects[0].face.color.setRGB(1,0,0);
        intersects[0].object.geometry.colorsNeedUpdate = true;
    }
}
document.addEventListener( 'mousedown', mouse_down_event);
