var renderer,labelRenderer;
// window.onload = draw;
function initRender() {
    renderer = new THREE.WebGLRenderer({antialias:true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000);
    document.body.appendChild(renderer.domElement);

    labelRenderer = new THREE.CSS2DRenderer();
    labelRenderer.setSize(window.innerWidth, window.innerHeight);
    labelRenderer.domElement.style.position = 'absolute';
    labelRenderer.domElement.style.top = '0';
    LabelRenderer.domElement.style.pointerEvents = 'none';
    document.body.appendChild(labelRenderer.domElement);
}

var camera;
function initCamera() {
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 40, 50);
    camera.lookAt(new THREE.Vectors3(0, 0, 0));
}

var scene;
function initScene() {
    scene = new THREE.Scene();
}

var gui;
function intiGui() {
    gui = {};
    var datGui = new dat.GUI();
}

var light;
function initLight() {
    scene.add(new THREE.AmbientLight(0x444444));

    light = new THREE.DirectionalLight(0xffffff);
    light.position.set(200, 200, 100);
    
    light.castShadow = true;
    scene.add(light);
}

function initModel(path) {
    var helper = new THREE.AxesHelper(50);
    scene.add(helper);
    
    var loader = new THREE.PDBLoader();
    loader.load(path, function(pdb) {
	// create a model group
	var root = new THREE.Group();
    	var offset = new THREE.Vector3();
	
	var geometryAtoms = pdb.geometryAtoms;
	var geometryBonds = pdb.geometryBonds;
	var json = pdb.json;

 	var boxGeometry = new THREE.BoxBufferGeometry(1,1,1);
	var sphereGeometry = new THREE.IcosahedronBufferGeometry(1,2);
	
	// let the model center	
	geometryAtoms.computeBoundingBox();
	geometryAtoms.boundingBox.getCenter(offset).negate();
	geometryAtoms.translate(offset.x, offset.y, offset.z);
	geometryBonds.translate(offset.x, offset.y, offset.z);

	var positions = geometryAtoms.getAttribute('position');
	var colors = geometryAtoms.getAttribute('color');
	var position = new THREE.Vector3();
	var color = new THREE.Color();
	for (var i = 0; i < positions.count; i++) {
	    position.x = positions.getX(i);
	    position.y = positions.getY(i);
	    position.z = positions.getZ(i);
 	    color.r = colors.getX(i);
	    color.g = colors.getY(i);
	    color.b = colors.getZ(i);
	    var material = new THREE.MeshPhongMaterial({color: color});
	    var object = new THREE.Mesh(sphereGeometry, material);
	    objest.position.copy(position);
	    object.position.multiplyScalar(75);
	    object.scale.multiplyScalar(25);
	    root.add(object);
	    var atom = json.atoms[i];
	    var text = document.createElement('p');
	    text.className = 'label';
	    text.style.color = 'rgb(' + atom[3][0] + ',' + atom[3][1] + ',' + atom[3][2] + ')';
	    text.style.textShadow = "1px 1px 1px #000";
	    text.textContent = atom[4];
	    var label = new THREE.CSS2DObject(text);
	    label.position.copy(object.position);
	    root.add(label);
    	}

	positions = geometryBonds.getAttribute('position');
	var start = new THREE.Vector3();
	var end = new THREE.Vector3();
	for (var i = 0; i < positions.count; i += 2) {
	    start.x = positions.getX(i);
	    start.y = positions.getY(i);
	    start.z = positions.getZ(i);
	    end.x = positions.getX(i + 1);
	    end.y = positions.getY(i + 1);
	    end.z = positions.getZ(i + 1);
	    start.multiplyScalar(75);
	    end.multiplyScalar(75);
	    var object = new THREE.Mesh(boxGeomtry, new THREE.MeshPhongMaterial(0xffffff));
	    object.position.copy(start);
	    object.position.lerp(end, 0.5);
	    object.scale.set(5, 5, start.distanceTo(end));
	    object.lookAt(end);
	    root.add(object);
	}
	root.scale.set(0.1, 0.1, 0.1);
	scene.add(root);
    });
}

var stats;
function initStats() {
    stats = new Stats();
    document.body.appendChild(stats.dom);
}

var controls;
function initControls() {
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enableZoom = true;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.5;
    controls.minDistance = 1;
    controls.maxDistance = 200;
    controls.enablePan = true;
}

function render() {
    renderer.render(scene, camera);
    labelRenderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    render();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    render();
    stats.update();
    controls.update();
    requestAnimationFrame(animate);
}

function draw() {
    if(!Detector.webgl) {
        Detector.addGetWebGLMessage();
    }
    initGui();
    initRender();
    initScene();
    initControls();
    initLight();
    initModel();
    initStats();

    animate();
    window.onresize = onWindowResize;
}
