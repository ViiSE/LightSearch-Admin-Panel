/*
 *    Copyright 2020 ViiSE
 *
 *    Licensed under the Apache License, Version 2.0 (the "License");
 *    you may not use this file except in compliance with the License.
 *    You may obtain a copy of the License at
 *
 *        http://www.apache.org/licenses/LICENSE-2.0
 *
 *    Unless required by applicable law or agreed to in writing, software
 *    distributed under the License is distributed on an "AS IS" BASIS,
 *    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *    See the License for the specific language governing permissions and
 *    limitations under the License.
 */

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
