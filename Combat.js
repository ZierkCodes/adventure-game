const Enemy = require("./Characters/Enemy");

class Combat {
    constructor (enemy, player) {
        this.enemy = enemy;
        this.player = player;
        this.turn = this.player;
    };

    attack() {
        if(this.turn === this.player) {
            let damageDealt = Math.floor(Math.random() * (this.player.weapon.damage - 1 + 1)) + 1;
            this.enemy.hp -= damageDealt
            console.log(`You ${this.player.weapon.action} your ${this.player.weapon.name} at the ${this.enemy.name} ${this.player.weapon.flair} dealing ${damageDealt} damage`)
        } else if(this.turn === this.enemy) {
            let damageRecieved = Math.floor(Math.random() * (this.enemy.weapon.damage - 1 + 1)) + 1;
            this.player.hp -= damageRecieved
            console.log(`${this.enemy.name} ${this.enemy.weapon.action}${this.enemy.weapon.suffix} you with ${this.enemy.weapon.name}${this.enemy.weapon.flair} dealing ${damageRecieved} damage`)
            console.log(`You have ${this.player.hp} HP remaining`)
            console.log(`${this.enemy.name} has ${this.enemy.hp} HP remaining`)
        }
    };

    checkWinner() {
        if(this.player.hp > 0 && this.enemy.hp <= 0) {
            console.log(`${this.enemy.name} has been defeated`)
            console.log(`Drinking the blood of your enemies restores your health`)
            this.player.hp += 10
            console.log(`${this.player.hp} HP`)
            this.enemy.dropItem(this.player)
            return this.player
        } else if (this.player.hp <= 0) {
            console.log(`${this.player.name} has been defeated.`)
            return this.enemy
        } else {
            this.turn === this.player ? this.turn = this.enemy : this.turn = this.player
            return null
        }
    };

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