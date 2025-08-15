import { system } from "@minecraft/server"
import * as ALL_EXPORTS from "exports"

ALL_EXPORTS

system.beforeEvents.watchdogTerminate.subscribe(eventData => {eventData.cancel = true})