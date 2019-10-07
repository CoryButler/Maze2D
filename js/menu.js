function Menu () {
    const body = document.getElementsByTagName("body")[0];
    const form = document.createElement("form");
    const header = document.createElement("h1");
    const checkbox = document.createElement("input");
    const label = document.createElement("label");
    const newGame = document.createElement("button");
    const cancel = document.createElement("button");

    header.style = "text-align: center; padding: 0px 20px";
    header.innerHTML = "Maze Options";

    checkbox.type = "checkbox";
    checkbox.id = "animateMazeCreation";
    checkbox.checked = true;

    label.for = checkbox.id;
    label.innerHTML = "Animate maze creation";

    newGame.onclick = () => { closeMenu(); game.start(); }
    newGame.innerHTML = "New Game";

    cancel.style = "float: right";
    cancel.onclick = () => { closeMenu(); }
    cancel.innerHTML = "Cancel";

    form.appendChild(header);
    
    for (let prop in aiTypes) { new PlayerButton(prop, form); }

    form.appendChild(checkbox);
    form.appendChild(label);
    form.appendChild(document.createElement("br"));
    form.appendChild(document.createElement("br"));
    form.appendChild(newGame);
    form.appendChild(cancel);
    body.appendChild(form);

    const closeMenu = () =>  {
        body.removeChild(form);
    }
}