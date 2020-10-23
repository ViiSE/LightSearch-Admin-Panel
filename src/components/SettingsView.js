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

import React, {Component} from 'react';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css'
import {DatasourceView} from "./DatasourceView";
import {ClientSettingsView} from "./ClientSettingsView";
import {Button} from "primereact/button";
import {RestartService} from "../service/RestartService";
import {appSettings} from "./AppSettings";
import {Toast} from "primereact/toast";
import {OtherSettingsView} from "./OtherSettingsView";
import i18n from "i18next";

let restartState = false;

const iconRestartButton = {
    basic: "pi pi-refresh",
    anim: "pi pi-spin pi-refresh"
};

export class SettingsView extends Component {

    constructor(props) {
        super(props);

        this.state = {
            showRestartButton: restartState,
            iconButtonClassName: iconRestartButton.basic,
            restartBtnText: i18n.t("restart")
        };

        this.restartService = new RestartService();

        this.needRestart = this.needRestart.bind(this);
        this.refresh = this.refresh.bind(this);
        this.restart = this.restart.bind(this);
    }

    needRestart() {
        restartState = true;
        this.setState({
            showRestartButton: restartState
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    refresh() {
        this.forceUpdate();
        this.props.refresh();
    }

    async restart() {
        this.setState({
            iconButtonClassName: iconRestartButton.anim
        });
        let result = await this.restartService.restart();
        this.toast.show({ severity: 'success', summary: i18n.t('successful'), detail: result.message, life: appSettings.TOAST_LIVE });

        restartState = false;
        let resSec = 5;
        let btnTxt = i18n.t("restartTime") + " " + resSec + i18n.t("restartTimeSec") + "...";
        this.setState({
            restartBtnText: btnTxt
        });

        setTimeout(() => { window.location.replace("/login") }, resSec * 1000);
    }

    render() {
        return (
            <div>
                <Toast ref={(el) => this.toast = el} />
                {this.state.showRestartButton ? (
                    <Button className="p-button-rounded p-button-outlined" style={{marginTop: "0.5em"}}
                            icon={this.state.iconButtonClassName} label={this.state.restartBtnText}
                            onClick={this.restart}/> ) :
                    (<div/>)}
                <div className="p-grid nested-grid">
                    <div className="p-col-12 p-md-8 p-lg-8">
                        <DatasourceView restart={this.needRestart} lang={this.props.lang}/>
                    </div>
                    <div className="p-col-12 p-md-4 p-lg-4">
                    <div className="p-grid p-dir-col">
                        <div className="p-col">
                            <ClientSettingsView restart={this.needRestart}/>
                        </div>
                        <div className="p-col">
                            <OtherSettingsView restart={this.needRestart} refresh={this.refresh} lang={this.props.lang}/>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        );
    }
}
