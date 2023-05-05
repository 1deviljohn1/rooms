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

    draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = 'rgba(255, 0, 0, 0.4)'
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}
