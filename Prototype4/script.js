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

//Resizing
window.addEventListener('resize',()=>
{
    //Update Sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight
    sizes.aspectRatio = window.innerHeight / window.innerWidth

    //update camera
    camera.aspect = sizes.aspectRatio
    camera.updateProjectionMatrix()

    //update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

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
camera.position.set(0,12,-20)
//Renderer

const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
})
renderer.setSize(sizes.width, sizes.height)

//Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

//lights
//direct
const directionalLight = new THREE.DirectionalLight(0x404040, 100)
scene.add(directionalLight)

//Meshes
//Cube Geometry
const cubeGeometry= new THREE.BoxGeometry(0.5,0.5,0.5)

const drawCube = (height, color) =>
{
    
    //create cube mat
    const material = new THREE.MeshStandardMaterial({
        color: new THREE.Color(color)
    })

    //create cube
    const cube = new THREE.Mesh(cubeGeometry, material)

    //pos cube
    cube.position.x = (Math.random() - 0.5) * 10
    cube.position.z = (Math.random() - 0.5) * 10
    cube.position.y = height

    //randomized cube rotation
    cube.rotation.x = Math.random() *2 *Math.PI
    cube.rotation.y = Math.random() *2 *Math.PI
    cube.rotation.z = Math.random() *2 *Math.PI

    //add cube to scene
    scene.add(cube)
}

//drawCube(0,'red')
//drawCube(1,'blue')
//drawCube(2,'pink')
//drawCube(3,'green')


//UI
const ui = new dat.GUI()

//Text Analysis
//Source Text
const sourceText = "The quick brown fox jumped over the lazy goat. The lazy..."

//Variables
let parsedText, tokenizedText

//parse and tokenized sourceText
const tokenizeSourceText = () =>
{
    //no peiods, no upper case
    parsedText = sourceText.replaceAll(".", "").toLowerCase()
    console.log(parsedText)

    //tokenize
    tokenizedText = parsedText.split(/[^\w']+/)
    
}

//Find the searchterm in tokenized text
const findSearchTermInTokenizedText = (term, color) =>
{
    
    //use for loop to go through the tokenized text array
    for (let i = 0; i < tokenizedText.length; i++)
    {
       
        //if tokenized text[i] matches our searchterm, then we draw a cube
        if (tokenizedText[i] === term){
            //convert i into height, which is a vlaue betwen 0 to 20
            const height = (100 /tokenizedText.length) *1 * 0.2
              
            //call draw cube 100 times using converted height value
            for(let a =0; a <100; a++)
            {
                drawCube(height, color)
            }
           
           
        }
    }
}


tokenizeSourceText()
findSearchTermInTokenizedText("brown", "brown")
findSearchTermInTokenizedText("fox", "orange")
findSearchTermInTokenizedText("the", "grey")
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