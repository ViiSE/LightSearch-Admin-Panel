import React from 'react';
import './App.css';
import ls_logo from '../static/ls_logo_big.png'
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import {LSTabMenu} from "./LSTabMenu";
import {getLanguage, initLanguage} from "../utils/Translate";
import {SidebarButton} from "./SidebarButton";
import {getCookie} from "../utils/CookiesUtils";

const lang = getLanguage();
initLanguage(lang);

let hashLink = getCookie("hashLink");
if(hashLink !==undefined )
    window.location.hash = hashLink;
else
    window.location.hash = "clients";

function App() {
    let tabMenuRef = React.createRef();
    return (
        <div className="App">
            <SidebarButton tabMenuRef={tabMenuRef}/>
            <div style={{margin: "1em"}}>
                <img src={ls_logo} alt="logo" width="150" height="150"/>
            </div>
            <div className="p-card" style={{padding: "0.5em", borderRadius: "3px"}}>
                <LSTabMenu ref={tabMenuRef}/>
            </div>
        </div>
    );
}

export default App;
