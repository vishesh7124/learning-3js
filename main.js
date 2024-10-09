import * as THREE from 'three';
import gsap from 'gsap';
import { OrbitControls } from 'three/examples/jsm/Addons.js';

const scene = new THREE.Scene();

// cursor 
const cursor = {
	x:0,
	y:0
}
window.addEventListener('mousemove',(event)=>{
	cursor.x = event.clientX/sizes.width - 0.5; // divides in 4 quadrants
	cursor.y = -(event.clientY/sizes.height - 0.5);
	console.log(cursor.x,cursor.y);
})

const sizes = {
	width: 800,
	height:600
}
const aspectRatio  = sizes.width / sizes.height;
const camera = new THREE.PerspectiveCamera( 75, sizes.width / sizes.height, 0.1, 1000 ); // (FOV - vertical between 75 to 85,aspect ratio : width of render / height of render, near - like near point of the eye,far) Any object farther or nearer to the camera will not be visible
// const camera = new THREE.OrthographicCamera(
// 	-1 *aspectRatio,
// 	1 *aspectRatio, // multiply with aspect ratio , so that the shape/mesh can be viewed exactly same from different references
// 	1,
// 	-1,
// 	0.1,
// 	100)

camera.position.z =2;
const canvas = document.querySelector('canvas.webgl')


const renderer = new THREE.WebGLRenderer({
	canvas: canvas
});
// controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true //to give acceleration and friction , has to be updated in every frame so control.update() in tick function
// controls.target.y =1; // to change the target
// controls.update();
renderer.setSize( sizes.width, sizes.height );
// renderer.setSize( window.innerWidth, window.innerHeight );
// renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );

const geometry = new THREE.BoxGeometry( 1, 1, 1,5,5,5 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

// camera.position.z = 3;
console.log(camera.position.length()) // returns distance

//time
// var time = Date.now()

// CLock
const clock = new THREE.Clock();

function animate() {
	
}
renderer.render( scene, camera );

// Animation using gsoc
// gsap.to(cube.position,{
// 	x: 2,
// 	duration:1,
// 	delay:1,
// })
// gsap.to(cube.position,{
// 	x: 0,
// 	duration:1,
// 	delay:3,
// })

//Animations

const tick = ()=>{

	// //time
	// const currentTime = Date.now();
	// const deltaTime = currentTime - time; // smaller value with good computer and good framerate like 16-17
	// time = currentTime;

	//clock
	const elapsedTime = clock.getElapsedTime();

	// update the object
	// cube.rotation.y += 0.002 * deltaTime; // multiply so that it can animate in right fps
	// cube.position.x +=0.01 * deltaTime;
	// cube.rotation.x = elapsedTime  * Math.PI/2; // 1 rev per second
	// cube.rotation.y = elapsedTime  * Math.PI/2; // 1 rev per second
	// cube.position.x = Math.sin(elapsedTime)
	// cube.position.y = Math.cos(elapsedTime);
	// camera.lookAt(cube.position) // always looking at cube

	// update camera 
	// camera.position.x = cursor.x * 10
	// camera.position.y = cursor.y * 10

	// Move the camera around the center with only 1 revolutions showing 4 faces of cube in each axis
	// camera.position.x = Math.sin(cursor.x * Math.PI * 2) *3 ; 
	// camera.position.z = Math.cos(cursor.x * Math.PI * 2 ) * 3;
	// camera.position.y = cursor.y * 5;
	// camera.lookAt(new THREE.Vector3())
	camera.lookAt(cube.position)
	controls.update();


	//render
	renderer.render( scene, camera );

	window.requestAnimationFrame(tick); // to call it recursively on every next frame
}

tick(); // call at least once to start the function