
const clickSound = new Audio("click.mp3");
const dog = document.getElementById("dog");
const barkSound = document.getElementById("bark-sound");
const boneCounter = document.getElementById("bone-counter");
const backgroundMusic = document.getElementById("background-music");

document.addEventListener("click", () => {
  backgroundMusic.play();
  document.removeEventListener("click", playBackgroundMusic);
});

let bonesCollected = 0;
let bonesWorthMultiplier = 1;

dog.addEventListener("click", () => {
  barkSound.play();
});

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

function displayMessage(message) {
  messageBox.textContent = message;
  messageBox.style.display = "block";

  setTimeout(() => {
    messageBox.style.display = "none";
  }, 4000);
}

displayMessage("TAP THE 🦴's TO FEED ME!");

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
  "new-house": 100,
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




