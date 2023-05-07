import type { Coords } from '../types'

export class CollisionBlock {
    constructor(position: Coords) {
        this.position = position
    }

    position: Coords

    width = 64
    height = 64

    get sides() {
        return {
            rigth: this.position.x + this.width,
        }
    }
}
