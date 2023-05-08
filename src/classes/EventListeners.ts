import type { Player } from './Player'
import type { Sprite } from './Sprite'
import type { Keys } from '../types'

export class EventListeners {
    listenKeyDown(player: Player, door: Sprite, keys: Keys) {
        window.addEventListener('keydown', (event) => {
            const offsetX = 10

            switch (event.code) {
                case 'KeyW':
                case 'Space':
                    if (!(player.velocity.y === 0 && !player.enteringDoor)) {
                        return
                    }

                    if (
                        player.position.x + offsetX >= door.position.x &&
                        player.sides.rigth - offsetX <= door.sides.rigth
                    ) {
                        door.autoplay = true
                        player.enteringDoor = true
                    } else {
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
