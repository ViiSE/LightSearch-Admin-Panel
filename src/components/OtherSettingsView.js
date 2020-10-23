import React from 'react';
import {Component} from "react";
import {Fieldset} from "primereact/fieldset";
import "./ClientSettingsView.css";
import {Dropdown} from "primereact/dropdown";
import {changeLanguage, languages} from "../utils/Translate";
import i18n from "i18next";
import {Button} from "primereact/button";
import {ProgressBar} from "primereact/progressbar";
import {visibility} from "../utils/CssProps";
import {SettingsService} from "../service/SettingsService";
import {appSettings} from "./AppSettings";
import {Password} from "primereact/password";
import {Accordion, AccordionTab} from "primereact/accordion";
import "./OtherSettingsView.css";
import {Toast} from "primereact/toast";
import {Toolbar} from "primereact/toolbar";

export class OtherSettingsView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedLang: this.props.lang,
            isDarkMode: this.props.isDarkMode,
            newPass: "",
            changePassLoading: visibility.hidden,
            isToggleable: !(window.innerWidth > 600)
        };

        this.onLangChange = this.onLangChange.bind(this);
        this.confirmChangePass = this.confirmChangePass.bind(this);
        this.settingsService = new SettingsService();
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

    componentDidMount() {
        window.addEventListener('resize', this.updateDimensions);
    }

    onLangChange(e) {
        this.setState({ selectedLang: e.value});
        changeLanguage(e.value);
        this.props.refresh();
    }

    async confirmChangePass() {
        try {
            this.setState({changePassLoading: visibility.visible});
            let data = await this.settingsService.changePassword(this.state.newPass);
            this.setState({changePassLoading: visibility.hidden});
            this.toast.show({ severity: 'success', summary: i18n.t("successful"), detail: data.message, life: appSettings.TOAST_LIVE });
            this.props.restart();
        } catch (e) {
            console.log(e);
            let response = e.response.data;
            console.log(response);
            console.log(i18n.t("changePassRequestFailed") + response);
            this.setState({
                changePassLoading: visibility.hidden
            });
            this.toast.show({ severity: 'error', summary: i18n.t("error"), detail: response.message, life: appSettings.TOAST_LIVE });
        }
    }

    render() {
        return (<>
                <Toast ref={(el) => this.toast = el} />
                <Fieldset toggleable={this.state.isToggleable} legend={i18n.t("other")} style={{marginTop: "1em"}}>
                    <div className="p-grid p-dir-col">
                        <div className="p-col">
                            <label htmlFor="clTout" className="p-d-block" style={{textAlign: "left"}}>{i18n.t("language")}</label>
                            <Dropdown style={{float: "left", marginTop: "0.2em"}} value={this.state.selectedLang}
                                      options={languages} onChange={this.onLangChange} optionLabel="lng"
                                      optionValue="code" placeholder={i18n.t("languagePlaceholder")} />
                        </div>
                        <div className="p-col">
                            <Accordion>
                                <AccordionTab header={i18n.t("changePass")} className="changePass">
                                    <div className="p-inputgroup">
                                        <Password promptLabel={i18n.t("enterNewPass")}
                                                  weakLabel={i18n.t("weak")}
                                                  mediumLabel={i18n.t("medium")}
                                                  strongLabel={i18n.t("strong")}
                                                  onInput={ (e) => this.setState({newPass: e.target.value})}
                                        />
                                        <Button label={i18n.t("change")} icon="pi pi-key" className="p-button-success"
                                                disabled={(this.state.newPass) === ""}
                                                onClick={this.confirmChangePass}
                                        />
                                    </div>
                                    <div style={{marginTop: "0.2em"}} />
                                    <ProgressBar mode="indeterminate" style={{height: "0.2em", visibility: this.state.changePassLoading}} />
                                </AccordionTab>
                            </Accordion>
                        </div>
                    </div>
                </Fieldset>
            </>
        );
    }
}