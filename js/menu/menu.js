function Menu (settings) {
    const body = document.getElementsByTagName("body")[0];
    const form = document.createElement("form");
    const header = document.createElement("h1");
    const newGame = document.createElement("button");
    const cancel = document.createElement("button");
    const playerSettings = document.createElement("div");

    header.style = "text-align: center; padding: 0px; width: 100%; background-color: grey; color: white";
    header.innerHTML = "Maze Settings";

    playerSettings.style = "border: 1px solid grey; border-radius: 4px; padding: 16px 0px 0px 8px; float: left; margin-right: 8px";

    newGame.onclick = () => {
        if (!playerButtons.some(pb => pb.isChecked()))  return;
        updateSettings();
        closeMenu();
        new Game(settings);
    }
    newGame.innerHTML = "New Game";

    cancel.style = "float: right";
    cancel.onclick = () => { closeMenu(); }
    cancel.innerHTML = "Cancel";

    form.appendChild(header);
    
    let playerButtons = [];
    settings.players.forEach(player => { playerButtons.push(new PlayerButton(player, playerSettings)); });

    form.appendChild(playerSettings);
    let mazeSettings = new Menu_MazeSettings(form, settings);
    form.appendChild(document.createElement("br"));
    form.appendChild(document.createElement("br"));
    form.appendChild(newGame);
    if (document.getElementsByTagName("canvas").length > 0) form.appendChild(cancel);
    body.appendChild(form);

    const closeMenu = () =>  {
        body.removeChild(form);
    }

    const updateSettings = () => {
        settings.width = mazeSettings.width();
        settings.height = mazeSettings.height();
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
    }
}