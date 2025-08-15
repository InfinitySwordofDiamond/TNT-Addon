import { world, system } from "@minecraft/server"
import { CraterGenerator } from "render/explosion"

system.beforeEvents.watchdogTerminate.subscribe(eventData => { eventData.cancel = true })

world.beforeEvents.explosion.subscribe((eventData) => {
    const { source: tnt6 } = eventData

    if (tnt6.typeId !== "tnt:tnt6")
        return

    eventData.cancel = true

    const craterExplosion6 = new CraterGenerator(tnt6, 640, { ...tnt6.location })
    craterExplosion6.startCraterGeneration()
})