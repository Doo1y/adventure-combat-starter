class Character {

  constructor(name, description, currentRoom) {
  this.name = name;
  this.description = description;
  this.currentRoom = currentRoom;
  this.items = [];
  this.strength = 10;
  this.health = 100;
  }

  applyDamage(amount = this.strength) {
    this.health -= amount;
    if (this.health == 0) {
      this.die();
    }
  }

  removeItem(itemName) {
    let index = this.items.findIndex(item => item == itemName);
    return this.items.splice(index, 1)[0];
  }

  die() {
    console.log("Your health dropped to 0 - You've died!")
    
    for (const item in this.items) {
      this.currentRoom.addItem(this.removeItem(item));
    }

    this.currentRoom = null;
  }

}

module.exports = {
  Character,
};
