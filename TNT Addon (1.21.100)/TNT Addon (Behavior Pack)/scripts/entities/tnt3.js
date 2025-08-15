import { world, system } from "@minecraft/server"
import { CraterGenerator } from "render/explosion"

system.beforeEvents.watchdogTerminate.subscribe(eventData => { eventData.cancel = true })

world.beforeEvents.explosion.subscribe((eventData) => {
    const { source: tnt3 } = eventData

    if (tnt3.typeId !== "tnt:tnt3")
        return

    eventData.cancel = true

    const craterExplosion3 = new CraterGenerator(tnt3, 80, { ...tnt3.location })
    craterExplosion3.startCraterGeneration()
})