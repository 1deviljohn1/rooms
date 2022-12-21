import { Canvas } from './Canvas'

export class Platform {
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

    public draw() {
        this.canvas.ctx.fillStyle = 'red'
        this.canvas.ctx.fillRect(...this.position)
    }
}
