import type { Coords } from '../types'

export class CollisionBlock {
    private width = 64
    height = 64

    constructor(public position: Coords) {}

    get sides() {
        return {
            rigth: this.position.x + this.width,
        }
    }
}
