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
    this.game.load.tilemap('tilemap', 'assets/tilemap.json', null, Phaser.Tilemap.TILED_JSON);
    this.game.load.image('tiles', 'assets/images/ninja-tiles64.png');

    // Player
    this.game.load.image('supermeatboy', 'assets/images/bear50x37.png');

    // Background
    this.load.image('background', 'assets/images/background2.png');
  }

  create () {
    this.state.start('Game')
  }
}
