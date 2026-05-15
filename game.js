const playerCountEl = document.getElementById('player-count');
const enemyCountEl = document.getElementById('enemy-count');
const chooseBtn = document.getElementById('choose');
const enemyBtn = document.getElementById('enemy');
const restartBtn = document.getElementById('restart');
const instrBtn = document.getElementById('instructions');
const playerImage = document.getElementById('player-image');
const playerName = document.getElementById('player-name');
const playerStat = document.getElementById('player-stat');
const enemyImage = document.getElementById('enemy-image');
const enemyName = document.getElementById('enemy-name');
const enemyStat = document.getElementById('enemy-stat');
const resultOverlay = document.getElementById('result-overlay');
const resultText = document.getElementById('result-text');
const instrOverlay = document.getElementById('instr-overlay');
const statusEl = document.getElementById('pb-status');

let playerWin = 0, enemyWin = 0;

function setStatus(msg) {
  statusEl.textContent = msg;
}

function initGame() {
  playerWin = 0;
  enemyWin = 0;
  playerCountEl.textContent = 0;
  enemyCountEl.textContent = 0;
  [playerImage, enemyImage].forEach(el => el.src = '');
  [playerName, enemyName, playerStat, enemyStat].forEach(el => el.textContent = '');
  chooseBtn.disabled = false;
  enemyBtn.disabled = true;
  resultOverlay.classList.remove('active');
  setStatus('Choose your Pokémon to begin!');
}

async function fetchPokemon(isPlayer) {
  const id = Math.floor(Math.random() * 151) + 1;
  setStatus('Fetching Pokémon...');
  chooseBtn.disabled = true;
  enemyBtn.disabled = true;

  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await res.json();
    const sprite = data.sprites.other['official-artwork'].front_default;
    const name = data.name.charAt(0).toUpperCase() + data.name.slice(1);
    const stat = data.stats[0].base_stat;

    if (isPlayer) {
      playerImage.src = sprite;
      playerName.textContent = name;
      playerStat.textContent = stat;
      enemyBtn.disabled = false;
      setStatus(`You got ${name}! Now choose your enemy.`);
    } else {
      enemyImage.src = sprite;
      enemyName.textContent = name;
      enemyStat.textContent = stat;
      compareRound(stat);
    }
  } catch (e) {
    setStatus('Network error — try again.');
    chooseBtn.disabled = false;
  }
}

function compareRound(enemyVal) {
  const playerVal = parseInt(playerStat.textContent, 10);

  if (playerVal > enemyVal) {
    playerWin++;
    setStatus(`Your ${playerName.textContent} wins the round! (${playerVal} vs ${enemyVal})`);
  } else if (enemyVal > playerVal) {
    enemyWin++;
    setStatus(`Enemy ${enemyName.textContent} wins the round! (${enemyVal} vs ${playerVal})`);
  } else {
    setStatus(`It's a tie! (${playerVal} vs ${enemyVal}) — bonus round!`);
  }

  playerCountEl.textContent = playerWin;
  enemyCountEl.textContent = enemyWin;

  setTimeout(() => checkGame(), 600);
}

function winnerSound() {
  new Audio('sounds/winner-sound.mp3').play().catch(() => {});
}

function loserSound() {
  new Audio('sounds/loser-sound.mp3').play().catch(() => {});
}

function checkGame() {
  if (playerWin >= 3 || enemyWin >= 3) {
    chooseBtn.disabled = true;
    enemyBtn.disabled = true;
    if (playerWin > enemyWin) {
      resultText.textContent = '🎉 You Win!';
      winnerSound();
    } else {
      resultText.textContent = '💀 You Lose!';
      loserSound();
    }
    resultOverlay.classList.add('active');
  } else {
    chooseBtn.disabled = false;
    enemyBtn.disabled = true;
    if (!statusEl.textContent.includes('tie')) {
      setStatus('Next round — choose your Pokémon!');
    }
  }
}

chooseBtn.addEventListener('click', () => fetchPokemon(true));
enemyBtn.addEventListener('click', () => fetchPokemon(false));
restartBtn.addEventListener('click', initGame);
instrBtn.addEventListener('click', () => instrOverlay.classList.add('active'));
document.getElementById('close-instr').addEventListener('click', () => instrOverlay.classList.remove('active'));
document.getElementById('exit').addEventListener('click', initGame);

initGame();
