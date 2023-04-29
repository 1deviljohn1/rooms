import type { Player } from './Player'
import type { Keys } from '../types'

export class EventsListeners {
    listenKeyDown(player: Player, keys: Keys, canvas: HTMLCanvasElement) {
        window.addEventListener('keydown', (event) => {
            switch (event.key) {
                case 'w':
                case 'space':
                    if (player.velocity.y === 0 && player.sides.bottom === canvas.height) {
                        player.velocity.y = -20
                    }
                    break

                case 'a':
                    keys.a.pressed = true
                    break

                case 'd':
                    keys.d.pressed = true
                    break

                default:
                    break
            }
        })
    }

    listenKeyUp(keys: Keys) {
        window.addEventListener('keyup', (event) => {
            switch (event.key) {
                case 'a':
                    keys.a.pressed = false
                    break

                case 'd':
                    keys.d.pressed = false
                    break

                default:
                    break
            }
        })
    }
}
