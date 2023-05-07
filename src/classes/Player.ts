import type { Coords } from '../types'
import type { CollisionBlock } from './CollisionBlock'
import type { Keys } from '../types'

type Direction = 'idleLeft' | 'idleRight' | 'runLeft' | 'runRight' | 'enterDoor'
type Animation = {
    imageSrc: string
    framesNumber: number
    frameReducer: number
    entity: HTMLImageElement
    isActive: boolean
}

export class Player {
    constructor(collisionsBlocks: CollisionBlock[]) {
        this.collisionsBlocks = collisionsBlocks
        this.animations.forEach((item) => {
            item.entity.src = `./img/king/${item.imageSrc}.png`
        })

        this.image = this.animations[0].entity
        this.framesNumber = this.animations[0].framesNumber
        this.frameReducer = this.animations[0].frameReducer
    }

    private animations: Animation[] = [
        {
            imageSrc: 'idleRight',
            framesNumber: 11,
            frameReducer: 3,
            entity: new Image(),
            isActive: false,
        },
        {
            imageSrc: 'idleLeft',
            framesNumber: 11,
            frameReducer: 3,
            entity: new Image(),
            isActive: false,
        },
        {
            imageSrc: 'runLeft',
            framesNumber: 8,
            frameReducer: 6,
            entity: new Image(),
            isActive: false,
        },
        {
            imageSrc: 'runRight',
            framesNumber: 8,
            frameReducer: 6,
            entity: new Image(),
            isActive: false,
        },
        {
            imageSrc: 'enterDoor',
            framesNumber: 8,
            frameReducer: 6,
            entity: new Image(),
            isActive: false,
        },
    ]

    private collisionsBlocks: CollisionBlock[]
    private image: HTMLImageElement
    private framesNumber: number
    private frameReducer: number

    private gravity = 1
    private currentFrame = 0
    private frameReducerCount = 0
    private frameWidth = 156
    width = 80
    private height = 60
    private speed = 5
    private direction: Direction = 'idleRight'
    private lastDirection: 'left' | 'right' = 'right'
    currentAnimation = this.animations[0]
    enteringDoor = false
    completeEnteringDoor = false

    position: Coords = {
        x: 200,
        y: 200,
    }

    velocity: Coords = {
        x: 0,
        y: 0,
    }

    get sides() {
        return {
            rigth: this.position.x + this.width,
        }
    }

    private hasCollisionWithBlock(block: CollisionBlock) {
        return (
            this.position.x <= block.sides.rigth &&
            this.sides.rigth >= block.position.x &&
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
                    this.position.x = block.sides.rigth + 0.01
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

    private update() {
        this.position.x += this.velocity.x
        this.detectHorizontalCollision()
        this.applyGravity()
        this.detectVerticalCollision()
    }

    private draw(ctx: CanvasRenderingContext2D, position: Coords) {
        const offsetX = ['idleLeft', 'runLeft'].includes(this.direction) ? 40 : 35
        const cropBox = {
            position: {
                x: offsetX + this.frameWidth * this.currentFrame,
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
            if (this.currentFrame === this.framesNumber - 1 && !this.currentAnimation.isActive) {
                if (!this.enteringDoor) {
                    this.currentFrame = 0
                } else {
                    this.completeEnteringDoor = true
                    this.currentAnimation.isActive = true
                }
            } else {
                this.currentFrame++
            }
        }
    }

    private switchImage(src: Direction) {
        if (this.direction === src) {
            return
        }

        const image = this.animations.find((item) => item.imageSrc === src)

        if (image) {
            this.image = image.entity
            this.direction = src
            this.currentFrame = 0
            this.framesNumber = image.framesNumber
            this.frameReducer = image.frameReducer
            this.currentAnimation = image
        }
    }

    animate(keys: Keys, ctx: CanvasRenderingContext2D) {
        this.velocity.x = 0

        if (this.enteringDoor) {
            this.switchImage('enterDoor')
        } else if (keys.a.pressed) {
            this.velocity.x = -this.speed
            this.lastDirection = 'left'
            this.switchImage('runLeft')
        } else if (keys.d.pressed) {
            this.velocity.x = this.speed
            this.lastDirection = 'right'
            this.switchImage('runRight')
        } else {
            this.lastDirection === 'left' ? this.switchImage('idleLeft') : this.switchImage('idleRight')
        }

        this.draw(ctx, { x: this.position.x, y: this.position.y })
        this.update()
    }
}
