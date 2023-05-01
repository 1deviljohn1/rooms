import type { Coords } from '../types'
import type { CollisionBlock } from './CollisionBlock'
import { Sprite } from './Sprite'

export class Player extends Sprite {
    constructor(collisionsBlocks: CollisionBlock[], imageScr: string, frameRate: number) {
        super(imageScr, frameRate)
        this.collisionsBlocks = collisionsBlocks
    }

    collisionsBlocks: CollisionBlock[]

    position: Coords = {
        x: 200,
        y: 200,
    }

    velocity: Coords = {
        x: 0,
        y: 0,
    }

    gravity = 1

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

    update(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = 'rgba(0, 0, 255, 0.5)'
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height)

        this.position.x += this.velocity.x
        this.detectHorizontalCollision()
        this.applyGravity()
        this.detectVerticalCollision()
    }
}
