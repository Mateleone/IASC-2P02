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
    cube.position.y = height -10

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

let preset = {}

const uiObj = {
    sourceText: "The quick brown fox jumped over the lazy dog.",
    saveSourceText() {
        saveSourceText()
    },
    term1: 'fox',
    color1:'#aa00ff',
    term2: 'dog',
    color2:'#00ffaa',
    term3: '',
    color3:'',
    saveTerms() {
        saveTerms()
    }
}

//UI Functions
const saveSourceText = () =>
{
    //UI
    preset = ui.save()
    textFolder.hide()
    termsFolder.show()
    VisualizeFolder.show()

    //Text Analysis
    tokenizeSourceText(uiObj.sourceText)
    //console.log(uiObj.sourceText)
    
}

const saveTerms = () =>
{
    //UI
    preset = ui.save
    VisualizeFolder.hide()

    /*/Testing
    console.log(uiObj.term1)
    console.log(uiObj.color1)
    console.log(uiObj.term2)
    console.log(uiObj.color2)
    console.log(uiObj.term3)
    console.log(uiObj.color3)*/

    //Text Analysis
    findSearchTermInTokenizedText(uiObj.term1, uiObj.color1)
    findSearchTermInTokenizedText(uiObj.term2, uiObj.color2)
    findSearchTermInTokenizedText(uiObj.term3, uiObj.color3)
    
}

//Text Folder
const textFolder = ui.addFolder("Source text")

textFolder
    .add(uiObj, 'sourceText')
    .name("Source Text")

textFolder  
    .add(uiObj, 'saveSourceText')
    .name("Save")

//Terms and Visualize Folders
const termsFolder = ui.addFolder("Search Terms")
const VisualizeFolder = ui.addFolder("Visualize")

termsFolder
    .add(uiObj, 'term1')
    .name('Term 1')

termsFolder 
    .addColor(uiObj, 'color1')
    .name('Term 1 Color')

termsFolder
    .add(uiObj, 'term2')
    .name('Term 2')

termsFolder 
    .addColor(uiObj, 'color2')
    .name('Term 2 Color')

termsFolder
    .add(uiObj, 'term3')
    .name('Term 3')

termsFolder 
    .addColor(uiObj, 'color3')
    .name('Term 3 Color')

VisualizeFolder
    .add(uiObj, 'saveTerms')
    .name('Visualize')

//Terms and Visualize folders are hidden by default
termsFolder.hide()
VisualizeFolder.hide()

//Variables
let parsedText, tokenizedText

//parse and tokenized sourceText
const tokenizeSourceText = (sourceText) =>
{
    //no peiods, no upper case
    parsedText = sourceText.replaceAll(".", "").toLowerCase()
    

    //tokenize
    tokenizedText = parsedText.split(/[^\w']+/)
    console.log(tokenizedText)
    
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
            const height = (i / tokenizedText.length) * 20
              
            //call draw cube 100 times using converted height value
            for(let a =0; a <100; a++)
            {
                drawCube(height, color)
            }
           
           
        }
    }
}



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