import * as THREE from 'three';



const scene = new THREE.Scene();

// Create the camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Create the renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create the cube geometry
const cubeGeometry = new THREE.BoxGeometry(3, 3, 3);

// Load the images as textures
const textureLoader = new THREE.TextureLoader();
const textures = [
  textureLoader.load('public/social.png', () => {}, undefined, err => console.error(err)),
  textureLoader.load('public/social2.png', () => {}, undefined, err => console.error(err)),
  textureLoader.load('public/enivironent1.png', () => {}, undefined, err => console.error(err)),
  textureLoader.load('public/envionment2.png', () => {}, undefined, err => console.error(err)),
  textureLoader.load('public/goverance1.png', () => {}, undefined, err => console.error(err)),
  textureLoader.load('public/goverance2.png', () => {}, undefined, err => console.error(err)),
];

// Create an array of materials with textures applied to each face
const materials = textures.map(texture => new THREE.MeshBasicMaterial({ map: texture }));

// Create the cube mesh with individual materials for each face
const cube = new THREE.Mesh(cubeGeometry, materials);

// Add the cube to the scene
scene.add(cube);

// Variables for mouse movement tracking
let isDragging = false;
let previousMousePosition = { x: 0, y: 0 };

// Event listener for mouse down event
document.addEventListener('mousedown', event => {
  if (event.button === 0) {
    isDragging = true;
    previousMousePosition = { x: event.clientX, y: event.clientY };
  }
});

// Event listener for mouse move event
document.addEventListener('mousemove', event => {
  if (isDragging) {
    const deltaMove = {
      x: event.clientX - previousMousePosition.x,
      y: event.clientY - previousMousePosition.y
    };

    const rotationSpeed = 0.01;

    cube.rotation.x += rotationSpeed * deltaMove.y;
    cube.rotation.y += rotationSpeed * deltaMove.x;

    previousMousePosition = { x: event.clientX, y: event.clientY };
  }
});

// Event listener for mouse up event
document.addEventListener('mouseup', event => {
  if (event.button === 0) {
    isDragging = false;
  }
});

// Render loop
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

// Start the animation
animate();
