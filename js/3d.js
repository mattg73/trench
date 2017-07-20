var textureLoader, texturePath, loadedTextures, textureArray;
var viewportWidth, viewportHeight;
var clock, delta;
var renderer, scene, camera, fov, aspectRatio;

function SequenceManager() {
    this.currentSequence = 0;
    this.sequenceList = [
    	setInput,
		loadTextures,
		loadTexturesIdle,
		loadModels,
		loadModelsIdle,
		initWebGL,
		initInteraction,
		initListeners,
		render
    ];
}

SequenceManager.prototype.run = function () {
    this.sequenceList[this.currentSequence]();
}

SequenceManager.prototype.nextSequence = function () {
    this.currentSequence++;
}

function main() {
    sequenceManager.run();
    requestAnimationFrame(main);
}

sequenceManager = new SequenceManager();
requestAnimationFrame(main);

function setInput(){

	/*
	0 = static
	1 = auto
	2 = mouse
	3 = gyroscope
	*/

	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
		inputType = 3;
	}else{
		inputType = 2;
	}

	switch (inputType){
		case 0:
			break
		case 1:
			break;
		case 2:
			break;
		case 3:
			if (window.DeviceOrientationEvent) {
				console.log("DeviceOrientation is supported");
			}else{
				console.log("DeviceOrientation is not supported");
			}
			break;
		default:
			break
	}

	sequenceManager.nextSequence();
}

function loadTextures(){
    textureLoader = new THREE.TextureLoader();
    texturePath = "./images/textures/";

    loadedTextures = 0;

	//var texture = textureLoader.load(texturePath+"texture.jpg", incLoadCount);

    sequenceManager.nextSequence();
}

function incLoadCount(){
	loadedTextures++;
}

function loadTexturesIdle(){
    if(loadedTextures == 0){
        sequenceManager.nextSequence();
    }
}

function loadModels(){
	modelLoader = new THREE.JSONLoader();
	modelPath = "./js/models/"
	loadedModels = 0;

	/*
    modelLoader.load(modelPath+'model.js', function (geometry, mat) {
    	loadedModels++;
        modelGeometry = geometry;
    });
	*/

	sequenceManager.nextSequence();
}

function loadModelsIdle(){
    if(loadedModels == 0){
        sequenceManager.nextSequence();
    }
}

function initWebGL(){
	console.log("initialising WebGL");

	//Setup viewport
	viewportWidth = window.innerWidth;
	viewportHeight = window.innerHeight;

	//Time
    clock = new THREE.Clock(true);
    clock.start();
	delta = 0;

	//WebGL Renderer
	renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
	renderer.setSize(viewportWidth, viewportHeight);
	renderer.setClearColor(0x000000);
	$("#WebGL-output").html(renderer.domElement);

	//Scene
	scene = new THREE.Scene();

	//Lights
    var ambientLight = new THREE.AmbientLight( 0xffffff);
	scene.add( ambientLight );

	//Perspective Camera
	fov = 60;
	aspectRatio = viewportWidth/viewportHeight;
    camera = new THREE.PerspectiveCamera(fov, aspectRatio, 1, 10000);

    //Environment Camera
	//cameraEnvironment = new THREE.PerspectiveCamera( fov, aspectRatio, 1, 10000 );

    //camera positioning to match pixel dimensions
	var cameraHeight = (viewportHeight/2) / Math.tan(degToRad(fov/2));
	camera.position.set(0,0,cameraHeight);
	camera.lookAt(new THREE.Vector3(0,0,-1));
	scene.add(camera);

    //Helpers
    var axisHelper = new THREE.AxisHelper(10);
    axisHelper.position.x = 0;
    axisHelper.position.y = 0;
    axisHelper.position.z = 0;
    scene.add(axisHelper);

    //Environment Cube Map
    /*
    var shader = THREE.ShaderLib.cube;
    var environmentMaterial = new THREE.ShaderMaterial({
        fragmentShader: shader.fragmentShader,
        vertexShader: shader.vertexShader,
        uniforms: {
            tCube: { type: "t", value: environmentCubeMap },
            tFlip: { type: "f", value: -1 }
        },
        side: THREE.BackSide
    }),
    var environmentMesh = new THREE.Mesh(new THREE.BoxGeometry(1000, 1000, 1000), environmentMaterial);
    sceneEnvironment.add(environmentMesh);
    */

    sequenceManager.nextSequence();
}

function initInteraction(){
	//rayCenter = new THREE.Vector2(0,0);
	//raycaster = new THREE.Raycaster(camera.position, new THREE.Vector3(0,0,-1), 1, 100);

	sequenceManager.nextSequence();
}

function initListeners(){
    //Init interaction functions
    //document.addEventListener('keypress', onKeyPress, false);
    //window.addEventListener('resize', onWindowResize, false);
    //window.addEventListener('orientationchange', onWindowResize, false);
    //window.addEventListener('mousemove', onMouseMove, false);
    //window.addEventListener('touchstart', onTouchStart, false);

    sequenceManager.nextSequence();
}

function render(){
	delta = Math.min(clock.getDelta(), 1/10);

	renderer.render(scene, camera);
}

//UTILITY

function projectToScreen(object, camera){
    object.updateMatrixWorld();
    projectToScreenVector.setFromMatrixPosition( object.matrixWorld );
    projectToScreenVector.project(camera);

    projectToScreenVector.x = ( projectToScreenVector.x * 0.5 ) + 0.5;
    projectToScreenVector.y = ( projectToScreenVector.y * 0.5 ) + 0.5;

    return projectToScreenVector.clone();
}

function checkRayIntersections(){
	raycaster.setFromCamera(rayCenter, camera);
	if(raycaster.intersectObject(dummyMesh1, false)[0]){
		dummyMesh1.material.color = new THREE.Color(0xff0000);
	}

	if(raycaster.intersectObject(dummyMesh2, false)[0]){
		dummyMesh2.material.color = new THREE.Color(0xff0000);
	}

	if(raycaster.intersectObject(dummyMesh3, false)[0]){
		dummyMesh3.material.color = new THREE.Color(0xff0000);
	}
}

function onKeyPress(event){
    switch(event.key){
        case "1":
            //Do stuff;
            break;    
    }
}

//MATH

function lerp(value1, value2, amount) {
    amount = amount < 0 ? 0 : amount;
    amount = amount > 1 ? 1 : amount;
    return value1 + (value2 - value1) * amount;
}

function map(value, fromLow, fromHigh, toLow, toHigh){
    var normalisedPosition = (value-fromLow)/(fromHigh-fromLow);
    return toLow + (toHigh-toLow)*normalisedPosition;
}

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomBetween(low, high) {
    return low + (Math.random() * (high - low));
}

function degToRad(value){
    return value/180 * Math.PI;
}

function radToDeg(value){
    return value/Math.PI * 180;
}   

function constrain(value, min, max){
	return Math.min(Math.max(value, min), max);
}

function pseudoGaussian() {
    return ((Math.random() + Math.random() + Math.random() + Math.random()) - 2) / 2;
}