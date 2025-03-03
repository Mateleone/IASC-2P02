console.log("Hello World")
console.log("I am excited for use to make our first 3D scene.")

import * as THREE from "three"
import * as dat from "lil-gui"
import {OrbitControls } from "OrbitControls"

//bippidy boppidy

/**SETUP */
const sizes = {
    width: window.innerWidth *0.4,
    height: window.innerHeight,
    aspectRatio: window.innerWidth * 0.4 / window.innerHeight

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

//scene.background = new THREE.Color('pink')
//Camera
const camera = new THREE.PerspectiveCamera(
    60,
    sizes.aspectRatio,
    0.1,
    100
)

scene.add(camera)
camera.position.set(10, 2 , 7.5)
//Renderer

const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha: true
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
//sun
const sunGeometry = new THREE.SphereGeometry(1.5, 32, 32) 
const sunMaterial = new THREE.MeshNormalMaterial() 
const sun = new THREE.Mesh(sunGeometry, sunMaterial)
sun.position.set(10, 0, 0) 
sun.castShadow = true
scene.add(sun)




//planet
const planetGeometry = new THREE.SphereGeometry(.5, 32,32) 
const planetMaterial = new THREE.MeshNormalMaterial() 
const planet = new THREE.Mesh(planetGeometry, planetMaterial)
planet.position.set(5, 0, 2.1) 
planet.castShadow = true
scene.add(planet)
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
directionalLight.position.set(20, 0, 0)
directionalLight.target = cave
directionalLight.castShadow = true
directionalLight.shadow.mapSize.width = 2048
directionalLight.shadow.mapSize.height = 2048


//Directional Light Helper
const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight)
scene.add(directionalLightHelper)

/******
 * 
 * DOM Interactions
 * 
 */
const domObject = {
    part: 1,
    firstChange: false,
    secondChange: false,
    thirdChange: false,
    fourthChange: false
}

//part-one
document.querySelector('#part-one').onclick = function(){
    domObject.part =1
    console.log('Part one!')
}

//part-two
document.querySelector('#part-two').onclick = function(){
    domObject.part =2
}

//firstchange

document.querySelector('#first-change').onclick = function(){
    domObject.firstChange = true
    console.log('change 1')
}

//secondchange
document.querySelector('#second-change').onclick = function(){
    domObject.secondChange = true
    console.log('change 2')
}

//thirdchange
document.querySelector('#third-change').onclick = function(){
    domObject.thirdChange = true
    console.log('change 3')
}

//fourthchange
document.querySelector('#fourth-change').onclick = function(){
    domObject.fourthChange = true
    console.log('change 4')
}






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
    


    //part-one
    if(domObject.part === 1){
        camera.position.set(6, 0, 0)
        camera.lookAt( 0, 0, 0)
        
    }

    //part-two
    if (domObject.part === 2){
        camera.position.set(25,1,0)
        camera.lookAt(0,0,0)
    }

    //firstchange
    if(domObject.firstChange)
    {
        sun.position.y = Math.sin(elapsedTime) * 1.5; 
        planet.position.y = Math.sin(elapsedTime) * 1;
    }

    //secondchange
    if(domObject.secondChange)
    {
        const orbitRadius = 2.2 // Distance from the sun
        planet.position.x = sun.position.x + Math.cos(elapsedTime) * orbitRadius
        planet.position.z = sun.position.z + Math.sin(elapsedTime) * orbitRadius 
    }
    //thirdChange
    if(domObject.thirdChange)
    {
        
    }

    //fourthchange
    if(domObject.fourthChange)
    {
            
    }


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