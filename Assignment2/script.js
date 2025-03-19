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


const drawCube = (height, params) =>
{
    
    //create cube mat
    const material = new THREE.MeshStandardMaterial({
        color: new THREE.Color(params.color)
    })

    //create cube
    const cube = new THREE.Mesh(cubeGeometry, material)

    //pos cube
    cube.position.x = (Math.random() - 0.5) * params.diameter
    cube.position.z = (Math.random() - 0.5) * params.diameter
    cube.position.y = height -10

    //cube scale
    cube.scale.x = params.scale
    cube.scale.y = params.scale
    cube.scale.z = params.scale

    //randomized cube rotation
    if (params.ramdomized){
        cube.rotation.x = Math.random() *2 *Math.PI
        cube.rotation.y = Math.random() *2 *Math.PI
        cube.rotation.z = Math.random() *2 *Math.PI
    }

    //add cube to group
    params.group.add(cube)
}



//drawCube(0,'red')
//drawCube(1,'blue')
//drawCube(2,'pink')
//drawCube(3,'green')


//UI
const ui = new dat.GUI()

let preset = {}

//groups

const group1 = new THREE.Group()
scene.add(group1)
const group2 = new THREE.Group()
scene.add(group2)
const group3 = new THREE.Group()
scene.add(group3)

const uiObj = {
    sourceText: "The quick brown fox jumped over the lazy dog.",
    saveSourceText() {
        saveSourceText()
    },
    term1: {
        term: 'fox',
        color: '#aa00ff',
        diameter: 10,
        scale: 1,
        ramdomized: true,
        group: group1,
        nCubes: 100
    },
    term2: {
        term: 'dog',
        color: "#00ffaa",
        diameter: 10,
        scale: 1,
        ramdomized: true,
        group: group2,
        nCubes: 100
    },
    
    term3: {
        term: "",
        color: "",
        diameter: 10,
        scale: 1,
        ramdomized: true,
        group: group3,
        nCubes: 100
    },
    
    saveTerms() {
        saveTerms()
    },
    rotateCamera:false
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
    cameraFolder.show()

    /*/Testing
    console.log(uiObj.term1)
    console.log(uiObj.color1)
    console.log(uiObj.term2)
    console.log(uiObj.color2)
    console.log(uiObj.term3)
    console.log(uiObj.color3)*/

    //Text Analysis
    findSearchTermInTokenizedText(uiObj.term1)
    findSearchTermInTokenizedText(uiObj.term2)
    findSearchTermInTokenizedText(uiObj.term3)
    
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
const cameraFolder = ui.addFolder("Camera")

termsFolder
    .add(uiObj.term1, 'term')
    .name('Term 1')

termsFolder
    .add(group1, 'visible')
    .name("Term1 Visibility")
termsFolder 
    .addColor(uiObj.term1, 'color')
    .name('Term 1 Color')

termsFolder
    .add(uiObj.term2, 'term')
    .name('Term 2')

termsFolder
    .add(group2, 'visible')
    .name("Term2 Visibility")

termsFolder 
    .addColor(uiObj.term2, 'color')
    .name('Term 2 Color')

termsFolder
    .add(uiObj.term3, 'term')
    .name('Term 3')

termsFolder
    .add(group3, 'visible')
    .name("Term3 Visibility")

termsFolder 
    .addColor(uiObj.term3, 'color')
    .name('Term 3 Color')

VisualizeFolder
    .add(uiObj, 'saveTerms')
    .name('Visualize')

cameraFolder    
    .add(uiObj, 'rotateCamera')
    .name('Turntable')

//Terms and Visualize folders are hidden by default
termsFolder.hide()
VisualizeFolder.hide()
cameraFolder.hide()

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
const findSearchTermInTokenizedText = (params) =>
{
    
    //use for loop to go through the tokenized text array
    for (let i = 0; i < tokenizedText.length; i++)
    {
       
        //if tokenized text[i] matches our searchterm, then we draw a cube
        if (tokenizedText[i] === params.term){
            //convert i into height, which is a vlaue betwen 0 to 20
            const height = (i / tokenizedText.length) * 20
              
            //call draw cube 100 times using converted height value
            for(let a =0; a <params.nCubes; a++)
            {
                drawCube(height, params)
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

    //Rotate Camera
    if(uiObj.rotateCamera)
    {
        camera.position.x = Math.sin(elapsedTime *0.1 ) *10
        camera.position.z = Math.cos(elapsedTime * 0.1) *10
        camera.position.y = 5
        camera.lootAt(0,0,0)
    }

    //Renderer
    renderer.render(scene, camera)
    //Request next frame
    window.requestAnimationFrame(animation)
}

animation()