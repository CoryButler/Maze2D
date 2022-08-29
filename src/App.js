import React from "react";
import Settings from "./settings";
import Header from "./components/Header";
import Menu from "./components/Menu";
import Hud from "./components/Hud";
import Maze from "./components/Maze";
import Footer from "./components/Footer";

export default function App() {
    const [settings, setSettings] = React.useState(Settings);

    function setAnimate(arg) {
        setSettings(prev => {
            return { ...prev, animate: !prev.animate };
        });
    }

    function setHeight(arg) {
        setSettings(prev => {
            return { ...prev, height: arg };
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
        setSettings(prev => {
            return { ...prev, seed: arg };
        });
    }

    function setUseSeed(arg) {
        setSettings(prev => {
            return { ...prev, useSeed: !prev.useSeed };
        });
    }

    function setWidth(arg) {
        setSettings(prev => {
            return { ...prev, width: arg };
        });
    }

    return (
        <>
            <Header settings={settings} />
            <Menu settings={settings} setAnimate={setAnimate} setPlayers={setPlayers} setUseSeed={setUseSeed} />
            <Hud settings={settings} />
            <Maze settings={settings} />
            <Footer />
        </>
    );
}