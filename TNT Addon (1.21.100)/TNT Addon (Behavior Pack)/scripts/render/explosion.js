import { system, BlockVolume } from "@minecraft/server"

export class CraterGenerator {
    constructor(entity, radius, center, calculationSpeed = 2000, fillBlock = "minecraft:air") {
        this.entity = entity
        this.radius = radius
        this.center = center
        this.calculationSpeed = calculationSpeed
        this.fillBlock = fillBlock
        this.dimension = entity.dimension
        this.radiusSquared = radius ** 2
        this.radiusSquaredInner = (radius - 1) ** 2
        this.tickingAreaCount = 0
        this.x = this.z = -radius
        this.unbreakableBlocks = [
            "minecraft:bedrock",
            "minecraft:command_block",
            "minecraft:repeating_command_block",
            "minecraft:chain_command_block",
            "minecraft:barrier",
            "minecraft:structure_block",
            "minecraft:jigsaw",
            "minecraft:invisible_bedrock"
        ]
    }

    waitTicks(ticks) {
        return new Promise(resolve => system.runTimeout(resolve, ticks))
    }

    async fillCrater(cx, cz, cy, yStart, yEnd) {
        while (true) {
            try {
                this.dimension.fillBlocks(
                    new BlockVolume({ x: cx, y: yStart, z: cz }, { x: cx, y: yEnd, z: cz }),
                    this.fillBlock,
                    {
                        blockFilter: {
                            excludeTypes: this.unbreakableBlocks,
                            ignoreChunkBoundErrors: true,
                        }
                    }
                )
                return
            }

            catch (e) {
                this.dimension.runCommand(`tickingarea add ${cx} ${cy} ${cz - 384} ${cx + 16} ${cy} ${cz + 384} CraterTickingZone${this.tickingAreaCount}`)
                this.tickingAreaCount++

                if (this.tickingAreaCount > 9) {
                    this.dimension.runCommand(`tickingarea remove_all`)
                    this.tickingAreaCount = 0
                }

                await this.waitTicks(1000)
            }
        }
    }

    async calculateCrater(distanceSquared, craterEdge) {
        const yRangeOuter = Math.sqrt(Math.max(this.radiusSquared - distanceSquared, 0))
        const cx = Math.floor(this.center.x + this.x)
        const cz = Math.floor(this.center.z + this.z)
        const cy = Math.floor(this.center.y)

        let yMinOuter = Math.floor(cy - yRangeOuter)
        let yMaxOuter = Math.floor(cy + yRangeOuter)

        const { min: worldMinY, max: worldMaxY } = this.dimension.heightRange

        if (yMinOuter < worldMinY) yMinOuter = worldMinY
        if (yMaxOuter >= worldMaxY) yMaxOuter = worldMaxY - 1

        if (!craterEdge) {
            const yRange = Math.sqrt(Math.max(this.radiusSquaredInner - distanceSquared, 0))
            let yMin = Math.floor(cy - yRange)
            let yMax = Math.floor(cy + yRange)

            if (yMin < worldMinY) yMin = worldMinY
            if (yMax >= worldMaxY) yMax = worldMaxY - 1

            await this.fillCrater(cx, cz, cy, yMin, yMax)

            try {
                const fillAbove = yMaxOuter > yMax
                const fillBelow = yMinOuter < yMin

                if (fillAbove || fillBelow) {
                    const yStart = fillBelow ? yMinOuter : yMax + 1
                    const yEnd = fillAbove ? yMaxOuter : yMin - 1

                    for (let y = yStart; y <= yEnd; y++) {
                        if (y >= yMin && y <= yMax) continue
                        if (Math.random() >= 0.5) continue
                        await this.fillCrater(cx, cz, cy, y, y)
                    }
                }
            }
            catch (e) {}
        }

        else {
            try {
                for (let y = yMinOuter; y <= yMaxOuter; y++) {
                    if (Math.random() >= 0.5) continue
                    await this.fillCrater(cx, cz, cy, y, y)
                }
            }
            catch (e) {}
        }
    }

    startCraterGeneration() {
        const craterRun = system.runInterval(async () => {
            if (!this.center || this.x === undefined) return
            let count = 0

            while (count < this.calculationSpeed) {
                const distanceSquared = this.x ** 2 + this.z ** 2

                if (distanceSquared <= this.radiusSquaredInner) {
                    await this.calculateCrater(distanceSquared, false)
                }
                
                else if (distanceSquared <= this.radiusSquared) {
                    await this.calculateCrater(distanceSquared, true)
                }

                this.z++

                if (this.z > this.radius) {
                    this.dimension.playSound("ambient.weather.thunder", this.center, {volume: this.radius})
                    this.z = -(this.radius)
                    this.x++

                    if (this.x > this.radius) {
                        system.clearRun(craterRun)
                        this.dimension.runCommand(`tickingarea remove_all`)
                        this.dimension.playSound("random.explode", this.center, {volume: this.radius, pitch: 0.75})

                        for (let i = 0; i < this.radius * 2; i++) {
                            const offset = {
                                x: this.center.x + ((Math.random() - 0.5) * (this.radius / 2)),
                                y: this.center.y + ((Math.random() - 0.5) * (this.radius / 2)),
                                z: this.center.z + ((Math.random() - 0.5) * (this.radius / 2))
                            }

                            try {
                                this.dimension.spawnParticle("minecraft:large_explosion", offset)
                            }

                            catch (e) {}
                        }

                        this.entity = this.center = this.x = this.z = undefined
                        return
                    }
                }
                count++
            }
        })
    }
}