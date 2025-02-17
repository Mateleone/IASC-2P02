console.log("Hello World")
console.log("I am excited for use to make our first 3D scene.")

import * as THREE from "three"
import * as dat from "lil-gui"
import {OrbitControls } from "OrbitControls"

//bippidy boppidy

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
scene.background = new THREE.Color('black')
//Camera
const camera = new THREE.PerspectiveCamera(
    75,
    sizes.aspectRatio,
    0.1,
    100
)

scene.add(camera)
camera.position.set(10, 2 , 7.5)
//Renderer

const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap


//Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

//Meshes
//Cave
const caveGeometry = new THREE.PlaneGeometry(15.5, 7.5)
const caveMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color ('white'),
    side: THREE.DoubleSide
})
const cave = new THREE.Mesh(caveGeometry, caveMaterial)
cave.rotation.y = Math.PI * 0.5
cave.receiveShadow = true
scene.add(cave)

//Objects
const torusKnotGeometry = new THREE.TorusKnotGeometry(1, 0.2)
const torusKnotMaterial = new THREE.MeshNormalMaterial()
const torusKnot = new THREE.Mesh(torusKnotGeometry, torusKnotMaterial)
torusKnot.position.set(10, 5, 0)
torusKnot.castShadow = true
scene.add(torusKnot)

//smile stuff
const eyeGeometry = new THREE.SphereGeometry(0.3, 16, 16)
const eyeMaterial = new THREE.MeshStandardMaterial({ color: 'white' })
const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial)
leftEye.position.set(5.4, 2, 1.2)
leftEye.castShadow = true
scene.add(leftEye)

const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial)
rightEye.position.set(5.4, 2, -1.2)
rightEye.castShadow = true
scene.add(rightEye)

const mouthGeometry = new THREE.TorusGeometry(0.8, 0.15, 16, 50, Math.PI)
const mouthMaterial = new THREE.MeshStandardMaterial({ color: 'white' })
const mouth = new THREE.Mesh(mouthGeometry, mouthMaterial)
mouth.position.set(6, 0.5, 0.2)
mouth.rotation.x = Math.PI
mouth.rotation.y = Math.PI /2 
mouth.castShadow = true
scene.add(mouth)
//LIGHTS//

//Ambient Light
//const ambientLight = new THREE.AmbientLight(0x404040)
//scene.add(ambientLight)

//Directional Light
const directionalLight = new THREE.DirectionalLight(
    new THREE.Color('white'),
    0.5
)
scene.add(directionalLight)
directionalLight.position.set(20, 4.1, 0)
directionalLight.target = cave
directionalLight.castShadow = true
directionalLight.shadow.mapSize.width = 2048
directionalLight.shadow.mapSize.height = 2048


//Directional Light Helper
const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight)
scene.add(directionalLightHelper)



//UI
const ui = new dat.GUI()

const lightPositionFolder = ui.addFolder('Light Position')

lightPositionFolder
    .add(directionalLight.position, 'y')
    .min(-10)
    .max(10)
    .step(0.1)
    .name("y")

lightPositionFolder
    .add(directionalLight.position, "z")
    .min(-10)
    .max(10)
    .step(0.1)
    .name("z")

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

    //Animate object
    torusKnot.rotation.y = elapsedTime
    
    //update directional light helper
    directionalLightHelper.update()


    //Update OrbitControls
    controls.update()


    //Renderer
    renderer.render(scene, camera)
    //Request next frame
    window.requestAnimationFrame(animation)
}

animation()