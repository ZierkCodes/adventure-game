const Enemy = require("./Characters/Enemy")
const Player = require("./Characters/Player")
const Combat = require("./Combat")
const readlineSync = require("readline-sync")
let combat;
let player;
initGame()

function initGame() {
   console.log("Welcome back lorekeeper, you've been resurrected to take on a daunting task.", "The realm has become infested with beings from the void, you must cleanse these pests and bring peace and order back to the land")
   let name = readlineSync.question("Please enter your name ")
   player = new Player(name)
   console.log(`${player.name}, set off now, prepare yourself for the journey ahead, these beasts are merciless`)
   console.log("Press the w key to move on")
   getCommands()
}

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
         console.log(`${player.hp} HP`)
      }
      getCommands()
   }
}

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

function initCombat() {
   if(combat.turn === combat.player) {
      const actions = ["Fight", "Run"]
      let index = readlineSync.keyInSelect(actions, "What will you do now?", {cancel: false})
      switch (actions[index]) {
         case "Fight":
            combat.attack()
            battleOver()
            
            break;
      
         case "Run":
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
   }
}



// When the user presses w, there will be a 1/4 chance of an enemy encounter
// I will need to make a chance for an enemy to appear and a chance for it to be one out of 3 enemies.
// The player can attack or flee from an enemy
// if attacking, there will be a min max amount of damage dealt to the enemy
// if fleeing, the player will have a 50% chance of succeeding in that action.
// the enemy still has the chance to counter-attack after evey player action including fleeing
// enemies must drop an item
// player must be able to access inventory and stats with "p". I used "I" instead.
