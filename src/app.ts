import { Game } from "./core/Game";




window.onload = async () => {
    const game = new Game()
    await game.start()
}



