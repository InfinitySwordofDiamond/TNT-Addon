import { world, system } from "@minecraft/server"
import { CraterGenerator } from "render/explosion"

system.beforeEvents.watchdogTerminate.subscribe(eventData => { eventData.cancel = true })

world.beforeEvents.explosion.subscribe((eventData) => {
    const { source: tnt2 } = eventData

    if (tnt2.typeId !== "tnt:tnt2")
        return

    eventData.cancel = true

    const craterExplosion2 = new CraterGenerator(tnt2, 40, { ...tnt2.location })
    craterExplosion2.startCraterGeneration()
})