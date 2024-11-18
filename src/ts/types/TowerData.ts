import { TowerInfo } from "../interfaces/TowerInfo"
import { TowerStats } from "../interfaces/TowerStats"

type TowerData<S extends TowerStats = TowerStats, I extends TowerInfo = TowerInfo> = {
    towerStats : S
    towerInfo: I,
    upgrades: S[]
    visualUpgrades: I[]
}

export default TowerData
