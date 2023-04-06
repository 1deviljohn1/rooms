export class Player {
    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas
        this.c = canvas.getContext('2d') as CanvasRenderingContext2D
    }

    canvas: HTMLCanvasElement
    c: CanvasRenderingContext2D

    position = {
        x: 100,
        y: 100,
    }

    width = 100
    height = 100

    sides = {
        bottom: this.position.y + this.height,
    }

    draw() {
        this.c.fillStyle = 'red'
        this.c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    update() {
        if (this.sides.bottom < this.canvas.height) {
            this.position.y += 10
            this.sides.bottom = this.position.y + this.height
        }
    }
}
