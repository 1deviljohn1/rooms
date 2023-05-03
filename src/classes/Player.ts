import type { Coords } from '../types'
import type { CollisionBlock } from './CollisionBlock'

type Direction = 'idleLeft' | 'idleRight' | 'runLeft' | 'runRight'

export class Player {
    constructor(collisionsBlocks: CollisionBlock[]) {
        this.collisionsBlocks = collisionsBlocks
        this.images.forEach((item) => {
            item.entity.src = `./img/king/${item.imageSrc}.png`
        })

        this.image = this.images[0].entity
        this.framesNumber = this.images[0].framesNumber
        this.frameReducer = this.images[0].frameReducer
    }

    collisionsBlocks: CollisionBlock[]
    image: HTMLImageElement
    framesNumber: number
    frameReducer: number

    gravity = 1
    currentFrame = 0
    frameReducerCount = 0
    frameWidth = 156
    width = 80
    height = 60
    direction: Direction = 'idleRight'

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

    images = [
        {
            imageSrc: 'idleRight',
            framesNumber: 11,
            frameReducer: 3,
            entity: new Image(),
        },
        {
            imageSrc: 'idleLeft',
            framesNumber: 11,
            frameReducer: 3,
            entity: new Image(),
        },
        {
            imageSrc: 'runLeft',
            framesNumber: 8,
            frameReducer: 6,
            entity: new Image(),
        },
        {
            imageSrc: 'runRight',
            framesNumber: 8,
            frameReducer: 6,
            entity: new Image(),
        },
    ]

    private hasCollisionWithBlock(block: CollisionBlock) {
        return (
            this.position.x <= block.position.x + block.width &&
            this.position.x + this.width >= block.position.x &&
            this.position.y + this.height >= block.position.y &&
            this.position.y <= block.position.y + block.height
        )
    }

    private detectHorizontalCollision() {
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

    private detectVerticalCollision() {
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

    private applyGravity() {
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
        const cropBox = {
            position: {
                x: 35 + this.frameWidth * this.currentFrame,
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

    private updateFrames() {
        this.frameReducerCount++

        if (this.frameReducerCount % this.frameReducer === 0) {
            if (this.currentFrame === this.framesNumber - 1) {
                this.currentFrame = 0
            } else {
                this.currentFrame++
            }
        }
    }

    switchImage(src: Direction) {
        if (this.direction === src) {
            return
        }

        const image = this.images.find((item) => item.imageSrc === src)

        if (image) {
            this.image = image.entity
            this.direction = src
            this.currentFrame = 0
            this.framesNumber = image.framesNumber
            this.frameReducer = image.frameReducer
        }
    }
}
