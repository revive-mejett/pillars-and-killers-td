import { GameState } from "../core/GameState.js"
import { HealthBarManager } from "../managers/HealthBarManager.js"
import { UIManager } from "../managers/UIManager.js"
import { WaveManager } from "../managers/WaveManager.js"
import { TdMap } from "../objects/TdMap.js"
import { HUD } from "../UI/HUD.js"
import { EventDispatcher } from "../utils/EventDispatcher.js"

const eventDispatcher = new EventDispatcher()
export class GameplayScene {

    constructor(app) {
        this.app = app
        this.container = new PIXI.Container()
        this.tdMap = new TdMap(1000, 1000, 25)
        this.gamestate = new GameState()
        this.hud = new HUD(this.gamestate)
        this.waveManager = new WaveManager(this.tdMap)
        this.setUpHUD()
        this.uiManager = new UIManager(this.app, this.gamestate, this, this.hud)
        this.gamestate.linkUiManager(this.uiManager)

        this.enemiesPresent = []
        this.projectilesPresent = []
        this.towersPresent = []

        this.healthBarManager = new HealthBarManager()

        eventDispatcher.on("enemySpawn", this.addEnemyToPresent.bind(this))
        eventDispatcher.on("enemyDied", this.updateEnemiesPresentList.bind(this))

        eventDispatcher.on("projectileSpawn", this.addProjectileToPresent.bind(this))
        eventDispatcher.on("projectileImpact", this.updateProjectilesPresent.bind(this))

        eventDispatcher.on("towerPlaced", this.addTowerToPresent.bind(this))
        eventDispatcher.on("towerSold", this.updateTowersPresent.bind(this))

        this.app.ticker.add(() => this.update())

    }

    buildMap() {
        this.tdMap.displayTiles(this.container)
        this.tdMap.displayPath(this.container)
        this.tdMap.repaveGrass()
    }

    setUpHUD() {
        this.hud.setup(this.container)
    }

    update() {
        // console.log(new PIXI.interaction.InteractionManager())
        console.log(this.projectilesPresent);


        this.enemiesPresent.forEach(enemy => {

            enemy?.updateMovement(this.tdMap, this.app.ticker.deltaTime)

        })

        this.towersPresent.forEach(tower => {
            if (this.enemiesPresent.length > 0) {
                if (!tower.targetedEnemy) {
                    tower.findEnemy(this.enemiesPresent)
                }
            }
        })

        this.projectilesPresent.forEach(projectile => {
            if (!projectile.hasHit) {
                projectile.flyBullet(this.app.ticker.deltaTime)
            }
        })
        this.healthBarManager.updateAllHealthBars(this.container)
    }

    updateEnemiesPresentList() {
        this.enemiesPresent = this.enemiesPresent.filter(enemy => enemy.isAlive)
    }

    updateProjectilesPresent() {
        this.projectilesPresent = this.projectilesPresent.filter(projectile => !projectile.hasHit)
    }

    addEnemyToPresent(enemy) {
        this.enemiesPresent.push(enemy)
    }

    addProjectileToPresent(projectile) {
        this.projectilesPresent.push(projectile)
    }

    addTowerToPresent(tower) {
        this.towersPresent.push(tower)
    }

    updateTowersPresent() {
        this.towersPresent = this.towersPresent.filter(tower => !tower.isSold)
    }
}