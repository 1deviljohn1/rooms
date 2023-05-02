import type { Coords } from '../types'
import type { CollisionBlock } from './CollisionBlock'

export class Player {
    constructor(collisionsBlocks: CollisionBlock[]) {
        this.collisionsBlocks = collisionsBlocks
        this.image = new Image()
        this.image.src = './img/king/idleRight.png'

        this.image.onload = () => {
            this.imageLoaded = true
            this.imageWidth = this.image.width / this.framesNumber
        }
    }

    collisionsBlocks: CollisionBlock[]
    image: HTMLImageElement

    gravity = 1
    framesNumber = 11
    imageLoaded = false
    currentFrame = 0
    frameReducerCount = 0
    frameReducer = 3
    imageWidth = 0
    width = 80
    height = 60

    position: Coords = {
        x: 200,
        y: 200,
    }

    velocity: Coords = {
        x: 0,
        y: 0,
    }

    sides = {
        bottom: this.position.y + this.height,
    }

    hasCollisionWithBlock(block: CollisionBlock) {
        return (
            this.position.x <= block.position.x + block.width &&
            this.position.x + this.width >= block.position.x &&
            this.position.y + this.height >= block.position.y &&
            this.position.y <= block.position.y + block.height
        )
    }

    detectHorizontalCollision() {
        for (let index = 0; index < this.collisionsBlocks.length; index++) {
            const block = this.collisionsBlocks[index]

            if (this.hasCollisionWithBlock(block)) {
                if (this.velocity.x > 0) {
                    this.position.x = block.position.x - this.width - 0.01
                    break
                }

                if (this.velocity.x < 0) {
                    this.position.x = block.position.x + block.width + 0.01
                    break
                }
            }
        }
    }

    detectVerticalCollision() {
        for (let index = 0; index < this.collisionsBlocks.length; index++) {
            const block = this.collisionsBlocks[index]

            if (this.hasCollisionWithBlock(block)) {
                if (this.velocity.y > 0) {
                    this.velocity.y = 0
                    this.position.y = block.position.y - this.height - 0.01
                    break
                }

                if (this.velocity.y < 0) {
                    this.velocity.y = 0
                    this.position.y = block.position.y + block.height + 0.01
                    break
                }
            }
        }
    }

    applyGravity() {
        this.velocity.y += this.gravity
        this.position.y += this.velocity.y
    }

    update() {
        this.position.x += this.velocity.x
        this.detectHorizontalCollision()
        this.applyGravity()
        this.detectVerticalCollision()
    }

    draw(ctx: CanvasRenderingContext2D, position: Coords) {
        if (!this.imageLoaded) {
            return
        }

        const cropBox = {
            position: {
                x: 35 + this.imageWidth * this.currentFrame,
                y: 30,
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

        this.updateFrames()
    }

    updateFrames() {
        this.frameReducerCount++

        if (this.frameReducerCount % this.frameReducer === 0) {
            if (this.currentFrame === this.framesNumber - 1) {
                this.currentFrame = 0
            } else {
                this.currentFrame++
            }
        }
    }
}
