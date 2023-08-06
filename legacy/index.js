
//---VARIABLES---//

    //Grabbing HTML Elements
const textElement = document.getElementById('story');
const statsElement = document.getElementById('stats');
const healthElement = document.getElementById('health');
const levelElement = document.getElementById('level');
const textInputElement = document.getElementById('textbox');
const textInput = document.getElementById('playerInput');
const nameElement = document.getElementById('playerName');
const locationElement = document.getElementById('location');
const optionsButtonsElement = document.getElementById('options');

    //State and player variables to keep track of current state/inventory, as well as player health/level
let state = {};
let player = {};
    //Location array
let locations = ['Darkness','A dimly lit room', 'A dark forest'];

//---STORY NODES ARRAY---//
/* 
        Each story object will have an id, the story text, and the associated options array
        Each entry in the options array will be an object containing:
            Options Text
            Setting the state according to which option was chosen
            Determining what the next text/story node is
            The state required to have access to the button

    */
const textNodes = [
    {
        id: 1000,
        text: "Enter your name",
    },
    {
        id: 0,
        text: "You are asleep...",
        options: [
            {
                text: 'Wake up...',
                nextText: 1
            }
        ]
    },
    {
        id: 1,
        text: "You slowly open your eyes. You're in a what seems like a small house... there's a woman, no... a girl, standing over you. She places a cool wet rag on your forehead. Her eyes widen in surprise as she notices you waking up, tears forming in the corners. You notice a wave of relief wash over her.",
        options: [
            {
                text: "Say nothing",
                nextText: 2
            }

        ]
    },
    {
        id: 2,
        text: "You look closer look at the girl, inspecting her. She has dark hair, collected in a wide braid that runs down loosely past her waist. Her skin is pale; her eyes emerald. She looks to be a young adult. Your gaze moves to her pinkish lips as she begins to speak. 'Hey... how do you feel?'",
        options: [
            {
                text: "Ask where you are",
                nextText: 3
            },
            {
                text: "Ask what happened to you",
                nextText: 3
            }
        ]
    },
    {
        id: 3,
        text: "'You don't remember? Well...' she sits next to you on the edge of the bed. 'You saved me from the white walker but...' She guiltily avoids your gaze 'You were hurt... so I brought you to my home. You've been unconscious since it happened.'",
        options: [
            {
                text: "Ask for more details",
                nextText: 4
            },
            {
                text: "Ask about your belongings",
                nextText: 7
            },
            {
                text: "Ask who she is",
                nextText: 5
            }
        ]
    },
    {
        id: 4,
        text: "'It's been about a week since it all happened... I guess I could start with when we met.' She moves closer to you on the bed, curling up next to you, a solemn look on her face. 'I was out in the forest looking for Achillea Millefolium flowers, for tea. I stayed near the path to be safe since it was close to sunset.' She paused, pulling her knees closer to her chest. 'It was then that I saw you walking on the path, with your bag. You asked me what I was doing out so close to sunset, and I told you about the flowers. You said I should head home soon, and I told you that I would.' A guilty, pained expression crosses her face, her voice becoming shaky. 'I promise I was going to head home soon... I just... I was so close to filling my basket, I only needed a few more herbs. I was so focused on searching for the last few plants that I didn't notice the shrieks.'",
        options: [
            {
                text: 'Ask her to continue',
                nextText: 5
            }
        ]
    },
    {
        id: 5,
        text: "She lightly rubs your bandaged hand with her pinky. 'I had finally filled the basket when I realized how dark it had gotten, it had only been a half hour since we talked. It was on my way home that I saw the white walker. I almost screamed, but you covered my mouth from behind and pulled me behind I tree. I didn't know that it was you at the time though. We waited for the white walker to leave but it started getting closer. You told me to run home, then threw a rock at it to distract it.' You can feel her hand trembling. 'I ran like you said, I tried to not look back but I couldnt help it. I don't want to talk about what I saw' She averts her gaze 'Early the next morning I came back to the spot and found you a little distance away, sitting against a tree, unconscious and bloody.' She faintly smiled, reminiscing 'You were alive though, and I was grateful'",
        options: [
            {
                text: 'Ask about your belongings',
                nextText: 7
            },
            {
                text: 'Ask who she is',
                nextText: 6
            }
        ]
    },
    {
        id: 6,
        text: "'Oh! Well, my name is Eva. I live out here with my brother. He's not here now, he travels around. It's been a while since he's been back, he must've went far this time.' You look at her closely, taking in the curves of her waist, the slight point of her ears, the light freckles under her eyes, the smoothness of her skin. She notices you staring and her cheeks become flushed with a rosy red color.",
        options: [
            {
                text: 'Ask about your belongings',
                nextText: 7
            },
            {
                text: 'Ask for more details',
                nextText: 4
            }
        ]
    },
    {
        id: 7,
        text: "'Oh! I have them over here' she gets up and walks to the far side of the room, picking up a brown leather pack and bringing it over to you. You hear light movement coming from within.",
        options: [
            {
                text: 'Take the bag',
                setState: {cracked_crystal: true, letter: true, shardcoins: 500, dagger: true},
                nextText: 8
            }
        ]
    },
    {
        id: 8,
        text: "You dump the pack to revealt some coins, a letter, and a translucent crystal. The crystal is covered in small cracks, the movement is coming from within. It continues to fracture, like an egg hatching. Eva steps back. From within the shattered pieces of the crystal rises a small creature, the size of a puppy. It has wings, and... 'A dragon??!' Eva stands back, a look of shock and confusion on her face. You look at the dragon in your lap.  ~Who are you? Where am I?~ a voice within your own mind calls out. You freeze, processing what you just heard, no... felt. The dragon looks curiously at both you and Eva. Before you can speak, it perks up, it's attention now fixated on the door. It stares intently and lets out a low hiss.",
        options: [
            {
                text: 'Continue...',
                setState: {cracked_crystal: false},
                nextText: 9
            }
        ]
    },
    {
        id: 9,
        text: "You look towards the door",
        options: [
            {
                text: 'Ask Eva to investigate the door',
                nextText: 10
            },
            {
                text: "Ask the dragon what's behind the door",
                nextText: 11
            },
            {
                text: 'Investigate the door',
                nextText: 12
            }
        ]
    },
    {
        id: 10,
        text: "You ask Eva to investigate the door. 'M-Me? Okay...' You watch as she nervously walks towards the door. As she grabs the handle, you see her shiver, as if experiencing chills. She opens the door a crack and peers out, a pale look washing over her. The color of her skin seems to be draining, but it could just be the poor lighting playing tricks on your eyes. You notice her legs gently shaking, and she seems to be putting more and more of her weight on the door in order to stand.",
        options: [
            {
                text: "Ask if she's okay",
                nextText: 16
            }
        ]
    },
    {
        id: 11,
        text: "You look towards the dragon and speak to it, asking what it is that's behind the door. ~Death~ the voice from within your mind answers back. You look towards Eva, who is still in a state of shock and confusion, and tell her what you're experiencing. Her eyes widen when you reveal what the dragon communicated to you.",
        options: [
            {
                text: 'Look for an escape',
                nextText: 14
            },
            {
                text: 'Stay and fight',
                nextText: 15
            }
        ]
    },
    {
        id: 12,
        text: "You gently move the dragon to the side and get off the bed, walking over to the front door. Upon grabbing the handle, you feel a deep chill begin to crawl down your spine.",
        options: [
            {
                text: 'Crack open the door',
                nextText: 13
            },
            {
                text: 'Go back to the bed',
                nextText: 9
            }
        ]
    },
    {
        id: 13,
        text: "You slowly crack open the door, and peek out. As you gaze into the night, you feel a growing void in your chest. You feel weak, the pressure of gravity becoming more difficult to bear. The feeling of emptiness within you is growing, and in the distance you make out a figure coming towards the door. You squint to make out the details but your vision is fading, along with your ability to stand. You fall to your knees. The figure is closer now, and you can see that in one hand they are holding a lantern. The green flame seems to burn brighter as you weaken. The burden of gravity is overwhelming. You speak... but no sound escapes your lips. You squint again at the figure, barely making out what looks like a faint smile before darkness consumes your vision, and you fade away...",
        options: [
            {
                text: 'You have died.',
                nextText: -1
            }
        ]
    },
    {
        id: 14,
        text: "You hurriedly put everything back into your pack, including the crystal shards, and stand up. A dull pain emanates through your body. It seems your wounds haven't fully healed, but it's good enough to escape. You analyze the room looking for alternate exits and fixate on a window on the back wall of the house. You look towards Eva and tell it's time to leave.",
        options: [
            {
                text: "Escape through the window",
                nextText: 18
            }
        ]
    },
    {
        id: 15,
        text: "Getting off of the bed, you weild the dagger that was in your pack. Eva stands behind you, nervously coddling the dragon in her arms. She tries to maintain her composure, but you aren't oblivious to her growing fear. As you mentally prepare yourself for the battle ahead, you feel a sensation down your spine, like cold hands stroking your back. Your legs begin to weaken, and as you continue to face the door you notice light seeping through from the bottom, contrasting with the darkness of the night. It starts off faint, and slowly grows in intensity as the seconds pass. You notice your legs progressively weakening... your grip on the dagger loosening... your mind becoming foggy. The door handle begins to twist from the outside... ",
        options: [
            {
                text: "Grip the dagger",
                nextText: 19
            },
            {
                text: "Brace yourself against the bedframe",
                nextText: 19
            },
        ]
    },
    {
        id: 16,
        text: "You call out to Eva and ask if she's okay. She doesn't turn to answer, and you can hear her breathe shaking. 'Run...' The words seem to barely make it out of her mouth before she collapses onto the floor. You get off of the bed and notice that her body has become lifeless...",
        options: [
            {
                text: "Continue",
                nextText: 17
            }
        ]
    },
    {
        id: 17,
        text: "In her collapsing she wasn't able to close the door, and it swings open, exposing the void of night. You suddenly feel a growing void in your chest, and the pressure of gravity is becoming increansingly more difficult to bear. The feeling of emptiness within you is growing, and in the distance you make out a figure coming towards the door. You aren't able to move from where you are. You squint to make out the details but your vision is fading, along with your ability to stand. You fall to your knees. The figure is closer now, and you can see that in one hand they are holding a lantern. The green flame seems to burn brighter as you weaken. The burden of gravity is overwhelming. You speak... but no sound escapes your lips. You squint again at the figure, barely making out what looks like a faint smile before darkness consumes your vision, and you fade away...",
        options: [
            {
                text: "You have died",
                nextText: -1
            }
        ]
    },
    {
        id: 18,
        text: "You grab Eva's hand and pull her with you as you walk towards the window, asking if she can open it. 'Yes, we might have to force it' She tries to open the window latch and when it doesn't budge she throws her body against it, busting it open. The pain in your body intensifies as you climb through, but the idea of what your fate will be if you don't is much stronger. Eva hands you the small dragon and climbs through after you. The crisp air of the night feels like insects on your skin. The dragon looks back toward the window and hisses louder than before. Taking the hint, you and Eva begin running in the opposite direction, into the dark forest...",
        options: [
            {
                text: "Escape through the window",
                nextText: 20
            }
        ]
    },
    {
        id: 19,
        text: "You prepare yourself, but are losing focus as your mind clouds, your vision fading. The weight of gravity brings you to your knees as the door begins to crack open... You struggle to hold yourself up; at this point even holding the dagger is a challenge. You're on your hands and knees now, the door opening wider, green light spilling into the room. You look up, almost blind at this point, and squint at the figure before you, barely making out a smile before you fade into darkness.",
        options: [
            {
                text: "You have died.",
                nextText: -1
            }
        ]
    },
    {
        id: 20,
        text: "",
        options: [
            {
                text: "End of Prologue",
                nextText: -1
            }
        ]
    },
]

