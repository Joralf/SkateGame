/* globals __DEV__ */
import Phaser from 'phaser'
import ArcadeSlopes from 'phaser-arcade-slopes'

export default class extends Phaser.State {
  init () {}
  preload () {}

  create () {

    this.game.physics.startSystem(Phaser.Physics.Arcade);
    this.game.plugins.add(Phaser.Plugin.ArcadeSlopes);

    // this.background = this.game.add.tileSprite(0, 0, 7846, 1920, 'background');
    // this.background.fixedToCamera = true;
    this.mountainsBack = this.game.add.tileSprite(0,
        this.game.height - this.game.cache.getImage('mountains-back').height,
        this.game.width,
        this.game.cache.getImage('mountains-back').height,
        'mountains-back'
    );

    this.mountainsMid1 = this.game.add.tileSprite(0,
        this.game.height - this.game.cache.getImage('mountains-mid1').height,
        this.game.width,
        this.game.cache.getImage('mountains-mid1').height,
        'mountains-mid1'
    );

    this.mountainsMid2 = this.game.add.tileSprite(0,
        this.game.height - this.game.cache.getImage('mountains-mid2').height,
        this.game.width,
        this.game.cache.getImage('mountains-mid2').height,
        'mountains-mid2'
    );
    this.mountainsBack.fixedToCamera = true;
    this.mountainsMid1.fixedToCamera = true;
    this.mountainsMid2.fixedToCamera = true;


    this.map = this.game.add.tilemap('tilemap');
    this.map.addTilesetImage('ninja-tiles64', 'tiles');

    this.ground = this.map.createLayer('GroundLayer');
    this.ground.resizeWorld();

    this.game.slopes.convertTilemapLayer(this.ground, {
        2:  'FULL',
        3:  'HALF_BOTTOM_LEFT',
        4:  'HALF_BOTTOM_RIGHT',
        6:  'HALF_TOP_LEFT',
        5:  'HALF_TOP_RIGHT',
        15: 'QUARTER_BOTTOM_LEFT_LOW',
        16: 'QUARTER_BOTTOM_RIGHT_LOW',
        17: 'QUARTER_TOP_RIGHT_LOW',
        18: 'QUARTER_TOP_LEFT_LOW',
        19: 'QUARTER_BOTTOM_LEFT_HIGH',
        20: 'QUARTER_BOTTOM_RIGHT_HIGH',
        21: 'QUARTER_TOP_RIGHT_HIGH',
        22: 'QUARTER_TOP_LEFT_HIGH',
        23: 'QUARTER_LEFT_BOTTOM_HIGH',
        24: 'QUARTER_RIGHT_BOTTOM_HIGH',
        25: 'QUARTER_RIGHT_TOP_LOW',
        26: 'QUARTER_LEFT_TOP_LOW',
        27: 'QUARTER_LEFT_BOTTOM_LOW',
        28: 'QUARTER_RIGHT_BOTTOM_LOW',
        29: 'QUARTER_RIGHT_TOP_HIGH',
        30: 'QUARTER_LEFT_TOP_HIGH',
        31: 'HALF_BOTTOM',
        32: 'HALF_RIGHT',
        33: 'HALF_TOP',
        34: 'HALF_LEFT'
    });

    this.map.setCollisionBetween(2, 34, true, 'GroundLayer');

    // PLAYER AND PHYSSISSSSS -----

    //Add the sprite to the game and enable arcade physics on it
    this.player = this.game.add.sprite(80, 37, 'supermeatboy');
    this.game.physics.arcade.enable(this.player);

    //Set some physics on the sprite
    this.player.body.bounce.y = 0.2;
    this.player.body.gravity.y = 1200;
    this.player.body.velocity.x = 0;
    this.player.body.collideWorldBounds = true;
    this.player.anchor.setTo(.5,.5);
    //Make the camera follow the sprite
    this.game.slopes.enable(this.player);

    this.game.camera.follow(this.player);

    //Enable cursor keys so we can create some controls
    this.cursors = this.game.input.keyboard.createCursorKeys();
    this.speedModifier = 0;
    const music = this.game.add.audio('song');
    music.play();
    // this.ground.debug = true;

  }

  update () {
    //Make the sprite collide with the ground layer
    this.game.physics.arcade.collide(this.player, this.ground);

    if ((this.cursors.up.isDown || this.game.input.pointer1.isDown) && this.player.body.touching.down) {
       const speed = this.player.body.speed;
       if ( speed < 300 ) {
         this.player.body.velocity.y = -300;
       } else {
         this.player.body.velocity.y = -speed;
       }
    }

    if (this.cursors.right.isDown) {
      if (this.speedModifier < 10) {
        this.speedModifier += 0.2;
        this.player.body.velocity.x += this.speedModifier;
      }
    } else if (this.cursors.left.isDown) {
      if (this.speedModifier > -10) {
        this.speedModifier -= 0.2;
        this.player.body.velocity.x += this.speedModifier;
      }
    } else {
      this.speedModifier = 0;
    }


    const velocity_rotation = this.player.body.angle * 180 / Math.PI
    const random_degree =  Math.random() * (10 - 0) - 5;

    // sprite moving RIGHT
    if (this.player.body.velocity.x > 0) {
      this.player.scale.x = 1;
      this.player.angle = velocity_rotation + random_degree
      this.moveMountains(1);
    }

    // sprite moving LEFT
    if (this.player.body.velocity.x < 0) {
      this.player.scale.x = -1;
      this.player.angle = 180 + velocity_rotation + random_degree
      this.moveMountains(-1);
    }

    if (this.player.body.velocity.y == 0) {
      this.player.angle = 0;
    }
  }

  moveMountains(modifier) {
    this.mountainsBack.tilePosition.x -= 0.1 * modifier;
    this.mountainsMid1.tilePosition.x -= 0.3 * modifier;
    this.mountainsMid2.tilePosition.x -= 0.6 * modifier;
  }
  render () {
    // if (__DEV__) {
    //   this.game.debug.spriteInfo(this.player, 32, 32)
    // }
  }
}
