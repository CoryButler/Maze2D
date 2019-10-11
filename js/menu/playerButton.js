const playerColors = ['red', 'orange', 'yellow', 'green', 'blue', 'purple', 'pink'];

function PlayerButton (aiType, parent) {
    const selected = Math.floor(Math.random() * playerColors.length);
    
    const div = document.createElement("div");
    const checkbox = document.createElement("input");
    const label = document.createElement("label");
    const dropdown = document.createElement("select");

    checkbox.type = "checkbox";
    checkbox.id = "checkbox_" + aiType;

    dropdown.id = "selct_" + aiType;
    dropdown.style = "margin: 0px 16px; float: right";

    label.for = dropdown.id;
    label.style = "font-size: 0.8em";
    label.innerHTML = aiType;

    for (let i = 0; i < playerColors.length; i++) {
        const option = document.createElement("option");
        option.value = playerColors[i];
        option.style = "background-color: " + playerColors[i].replace("green", "#00CC00").replace("pink", "#FF3399");
        option.innerHTML = playerColors[i];
        option.selected = selected === i;
        dropdown.appendChild(option);
    }

    div.appendChild(checkbox);
    div.appendChild(label);
    div.appendChild(dropdown);
    div.appendChild(document.createElement("br"));
    div.appendChild(document.createElement("br"));
    parent.appendChild(div);
}