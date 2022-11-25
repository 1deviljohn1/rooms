import { Canvas } from './Canvas'

export class Сharacter {
    private speed: number = 1
    private gravity: number = 2

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
        this.canvas.ctx.clearRect(...this.position)

        if (this.canvas.el.height >= this.coords.y + this.height + this.speed) {
            this.speed += this.gravity
            this.coords.y += this.speed
        } else {
            this.coords.y = this.canvas.el.height - this.height
        }

        this.draw()
    }
}
