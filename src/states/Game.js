/* globals __DEV__ */
import Phaser from 'phaser'
import Mushroom from '../sprites/Mushroom'

export default class extends Phaser.State {
  init () {}
  preload () {}

  create () {
    this.game.physics.startSystem(Phaser.Physics.Ninja);


    this.background = this.game.add.tileSprite(0, 0, 800, 600, 'background');
    this.background.fixedToCamera = true;

    // Add the tilemap and tileset image. The first parameter in addTilesetImage
    // is the name you gave the tilesheet when importing it into Tiled, the second
    // is the key to the asset in Phaser
    this.map = this.game.add.tilemap('tilemap');
    this.map.addTilesetImage('retrotiles01', 'retrotiles01image');

    // //Add both the background and ground layers. We won't be doing anything with the
    // //GroundLayer though
    this.backgroundlayer = this.map.createLayer('BackgroundLayer');
    this.groundLayer = this.map.createLayer('GroundLayer');

    //Before you can use the collide function you need to set what tiles can collide
    this.map.setCollisionBetween(1, 100, true, 'GroundLayer');
    this.groundLayer.resizeWorld();

    //Add the sprite to the game and enable arcade physics on it
    this.player = this.game.add.sprite(50, this.game.world.centerY, 'supermeatboy');
    this.game.physics.arcade.enable(this.player);

    //Set some physics on the sprite
    this.player.body.bounce.y = 0.2;
    this.player.body.gravity.y = 2000;
    this.player.body.velocity.x = 0;
    this.player.body.collideWorldBounds = true;
    this.player.anchor.setTo(.5,.5);
    //Make the camera follow the sprite
    this.game.camera.follow(this.player);

    //Enable cursor keys so we can create some controls
    this.cursors = this.game.input.keyboard.createCursorKeys();

  }

  update () {
    //Make the sprite collide with the ground layer
    this.game.physics.arcade.collide(this.player, this.groundLayer);
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