//---FUNCTIONS---//

//Function for starting the game
function startGame() {
    state = {};
    player = {Name: 'Player', Health: 50, Level: 0};
    showTextNode(1000);
    showTextNode(0);
}

//Function for selecting an option
function selectOption(option) {
    //Get next text node
    const nextTextNodeId = option.nextText;

    //Option for restarting the game
    if(nextTextNodeId <= 0) {
        return startGame()
    }

    //Get our state
    //What this does is take our state and add everything from option.setState to it, and override what's already there that needs to be changed
    //This returns a new object which we will set to our current state
    state = Object.assign(state, option.setState);
    showTextNode(nextTextNodeId);
}

//Function to show an option if the required state is met
function showOption(option) {
    return option.requiredState == null || option.requiredState(state)
}

//Display the node that is passed in
//This is also the primary loop
function showTextNode(textNodeIndex) {

    //Finding the node with desired id
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex);
    //Setting the webpage text equal to node text
    textElement.innerText = textNode.text;

    /*
    TYPEWRITER FEATURE
    CURRENTLY A BUG WHERE IF THE PLAYER CHOOSES AN OPTION BEFORE THE TEXT IS DONE RENDERING IT MIXES THE CHARACTERS

    //Function for creating a typing effect for the text
    let i = 0;
    const txt = textNode.text;
    function typeWriter() {
        const speed = 60; //The speed/duration of the effect in milliseconds
        if (i < txt.length) {
            textElement.innerHTML += txt.charAt(i);
            i++;
            setTimeout(typeWriter, speed);
        }
    }

    typeWriter();
    */

    
    //Removing default options. While there is an option, remove it
    while(optionsButtonsElement.firstChild){
        optionsButtonsElement.removeChild(optionsButtonsElement.firstChild);
    }
    
    
    while(textInputElement.firstChild){
        textInputElement.removeChild(textInputElement.firstChild);
    }

    //If on the input name text node, add the input box
    if(textNodeIndex === 1000){
        //Add the text input and submit button
        const input = document.createElement('input');
        const submit = document.createElement('button');

        input.setAttribute('type','text');
        input.setAttribute('placeholder','Type...');

        submit.innerText = "Begin...";
        submit.classList.add('btn');
        submit.addEventListener('click', getName());
        
        textInputElement.appendChild(input);
        textInputElement.appendChild(submit);
    }


    //Adding our set options
    //If we are able to view an option based on our current state
    textNode.options.forEach(option => {

        if (showOption(option)) {
            //Creating a button for the option
            const button = document.createElement('button');
            button.innerText = option.text;
            //Adding the css class to the button
            button.classList.add('btn');
            //Keeps track of if button is clicked on
            button.addEventListener('click', () => selectOption(option));
            //Add new button to the options button element group
            optionsButtonsElement.appendChild(button)
        }

    })
    showLocation(textNodeIndex);
    
    showName(player);
    //Showing updated stats with each text node
    showStats(state);
    //Showing updated player info with each text node
    showPlayerInfo(player);

    if(textNodeIndex === -1){
        startGame();
    }

}

function showStats(state) {
    statsElement.innerText = '';
    for (item in state){
        console.log(typeof state[item]);
        if (state[item] === true){
            statsElement.innerText += item;
            statsElement.innerText += '\n';
        }
        if (typeof state[item] === 'number') {
            statsElement.innerText += item + ': ' + state[item];
            statsElement.innerText += '\n';
        }
        
    }
}

//Displays player info
function showPlayerInfo(player) {
    healthElement.innerText = 'Health: ' + player['Health'] + '/100';
    levelElement.innerText = 'Level: ' + player['Level'];
}

//Displays Player Name
function showName(player) {
    nameElement.innerText = player['Name'];
}

//This grabs the player name from the text input and assigns it
function getName() {
    player['Name'] = textInput.value;
    showTextNode(0);
}

//Show Player Location
function showLocation(textNodeIndex){
    locationElement.innerText = 'Location - ' + locations[0];
}

//---MAIN---//

startGame();
