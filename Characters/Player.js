class Player {
    /* This is the class for the user to have their own playable character with some interactability */
    constructor (name) {
        this.name = name // the name can be assigned in game.js
        this.hp = 50; // max hp
        this.inventory = []; // Inventory array
        this.weapon = {
            name: "fist",
            action: "swing", 
            suffix: "",
            flair: "",
            damage: 5,
        }; // Every weapon is equippable and has a max damage output and strings to help with sentence structure.

        // a method to allow equipping and item
        this.equip = function (weapon) {
            if(this.inventory.includes(weapon)) {
                this.weapon = weapon
                console.log(`You equipped ${weapon.name}`)
            }
        };

        // A method to console.log the array of items in your inventory.
        this.logInventory = function () {
            this.inventory.forEach((weapon, index) => {
                console.log(weapon.name)
            })
        };
    }
    
}

module.exports = Player