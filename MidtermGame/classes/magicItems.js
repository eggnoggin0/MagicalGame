class MagicItems {

    constructor(x,y,character) {

        this.xPos = x;
        this.yPos = y;
        this.size = 10;

        this.character = character;

        this.identity = random(['Magic', 'Health']);

        this.magicRevive = 10;
        this.healthRevive = 10;

        this.exist = false;
    }

    reviveMagic() { this.character.magicMeter += this.magicRevive; }
    reviveHealth() { this.character.health += this.healthRevive; }

    useItem() {
        if(dist(this.character.xPos, this.character.yPos, this.xPos, this.yPos) < this.size ) {
            if(this.identity == 'Magic') { this.reviveMagic() }
            if(this.identity == 'Health') { this.reviveHealth() }
            this.exist = false;
            this.xPos = random(0,width);
            this.yPos = random(height/3,height);
        }
    }

    display() {
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