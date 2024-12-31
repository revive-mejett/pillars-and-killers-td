import { Howl } from "howler";
import { SettingsManager } from "./SettingsManager";

const settingsManager = new SettingsManager()

export class AudioManager {

    static instance: AudioManager
    bgmMusic: Howl[] | undefined = []
    currentMusicIndex = 0


    constructor() {
        //singleton
        if (AudioManager.instance) {
            return AudioManager.instance
        }
        AudioManager.instance = this
        this.bgmMusic!.push(new Howl({
            src: "assets/sounds/sfx/tree_leaves.mp3",
            volume: 0.25,
            loop: false
        }))
        this.bgmMusic!.push(new Howl({
            src: "assets/sounds/sfx/stone_throw.mp3",
            volume: 0.5,
            loop: false
        }))
        this.bgmMusic!.push(new Howl({
            src: "assets/sounds/sfx/tower_buy.mp3",
            volume: 0.3,
            loop: false
        }))

    }

    //general play sound method
    playSound(path : string, volume: number, speed?: number) {
        if (!settingsManager.useAudio) {
            return
        }

        let rate = 1
        if (speed) {
            rate = speed
        }

        const sfx = new Howl({
            src: path,
            volume: volume * settingsManager.sfxVolumeMultiplier,
            rate: rate > 0.4 ? speed : 0.4,
            onend: () => {
                sfx.unload()
            }
        })
        sfx.play()
    }

    playSoundLimited(numberSources: number, maxSources: number, odds: number, path : string, volume?: number, speed?: number) {
        const oddsMultiplier = 1 + Math.floor(1 * Math.sqrt(numberSources))
        const rng = Math.floor(Math.random() * (odds - maxSources) * oddsMultiplier)

        if (numberSources <= maxSources || rng <= Math.floor(Math.sqrt(odds))) {
            this.playSound(path, volume || 1, speed || 1)

        }
    }

    //tower/pillar specific sounds
    playBuySound() {
        this.playSound("assets/sounds/sfx/tower_buy.mp3", 0.5)
        this.playSound("assets/sounds/sfx/pillar_build.mp3", 0.25)
    }



    playIceBeamSound() {
        if (settingsManager.useAudio) {
            return
        }
        this.playSound("assets/sounds/sfx/ice_beam.mp3", 0.4)
    }

    //enemy sounds
    playArmourSound() {
        const soundUrlPaths = ["assets/sounds/sfx/armour_clank1.mp3","assets/sounds/sfx/armour_clank2.mp3","assets/sounds/sfx/armour_clank3.mp3"]
        this.playSound(soundUrlPaths[Math.floor(Math.random() * soundUrlPaths.length)], 0.25)
    }

    playKilledSound() {
        this.playSound("assets/sounds/sfx/killerKilled1.mp3", 0.25)
    }

    playbackgroundMusic(initial: boolean) {
        if (!this.bgmMusic || !settingsManager.useMusic) {
            return
        }

        if (initial) {
            this.currentMusicIndex = Math.floor(Math.random() * this.bgmMusic!.length)
        }

        this.bgmMusic[this.currentMusicIndex ].play()
        this.bgmMusic[this.currentMusicIndex ].once("end", () => {
            console.log("called callback")
            this.currentMusicIndex  = this.currentMusicIndex  === this.bgmMusic!.length - 1 ? 0 : this.currentMusicIndex  + 1
            this.playbackgroundMusic(false)
        })
    }

    stopbackgroundMusic() {
        if (!settingsManager.useMusic) {
            return
        }
        if (!this.bgmMusic) {
            return
        }

        this.bgmMusic.forEach(music => {
            music.stop()
        })
    }



}