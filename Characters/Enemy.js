const Enemies = [
        voidSkeletalSoldier = {
            name: "Void Skeletal Soldier",
            hp: 20,
            weapon: {
                name: "Boney Longsword",
                damage: 10,
                action: "thrust",
                suffix: "s",
                flair: ""
            },
        },

        voidBerserker = {
            name: "Void Berserker",
            hp: 30,
            weapon: {
                name: "Void Battleaxe",
                damage: 12,
                action: "slash",
                suffix: "es",
                flair: ", cutting through like butter"
            },
        },

        voidArcher = {
            name: "Void Archer",
            hp: 15,
            weapon: {
                name: "Void Bow",
                damage: 8,
                action: "shoot",
                suffix: "s",
                flair: ", taking an arrow to the knee"
            }
        },

        voidMage = {
            name: "Void Mage",
            hp: 15,
            damage: 14,
            weapon: {
                name: "Void Staff",
                damage: 8,
                action: "whack",
                suffix: "s",
                flair: " upside the head"

            },
        },
]


class Enemy {
    constructor() {
        let index = Math.floor(Math.random() * Enemies.length)
        let randomEnemy = Enemies[index]
        console.log(`A ${randomEnemy.name} has appeared`)
        this.name = randomEnemy.name;
        this.hp =  randomEnemy.hp;
        this.damage = randomEnemy.damage;
        this.weapon = randomEnemy.weapon;
    }

    dealDamage() {
        let damage = Math.random() * this.damage;
        damage = Math.floor(damage);
        return damage;
    }
    
    dropItem(player) {
        let drop = this.weapon
        if(this.hp <= 0) {
            player.inventory.push(drop)
            console.log(`You picked up ${drop.name}.`)
        } else {
            console.log(`The ${this.name} has ${this.hp}HP remaining.`)
        }
    }
}

module.exports = Enemy

/**
 * player = new Player();
 * enemy = new NPC();
 * player.hp - enemy.dealDamage()
 */