import React from "react";
import { maxCell, maxSeed } from "./global";
import LayerManager from "./layerManager";
import Settings from "./settings";
import Header from "./components/Header";
import Menu from "./components/Menu";
import Maze from "./components/Maze";
import Footer from "./components/Footer";
import OpenMenuButton from "./components/OpenMenuButton";

export default function App() {
    const layerManager = new LayerManager();

    const [triggerMazeRender, setTriggerMazeRender] = React.useState(0);
    const [tempSettings, setTempSettings] = React.useState(Settings);
    const [settings, setSettings] = React.useState(tempSettings);

    function blurAll() {
        let el = document.createElement("input");
        document.body.appendChild(el);
        el.focus();
        document.body.removeChild(el);
    }

    function cancel() {
        const data = { ...tempSettings, isPaused: false };
        setTempSettings(data);
        setSettings(data);

    }

    function newGame() {
        let data = tempSettings.useSeed ? tempSettings : { ...tempSettings, seed: Math.round(Math.random() * maxSeed) };
        data = { ...data, isPaused: false };        
        setTempSettings(data);
        setSettings(data);
        setTriggerMazeRender(prev => (prev + 1) % 2);
    }

    function setAnimate() {
        setTempSettings(prev => {
            return { ...prev, animate: !prev.animate };
        });
    }

    function setHeight(arg) {
        if (arg.target.value < 2 || arg.target.value > maxCell) return;
        setTempSettings(prev => {
            return { ...prev, height: arg.target.value };
        });
    }

    function setPlayers(arg) {
        blurAll();
        setTempSettings(prev => { 
            return ({
                ...prev,
                players: [...prev.players].map(p => {
                    return p.type === arg.type ? arg : p;
                })
            });
        });
    }

    function setSeed(arg) {
        if (arg.target.value < 0 || arg.target.value > maxSeed) return;
        setTempSettings(prev => {
            return { ...prev, seed: arg.target.value };
        });
    }

    function setUseSeed() {
        setTempSettings(prev => {
            return { ...prev, useSeed: !prev.useSeed };
        });
    }

    function setWidth(arg) {
        if (arg.target.value < 2 || arg.target.value > maxCell) return;
        setTempSettings(prev => {
            return { ...prev, width: arg.target.value };
        });
    }

    function showMenu() {
        setTempSettings(prev => { return { ...prev, isActiveGame: true, isPaused: true }});
        setSettings(prev => { return { ...prev, isActiveGame: true, isPaused: true }});
    }

    return (
        <>
            <Header settings={settings} />
            <OpenMenuButton show={!settings.isPaused} onClick={showMenu} />
            <div style={{position: "relative", width: "100%"}}>
                <Menu settings={tempSettings} cancel={cancel} newGame={newGame} setAnimate={setAnimate} setHeight={setHeight} setPlayers={setPlayers} setSeed={setSeed} setUseSeed={setUseSeed} setWidth={setWidth} />
                <Maze settings={settings} shouldRender={triggerMazeRender}/>
            </div>
            <Footer />
        </>
    );
}