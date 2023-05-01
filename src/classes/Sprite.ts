import type { Coords } from '../types'

export class Sprite {
    constructor(imageSrc: string, frameRate = 1) {
        this.imageSrc = imageSrc
        this.frameRate = frameRate
        this.image = new Image()

        this.image.src = imageSrc
        this.width = 0
        this.height = 0

        this.image.onload = () => {
            this.loaded = true
            this.width = this.image.width / this.frameRate
            this.height = this.image.height
        }
    }

    imageSrc: string
    frameRate: number
    image: HTMLImageElement
    width: number
    height: number

    loaded = false
    currentFrame = 0
    frameSpeed = 0
    frameBuffer = 2

    draw(ctx: CanvasRenderingContext2D, position: Coords) {
        if (this.loaded) {
            const cropBox = {
                position: {
                    x: this.width * this.currentFrame,
                    y: 0,
                },
                width: this.width,
                height: this.height,
            }
            ctx.drawImage(
                this.image,
                cropBox.position.x,
                cropBox.position.y,
                cropBox.width,
                cropBox.height,
                position.x,
                position.y,
                this.width,
                this.height
            )
        }

        this.updateFrames()
    }

    updateFrames() {
        this.frameSpeed++

        if (this.frameSpeed % this.frameBuffer === 0) {
            if (this.currentFrame === this.frameRate - 1) {
                this.currentFrame = 0
            } else {
                this.currentFrame++
            }
        }
    }
}
