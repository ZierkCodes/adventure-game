const Enemy = require("./Characters/Enemy");

// Combat class will handle the logic for when a player encounters an enemy
class Combat {
    // The constructor will create an instance where Combat logic will be run inside of a loop, the player gets the first turn
    constructor (enemy, player) {
        this.enemy = enemy;
        this.player = player;
        this.turn = this.player;
    };

    // attack() handles damage dealt to the player and enemy depending on whose turn it is.
    attack() {
        /* If it is the player's turn, and the attack option is chosen, the player has their turn and the enemy will have 
        theirs. health points will be displayed after the enemy uses their turn. */
        if(this.turn === this.player) {
            /* damage the player deals based on their equipped weapon and a random number chosen from the maximum 
            damage output of the equipped weapon. */
            let damageDealt = Math.floor(Math.random() * (this.player.weapon.damage - 1 + 1)) + 1;
            this.enemy.hp -= damageDealt
            console.log(`You ${this.player.weapon.action} your ${this.player.weapon.name} at the ${this.enemy.name} ${this.player.weapon.flair} dealing ${damageDealt} damage`)
        } else if(this.turn === this.enemy) {
            // The same logic is applied to the enemy NPC.
            let damageRecieved = Math.floor(Math.random() * (this.enemy.weapon.damage - 1 + 1)) + 1;
            this.player.hp -= damageRecieved
            console.log(`${this.enemy.name} ${this.enemy.weapon.action}${this.enemy.weapon.suffix} you with ${this.enemy.weapon.name}${this.enemy.weapon.flair} dealing ${damageRecieved} damage`)
            // The player's and enemy hp after their turns.
            console.log(`You have ${this.player.hp} HP remaining`)
            console.log(`${this.enemy.name} has ${this.enemy.hp} HP remaining`)
        }
    };

    // checkWinner is going to determine who loses in the encounter based upon health points
    checkWinner() {
        // if the player wins
        if(this.player.hp > 0 && this.enemy.hp <= 0) {
            console.log(`${this.enemy.name} has been defeated`)
            console.log(`Drinking the blood of your enemies restores your health`)
            this.player.hp += 10
            console.log(`${this.player.hp} HP`)
            this.enemy.dropItem(this.player)
            return this.player
        } else if (this.player.hp <= 0) {
            // if the enemy wins
            console.log(`${this.player.name} has been defeated.`)
            return this.enemy
        } else {
            this.turn === this.player ? this.turn = this.enemy : this.turn = this.player
            return null
        }
    };

    // This is the "Run away" logic 50/50 chance the player gets to run away successfully, if unsuccessful Enemy deals damage
    escape() {
        if(this.turn === this.player) {
            if(Math.floor(Math.random() * (1 - 0 + 1))) {
                console.log(`You juked the ${this.enemy.name} with ease and have escaped`)
                return true
            } else {
                console.log(`${this.enemy.name} blocks your escape and says, "GET THWARTED KNAVE"`)
                this.turn = this.enemy
                return false
            }
        }
    };
};

module.exports = Combat