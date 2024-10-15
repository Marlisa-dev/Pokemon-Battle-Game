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
	playerCount.innerText = "0"
	enemyCount.innerText = "0"
	playerWin = 0
	enemyWin = 0
	choosePokemonButton.disabled = false;
    // chooseEnemyButton.disabled = true;
}

// Reset UI for player or enemy
function resetUI(image, name, stat) {
    image.src = "";
    name.innerText = "";
    stat.innerText = "";
}

// function to select pokemon
function playerRound(){
    // fetch data from pokemon api
    function getPokemons(){
        fetch("https://pokeapi.co/api/v2/pokemon?limit=1")
        .then(res => res.json())
        .then(function(pokemonData){
            pokemonData.results.forEach(function(pokemon){
                getPokemonData(pokemon)
            })
        })
    }
    getPokemons()
    function getPokemonData(pokemon){
        const randomNumber = Math.floor(Math.random() * 151) + 1;
        let url = `https://pokeapi.co/api/v2/pokemon${randomNumber}`
        fetch(url)
        .then(res => res.json())
        .then(pokemonData => {
            showPokemon(pokemonData)
        })
    }
    function showPokemon(pokemonData){
        // display pokemon selection on UI
        playerImage.src = pokemonData.sprites.other ["official-artwork"] ["front-default"]
		playerName.innerText = pokemonData.forms[0].name
		playerStat.innerText = pokemonData.stats[0].base_stat
    }
    choosePokemonButton.disabled = true;
    chooseEnemyButton.disabled = false;
}

// function to select enemy pokemon
function enemyRound(){
    // fetch data from pokemon api
    function getPokemons(){
        fetch("https://pokeapi.co/api/v2/pokemon?limit=1")
        .then(res => res.json())
        .then(function(pokemonData){
            pokemonData.results.forEach(function(pokemon){
                getPokemonData(pokemon)
            })
        })
    }
    getPokemons()
    function getPokemonData(pokemon){
        const randomNumber = Math.floor(Math.random() * 151) + 1;
        let url = `https://pokeapi.co/api/v2/pokemon${randomNumber}`
        fetch(url)
        .then(res => res.json())
        .then(pokemonData => {
            showPokemon(pokemonData)
        })
    }
    function showPokemon(pokemonData){
        // display pokemon selection on UI
        enemyImage.src = pokemonData.sprites.other ["official-artwork"] ["front-default"]
		enemyName.innerText = pokemonData.forms[0].name
		enemyStat.innerText = pokemonData.stats[0].base_stat
        compareRound();
        setTimeout(() => {
            checkGame()
        }, 500);
    }
    choosePokemonButton.disabled = true;
    chooseEnemyButton.disabled = false;
}

// compare winner of round
let playerWin = 0
let enemyWin = 0
function compareRound(){
    let playerStatText = parseInt(playerStat.innerText)
	let enemyStatText = parseInt(enemyStat.innerText)
	if (playerStatText > 0 && enemyStatText > 0 && playerStatText > enemyStatText) {
		playerWin++
		playerCount.innerText = playerWin
	}
	else if (playerStatText > 0 && enemyStatText > 0 && playerStatText < enemyStatText){
		enemyWin++
		enemyCount.innerText = enemyWin
	} else if (playerStatText > 0 && enemyStatText > 0 && playerStatText == enemyStatText) {
		console.log("draw")
	}
}

// Check who has the most wins and select winner of the game
function checkGame(){
	let playerCountText = parseInt(playerCount.innerText)
	let enemyCountText = parseInt(enemyCount.innerText)
	if ((playerCountText + enemyCountText == 3) && playerCountText > enemyCountText){
		showWinResult()
		winnerSound()
		choosePokemonButton.disabled = true;
		chooseEnemyButton.disabled = true;
	} else if ((playerCountText + enemyCountText == 3) && enemyCountText > playerCountText){
		showLostResult()
		loserSound()
		choosePokemonButton.disabled = true;
		chooseEnemyButton.disabled = true;
	}
}

// Sounds Effects for winner or loser
function winnerSound(){
	let winnerAudio = new Audio("sounds/winner-sound.mp3")
	winnerAudio.play()
}
function loserSound(){
	let loserAudio = new Audio("sounds/loser-sound.mp3")
	loserAudio.play()
}

// TODO: Refactor functions for player round and enemy round
// TODO: Consider adding dark mode to UI