((Phaser, Game, CFG) => {

  if ( Game === undefined )  {
    Game = window.Game = {};
  }

  const SCALE = 1;
  const MOVE_SPEED = 850;
  const JUMP_VELOCITY = 2950;
  // also height, gravity:9750 jumpVel:2950 = can clear 400px
  const ANIMATIONS = {
    IDLE_SPEED : 8,
    LEFT_SPEED : 8,
    RIGHT_SPEED : 8,
    JUMP_SPEED : 4,
  };

  Game.Hero = class {
    constructor() {

      this.game = game;
      this.sprite = this.game.add.sprite(x, y, CFG.ASSETS.GFX);
      this.sprite.scale.set(SCALE);
      //this causes to give access to body
      this.game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
      this.sprite.body.setSize(30, 80, 52, 25);
      //this is the animations created
      this.animations = {
        idle : this.sprite.animations.add('idle', [ 'hero-idle-1.png', 'hero-idle-2.png' ]),
        left : this.sprite.animations.add('left', [ 'hero-left-1.png', 'hero-left-2.png' ]),
        right : this.sprite.animations.add('right', [ 'hero-right-1.png', 'hero-right-2.png' ]),
        jump : this.sprite.animations.add('jump', [ 'hero-jump-2.png', 'hero-jump-1.png' ]),
      };

      // allows passing through platforms
      this.sprite.body.checkCollision.up =
      this.sprite.body.checkCollision.left =
      this.sprite.body.checkCollision.right = false;

      //referenced from update function
      this.sprite.update = this.update.bind(this);
    }
  }

})(window.Phaser, window.Game, window.Game.Configuration);