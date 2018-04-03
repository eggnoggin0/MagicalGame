class MagicItems {

  constructor(x,y,character) {

    //position
    this.xPos = x;
    this.yPos = y;
    this.size = 10;

    //track character
    this.character = character;

    //item identity
    this.identity = random(['Magic', 'Health']);

    //length of magical item
    this.magicRevive = 10;
    this.healthRevive = 10;

    this.exist = false;
  }

  //function for items
  reviveMagic() { this.character.magicMeter += this.magicRevive; }
  reviveHealth() { this.character.health += this.healthRevive; }

  //using item
  useItem() {
    if(dist(this.character.xPos, this.character.yPos, this.xPos, this.yPos) < this.size ) {
      if(this.identity == 'Magic') { this.reviveMagic() }
      if(this.identity == 'Health') { this.reviveHealth() }
      this.exist = false;
      this.xPos = random(0,width);
      this.yPos = random(height/3,height);
    }
  }

  //display item
  display() {
    //check if exist
    if(this.exist) {
      if(this.identity == 'Magic') {
        fill('green');
        ellipse(this.xPos, this.yPos, this.size, this.size);
      }
      if(this.identity == 'Health') {
        fill('blue');
        ellipse(this.xPos, this.yPos, this.size, this.size);
      }
      this.useItem();
    }

  }

}
