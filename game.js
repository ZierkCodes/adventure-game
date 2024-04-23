const Enemy = require("./Characters/Enemy")
const Player = require("./Characters/Player")
const Combat = require("./Combat")
const readlineSync = require("readline-sync")
let combat;
let player;
initGame()

// The player can create their character and assign a name to the name variable with readlineSync
function initGame() {
   console.log("Welcome back lorekeeper, you've been resurrected to take on a daunting task.", "The realm has become infested with beings from the void, you must cleanse these pests and bring peace and order back to the land")
   let name = readlineSync.question("Please enter your name ")
   player = new Player(name)
   console.log(`${player.name}, set off now, prepare yourself for the journey ahead, these beasts are merciless`)
   console.log("Press the w key to move on")
   getCommands()
}

// A function that runs whenever the player is not in combat, it also displays a helpful message. 
// The player can press h (help()) at any time to see the list of commands (Except when in combat).
// If the player presses a key that is not available, getCommands will run again
function getCommands() {
   let command = readlineSync.keyIn("Type a command, or press 'H' for help.")
   switch (command) {
      case "q":
         process.exit()
         break;

      case "w":
         generateMap()
         break;
   
      case "i":
         console.log(`------------INVENTORY------------`)
         console.log("Name:", player.name)
         console.log("HP", player.hp)
         player.logInventory()
         getCommands()
         break;
   
      case "e":
         console.log(`----------EQUIP-----------`)
         if(player.inventory.length > 0) {
            let inventorySelection = []
            player.inventory.forEach((weapon) => {
               inventorySelection.push(`${weapon.name} - ${weapon.damage} dmg`)
            })
            let index = readlineSync.keyInSelect(inventorySelection, `Which weapon would you like to equip?`)
            player.equip(player.inventory[index])
         } else {
            console.log(`There is nothing in your inventory to equip.`)
         }
         getCommands()
         break;
   
      case "h":
         console.log(`--------HELP--------`)
         help()
         break;
   
      default:
         console.log(`Invalid command, type H for help`)
         getCommands()
         break;
   }
}

function help() {
   console.log(`Press W to move forward.`)
   console.log(`Press I to check inventory.`)
   console.log(`Press E to equip an item from your inventory.`)
   console.log(`Press Q to quit the game.`)
   getCommands()
}

/* generateMap basically randomizes the chance to encounter an enemy, if spawnEnemy is true new Enemy, if false the 
player can continue. They can gain +1 hp in this case if their health is not at maximum (max = 50) */
function generateMap() {
   let spawnEnemy = Math.floor(Math.random() * (4 - 1 + 1)) + 1 === 1 ? true : false;
   if(spawnEnemy) {
    let enemy = new Enemy()
    combat = new Combat(enemy, player)
    initCombat()
   } else {
      console.log(`There is nothing here, move along`)
      if(player.hp < 50) {
         player.hp += 1
         console.log(`In this moment you are able to recover from your wounds somewhat`)
         console.log(`You have ${player.hp} HP`)
      }
      getCommands()
   }
}

/* In this function, a winner will be assigned based upon the checkWinner logic in the Combat class. If there is no 
winner, the initCombat loop runs again. If the player wins, they get to move on or encounter another enemy immediately. 
If the enemy wins, the player is prompted to play again (y/n) if yes, the player creates another charater, if no, the
player quits the game. */
function battleOver() {
   let winner = combat.checkWinner()
   if(!winner) {
      initCombat()
   } else {
      if(winner === combat.player) {
         generateMap()
      } else {
         if(readlineSync.keyInYN("Do you want to try again?")) {
            initGame()
         } else {
            console.log(`Bye loser`)
            process.exit()
         }
      }
   } 
}

// Simply, this function handles the options the player gets when an enemy is encountered, they are fight or run.
// Also, it handles the combat loop for when the enemy gets its turn.
function initCombat() {
   if(combat.turn === combat.player) {
      const actions = ["Fight", "Run"]
      let index = readlineSync.keyInSelect(actions, "What will you do now?", {cancel: false})
      switch (actions[index]) {
         // This case initiates the combat.attack() loop until there is a winner 
         case "Fight":
            combat.attack()
            battleOver()
            
            break;
      
         case "Run":
            // if combat.escape() is true the player succeeds in escaping, if false initCombat() starts again.
            if(combat.escape()) {
               generateMap()
            } else {
               initCombat()
            }
            break;
      }

   } else {
      combat.attack()
      battleOver()
      initCombat()
   } // This else^ is for when the enemy gets its turn so the game doesn't end after the player's turn.
}


//* REQUIREMENTS:
//* When the user presses w, there will be a 1/4 chance of an enemy encounter
//* I will need to make a chance for an enemy to appear and a chance for it to be one out of at least 3 enemies.
//* The player can attack or flee from an enemy
//* if attacking, there will be a min max amount of damage dealt to the enemy
//* if fleeing, the player will have a 50% chance of succeeding in that action.
//* the enemy still has the chance to counter-attack after evey player action including fleeing
//* enemies must drop an item
//* player must be able to access inventory and stats with "p". I used "I" instead.
//* display a death message when player loses

//! EXTRAS:
//! regain +1 hp for every time an enemy isn't encountered
//! regain +10 hp for defeating an enemy
//! Press q to quit the game
//! Press h for a list of commands
//! Press e to equip an item in your inventory