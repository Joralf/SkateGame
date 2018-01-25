/* globals __DEV__ */
import Phaser from 'phaser'
import Mushroom from '../sprites/Mushroom'
import ArcadeSlopes from 'phaser-arcade-slopes'

export default class extends Phaser.State {
  init () {}
  preload () {}

  create () {
    this.game.physics.startSystem(Phaser.Physics.Arcade);
    this.game.plugins.add(Phaser.Plugin.ArcadeSlopes);

    this.background = this.game.add.tileSprite(0, 0, 800, 600, 'background');
    this.background.fixedToCamera = true;


    this.map = this.game.add.tilemap('tilemap');
    this.map.addTilesetImage('ninja-tiles64', 'tiles');

    this.ground = this.map.createLayer('GroundLayer');
    this.ground.debug = true;
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
    this.player = this.game.add.sprite(50, 50, 'supermeatboy');
    this.game.physics.arcade.enable(this.player);

    //Set some physics on the sprite
    this.player.body.bounce.y = 0.2;
    this.player.body.gravity.y = 2000;
    this.player.body.velocity.x = 0;
    this.player.body.collideWorldBounds = true;
    this.player.anchor.setTo(.5,.5);
    //Make the camera follow the sprite
    this.game.slopes.enable(this.player);

    this.game.camera.follow(this.player);

    //Enable cursor keys so we can create some controls
    this.cursors = this.game.input.keyboard.createCursorKeys();

  }

  update () {
    //Make the sprite collide with the ground layer
    this.game.physics.arcade.collide(this.player, this.ground);
    //Make the sprite jump when the up key is pushed
    if (this.cursors.up.isDown) {
      this.player.body.velocity.y = -300;
    }
    if (this.cursors.left.isDown) {
      this.player.body.velocity.x = -250;
      this.background.tilePosition.x += 2.5;
      this.player.scale.x = 1;
    } else if (this.cursors.right.isDown) {
      this.player.body.velocity.x = 250;
      this.background.tilePosition.x -= 2.5;
      this.player.scale.x = -1;
    } else {
      this.player.body.velocity.x = 0;
    }
  }
  render () {
    // if (__DEV__) {
    //   this.game.debug.spriteInfo(this.mushroom, 32, 32)
    // }
  }
}
