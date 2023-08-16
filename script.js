const clickSound = new Audio("click.mp3");
const dog = document.getElementById("dog");
const barkSound = document.getElementById("bark-sound");
const boneCounter = document.getElementById("bone-counter");
const backgroundMusic = document.getElementById("background-music");
const ghost = document.getElementById("ghost");
const screamSound = new Audio("scream.mp3");

let inNewHouse = false;


document.addEventListener("click", () => {
  backgroundMusic.play();
  document.removeEventListener("click", playBackgroundMusic);
});

let bonesCollected = 0;
let bonesWorthMultiplier = 1;

dog.addEventListener("click", () => {
  barkSound.play();
});

function resetDogAnimation() {
  dog.style.animation = ""; // Clear the animation property
  dog.style.transform = "none"; // Reset the rotation
}


function updateBoneCounter() {
  boneCounter.textContent = `🦴 ${bonesCollected}`;
}

function increaseBonesWorth() {
  bonesWorthMultiplier = 10;
  displayMessage("BONES ARE NOW WORTH X10!!!");

  // Set a timer to reset bones worth to normal after 10 seconds
  setTimeout(() => {
    bonesWorthMultiplier = 1;
    updateBoneCounter(); // Update bone counter to reflect the change
    // Reset dog image, background, and music
    dog.src = "dog.gif";
    document.body.style.backgroundImage = "url('park.gif')";
    backgroundMusic.muted = false;
    resetDogAnimation(); // Reset the dog's animation
  }, 10000); // 10 seconds in milliseconds
}


function createBone(isSpecial) {
  const bone = document.createElement("img");
  bone.src = isSpecial ? "goldenbone.png" : "bone.png";
  bone.alt = "Bone";
  bone.classList.add("game-item", "bone");
  bone.style.left = `${Math.random() * 90 + 5}%`;
  document.body.appendChild(bone);

  bone.addEventListener("click", () => {
    const eatSound = new Audio("eat.mp3");
    eatSound.play();

    if (isSpecial) {
      bonesCollected += 10 * bonesWorthMultiplier;
    } else {
      bonesCollected += 1 * bonesWorthMultiplier;
    }

    updateBoneCounter();
    bone.remove();
  });
}

setInterval(() => createBone(false), 2000);
setInterval(() => createBone(true), 10000);

let dogSize = 150;

function updateDogSize() {
  dogSize += 5;
  dog.style.width = `${dogSize}px`;
  dog.style.height = `${dogSize}px`;
}

const messageBox = document.getElementById("message-box");

const messages = [
  "TAP THE 🦴's TO FEED ME!",
  "COLLECT 🦴 AND BUY US A NEW HOUSE!!! 🏡"
];

let currentMessageIndex = 0;

function displayMessage(message) {
  messageBox.textContent = message;
  messageBox.style.display = "block";

  setTimeout(() => {
    messageBox.style.display = "none";

    // If there are more messages to display, show the next one after a delay
    if (currentMessageIndex + 1 < messages.length) {
      currentMessageIndex++;
      setTimeout(() => {
        displayMessage(messages[currentMessageIndex]);
      }, 2000); // 2 seconds in milliseconds
    }
  }, 4000);
}

// Initial call to display the first message
displayMessage(messages[currentMessageIndex]);


const achievementsButton = document.getElementById("achievements-button");
const achievementsDropdown = document.getElementById("achievements-dropdown");

// ... (your existing code for achievements)
const achievementMilestones = {
  10: "achievement-10",
  20: "achievement-20",
  50: "achievement-50",
  100: "achievement-100"
};


// Initialize achievement statuses
const achievementStatuses = {};

// Function to update achievement status
function updateAchievementStatus(milestone) {
  const statusElement = document.getElementById(`status-${milestone}`);
  statusElement.textContent = "✅";
  statusElement.style.color = "green"; // Change the color to green
}

