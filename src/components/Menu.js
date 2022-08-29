export default function Menu(props) {
    let key = 0;
    const playerSettings = props.settings.players.map((p, i) => {
        return (
            <>
                <input key={key++} type="checkbox" checked={p.isChecked} onChange={() => props.setPlayers(p)} />
                <p key={key++}>{p.type}</p>
                { p.controls && <p key={key++}>p.controls</p> }
                { p.speed && <p key={key++}>p.speed</p> }
                <p key={key++}>{p.color}</p>
                { i < props.settings.players.length - 1 && <div key={key++} className="settings--separator grid-span-four"></div> }
            </>
        );
    });

    const mazeSettings = (
        <>
            <p className="grid-left-align">Width (in cells)</p>
            <p className="grid-right-align">10</p>
            <div className="settings--separator grid-span-two"></div>
            <p className="grid-left-align">Height (in cells)</p>
            <p className="grid-right-align">10</p>
            <div className="settings--separator grid-span-two"></div>
            <p className="grid-left-align">Use Seed</p>
            <input type="checkbox" checked={props.settings.useSeed} className="grid-right-align" onChange={props.setUseSeed} />
            <div className="settings--separator grid-span-two"></div>
            <p className="grid-left-align">Seed</p>
            <p className="grid-right-align">81726354</p>
            <div className="settings--separator grid-span-two"></div>
            <p className="grid-left-align">Animate Creation</p>
            <input type="checkbox" checked={props.settings.animate} className="grid-right-align" onChange={props.setAnimate} />
        </>
    );

    return (
        <div className="flex-center">
            <div className="menu">
                <div className="menu--title">Settings</div>
                <div className="menu--settings-container">
                    <div className="settings grid-temp-four">
                        {playerSettings}
                    </div>
                    <div className="flex-column">
                        <div className="settings grid-temp-two">
                            {mazeSettings}
                        </div>
                        <div className="menu--buttons-container">
                            { props.settings.seed >= 0 && <div className="btn btn-cancel">Cancel</div> }
                            <div className="btn btn-new">New Game</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}