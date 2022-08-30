import { aiSpeeds, aiTypes, playerColors } from "../global";

export default function Menu(props) {
    let key = 0;
    const playerSettings = props.settings.players.map((p, i) => {
        const select_colors = playerColors.map((c, j) => {
            return (
                <option key={j} value={c}>{c}</option>
            );
        });
        const select_aiSpeed = aiSpeeds.map((s, j) => {
            return (
                <option key={j} value={s.name}>{s.name}</option>
            );
        });
        return (
            <div className="flex-row four-item-row" key={key++}>
                <input key={key++} className="input-checkbox" type="checkbox" checked={p.isChecked} onChange={() => props.setPlayers(p)} />
                <p key={key++}>{p.type}</p>
                { p.controls && <p>{p.controls}</p> }
                { p.speed && <div className="custom-select">
                    <div className="custom-arrow">{">"}</div>
                    <select key={key++} name="s1" id="s2" defaultValue={p.speed.name}>{select_aiSpeed}</select>
                </div> }
                <div className="custom-select">
                    <div className="custom-arrow">{">"}</div>
                    <select key={key++} name="c1" id="c2" defaultValue={p.color}>{select_colors}</select>
                </div>
            </div>
        );
    });

    const mazeSettings = [
        <div key={key++} className="flex-row two-item-row">
            <p>Width (in cells)</p>
            <input className="input-number" pattern="[0-9]+" type="number" value={props.settings.width} onChange={props.setWidth} />
        </div>,
        <div key={key++} className="flex-row two-item-row">
            <p>Height (in cells)</p>
            <input className="input-number" pattern="[0-9]+" type="number" value={props.settings.height} onChange={props.setHeight} />
        </div>,
        <div key={key++} className="flex-row two-item-row">
            <p>Use Seed</p>
            <input className="input-checkbox" type="checkbox" checked={props.settings.useSeed} onChange={props.setUseSeed} />
        </div>,
        <div key={key++} className="flex-row two-item-row">
            <p>Seed</p>
            <input className="input-number" pattern="[0-9]+" type="number" value={props.settings.seed} onChange={props.setSeed} />
        </div>,
        <div key={key++} className="flex-row two-item-row">
            <p>Animate Creation</p>
            <input className="input-checkbox" type="checkbox" checked={props.settings.animate} onChange={props.setAnimate} />
        </div>
    ];

    return (
        <div className="flex-center">
            <div className="menu">
                <div className="menu--title">Settings</div>
                <div className="menu--settings-container">
                    <div className="settings">
                        {playerSettings}
                    </div>
                    <div className="flex-column">
                        <div className="settings">
                            {mazeSettings}
                        </div>
                        <div className="menu--buttons-container">
                            { props.settings.isPaused && <div className="btn btn-cancel">Cancel</div> }
                            <div className="btn btn-new">New Game</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}