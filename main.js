import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const canvas = document.querySelector('canvas.webgl')

const renderer = new THREE.WebGLRenderer({
	canvas: canvas
});
renderer.setSize( window.innerWidth, window.innerHeight );
// renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 3;

//time
var time = Date.now()
function animate() {
	
}
renderer.render( scene, camera );

const tick = ()=>{

	//time
	const currentTime = Date.now();
	const deltaTime = currentTime - time; // smaller value with good computer and good framerate like 16-17
	time = currentTime;

	console.log(deltaTime);

	// update the object
	cube.rotation.y += 0.002 * deltaTime; // multiply so that it can animate in right fps
	// cube.position.x +=0.01 * deltaTime;
	//render
	renderer.render( scene, camera );

	window.requestAnimationFrame(tick); // to call it recursively on every next frame
}

tick(); // call at least once to start the function