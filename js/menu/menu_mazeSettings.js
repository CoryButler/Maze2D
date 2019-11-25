function Menu_MazeSettings (parent, settings) {
    const mazeSettings = document.createElement("div");
    const inputWidth = document.createElement("input");
    const inputHeight = document.createElement("input");
    const checkbox = document.createElement("input");
    const label_inputWidth = document.createElement("label");
    const label_inputHeight = document.createElement("label");
    const label_checkbox = document.createElement("label");

    mazeSettings.style = "border: 1px solid grey; border-radius: 4px; padding: 8px; float: right; margin-bottom: 8px";

    inputWidth.style =  "float: right; width: 64px; margin-left: 16px";
    inputHeight.style = "float: right; width: 64px; margin-left: 16px";

    inputWidth.value = settings.width;
    inputHeight.value = settings.height;

    label_inputWidth.for = inputWidth.id;
    label_inputWidth.innerHTML = "Width (in cells)";

    label_inputHeight.for = inputHeight.id;
    label_inputHeight.innerHTML = "Height (in cells)";

    label_checkbox.for = checkbox.id;
    label_checkbox.innerHTML = "Animate maze creation";

    checkbox.type = "checkbox";
    checkbox.id = "animateMazeCreation";
    checkbox.checked = settings.animate;

    mazeSettings.appendChild(label_inputWidth);
    mazeSettings.appendChild(inputWidth);
    mazeSettings.appendChild(document.createElement("br"));
    mazeSettings.appendChild(document.createElement("br"));
    mazeSettings.appendChild(label_inputHeight);
    mazeSettings.appendChild(inputHeight);
    mazeSettings.appendChild(document.createElement("br"));
    mazeSettings.appendChild(document.createElement("br"));
    mazeSettings.appendChild(label_checkbox);
    mazeSettings.appendChild(checkbox);
    parent.appendChild(mazeSettings);
}