// Update achievement status based on bone count
function checkAchievementStatus() {
  const boneCount = bonesCollected;
  for (const milestone in achievementMilestones) {
    if (boneCount >= parseInt(milestone) && !achievementStatuses[milestone]) {
      updateAchievementStatus(milestone);
      achievementStatuses[milestone] = true;
    }
  }
}

achievementsButton.addEventListener("click", () => {
  achievementsDropdown.style.display = achievementsDropdown.style.display === "block" ? "none" : "block";
});

// Listen for bone collection and update achievement status
boneCounter.addEventListener("DOMSubtreeModified", checkAchievementStatus);

const shopButton = document.getElementById("shop-button");
const shopDropdown = document.getElementById("shop-dropdown");

const buyButtons = document.querySelectorAll(".buy-button");
const shopItems = {

  "red-dye": 50,
  "purple-dye": 50,
  "dog-bed": 100,
  "new-house": 1,
  "lightning-potion": 1
};




shopButton.addEventListener("click", () => {
  shopDropdown.style.display = shopDropdown.style.display === "block" ? "none" : "block";
});

buyButtons.forEach(button => {
  button.addEventListener("click", () => {
    const shopItem = button.parentElement.querySelector(".shop-item").id;
    const price = shopItems[shopItem];
    
    if (bonesCollected >= price) {
      bonesCollected -= price;
      updateBoneCounter();

      function startGhostFlying() {
        const screenWidth = window.innerWidth;
        const randomX = Math.random() * (screenWidth - 100); // Adjust 100 based on the ghost width
        const randomY = Math.random() * 300; // Adjust 300 based on the ghost height
      
        ghost.style.left = `${randomX}px`;
        ghost.style.top = `${randomY}px`;
        ghost.style.display = "block";
      
        screamSound.play();
      
        setTimeout(() => {
          ghost.style.display = "none";
        }, 3000); // 3 seconds in milliseconds
      
        setTimeout(() => {
          scheduleNextGhostFlying();
        }, Math.random() * 15000 + 5000); // Random interval between 5 to 20 seconds
      }
      
      function scheduleNextGhostFlying() {
        setTimeout(() => {
          startGhostFlying();
        }, Math.random() * 20000 + 5000); // Random interval between 5 to 25 seconds
      }

      if (shopItem === "new-house") {
        inNewHouse = true; // Set the inNewHouse variable to true
        document.body.style.backgroundImage = "url('new-house-background.jpg')";
      } else if (shopItem === "lightning-potion" && inNewHouse) {
        displayMessage("THE GHOSTS REFUSE TO LET YOU DRINK A POTION");
        return; }
        document.body.style.backgroundImage = "url('house1.png')";
          backgroundMusic.pause(); // Pause the current music
          backgroundMusic.src = "house1.mp3"; // Change the music to house1.mp3
          backgroundMusic.play(); // Start playing the new music
  
          displayMessage("😨 THIS PLACE IS CREEPY... LETS SAVE UP SOME 🦴 TO BUY A KEY TO GET OUT THIS PLACE!")
  
          // Start the ghost flying event after purchasing the new house
          scheduleNextGhostFlying();
        

      if (shopItem === "purple-dye") {
        dog.src = "purpledog.gif";
      } else if (shopItem === "lightning-potion") {
        dog.src = "lightningdog.gif";
        const lightningSound = new Audio("lightning.mp3");
        lightningSound.play();
        
        const lightningSong = new Audio("lightningsong.mp3");
        lightningSong.play();
        
        const backgroundMusic = document.getElementById("background-music");
        backgroundMusic.muted = true;
        
        document.body.style.backgroundImage = "url('thunderstorm.gif')";
        
        increaseBonesWorth(); // Apply bone worth increase and start the timer
        
        // Apply the rotation animation
        dog.style.animation = "spin 5s linear infinite";
      }

      // Play the "buy.mp3" sound for any purchased item
      const buySound = new Audio("buy.mp3");
      buySound.play();
      
    } else {
      displayMessage("Not enough bones to buy this item!");
    }
  });
});