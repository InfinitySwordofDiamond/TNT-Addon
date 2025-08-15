import { world, system } from "@minecraft/server"
import { CraterGenerator } from "render/explosion"

system.beforeEvents.watchdogTerminate.subscribe(eventData => { eventData.cancel = true })

world.beforeEvents.explosion.subscribe((eventData) => {
    const { source: tnt1 } = eventData

    if (tnt1.typeId !== "tnt:tnt1")
        return

    eventData.cancel = true

    const craterExplosion1 = new CraterGenerator(tnt1, 20, { ...tnt1.location })
    craterExplosion1.startCraterGeneration()
})