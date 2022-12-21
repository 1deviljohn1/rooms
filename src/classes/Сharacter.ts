import { Canvas } from './Canvas'

export class Сharacter {
    public speed = { x: 15, y: 0 }
    private gravity = 3
    private jumpSpeed = 50
    private movingRight = false
    private movingLeft = false
    private canJumping = false

    constructor(
        public coords: {
            x: number
            y: number
        },
        public width: number,
        public height: number,
        private canvas: Canvas
    ) {}

    private get position(): [number, number, number, number] {
        return [this.coords.x, this.coords.y, this.width, this.height]
    }

    private draw() {
        this.canvas.ctx.fillStyle = 'green'
        this.canvas.ctx.fillRect(...this.position)
    }

    public update() {
        this.clear()

        // gravity
        const canFalling = this.coords.y + this.height + this.speed.y < this.canvas.el.height
        this.canJumping = !canFalling

        if (canFalling) {
            this.speed.y += this.gravity
            this.coords.y += this.speed.y
        } else {
            this.speed.y = 0
            this.coords.y = this.canvas.el.height - this.height
        }

        // x-axis moving
        if (this.movingRight && this.coords.x + this.width < this.canvas.el.width) {
            this.coords.x += this.speed.x
        }

        if (this.movingLeft && this.coords.x > 0) {
            this.coords.x -= this.speed.x
        }

        // display coords
        this.canvas.ctx.font = '18px Arial'
        this.canvas.ctx.fillStyle = '#000000'
        this.canvas.ctx.fillText(`x: ${this.coords.x}`, this.canvas.el.width - 100, 50)
        this.canvas.ctx.fillText(`y: ${this.coords.y}`, this.canvas.el.width - 100, 70)
        this.canvas.ctx.fillText(`speed: ${this.speed.y}`, this.canvas.el.width - 100, 90)

        this.draw()
    }

    private clear() {
        this.canvas.ctx.clearRect(0, 0, this.canvas.el.width, this.canvas.el.height)
    }

    public moveRight() {
        this.movingRight = true
    }

    public moveLeft() {
        this.movingLeft = true
    }

    public stopMove() {
        this.movingLeft = false
        this.movingRight = false
    }

    public jump() {
        if (this.canJumping) {
            this.speed.y -= this.jumpSpeed
        }
    }
}
