export class SettingsManager {

    static instance: SettingsManager

    private _useAudio: boolean = true
    private _useMusic: boolean = true
    private _sfxVolumeMultiplier: number = 1
    private _musicVolumeMultiplier: number = 1


    constructor() {
        //singleton
        if (SettingsManager.instance) {
            return SettingsManager.instance
        }
        SettingsManager.instance = this
    }

    public get useAudio(): boolean {
        return this._useAudio
    }
    public set useAudio(value: boolean) {
        this._useAudio = value
    }

    public get useMusic(): boolean {
        return this._useMusic
    }
    public set useMusic(value: boolean) {
        this._useMusic = value
    }

    public get sfxVolumeMultiplier(): number {
        return this._sfxVolumeMultiplier
    }
    public set sfxVolumeMultiplier(value: number) {
        this._sfxVolumeMultiplier = value
    }

    public get musicVolumeMultiplier(): number {
        return this._musicVolumeMultiplier
    }
    public set musicVolumeMultiplier(value: number) {
        this._musicVolumeMultiplier = value
    }
}