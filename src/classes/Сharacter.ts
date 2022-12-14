import { Canvas } from './Canvas'

export class Сharacter {
    private speed = { x: 20, y: 0 }
    private gravity = 2
    private jumpSpeed = 40
    private movingRight = false
    private movingLeft = false
    private jumping = false

    constructor(
        private coords: {
            x: number
            y: number
        },
        private width: number,
        private height: number,
        private canvas: Canvas
    ) {}

    private get position(): [number, number, number, number] {
        return [this.coords.x, this.coords.y, this.width, this.height]
    }

    draw() {
        this.canvas.ctx.fillRect(...this.position)
    }

    update() {
        this.clear()

        // gravity & jumping
        const canFalling = this.canvas.el.height >= this.coords.y + this.height + this.speed.y

        if (canFalling && !this.jumping) {
            this.speed.y += this.gravity
            this.coords.y += this.speed.y
        } else if (this.jumping) {
            this.speed.y -= this.gravity
            this.coords.y -= this.speed.y
        } else {
            this.coords.y = this.canvas.el.height - this.height
            this.speed.y = this.gravity
        }

        // x-axis moving
        if (this.movingRight) {
            this.coords.x += this.speed.x
        }

        if (this.movingLeft) {
            this.coords.x -= this.speed.x
        }

        this.draw()
    }

    clear() {
        this.canvas.ctx.clearRect(...this.position)
    }

    moveRight() {
        this.movingRight = true
    }

    moveLeft() {
        this.movingLeft = true
    }

    stopMove() {
        this.movingLeft = false
        this.movingRight = false
    }

    jump() {
        if (this.canvas.el.height === this.coords.y + this.height) {
            this.speed.y = this.jumpSpeed
            this.jumping = true
        }
    }
}
