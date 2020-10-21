import React, {Component} from "react";
import {Sidebar} from "primereact/sidebar";
import {Button} from "primereact/button";
import i18n from "i18next";
import ls_logo from '../static/ls_logo_svg.svg'
import {setCookie} from "../utils/CookiesUtils";

export class MainSidebar extends Component {

    constructor(props) {
        super(props);

        this.changeRoute = this.changeRoute.bind(this);
        this.refresh = this.refresh.bind(this);
    }

    changeRoute(path) {
        setCookie("tabKeyLabel", path.substr(1));
        setCookie("hashLink", path);
        window.location.hash = path;
        this.props.onHideSidebar(path);
    }

    refresh() {
        this.forceUpdate();
    }

    render() {
        return (
            <Sidebar visible={this.props.onShowSidebar} onHide={this.props.onHideSidebar}>
                <img src={ls_logo} alt="" width="64" height="64"/>
                <h1 style={{ fontWeight: 'normal' }}>LightSearch</h1>
                <div className="p-grid p-dir-col">
                    <Button icon="pi pi-fw pi-users" label={i18n.t("clients")}
                            onClick={() => this.changeRoute("/clients")}/>
                    <Button icon="pi pi-fw pi-ban" label={i18n.t("blacklist")} style={{marginTop: "0.5em"}}
                            onClick={() => this.changeRoute("/blacklist")}/>
                    <Button icon="pi pi-fw pi-desktop" label={i18n.t("logs")} style={{marginTop: "0.5em"}}
                            onClick={() => this.changeRoute("/logs")}/>
                    <Button icon="pi pi-fw pi-cog" label={i18n.t("settings")} style={{marginTop: "0.5em"}}
                            onClick={() => this.changeRoute("/settings")}/>
                </div>
            </Sidebar>
        );
    }
}