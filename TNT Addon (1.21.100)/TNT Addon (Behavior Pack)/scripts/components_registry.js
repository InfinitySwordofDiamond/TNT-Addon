import { system } from "@minecraft/server"
import { BlockTntComponent } from "exports"

system.beforeEvents.startup.subscribe((initEvent) => {
    initEvent.blockComponentRegistry.registerCustomComponent("tnt:components", new BlockTntComponent())
})