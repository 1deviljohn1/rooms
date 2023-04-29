import type { Coords } from '../types'

export class Player {
    position: Coords = {
        x: 100,
        y: 100,
    }

    velocity: Coords = {
        x: 0,
        y: 0,
    }

    width = 100
    height = 100
    gravity = 1

    sides = {
        bottom: this.position.y + this.height,
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = 'red'
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    update(canvas: HTMLCanvasElement) {
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        this.sides.bottom = this.position.y + this.height

        if (this.sides.bottom + this.velocity.y < canvas.height) {
            this.velocity.y += this.gravity
        } else {
            this.velocity.y = 0
        }
    }
}
