import type { Coords } from '../types'

type Image = {
    src: string
    position: Coords
    framesNumber?: number
    framesReducer?: number
    loop?: boolean
    autoplay?: boolean
}

export class Sprite {
    constructor({
        src,
        position = { x: 0, y: 0 },
        framesNumber = 1,
        framesReducer = 0,
        loop = true,
        autoplay = true,
    }: Image) {
        this.image = new Image()
        this.image.src = src
        this.position = position
        this.framesNumber = framesNumber
        this.framesReducer = framesReducer
        this.loop = loop
        this.autoplay = autoplay

        this.image.onload = () => {
            this.loaded = true
            this.width = this.image.width / this.framesNumber
        }
    }

    private image: HTMLImageElement
    position: Coords
    private framesNumber: number
    private framesReducer: number
    private loop: boolean
    autoplay: boolean

    private loaded = false
    private frameReducerCount = 0
    private currentFrame = 0
    width = 0

    get sides() {
        return {
            rigth: this.position.x + this.width,
        }
    }

    draw(ctx: CanvasRenderingContext2D) {
        if (!this.loaded) {
            return
        }

        const cropBox = {
            position: {
                x: this.width * this.currentFrame,
                y: 0,
            },
            width: this.width,
            height: this.image.height,
        }

        ctx.drawImage(
            this.image,
            cropBox.position.x,
            cropBox.position.y,
            cropBox.width,
            cropBox.height,
            this.position.x,
            this.position.y,
            cropBox.width,
            cropBox.height
        )

        if (this.autoplay) {
            this.updateFrames()
        }
    }

    private updateFrames() {
        this.frameReducerCount++

        if (this.frameReducerCount % this.framesReducer === 0) {
            if (this.currentFrame < this.framesNumber - 1) {
                this.currentFrame++
            } else if (this.loop) {
                this.currentFrame = 0
            }
        }
    }
}
