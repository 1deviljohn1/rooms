import type { Player } from './Player'
import type { Keys } from '../types'

export class EventListeners {
    listenKeyDown(player: Player, keys: Keys) {
        window.addEventListener('keydown', (event) => {
            switch (event.code) {
                case 'KeyW':
                case 'Space':
                    if (player.velocity.y === 0) {
                        player.velocity.y = -15
                    }
                    break

                case 'KeyA':
                    keys.a.pressed = true
                    break

                case 'KeyD':
                    keys.d.pressed = true
                    break

                default:
                    break
            }
        })
    }

    listenKeyUp(keys: Keys) {
        window.addEventListener('keyup', (event) => {
            switch (event.code) {
                case 'KeyA':
                    keys.a.pressed = false
                    break

                case 'KeyD':
                    keys.d.pressed = false
                    break

                default:
                    break
            }
        })
    }
}
