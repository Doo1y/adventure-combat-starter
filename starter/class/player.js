const { Character } = require('./character');
const { Enemy } = require('./enemy');
const { Food } = require('./food');
const { Items } = require('./item');

class Player extends Character {

  constructor(name, currentRoom) {
    super(name, "main character", currentRoom);
    this.items = [];
  }

  move(direction) {

    const nextRoom = this.currentRoom.getRoomInDirection(direction);

    // If the next room is valid, set the player to be in that room
    if (nextRoom) {
      this.currentRoom = nextRoom;

      nextRoom.printRoom(this);
    } else {
      console.log("You cannot move in that direction");
    }
  }

  printInventory() {
    if (this.items.length === 0) {
      console.log(`${this.name} is not carrying anything.`);
    } else {
      console.log(`${this.name} is carrying:`);
      for (let i = 0; i < this.items.length; i++) {
        console.log(`  ${this.items[i].name}`);
      }
    }
  }

  takeItem(itemName) {
    let roomItem = this.currentRoom.getItemByName(itemName);
    if (roomItem) {
      this.items.push(roomItem);
      console.log(`You have picked up the item: ${itemName}!`)
    } else {
      console.log(`Item: [${itemName}] does not exist in this room`);
    }
  }

  dropItem(itemName) {
    const inventoryItem = this.getItemByName(itemName);
    if (inventoryItem) {
      let index = this.items.indexOf(inventoryItem);
      console.log(`You have dropped the item: ${itemName}`);
      return this.currentRoom.addItem(this.items.splice(index, 1)[0]);
    } else {
      console.log(`You can't drop items you don't have!`);
    }


  }

  eatItem(itemName) {
    let edibleItem;
    this.items.forEach((item, index) => {
      if (item.name == itemName && item instanceof Food) {
        edibleItem = this.items.splice(index, 1)[0];
      }
    });
    if (edibleItem) {
      console.log(`You have eaten ${itemName} - Yum!`);
    } else {
      console.log(`${itemName} is not food - Yuck!`)
    }
  }

  getItemByName(name) {
    let thisItemExists = this.items.filter(item => item.name == name);
    if (thisItemExists.length) {
      return thisItemExists[0];
    } else {
      console.log(`Item: [${name}] does not exist in your inventory`);
    }
  }


  hit(name) {
    let enemy = this.currentRoom.getEnemyByName(name);
    if (!enemy) {
      console.log("You can't hit that.");
    } else {
      enemy.applyDamage(this.strength);
      console.log(`You hit the ${enemy.name} for ${this.strength} damage.`);
      enemy.setPlayer(this);
    }
  }

  die() {
    console.log("You are dead!");
    process.exit();
  }

}

module.exports = {
  Player,
};
