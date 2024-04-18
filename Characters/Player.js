class Player {
    constructor (name) {
        this.name = name
        this.hp = 50;
        this.inventory = [];
        this.weapon = {
            name: "fist",
            action: "swing", 
            suffix: "",
            flair: "",
            damage: 5,
        };
        this.equip = function (weapon) {
            if(this.inventory.includes(weapon)) {
                this.weapon = weapon
                console.log(`You equipped ${weapon.name}`)
            }
        };
        this.logInventory = function () {
            this.inventory.forEach((weapon, index) => {
                console.log(weapon.name)
            })
        };
    }
    
}

module.exports = Player
