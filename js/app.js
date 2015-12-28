// Enemies our player must avoid
var Enemy = function () { // function for enemies
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png'; // attach picture to enemies

    this.speed = Math.floor(Math.random() * 150) + 100; // attach speed value which will be different between enemies
    this.x = 0; // initial x axis position of the enemies will be 0, on the left side of screen

    if (this.x === 0) {
        this.y = Math.floor(Math.random() * 2.9) * 83 + 41.5; // enemies' initial y axis position will be randomly chosen between 3 lines
    }
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.speed * dt; // enemies will move to the right side from the left

    if (this.x > 500) { // if player reaches water, he wins and game starts from the beginning
        this.x = 0;
        this.y = Math.floor(Math.random() * 3) * 83 + 41.5;
        this.speed = Math.floor(Math.random() * 400) + 100;
    }

    var location = Math.abs(player.x - this.x);
    if (location < 50.5 && this.y == player.y) { // reset player's postion if he collides with enemy
        player.x = 202;
        player.y = 373.5;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function () { // attach player picture and initial position values
    this.sprite = "images/char-boy.png";
    this.x = 202;
    this.y = 373.5;
};

Player.prototype.update = function () { // there is no need to update player's position, because we control it with arrow buttons on our keyboard

};

Player.prototype.render = function () { // draw player
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function (keyPress) { // this function will allow player to move when we click buttons. In addition, in order to avoid player coming out of screen we make some rules that will not let him go out.
    switch (keyPress) {
        case "right":
            if (this.x < 404) { // player is unable to go out of the screen on the right if his x value is smaller than 404 
                this.x = this.x + 101;
            }
            break;

        case "left":
            if (this.x > 0) { // player is unable to go out of the screen on the left if his x value is bigger than 0
                this.x = this.x - 101;
            }
            break;

        case "up":
            if (this.y > 124) { // player is unable to go out of the screen up if his y value is bigger than 124
                this.y = this.y - 83;
            } else if (this.y < 42) { // however we need to consider situation when player can win. So if y value is smaller than 42 and player goes up he wins, when re reaches the water. Next, his position resets to initial value.
                console.log("You won");
                this.x = 202;
                this.y = 373.5;
            }
            break;

        case "down":
            if (this.y < 373) { // player is unable to go out of the screen down if his x value is smaller than 373
                this.y = this.y + 83;
            }
            break;
    }
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place he player object in a variable called player

allEnemies = []; // Array that will contain all enemies objects

var Difficulty = function (num) { // This function changes difficulty level according to the input "num" we provide.
    level = num;
    for (var i = 0; i < level; i++) {
        allEnemies.push(new Enemy()); // push all the enemies objects to "allEnemies" array
    }
};

Difficulty(4); // 4 enemies will spawn
var player = new Player(); // spawn player

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});