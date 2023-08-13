const clickSound = new Audio("click.mp3"); // Create a click sound audio element
const dog = document.getElementById("dog");
const barkSound = document.getElementById("bark-sound");
const boneCounter = document.getElementById("bone-counter");

const backgroundMusic = document.getElementById("background-music");

// Play the background music when a user interaction event occurs
document.addEventListener("click", () => {
  backgroundMusic.play();
  // Remove the click event listener after it's been triggered
  document.removeEventListener("click", playBackgroundMusic);
});


let bonesCollected = 0;

dog.addEventListener("click", () => {
  barkSound.play();
});

function createBone() {
  const bone = document.createElement("img");
  bone.src = "bone.png";
  bone.alt = "Bone";
  bone.classList.add("game-item", "bone");
  bone.style.left = `${Math.random() * 90 + 5}%`;
  document.body.appendChild(bone);

  bone.addEventListener("click", () => {
    bonesCollected++;
    boneCounter.textContent = `Bones: ${bonesCollected}`;
    bone.remove();
  });
}

setInterval(createBone, 2000);

function createBone(isSpecial) {
  const bone = document.createElement("img");
  bone.src = isSpecial ? "goldenbone.png" : "bone.png";
  bone.alt = "Bone";
  bone.classList.add("game-item", "bone");
  bone.style.left = `${Math.random() * 90 + 5}%`;
  document.body.appendChild(bone);

  bone.addEventListener("click", () => {
    if (isSpecial) {
      bonesCollected += 10; // Increase by 10 for special bone
    } else {
      bonesCollected++;
    }
    boneCounter.textContent = `Bones: ${bonesCollected}`;
    bone.remove();
  });
}

// Create regular bones every 2 seconds
setInterval(() => createBone(false), 2000);

// Create special bone every 10 seconds
setInterval(() => createBone(true), 10000);


function createBone(isSpecial) {
  const bone = document.createElement("img");
  bone.src = isSpecial ? "goldenbone.png" : "bone.png";
  bone.alt = "Bone";
  bone.classList.add("game-item", "bone");
  bone.style.left = `${Math.random() * 90 + 5}%`;
  document.body.appendChild(bone);

  bone.addEventListener("click", () => {
    const eatSound = new Audio("eat.mp3"); // Create a new audio element
    eatSound.play(); // Play the eat sound

    if (isSpecial) {
      bonesCollected += 10;
    } else {
      bonesCollected++;
    }
    boneCounter.textContent = `Bones: ${bonesCollected}`;
    bone.remove();
  });
}

let dogSize = 150; // Initial dog size

function updateDogSize() {
  // Increase the dog's size by a fixed amount
  dogSize += 5; // Adjust the increment as needed
  dog.style.width = `${dogSize}px`;
  dog.style.height = `${dogSize}px`;
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
      bonesCollected += 10;
    } else {
      bonesCollected++;
    }
    boneCounter.textContent = `🦴 ${bonesCollected}`;
    bone.remove();

    updateDogSize(); // Call the function to increase dog size
  });
}

const messageBox = document.getElementById("message-box");

function displayMessage(message) {
  messageBox.textContent = message;
  messageBox.style.display = "block";

  setTimeout(() => {
    messageBox.style.display = "none";
  }, 4000);
}

// Display initial message when the page loads
displayMessage("TAP THE 🦴's TO FEED ME!");

const achievementsButton = document.getElementById("achievements-button");
const achievementsDropdown = document.getElementById("achievements-dropdown");

// Create a map of achievement milestones and their IDs
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
  "blue-dye": 50,
  "dog-bed": 100,
  "new-house": 100
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
      boneCounter.textContent = `Bones: ${bonesCollected}`;
      // Implement the logic to apply the purchased item here
    } else {
      displayMessage("Not enough bones to buy this item!");
    }
  });
});