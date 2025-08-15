import { world, system } from "@minecraft/server"
import { CraterGenerator } from "render/explosion"

system.beforeEvents.watchdogTerminate.subscribe(eventData => { eventData.cancel = true })

world.beforeEvents.explosion.subscribe((eventData) => {
    const { source: tnt4 } = eventData

    if (tnt4.typeId !== "tnt:tnt4")
        return

    eventData.cancel = true

    const craterExplosion4 = new CraterGenerator(tnt4, 160, { ...tnt4.location })
    craterExplosion4.startCraterGeneration()
})