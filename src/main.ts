import Phaser from 'phaser'

import sceneA from './scenes/sceneA'
import sceneB from './scenes/sceneB'

const config: Phaser.Types.Core.GameConfig = {
	type: Phaser.AUTO,
	width: 800,
	height: 600,
	physics: {
		default: 'arcade',
		arcade: {
			debug: false
		}
	},
	scene: [sceneA,sceneB]
}

export default new Phaser.Game(config)
