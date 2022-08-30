import { aiTypes, aiSpeeds, maxSeed } from "./global.js";

export default {
    isPaused: false,
    width: 10,
    height: 10,
    animate: true,
    useSeed: false,
    seed: Math.round(Math.random() * maxSeed),
    players: [
        { type: aiTypes[0], color: "green", controls: "W A S D (Q)", isChecked: true },
        { type: aiTypes[1], color: "pink", controls: "🡡 🡠 🡣 🡢 (Enter)", isChecked: false },
        { type: aiTypes[2], color: "red", speed: aiSpeeds.filter(a => a.name === "Normal")[0], isChecked: false },
        { type: aiTypes[3], color: "orange", speed: aiSpeeds.filter(a => a.name === "Normal")[0], isChecked: false },
        { type: aiTypes[4], color: "blue", speed: aiSpeeds.filter(a => a.name === "Normal")[0], isChecked: false },
        { type: aiTypes[5], color: "purple", speed: aiSpeeds.filter(a => a.name === "Normal")[0], isChecked: false },
        { type: aiTypes[6], color: "yellow", speed: aiSpeeds.filter(a => a.name === "Normal")[0], isChecked: false },
        { type: aiTypes[7], color: "red", speed: aiSpeeds.filter(a => a.name === "Normal")[0], isChecked: false }
    ]
}