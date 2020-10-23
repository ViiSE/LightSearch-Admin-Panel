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

import React, {Component, createRef} from "react";
import {TabMenu} from "primereact/tabmenu";
import {DataTableClients} from "./DataTableClients";
import {HashRouter as Router, Route} from "react-router-dom";
import {DataTableBlacklist} from "./DataTableBlacklist";
import {SettingsView} from "./SettingsView";
import {DataTableLogs} from "./DataTableLogs";
import i18n from "i18next";
import {getLanguage} from "../utils/Translate";
import "./LSTabMenu.css";
import {getCookie, setCookie} from "../utils/CookiesUtils";

class LSTabMenuInner extends Component {

    menus = [ {
        label: i18n.t("clients"),
        keyLabel: "clients",
        icon: "pi pi-fw pi-users",
        path: "/clients",
        command: () => { window.location.hash = "/clients" }
    }, {
        label: i18n.t("blacklist"),
        keyLabel: "blacklist",
        icon: "pi pi-fw pi-ban",
        path: "/blacklist",
        command: () => { window.location.hash = "/blacklist" }
    }, {
        // label: "Devices",
        // icon: "pi pi-fw pi-mobile",
        // command: () => { window.location.hash = "/devices"}
        // }, {
        label: i18n.t("logs"),
        keyLabel: "logs",
        icon: "pi pi-fw pi-desktop",
        path: "/logs",
        command: () => { window.location.hash = "/logs" }
    }, {
        label: i18n.t("settings"),
        keyLabel: "settings",
        icon: "pi pi-fw pi-cog",
        path: "/settings",
        command: () => { window.location.hash = "/settings" }
    }];

    constructor(props) {
        super(props);
        this.refresh = this.refresh.bind(this);
        this.tabRef = createRef();

        let tabMenu = this.menus[0];
        if(getCookie("tabKeyLabel") !== undefined) {
            let tabKeyLabel = getCookie("tabKeyLabel");
            tabMenu = this.menus.find((e, i, a) => {
                if(e.keyLabel === tabKeyLabel)
                    return e;
                else
                    return false;
            });
        }

        this.state = {
            activeItem: tabMenu,
            tabName: i18n.t(tabMenu.keyLabel)
        }

    }

    refresh() {
        this.forceUpdate();
        this.menus.forEach(menu => { menu.label = i18n.t(menu.keyLabel) });
        this.setState({
            tabName: i18n.t(this.state.activeItem.keyLabel)
        });
    }

    setActiveIndex(path) {
        let _activeItem = this.menus.filter(menu => { return menu.path === path; });

        this.setState({
            activeItem: _activeItem[0],
            tabName: i18n.t(_activeItem[0].keyLabel)
        });
    }

    render() {
        return (
            <>
                <span id="tabName" style={{fontSize: "3rem"}}>{this.state.tabName}</span>
                <TabMenu id="lsTabMenu" ref={this.tabRef}
                         onTabChange={(e) => {
                             setCookie("tabKeyLabel", e.value.keyLabel);
                             setCookie("hashLink", e.value.path);
                             this.setState({activeItem: e.value}) }
                         }
                         activeItem={this.state.activeItem} model={this.menus} />
            </>);
    }
}

export class LSTabMenu extends Component {

    constructor(props) {
        super(props);
        this.lsTabRef = React.createRef();
        this.refresh = this.refresh.bind(this);
    }

    refresh() {
        this.lsTabRef.current.refresh();
    }

    setActiveIndex(path) {
        this.lsTabRef.current.setActiveIndex(path);
    }

    render() {
        return (
            <Router>
                <LSTabMenuInner ref={this.lsTabRef}/>
                <Route key="/clients" exact path="/clients" component={() => <DataTableClients/>}/>
                <Route key="/blacklist" exact path="/blacklist" component={() => <DataTableBlacklist/>}/>
                {/*<Route key="/devices" exact path="/devices"/>*/}
                <Route key="/logs" exact path="/logs" component={() => <DataTableLogs lang={getLanguage()}/>}/>
                <Route key="/settings" exact path="/settings"
                       component={() => <SettingsView refresh={this.refresh} lang={getLanguage()}/>}/>
            </Router>
        );
    }
}