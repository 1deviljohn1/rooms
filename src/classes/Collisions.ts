import { collisionsLevel } from '../assets/data/collisions'
import { CollisionBlock } from './CollisionBlock'

export class Collisions {
    private collisionsToArray(level: number) {
        const arr = []
        const collisions = collisionsLevel[level]

        for (let index = 0; index < collisions.length; index += 16) {
            arr.push(collisions.slice(index, index + 16))
        }

        return arr
    }

    collisionsBlocksArray(level: number) {
        const blocks: CollisionBlock[] = []

        this.collisionsToArray(level).forEach((row, x) => {
            row.forEach((block, y) => {
                if (block) {
                    blocks.push(new CollisionBlock({ x: y * 64, y: x * 64 }))
                }
            })
        })

        return blocks
    }
}
