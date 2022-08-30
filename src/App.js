import React from "react";
import Settings from "./settings";
import Header from "./components/Header";
import Menu from "./components/Menu";
import Hud from "./components/Hud";
import Maze from "./components/Maze";
import Footer from "./components/Footer";
import { maxCell, maxSeed } from "./global";

export default function App() {
    const [settings, setSettings] = React.useState(Settings);

    function setAnimate(arg) {
        setSettings(prev => {
            return { ...prev, animate: !prev.animate };
        });
    }

    function setHeight(arg) {
        if (arg.target.value < 2 || arg.target.value > maxCell) return;
        setSettings(prev => {
            return { ...prev, height: arg.target.value };
        });
    }

    function setPlayers(arg) {
        setSettings(prev => { 
            return ({
                ...prev,
                players: [...prev.players].map(p => {
                    return p.type === arg.type ? {...p, isChecked: !p.isChecked } : {...p};
                })
            });
        });
    }

    function setSeed(arg) {
        if (arg.target.value < 0 || arg.target.value > maxSeed) return;
        setSettings(prev => {
            return { ...prev, seed: arg.target.value };
        });
    }

    function setUseSeed(arg) {
        setSettings(prev => {
            return { ...prev, useSeed: !prev.useSeed };
        });
    }

    function setWidth(arg) {
        if (arg.target.value < 2 || arg.target.value > maxCell) return;
        setSettings(prev => {
            return { ...prev, width: arg.target.value };
        });
    }

    return (
        <>
            <Header settings={settings} />
            <Menu settings={settings} setAnimate={setAnimate} setHeight={setHeight} setPlayers={setPlayers} setSeed={setSeed} setUseSeed={setUseSeed} setWidth={setWidth} />
            <Hud settings={settings} />
            <Maze settings={settings} />
            <Footer />
        </>
    );
}