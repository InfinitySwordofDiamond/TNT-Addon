import { world, system } from "@minecraft/server"
import { CraterGenerator } from "render/explosion"

system.beforeEvents.watchdogTerminate.subscribe(eventData => { eventData.cancel = true })

world.beforeEvents.explosion.subscribe((eventData) => {
    const { source: tnt5 } = eventData

    if (tnt5.typeId !== "tnt:tnt5")
        return

    eventData.cancel = true

    const craterExplosion5 = new CraterGenerator(tnt5, 320, { ...tnt5.location })
    craterExplosion5.startCraterGeneration()
})