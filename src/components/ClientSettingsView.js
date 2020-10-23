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
import {Button} from "primereact/button";
import {Fieldset} from "primereact/fieldset";
import {InputText} from "primereact/inputtext";
import {ClientTimeoutService} from "../service/ClientTimeoutService";
import _ from "lodash";
import {Toast} from "primereact/toast";
import "./ClientSettingsView.css";
import {appSettings} from "./AppSettings";
import i18n from "i18next";

export class ClientSettingsView extends Component {

    smallHintStyleClasses = {
        visible: "sm-cl-tout-hint-v",
        hidden: "sm-cl-tout-hint-h"
    };

    settingsType = {
        clientTimeout: "clientTimeout"
    };

    constructor(props) {
        super(props);

        this.state = {
            clientTimeout: 0,
            disabledApply: true,
            disabledReset: true,
            isToggleable: !(window.innerWidth > 600),
            smallStyleClass: this.smallHintStyleClasses.hidden,
            current: {
                clientTimeout: 0
            }
        };

        this.clientTimeoutService = new ClientTimeoutService();

        this.changeClientSettings = this.changeClientSettings.bind(this);
        this.changeState = this.changeState.bind(this);
        this.checkApply = this.checkApply.bind(this);
        this.checkSetting = this.checkSetting.bind(this);
        this.reset = this.reset.bind(this);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateDimensions);
    }

    updateDimensions = () => {
        if(window.innerWidth <= 600) {
            this.setState({ isToggleable: true });
        } else {
            this.setState({ isToggleable: false });
        }
    };

    async componentDidMount() {
        window.addEventListener('resize', this.updateDimensions);
        this.clientTimeoutService.getClientTimeout().then(data => {
            this.setState({
                clientTimeout: data["client_timeout"],
                current: {
                    clientTimeout: data["client_timeout"]
                }
            });
        });
    }

    async changeClientSettings() {
        try {
            let data = await this.clientTimeoutService.changeClientTimeout(this.state.clientTimeout);

            this.setState({
                current: {
                    clientTimeout: this.state.clientTimeout
                },
                disabledApply: true,
                disabledReset: true
            });

            this.toast.show({
                severity: 'success',
                summary: 'Successful',
                detail: data.message,
                life: appSettings.TOAST_LIVE
            });

            this.props.restart();
        } catch (e) {
            let response = e.response.data;
            console.log(response);
            console.log('Change clients timeout failed: ' + response);
            this.toast.show({
                severity: 'error',
                summary: 'Error',
                detail: response.message,
                life: appSettings.TOAST_LIVE
            });
        }
    }

    changeState(chState, type, value) {
        let disabled = this.checkApply(type, value);
        chState.disabledApply = disabled;
        chState.disabledReset = disabled;
        this.setState(chState);
    }

    checkSetting(currentType, settingType, value, defaultValue) {
        return currentType === settingType ? value : defaultValue;
    }

    checkApply(type, value) {
        if (typeof value === "string") {
            if (value === "")
                return true;
        } else if (typeof value === "number") {
            if (value < 0)
                return true;
        }

        let newSettings = {
            clientTimeout: 0
        };

        newSettings.clientTimeout = this.checkSetting(type, this.settingsType.clientTimeout, value, this.state.clientTimeout);

        return _.isEqual(newSettings, this.state.current);
    }

    reset() {
        this.setState({
            clientTimeout: this.state.current.clientTimeout,
            disabledApply: true,
            disabledReset: true
        });
    }

    render() {
        return (<>
            <Toast ref={(el) => this.toast = el} />
            <Fieldset toggleable={this.state.isToggleable} legend={i18n.t('clients')} style={{marginTop: "1em"}}>
                <div className="p-grid p-dir-col">
                    <div className="p-col">
                        <label htmlFor="clTout" className="p-d-block" style={{textAlign: "left"}}>{i18n.t("clientTimeoutValue")}</label>
                        <InputText value={this.state.clientTimeout} aria-describedby="clTout-help"
                                   onChange={(e) => {
                                       let newClTout = parseInt(e.target.value, 10);
                                       newClTout = isNaN(newClTout) ? 0: newClTout;
                                       this.changeState(
                                           {clientTimeout: newClTout, disabledApply: true, disabledReset: true},
                                           this.settingsType.clientTimeout, newClTout);
                                   }}
                                   onFocus={() => this.setState({smallStyleClass: this.smallHintStyleClasses.visible})}
                                   onBlur={() => this.setState({smallStyleClass: this.smallHintStyleClasses.hidden})}
                                   autoComplete="off" id="clTout" className="p-d-block" style={{width: "100%"}}/>
                        <small id="clTout-help" className={this.state.smallStyleClass}
                               style={{float: "left", marginTop: "0.3em"}}>{i18n.t("clientTimeoutValueHint")}</small>
                    </div>
                    <div className="p-col" style={{marginTop: "1em"}}>
                        <Button label={i18n.t("applyChangesBtn")} disabled={this.state.disabledApply}
                                style={{float: "left", width: "100%"}}
                                onClick={this.changeClientSettings}/>
                    </div>
                    <div className="p-col" style={{marginTop: "1em"}}>
                        <Button className="p-button-warning" label={i18n.t("reset")} disabled={this.state.disabledReset}
                                style={{float: "left", width: "100%"}}
                                onClick={this.reset}/>
                    </div>
                </div>
            </Fieldset>
            </>
        );
    }
}