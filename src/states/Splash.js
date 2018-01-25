import Phaser from 'phaser'
import { centerGameObjects } from '../utils'

export default class extends Phaser.State {
  init () {}

  preload () {
    this.loaderBg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBg')
    this.loaderBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBar')
    centerGameObjects([this.loaderBg, this.loaderBar])

    this.load.setPreloadSprite(this.loaderBar)
    //
    // load your assets
    //

    // Tiles
    this.game.load.tilemap('tilemap', 'assets/level.json', null, Phaser.Tilemap.TILED_JSON);
    this.game.load.image('retrotiles01image', 'assets/images/retrotiles01.png');

    // Player
    this.game.load.image('supermeatboy', 'assets/images/supermeatboy.png');

    // Background
    this.load.image('background', 'assets/images/background.png');
  }

  create () {
    this.state.start('Game')
  }
}
