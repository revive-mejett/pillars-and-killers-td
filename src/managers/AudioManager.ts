import sound from "pixi-sound"



export class AudioManager {

    static instance: AudioManager

    constructor() {
        //singleton
        if (AudioManager.instance) {
            return AudioManager.instance
        }
        AudioManager.instance = this
    }

    //general play sound method
    playSound(path : string, volume: number, speed?: number) {
        const sfx = sound.Sound.from({
            url: path,
            volume: volume,
            speed: speed || 1
        })
        sfx.play()
    }

    //tower/pillar specific sounds
    playBuySound() {
        const sfxBuy = sound.Sound.from({
            url: "assets/sounds/sfx/tower_buy.mp3",
            volume: 0.5
        })
        sfxBuy.play()
        const sfxBuild = sound.Sound.from({
            url: "assets/sounds/sfx/pillar_build.mp3",
            volume: 0.25
        })
        sfxBuild.play()
    }



    playIceBeamSound() {
        const sfxIceBeamFire = sound.Sound.from({
            url: "assets/sounds/sfx/ice_beam.mp3",
            volume: 0.4
        })
        sfxIceBeamFire.play()
    }

    //enemy sounds
    playArmourSound() {
        const soundUrlPaths = ["assets/sounds/sfx/armour_clank1.mp3","assets/sounds/sfx/armour_clank2.mp3","assets/sounds/sfx/armour_clank3.mp3"]
        const sfxEnemyArmour = sound.Sound.from({
            url: soundUrlPaths[Math.floor(Math.random() * soundUrlPaths.length)],
            volume: 0.25
        })
        sfxEnemyArmour.play()
    }

    playKilledSound() {
        const sfxEnemyDied = sound.Sound.from({
            url: "assets/sounds/sfx/killerKilled1.mp3",
            volume: 0.25
        })
        sfxEnemyDied.play()
    }


}