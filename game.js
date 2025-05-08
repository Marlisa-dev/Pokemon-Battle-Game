// DOM Elements
const playerCount = document.getElementById("player-count");
const enemyCount = document.getElementById("enemy-count");
const choosePokemonButton = document.getElementById("choose");
const chooseEnemyButton = document.getElementById("enemy");
const newGameButton = document.getElementById("restart");

const playerImage = document.getElementById("player-image");
const playerName = document.getElementById("player-name");
const playerStat = document.getElementById("player-stat");
const enemyImage = document.getElementById("enemy-image");
const enemyName = document.getElementById("enemy-name");
const enemyStat = document.getElementById("enemy-stat");

let playerWin = 0;
let enemyWin = 0;

// Initialize Game
function initGame() {
  playerWin = 0;
  enemyWin = 0;
  updateScores();
  resetUI(playerImage, playerName, playerStat);
  resetUI(enemyImage, enemyName, enemyStat);
  choosePokemonButton.disabled = false;
  chooseEnemyButton.disabled = true;
}

// Reset individual Pokémon display
function resetUI(imgEl, nameEl, statEl) {
  imgEl.src = "";
  nameEl.innerText = "";
  statEl.innerText = "";
}

// Fetch and display Pokémon (player or enemy)
function fetchPokemon(isPlayer) {
  const randomId = Math.floor(Math.random() * 151) + 1;
  const url = `https://pokeapi.co/api/v2/pokemon/${randomId}`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      const sprite = data.sprites.other["official-artwork"]["front_default"];
      const name = data.name;
      const baseStat = data.stats[0].base_stat;

      if (isPlayer) {
        renderPokemon(playerImage, playerName, playerStat, sprite, name, baseStat);
        choosePokemonButton.disabled = true;
        chooseEnemyButton.disabled = false;
      } else {
        renderPokemon(enemyImage, enemyName, enemyStat, sprite, name, baseStat);
        compareRound();
        setTimeout(checkGame, 300);
      }
    });
}

// Render Pokémon data to UI
function renderPokemon(imgEl, nameEl, statEl, sprite, name, baseStat) {
  imgEl.src = sprite;
  nameEl.innerText = name;
  statEl.innerText = baseStat;
}

// Compare stats
function compareRound() {
  const playerVal = parseInt(playerStat.innerText, 10);
  const enemyVal = parseInt(enemyStat.innerText, 10);

  if (playerVal > enemyVal) {
    playerWin++;
  } else if (enemyVal > playerVal) {
    enemyWin++;
  } // tie = no points

  updateScores();
}

// Update score display
function updateScores() {
  playerCount.innerText = playerWin;
  enemyCount.innerText = enemyWin;
}

// Check if game has ended
function checkGame() {
  const totalRounds = playerWin + enemyWin;

  if (totalRounds >= 3) {
    choosePokemonButton.disabled = true;
    chooseEnemyButton.disabled = true;

    if (playerWin > enemyWin) {
      showWinResult();
      winnerSound();
    } else if (enemyWin > playerWin) {
      showLostResult();
      loserSound();
    }
  }
}

// Sound effects
function winnerSound() {
  new Audio("sounds/winner-sound.mp3").play();
}

function loserSound() {
  new Audio("sounds/loser-sound.mp3").play();
}

// Placeholder result display (add your own UI logic)
function showWinResult() {
  alert("🎉 You win!");
}

function showLostResult() {
  alert("💀 You lose!");
}

// Event Listeners
choosePokemonButton.addEventListener("click", () => fetchPokemon(true));
chooseEnemyButton.addEventListener("click", () => fetchPokemon(false));
newGameButton.addEventListener("click", initGame);

// Initial setup
initGame();
