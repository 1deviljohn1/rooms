import type { Coords } from '../types'

export class Sprite {
    constructor(imageSrc: string) {
        this.imageSrc = imageSrc
        this.image = new Image()

        this.image.src = imageSrc
        this.image.onload = () => {
            this.loaded = true
        }
    }

    imageSrc: string
    image: HTMLImageElement

    loaded = false

    draw(ctx: CanvasRenderingContext2D, position: Coords) {
        if (this.loaded) {
            ctx.drawImage(this.image, position.x, position.y)
        }
    }
}
