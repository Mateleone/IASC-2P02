console.log("Hello World")
console.log("I am excited for use to make our first 3D scene.")

import * as THREE from "three"

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
    window.innerWidth / window.innerHeight,
    0.1,
    100
)

scene.add(camera)
camera.position.set(0,0,5)
//Renderer

const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
})
renderer.setSize(window.innerWidth, window.innerHeight)

//Meshes
//testSphere
const sphereGeometry = new THREE.SphereGeometry(1)
const sphereMaterial = new THREE.MeshNormalMaterial()
const testSphere = new THREE.Mesh(sphereGeometry, sphereMaterial)

scene.add(testSphere)


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
    console.log(elapsedTime)
    //Renderer
    renderer.render(scene, camera)
    //Request next frame
    window.requestAnimationFrame(animation)
}

animation()