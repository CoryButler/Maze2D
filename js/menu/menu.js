import PlayerButton from "./playerButton.js";
import Menu_MazeSettings from "./menu_mazeSettings.js";
import { isPaused } from "../enums.js"

export default function Menu (settings, startGame) {
    const body = document.getElementsByTagName("body")[0];
    const form = document.createElement("div");
    const header = document.createElement("h1");
    const newGame = document.createElement("button");
    const cancel = document.createElement("button");
    const playerSettings = document.createElement("div");
    const settingsButton = document.createElement("button");
    const seedNotice = document.createElement("p");

    form.id = "menu";

    header.style = "text-align: center; padding: 0px; width: 100%; background-color: grey; color: white";
    header.innerHTML = "Settings";

    playerSettings.style = "border: 1px solid grey; border-radius: 4px; padding: 16px 0px 0px 8px; float: left; margin-right: 8px";

    newGame.onclick = () => {
        if (!playerButtons.some(pb => pb.isChecked())) return;
        updateSettings();
        closeMenu();
        startGame();
    }
    newGame.innerHTML = "New Game";

    cancel.style = "float: right";
    cancel.onclick = () => { closeMenu(); }
    cancel.innerHTML = "Cancel";
    cancel.style.display = "none";

    settingsButton.innerHTML = "Settings";
    settingsButton.style.display = "none";
    settingsButton.onclick = () => { openMenu(); }

    seedNotice.style.fontSize = "0.8em";

    form.appendChild(header);
    
    let playerButtons = [];
    settings.players.forEach(player => { playerButtons.push(new PlayerButton(player, playerSettings)); });

    form.appendChild(playerSettings);
    let mazeSettings = new Menu_MazeSettings(form, settings);
    form.appendChild(document.createElement("br"));
    form.appendChild(document.createElement("br"));
    form.appendChild(newGame);
    form.appendChild(cancel);
    if (document.getElementsByTagName("canvas").length > 0) form.appendChild(cancel);
    body.appendChild(form);
    body.appendChild(settingsButton);
    body.appendChild(document.createElement("br"));
    body.appendChild(seedNotice);

    const openMenu = () => {
        isPaused(true);
        cancel.style.display = "unset";
        form.style.display = "unset";
        settingsButton.style.display = "none";
        seedNotice.style.display = "none";

        let c = document.getElementsByTagName("canvas");
        for (let i = 0; i < c.length; i++) c[i].style.display = "none";
    }

    const closeMenu = () =>  {
        isPaused(false);
        seedNotice.innerHTML = `Current ${settings.useSeed ? "" : "Random "}Seed: ${settings.seed}`
        form.style.display = "none";
        settingsButton.style.display = "unset";
        seedNotice.style.display = "unset";
        
        let c = document.getElementsByTagName("canvas");
        for (let i = 0; i < c.length; i++) c[i].style.display = "unset";
    }

    const updateSettings = () => {
        settings.width = mazeSettings.width();
        settings.height = mazeSettings.height();
        settings.useSeed = mazeSettings.useSeed();
        settings.seed = settings.useSeed ? mazeSettings.seed() : Math.round(Math.random() * 2147483647);
        settings.animate = mazeSettings.animate();
        settings.players = [];
        playerButtons.forEach(pb => {
            settings.players.push(
                {
                    type: pb.type(),
                    color: pb.color(),
                    speed: pb.speed(),
                    isChecked: pb.isChecked()
                }
            );
        });
        mazeSettings.displayRandomSeed(settings.seed);
    }
}