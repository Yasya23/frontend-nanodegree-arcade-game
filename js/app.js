"use strict";

const START_POINT = 0;
const END_POINT = 400;

const ENEMY_START = -30;
const ENEMY_END = 480;
const ENEMY_SPEED_MIN = 80;
const ENEMY_SPEED_MAX = 200;
const ENEMY_LOCATION_1 = 63;
const ENEMY_LOCATION_2 = 145;
const ENEMY_LOCATION_3 = 230;

const X_STEP = 100;
const Y_STEP = 80;

const PLAYER_X_START = 200;
const PLAYER_Y_START = 400;
const PLAYER_HEIGHT = 60;
const PLAYER_WIDTH = 80;

let win = 1;
let lose = 0;

let Enemy = function (x, y, speed) {
  this.x = x;
  this.y = y;
  this.speed = speed;
  this.sprite = "images/enemy-bug.png";
};

Enemy.prototype.update = function (dt) {
  this.checkCollisions();
  this.x += this.speed * dt;
  if (this.x > ENEMY_END) {
    this.x = ENEMY_START;
    this.speed = ENEMY_SPEED_MIN + Math.floor(Math.random() * ENEMY_SPEED_MAX);
  }
};

Enemy.prototype.checkCollisions = function () {
  if (
    player.x < this.x + PLAYER_WIDTH &&
    player.x + PLAYER_WIDTH > this.x &&
    player.y < this.y + PLAYER_HEIGHT &&
    PLAYER_HEIGHT + player.y > this.y
  ) {
    player.x = PLAYER_X_START;
    player.y = PLAYER_Y_START;
    lose++;
  }
};

Enemy.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

const Player = function (x, y) {
  this.x = x;
  this.y = y;
  this.player = "images/char-boy.png";
};

Player.prototype.update = function () {};

Player.prototype.render = function () {
  ctx.drawImage(Resources.get(this.player), this.x, this.y);
};

Player.prototype.handleInput = function (keyPress) {
  switch (keyPress) {
    case "left":
      if (this.x !== START_POINT) {
        this.x -= X_STEP;
      }
      break;
    case "right":
      if (this.x !== END_POINT) {
        this.x += X_STEP;
      }
      break;
    case "up":
      if (this.y !== START_POINT) {
        this.y -= Y_STEP;
      } else {
        player.x = PLAYER_X_START;
        player.y = PLAYER_Y_START;
        alert(`Your score! 🏆 Win: ${win++} 😕 Lose: ${lose}`);
      }
      break;
    case "down":
      if (this.y !== END_POINT) {
        this.y += Y_STEP;
      }
      break;
  }
};

const player = new Player(PLAYER_X_START, PLAYER_Y_START);
const allEnemies = [];
const enemyLocation = [ENEMY_LOCATION_1, ENEMY_LOCATION_2, ENEMY_LOCATION_3];

enemyLocation.forEach(function (y) {
  let enemy = new Enemy(0, y, ENEMY_SPEED_MIN);
  allEnemies.push(enemy);
});

document.addEventListener("keyup", function (e) {
  var allowedKeys = {
    37: "left",
    38: "up",
    39: "right",
    40: "down",
  };

  player.handleInput(allowedKeys[e.keyCode]);
});
