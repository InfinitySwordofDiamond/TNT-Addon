import { world, system } from "@minecraft/server"
import { CraterGenerator } from "render/explosion"

system.beforeEvents.watchdogTerminate.subscribe(eventData => { eventData.cancel = true })

world.beforeEvents.explosion.subscribe((eventData) => {
    const { source: tnt7 } = eventData

    if (tnt7.typeId !== "tnt:tnt7")
        return

    eventData.cancel = true

    const craterExplosion7 = new CraterGenerator(tnt7, 1280, { ...tnt7.location })
    craterExplosion7.startCraterGeneration()
})