import { BlockTypes } from "@minecraft/server"
import { ALL_FUNCTIONS } from "utilities/functions"

export class BlockTntComponent {
    constructor() {
        this.onPlayerInteract = this.onPlayerInteract.bind(this)
        this.onTick = this.onTick.bind(this)
    }

    igniteTNTBlock(tntBlock) {
        const locationToSpawnMoreTntEntity = { x: tntBlock.x + 0.5, y: tntBlock.y, z: tntBlock.z + 0.5 }
        const tntBlockTypeId = tntBlock.typeId
        tntBlock.dimension.spawnEntity(`${tntBlockTypeId}`, locationToSpawnMoreTntEntity)
        tntBlock.setType("minecraft:air")
    }

    onPlayerInteract(event) {
        const { block: tntBlock, player, face } = event
        const playerInventoryComponent = player.getComponent("inventory")
        const playerContainer = playerInventoryComponent.container
        const itemStackHeldByPlayer = playerContainer.getItem(player.selectedSlotIndex)

        if (itemStackHeldByPlayer === undefined)
            return

        if (itemStackHeldByPlayer.typeId === "minecraft:flint_and_steel") {
            tntBlock.dimension.playSound("random.fuse", tntBlock.location)

            if (player.getGameMode() === "Survival" || player.getGameMode() === "Adventure") {
                const item = ALL_FUNCTIONS.decrementItemStackDurability(itemStackHeldByPlayer)

                if (item === undefined) {
                    player.dimension.playSound("random.break", player.location)
                }

                playerContainer.setItem(player.selectedSlotIndex, item)
            }

            this.igniteTNTBlock(tntBlock)
            return
        }

        else if (itemStackHeldByPlayer.typeId === "minecraft:fire_charge") {
            tntBlock.dimension.playSound("mob.blaze.shoot", tntBlock.location, {volume: 0.5})
            tntBlock.dimension.playSound("random.fuse", tntBlock.location)

            if (player.getGameMode() === "Survival" || player.getGameMode() === "Adventure") {
                playerContainer.setItem(player.selectedSlotIndex, ALL_FUNCTIONS.decrementItemStackCount(itemStackHeldByPlayer))
            }

            this.igniteTNTBlock(tntBlock)
            return
        }

        else {
            const itemStackBlockType = BlockTypes.get(itemStackHeldByPlayer.typeId)

            if (itemStackBlockType === undefined)
                return

            ALL_FUNCTIONS.placeBlockDependingFaceInteracted(itemStackBlockType, tntBlock, face);
            return
        }
    }

    onTick(event) {
        const { block: tntBlock } = event;

        if (ALL_FUNCTIONS.isBlockPowered(tntBlock) === false)
            return
        
        tntBlock.dimension.playSound("random.fuse", tntBlock.location)
        this.igniteTNTBlock(tntBlock)
        return
    }
}