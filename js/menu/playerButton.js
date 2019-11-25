const playerColors = ['red', 'orange', 'yellow', 'green', 'blue', 'purple', 'pink'];

function PlayerButton (player, parent) {
    const selected = playerColors.indexOf(player.color);
    
    const div = document.createElement("div");
    const checkbox = document.createElement("input");
    const label = document.createElement("label");
    const dropdown = document.createElement("select");
    let isChecked = player.isChecked;
    let type = player.type;
    let speed = player.speed;
    let color = player.color;

    this.isChecked = () => { return isChecked; }
    this.type = () => { return type; }
    this.speed = () => { return speed; }
    this.color = () => { return color; }

    checkbox.type = "checkbox";
    checkbox.id = "checkbox_" + type;
    checkbox.checked = isChecked;
    checkbox.oninput = () => { isChecked = !isChecked; }

    dropdown.id = "select_" + type;
    dropdown.style = "margin: 0px 16px; float: right";

    label.for = dropdown.id;
    label.style = "font-size: 0.8em";
    for (let key in aiTypes) { if (aiTypes[key] === type) label.innerHTML = key; }

    for (let i = 0; i < playerColors.length; i++) {
        const option = document.createElement("option");
        option.value = playerColors[i];
        option.style = "background-color: " + playerColors[i].replace("green", "#00CC00").replace("pink", "#FF3399");
        option.innerHTML = playerColors[i];
        option.selected = selected === i;
        dropdown.appendChild(option);
    }

    dropdown.onchange = () => { color = dropdown.options[dropdown.selectedIndex].value; }

    div.appendChild(checkbox);
    div.appendChild(label);
    div.appendChild(dropdown);
    div.appendChild(document.createElement("br"));
    div.appendChild(document.createElement("br"));
    parent.appendChild(div);
}