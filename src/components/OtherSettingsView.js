import React from 'react';
import {Component} from "react";
import {Fieldset} from "primereact/fieldset";
import "./ClientSettingsView.css";
import {Dropdown} from "primereact/dropdown";
import {changeLanguage, languages} from "../utils/Translate";
import i18n from "i18next";

export class OtherSettingsView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedLang: this.props.lang,
            isDarkMode: this.props.isDarkMode
        };

        this.onLangChange = this.onLangChange.bind(this);
        // this.changeMode = this.changeMode.bind(this);
    }

    onLangChange(e) {
        this.setState({ selectedLang: e.value});
        changeLanguage(e.value);
        this.props.refresh();
    }

    // changeMode(value) {
    //     if(value === true) {
    //         var head  = document.getElementsByTagName('head')[0];
    //         var link  = document.createElement('link');
    //         link.rel  = 'stylesheet';
    //         link.type = 'text/css';
    //         link.href = 'http://your-website.com/path-to-css-file/theme.css';
    //         link.media = 'all';
    //         head.appendChild(link);
    //     }
    //
    //     this.setState({isDarkMode: value})
    // }

    render() {
        return (<>
                <Fieldset legend={i18n.t("other")} style={{marginTop: "1em"}}>
                    <div className="p-grid p-dir-col">
                        <div className="p-col">
                            <label htmlFor="clTout" className="p-d-block" style={{textAlign: "left"}}>{i18n.t("language")}</label>
                            <Dropdown style={{float: "left", marginTop: "0.2em"}} value={this.state.selectedLang}
                                      options={languages} onChange={this.onLangChange} optionLabel="lng"
                                      optionValue="code" placeholder={i18n.t("languagePlaceholder")} />
                        </div>
                    </div>
                </Fieldset>
            </>
        );
    }
}