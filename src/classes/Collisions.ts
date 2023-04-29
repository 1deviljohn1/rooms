import { collisionsLevel1 } from '../assets/data/collisions'
import { CollisionBlock } from './CollisionBlock'

export class Collisions {
    private collisionsToArray() {
        const arr = []

        for (let index = 0; index < collisionsLevel1.length; index += 16) {
            arr.push(collisionsLevel1.slice(index, index + 16))
        }

        return arr
    }

    collisionsBlocksArray() {
        const blocks: CollisionBlock[] = []

        this.collisionsToArray().forEach((row, x) => {
            row.forEach((block, y) => {
                if (block) {
                    blocks.push(new CollisionBlock({ x: y * 64, y: x * 64 }))
                }
            })
        })

        return blocks
    }
}
