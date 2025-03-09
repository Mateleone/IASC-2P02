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

//Text Analysis
//Source Text
const sourceText = `For countless years, Semeter, Son of Argust, God of the Wind and Sky, soared high above the city of Kroy. His giant wings would cut through the clouds, casting shadows over the earth as he would rule over the skies. To the people of Kroy, he was their protector, their guardian. When storms gathered, he scattered them, and when drought began, he summoned gentle rains. The sight of his shadow gliding across their fields was a blessing, and they praised the great god of the sky.
One day, a storm unlike any Kroy had ever known descended upon the land. Its winds shook mountains, its lightning tore through the sky like claws of a beast. Semeter rose to meet the storm, his wings cutting through its chaotic winds as he tried to bend it to his will. The storm was wild, relentless, and angry, giving the god more of a challenge than any other.
Semeter fought hard, the battle echoing through the sky, but the storm struck him down. With a deafening clap of thunder, Semeter fell from the sky, his wings aflame. The god who had once commanded the sky now plummeted towards the earth, and with the skies untamed and feral, further chaos erupted.
The storms that found the land free from the gods' protection raged on for weeks, tearing through Kroy. Houses were ripped from their foundations, farmland ravaged, and river banks experienced catastrophic flooding, drowning everything in their path. The people of Kroy cried out to the heavens, out to Semeter for salvation but no answer came.
When the storms finally relented, Kroy was a shadow of its former self. A wilted flower that was once a tall tree. Those who survived were left to rebuild, their prayers still unanswered. The Son of Argust had disappeared, retreating into a distant mountain to nurse his wounds, and his pride.
Within the dark cave of the mountain, Semeter sat in despair. He studied his wings, once powerful and majestic, now too scorched and tattered to even attempt to fly. Days passed as he called out to his father, Argust the God of Season Change. O Father, he wept, his voice echoing in the emptiness of the cave. I am in pain, a pain I have never known. My wings burn, and without them, I am nothing. How can I be The God of the Wind and Sky if I cannot be one with them? Semeter’s prayers were left unanswered, turning to cold and bitter tears as he lie within his decrepit little cave. 

One day, as Semeter brooded in the shadows, a figure appeared at the entrance of the cave, a young boy. You, the boy said, his voice carrying more boldness than any mortal had dared to speak to Semeter before. You, who once danced through the skies, now cower in this pit? Why do you hide, Son of Argust? You, the God of the Wind and Sky, greater than all but Argust himself?
Semeter’s first instinct was to dismiss the boy, to wave him away like an annoying fly. Leave me, he growled. I have no patience for your foolishness.
But the boy stood his ground, undeterred. You hide here, sulking and defeated, while Kroy lies in ruins. Is this how a god behaves? You still have power, O Semeter. You still have a duty.
Semeter scoffed, his pride stinging. Power? Duty? Look at me, boy. A bird with broken wings is no god. What use am I to the skies when I cannot even leave the ground?
The boy stepped forward, his calm expression, and his bold tone unchanged. You are more than your wings, Son of Argust. The winds do not obay you because of feathers. They obay you because you are their master. Leave this cave, return to Kroy, and you will realise the truth.
But Semeter laughed bitterly. You are a fool. What could a mere child understand of gods and power?
I am Rustag, son of no one, and I - The boy, Rustag, began before Semeter abruptly spoke up.
No one? Semester questioned. How can you be, if you are son to no one? 
I have always been son to none, O Semeter. Never have I met my parents. Rustag answered, his gaze unchanging.
With a bitter laugh, Semter said, Well, son of no one, I, Son of Argust, tell you to leave me be. I may not be able to soar the same heights as I did before my fall, but I am still well capable of smiting such a little being as yourself. Now go, run back to wherever you come from, fore I will not be persuaded by someone such as you, son of no one. Semester rose up, standing as proud as he could, his feathers pressing against the cave walls. 
Rustag retreated out of the cave, but returned the next day, and the next, each time with the same plea. At first, Semeter dismissed him, then ignored him, and finally, in a desperate attempt to rid himself of the boy, he made up a plan, one that would eventually give him the silence he desired while making the time pleasant until then. Semester demanded an impossible offering. Bring me ten thousand bottles of Kroy’s finest Emmel wine, Semeter sneered, and once I am satisfied I will consider leaving this cave. But if you fail, you will never come to me again.
To his surprise, the boy did not argue his request. As you wish, Son of Argust, Rustag said, bowing low before disappearing out of the cave.
Each morning thereafter, Rustag returned with bottles of Emmel wine, hauling them on his back. Ten bottles the first day, ten more the next. Semeter drank them, laughing to himself at the boy’s foolish determination. Surely, he thought, the child would give up. Yet day after day, Rustag came.
Weeks passed, and the bottles dwindled. Ten became eight, eight became six, until finaly, Rustag appeared empty-handed.
Where is my wine? Semeter demanded, smugly expecting the boy to admit defeat.
I am sorry O Son of Argust, I could not retrieve enough Emmel wine for your offering. Please forgive me. He said, his tone finally faltering.
Satisfied, Semeter said, Child, you did not bring enough wine for my fill, you must uphold your end of the bargain and leave me, never to return.
No! Rustag protested.
Semeter narrowed his eyes Watch your tongue, child. You do not shout at a God.
But Rustag did not heed Semeters warning. What god buries himself in despair? What God grows fat and lazy as they lay still for days? What God waves the cries and prayers of those who worship them away for more wine? Hear me, O Great Son of Argust, God of the Wind and Sky, you have many who still worship you, many who look for you in the skies as storms flood their homes and wash away their crops. Yet here you are waiting for one thing, which is I, your wine giver.
Between Rustag’s breaths, Semeter watched in shock. Never was there a mortal who spoke so ill of their protector, their God! Semeters voice rose loud and rageful. Perhaps you do not deserve my power if this is how you treat those who had put their life on the line to protect you and your villages. Semeter began to step towards Rustag, the cave shaking with each one. Rustag stumbled his way backwards as Semeter began to shout louder, Leave me be! You have failed! You are a failure! No title, no purpose, no power! 
Semester’s words hung in the dreary air. It will be you, Son of Argust, that will truly have no power if you stay in this decrepit domicile. Rustag said, his protested attitude now calm, before he left the cave. 
Semeter followed his urge to chase him out of the cave, but as he stepped out,  his resolve quickly faded. His wings trembled at the sight of the sky as it stretched infinitely before him. Semeter retreated back into the cave, his nerves calming as he settled down in darkness. 
Weeks passed, and no sign of the boy returned. The empty bottles of wine that littered the cave were a reminder of his arrogance. The stillness of his new existence began to gnaw at him. For the first time, the Son of Argust found the silence oppressive. 
One morning, Semeter heard the wind stress over a pressing danger. He rose slowly, peering out of his cave, watching the horizon as a dark storm began brewing with clouds towering and twisting like a living beast. The storm's winds howled with fury, and flashes of lightning clawed at the earth below. Semeter’s eyes widened as he realized the storm was heading directly for Kroy. The memories of the last great storm came rushing back, and he found himself rooted to the cave floor, unable to move. He thought back to Rustag’s attempts to draw him out and how he had dismissed him as a naive rambling child. Yet now, Rustag's words lingered in his mind.
What can I do? the god of the wind and sky muttered. I am broken, my wings useless. How could I fight if I can no longer fly? How can I protect them now? Semeter asked, hoping for an answer from his father, Argust.
The storm loomed closer and closer, and Semeter imagined the people of Kroy fleeing their homes as their streets flood and their cattle are ripped from their barn, all things he should have prevented the first time. Semeter bowed his head in the defeat of his own doubt. With a wavering exhale, the son of Argust preyed to his father. God-father, Semeter bowed his head. What power does a grounded bird hold? What power do I hold? He waited for an answer, but soon the sounds of screams and terror began from Kroy. As Semeter watched the storm begin to terrorize Kroy, his doubt began to crumble, and in its place, his sense of duty began relighting. Whether I have power or not, I am still the god Semeter. It is still my duty to protect innocent people from this raging fury. Semeter spoke to himself, trying to make himself believe his own words. As the storm began unleashing upon Kroy, Semeter made his decision. Enough hiding, he told himself, and with a mighty step, he left his cave. 
Although his wings were scared, Semeters legs were strong, and his resolve burned brighter than it had in years. Each step brought him closer to the city, closer to the storm that had haunted his thoughts since his fall until his last step brought him between the storm and the fleeing people of Kroy. Lightning split the skies, thunder shook the earth, and the winds threatened to sweep everything away. Semeter stood tall, his shadow draping over the people of  Kroy beyond him with each flash of lightning.
Hear me now, hellish storm! Semeters voice roared, shaking the winds. Though you may bellow with thunder and strike me with bolts, I, Semeter, God of the Wind and Sky, still stand against you! Leave now, or be ready for a fight!
The storm halted, its swirling clouds forming a terrible face that loomed to meet Semeters. Its voice boomed, carried by its sharp winds and clashing thunder. Poor crippled son of Argust, it sneered. What power do you hold now that you are land-ridden? Your wings are as useful as ash, and your strength is nothing without them.
Semeter stood his ground. I may have lost my wings to you, wretched storm, but not my resolve! I will fight you, and whether I perish fulfilling my duties or not, you will most certainly lose. The people of Kroy will no longer suffer because of my cowardice.
For a moment, the storm raged louder, its winds threatening to topple Semeter. But the god did not flinch. Semter raised his broken wings high and stretched them wide. The sight paused the storm. The two’s standoff did not last long, but it painfully felt like an eternity as Semters wings grew weaker. He fought against the pain, the urge to drop his wings to relieve their stress, and he stood strong. 
With a deafening roar, the storm began to dissipate. I will return, Son of Argust! The sky will be mine! The storm spatted as the clouds unravelled, the winds died down, and the sky began to clear. 
Semeter let his wings fall low, a sharp pain lingering as he turned to face the people of Kroy. Cautiously, he met their gaze, expecting scorn for his abadonment.
Cheers erupted as the crowd came rushing to Semeter. Semeter, O God of the Wind and Sky, Son of Great God-Father Argust, we thank you! a member said.
Semeter, stunned, had not expected their praise, not after how long he had spent hidden in shadow. He lowered his head and spoke softly, Why thank me? I abandoned you all.
From the crowd, a woman stepped forward. O Semeter, your absence indeed left us unprotected, and the storm was able to tare through our city. Yet, we do not blame you. You fought for us, and you fell for us. We accepted that you needed time to mend your wounds and believed that one day, you would return to shield us again. For this, O Semeter, we thank you.
Semeter’s guilt grew others raised their voices in agreement, giving him praise he struggled to accept.
Please, Semeter said, his voice silencing them, do not thank me. If not for the child, Rustag, I would still be wallowing in a dark cave. It was he who reminded me of my power, of the duty I still bear. Your praise belongs to him, as his courage to confront a god, and his persistence to remind me, have saved you all.
The crowd murmured in confusion. One among them spoke. O Semeter, we know of no child by the name of Rustag.
Before Semeter could respond, he spotted Rustag, weaving through the crowd. There he is, he said, gesturing to Rustag, your savior stands before you.
The people turned, searching for the boy, yet none among them laid eyes on him. Even as Rustag passed them, they saw nothing. Semeter leaned low, meeting Rustag as he stepped in front of him.
Rustag, Semeter whispered, what is this? Why can they not perceive you?
Rustag smiled, his form shimmering like the haze of heat on the horizon. Before Semeter's eyes, the boy’s shape began to twist and grow. Semeter staggered back as the small frame of Rustag transformed, stretching and bending until it stood tall and immense, turning into the figure of Argust, God-Father, Lord of the Seasons' Change.
The crowd gasped and all fell to their knees, bowing low before the towering god. Semeter, still stunned, dropped his head Argust spoke.
Semeter, O God of the Wind and Sky, my son, I am proud of you this day, for you stood firm to protect these people of Kory.
Finally finding his voice, Semeter stammered, Th-thank you, God-Father, and continued to bow, as his mind swirled with questions.
Rise, Argust commanded.
Semeter obeyed, though he trembled as he stood. He raised his eyes to his father’s, but what he saw there was not pride, but disappointment.
God-Father, Semeter said, his voice shaking, what troubles you? Did you not say you were proud?
Argust’s eyes did not soften. Semeter, I must reveal the truth. There was never a child named Rustag. That was but myself in disguise.
Why, God-Father? Why did you hide yourself?
Argust’s voice grew heavy. When I saw you fall from the sky, there was nothing I desired more than to stand beside you, to ease your pain and raise you up. Yet when a god falls, there must be a test. I could not aid you outright.
A test? Semeter’s questioned. Why would you not help me, God-Father? Was my pain not proof enough of my need? 
The test was not of your strength but of your spirit, Argust replied. A god must endure pain, for it is the burden of divinity. When the storms came to Kroy after you fell, you turned from your duty, drowning in despair. You dismissed those who sought your protection and ignored the title you swore to bear. Even when I came to you as Rustag, you plotted to fool the chield so you may drink away your duty. You have won today, my son, but your actions before were those of one unworthy of the title you bear.
Semeter’s heart sank. God-Father, please. I have realized how wrong my actions were. I know I have sinned against the people I was sworn to protect. But I am here now, here to serve Kroy, now and forever. Grant me strength. Restore my wings to their former glory, and I swear I will never again abandon my duty.
Argust shook his mighty head. Your actions today showed me that you understand your responsibility. You left your despair behind and was prepared to fight the storm even while you remained grounded, but I cannot ignore your past attitude. You will keep your title, Semeter, God of the Wind and Sky, but your wings shall remain broken as they are now.
Semeter bowed his head, grief washing over him like a great wave. As you will it, God-Father.
Argust knelt, his towering form lowering to meet his son’s gaze. Remember, my son, remember all those times you’ve helped the people of Kroy. How many did you truly need your wings? When drought came, you commanded the skies with nothing but your voice to bring gentle rain, and when their cattle died from illness, you sent more so that Kroy would not starve. The power of a god is not in their might alone. It is how they serve those who look to them for guidance, the hope they inspire, and the resolve they show in the face of despair. Tend to the people of Kroy. Mend their city as you mend yourself. Only then will you understand the true weight you bared on your wings.
Semeter nodded. He turned to the people, who rose slowly from kneeling, their eyes filled with awe.
Argust placed his hand on Semeters back. Fare well, son. He said before his body began forming into vapour. 
Thank you, father. Semeter uttered as he watched the vapour form into a light, fluffy cloud.
And so, Semeter began his penance, his broken wings a constant reminder of the cost of both his pride and despair. He would begin to aid the people of Kroy in rebuilding their city, preparing himself to defend it against any threat, as it is his duty, as the god of the Wind and Sky.
`


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
            const height = (i / tokenizedText.length) * 20
              
            //call draw cube 100 times using converted height value
            for(let a =0; a <100; a++)
            {
                drawCube(height, color)
            }
           
           
        }
    }
}


tokenizeSourceText()
//findSearchTermInTokenizedText("semeter", "brown")
//findSearchTermInTokenizedText("wings", "orange")
findSearchTermInTokenizedText("storm", "grey")
findSearchTermInTokenizedText("power", "blue")
findSearchTermInTokenizedText("wings", "red")
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