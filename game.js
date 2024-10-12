// Get Data from DOM
const playerCount = document.getElementById("player-count");
const enemyCount = document.getElementById("enemy-count");
const choosePokemonButton = document.getElementById("choose");
const chooseEnemyButton= document.getElementById("enemy");
const newGameButton= document.getElementById("restart");
let playerImage = document.getElementById("player-image");
let playerName= document.getElementById("player-name");
let playerStat= document.getElementById("player-stat");
let enemyImage= document.getElementById("enemy-image");
let enemyName= document.getElementById("enemy-name");
let enemyStat= document.getElementById("enemy-stat");

// Initial Status of Enemy Button disabled. It is enabled after you choose your pokemon first
chooseEnemyButton.disabled = true;

// Event Listeners, Triggers amd Callback Functions

// Restart Button Function to load new game
function restartGame(){
    resetUI(playerImage, playerName, playerStat);
    resetUI(enemyImage, enemyName, enemyStat);
	playerImage.src = ""
	playerName.innerText = ""
	playerStat.innerText = ""
	enemyImage.src = ""
	enemyName.innerText = ""
	enemyStat.innerText = ""
	playerCount.innerText = "0"
	enemyCount.innerText = "0"
	playerWin = 0
	enemyWin = 0
	choosePokemonButton.disabled = false
}

// Reset UI for player or enemy
function resetUI(image, name, stat) {
    image.src = "";
    name.innerText = "";
    stat.innerText = "";
}

// function to select pokemon
