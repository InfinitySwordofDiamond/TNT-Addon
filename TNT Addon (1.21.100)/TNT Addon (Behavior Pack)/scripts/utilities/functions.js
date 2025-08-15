export class ALL_FUNCTIONS {
    static decrementItemStackDurability(itemStack, damageAmount = 1) {
        const durabilityComponent = itemStack.getComponent("minecraft:durability")

        if (durabilityComponent.damage + damageAmount >= durabilityComponent.maxDurability) {
            return undefined
        }

        else {
            durabilityComponent.damage += damageAmount
            return itemStack
        }
    }

    static decrementItemStackCount(itemStack, decrementCount = 1) {
        if (itemStack.amount - decrementCount <= 0) {
            return undefined
        }

        else {
            itemStack.amount -= decrementCount
            return itemStack
        }
    }
    
    static placeBlockDependingFaceInteracted(blockToPlace, blockInteracted, blockFaceInteracted) {
        const dimmension = blockInteracted.dimension
        let block = undefined

        switch (blockFaceInteracted) {
            case "Down":
                block = blockInteracted.below()
                break

            case "East":
                block = blockInteracted.east()
                break

            case "North":
                block = blockInteracted.north()
                break

            case "South":
                block = blockInteracted.south()
                break

            case "Up":
                block = blockInteracted.above()
                break

            case "West":
                block = blockInteracted.west()
                break
        }

        const entitiesAtBlockLocation = dimmension.getEntities({ "location": block.location, "families": ["mob", "player"] })

        if (entitiesAtBlockLocation.length != 0)
            return

        block.setType(blockToPlace)
    }
    
    static isBlockPowered(block) {
        const adjacentBlocks = [block.above(), block.below(), block.east(), block.north(), block.south(), block.west()]

        for (const adjacentBlock of adjacentBlocks) {
            try {
                if (adjacentBlock.getRedstonePower() !== undefined && adjacentBlock.getRedstonePower() !== 0) {
                    return true
                }
            }
            catch (e) {}
        }
        
        return false
    }
}