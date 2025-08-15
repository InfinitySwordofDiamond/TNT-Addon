import { system, world } from "@minecraft/server"

world.afterEvents.entitySpawn.subscribe((eventData) => {
    const { entity: tntEntity } = eventData;

    if (tntEntity.isValid === false) {
        return
    }

    if (tntEntity.matches({ families: ["tnt:tnt"] }) === false)
        return

    let isFlashing = false

    const toggleFlashing = system.runInterval(() => {
        try {
            const nextFlashingPropertyState = isFlashing ? false : true
            tntEntity.setProperty("tnt:is_flashing", nextFlashingPropertyState)
            isFlashing = !isFlashing
        }

        catch (e) {
            if (tntEntity.isValid === false) {
                system.clearRun(toggleFlashing)
            }
        }
    }, 5)
})