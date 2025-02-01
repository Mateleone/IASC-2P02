console.log("Hello World")
console.log("I am excited for use to make our first 3D scene.")

import * as THREE from "three"
import {OrbitControls } from "OrbitControls"
import * as dat from "lil-gui"


/**SETUP */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
    aspectRatio: window.innerWidth / window.innerHeight

}

console.log(sizes.width)

//console.log(THREE)
console.log("Hi there")
/********
 * *SCENE **
 *******/
//Canvas
const canvas = document.querySelector('.webgl')
//Scene
const scene = new THREE.Scene()
scene.background = new THREE.Color('grey')
//Camera
const camera = new THREE.PerspectiveCamera(
    75,
    sizes.aspectRatio,
    0.1,
    100
)

scene.add(camera)
camera.position.set(-1,2,5)
//Renderer

const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
})
renderer.setSize(sizes.width, sizes.height)

//Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

//Meshes
//testSphere
const sphereGeometry = new THREE.TorusKnotGeometry(1)
const sphereMaterial = new THREE.MeshNormalMaterial()
const testSphere = new THREE.Mesh(sphereGeometry, sphereMaterial)

scene.add(testSphere)

//Plane
const planeGeometry = new THREE.PlaneGeometry(10, 10, 20, 20)
const planeMaterial = new THREE.MeshBasicMaterial({
    color: new THREE.Color('White'),
    side: THREE.DoubleSide,
    wireframe: true
})
const plane = new THREE.Mesh(planeGeometry, planeMaterial)
plane.rotation.x = Math.PI * 0.5

scene.add(plane)

//UI
const ui = new dat.GUI()

//Ui object
const uiObject = {
    speed:1,
    distance:1,
    rotationSpeed: 0.5
}
    

//TestSPehere UI
const sphereFolder = ui.addFolder('Sphere')

sphereFolder
    .add(uiObject, 'speed')
    .min(0.1)
    .max(10)
    .step(0.5)
    .name('Speed')

sphereFolder
    .add(uiObject, 'distance')
    .min(0.1)
    .max(10)
    .step(0.5)
    .name('Distance')

sphereFolder
    .add(uiObject, 'rotationSpeed')
    .min(0.01)
    .max(1)
    .step(0.01)
    .name('Rotation Speed');

//plane ui
const planeFolder = ui.addFolder('Plane')

planeFolder
    .add(planeMaterial, 'wireframe')
    .name("Toggle Wireframe")



/**
 * *Annimation Loop**
 * 
 */

const clock = new THREE.Clock()

const animation = () =>
{
     //console.log("Test")
    // Return elasped Time
    const elapsedTime = clock.getElapsedTime()
    
    //Animate Sphere
    testSphere.position.y = Math.sin(elapsedTime * uiObject.speed) * uiObject.distance

    // Update rotation logic in the animation loop
    testSphere.rotation.x += uiObject.rotationSpeed;
    testSphere.rotation.y += uiObject.rotationSpeed;

    //Update OrbitControls
    controls.update()


    //Renderer
    renderer.render(scene, camera)
    //Request next frame
    window.requestAnimationFrame(animation)
}

animation()