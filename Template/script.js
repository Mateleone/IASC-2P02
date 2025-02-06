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
scene.background = new THREE.Color('grey')
//Camera
const camera = new THREE.PerspectiveCamera(
    75,
    sizes.aspectRatio,
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
renderer.setSize(sizes.width, sizes.height)

//Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

//Meshes
//testSphere
const sphereGeometry = new THREE.SphereGeometry(1)
const sphereMaterial = new THREE.MeshNormalMaterial()
const testSphere = new THREE.Mesh(sphereGeometry, sphereMaterial)

scene.add(testSphere)

//UI
const ui = new dat.GUI()


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
    
    //Update OrbitControls
    controls.update()


    //Renderer
    renderer.render(scene, camera)
    //Request next frame
    window.requestAnimationFrame(animation)
}

animation()