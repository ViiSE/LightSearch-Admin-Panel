import React, {Component} from 'react';
import {Password} from "primereact/password";
import {Button} from "primereact/button";
import {Fieldset} from "primereact/fieldset";
import {InputText} from "primereact/inputtext";
import {DatasourceService} from "../service/DatasourceService";
import {Toast} from "primereact/toast";
import _ from "lodash";
import {appSettings} from "./AppSettings";
import {InputTextarea} from "primereact/inputtextarea";
import {Checkbox} from "primereact/checkbox";
import {Tooltip} from "primereact/tooltip"
import i18n from "i18next";
import {AutoComplete} from "primereact/autocomplete";
import {getEncodingLocation} from "../utils/Translate";
import {dbType} from "./InnerData";

export class DatasourceView extends Component {

    propsType = {
        username: "username",
        password: "password",
        host: "host",
        port: "port",
        dbName: "dbName",
        dbType: "dbType",
        scriptEncoding: "scriptEncoding",
        driverClassName: "driverClassName",
        additional: "additional",
        autoCommit: "autoCommit",
        connectionTimeout: "connectionTimeout",
        idleTimeout: "idleTimeout",
        maxLifeTime: "maxLifeTime",
        maximumPoolSize: "maximumPoolSize",
        filteredEncodings: "filteredEncodings",
        filteredDbTypes: "filteredDbTypes",
        filteredDriverName: "filteredDriverName"
    };

    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: "",
            host: "",
            port: 0,
            dbName: "",
            dbType: "",
            scriptEncoding: "",
            driverClassName: "",
            additional: "",
            disabledApply: true,
            disabledReset: true,
            autoCommit: true,
            connectionTimeout: 0,
            idleTimeout: 0,
            maximumPoolSize: 0,
            encodings: [],
            databases: [],
            filteredEncodings: null,
            filteredDbTypes: null,
            filteredDriverName: null,

            current: {
                username: "",
                password: "",
                host: "",
                port: 0,
                dbName: "",
                dbType: "",
                scriptEncoding: "",
                driverClassName: "",
                additional: "",

                autoCommit: true,
                connectionTimeout: 0,
                idleTimeout: 0,
                maxLifeTime: 0,
                maximumPoolSize: 0
            }
        };

        this.datasourceService = new DatasourceService();

        this.changeDatasource = this.changeDatasource.bind(this);
        this.changeState = this.changeState.bind(this);
        this.checkApply = this.checkApply.bind(this);
        this.checkProp = this.checkProp.bind(this);
        this.reset = this.reset.bind(this);
        this.searchEncoding = this.searchEncoding.bind(this);
        this.scriptEncodingAutoCompleteTemplate = this.scriptEncodingAutoCompleteTemplate.bind(this);
        this.dbTypeAutoCompleteTemplate = this.dbTypeAutoCompleteTemplate.bind(this);
        this.driverNameAutoCompleteTemplate = this.driverNameAutoCompleteTemplate.bind(this);
        this.cardTemplate = this.cardTemplate.bind(this);
        this.searchDriverName = this.searchDriverName.bind(this);
        this.searchDbType = this.searchDbType.bind(this);
    }

    async componentDidMount() {
        this.datasourceService.getDatasource().then(data => {
            this.setState({
                username: data.username,
                password: data.password,
                host: data.host,
                port: data.port,
                dbName: data["db_name"],
                dbType: data["db_type"],
                scriptEncoding: data["script_encoding"],
                driverClassName: data["driver_class_name"],
                additional: data.additional,
                autoCommit: data.pool["auto_commit"],
                connectionTimeout: data.pool["connection_timeout"],
                idleTimeout: data.pool["idle_timeout"],
                maxLifeTime: data.pool["max_life_time"],
                maximumPoolSize: data.pool["maximum_pool_size"],
                encodings: getEncodingLocation(this.props.lang),
                databases: dbType(),

                current: {
                    username: data.username,
                    password: data.password,
                    host: data.host,
                    port: data.port,
                    dbName: data["db_name"],
                    dbType: data["db_type"],
                    scriptEncoding: data["script_encoding"],
                    driverClassName: data["driver_class_name"],
                    additional: data.additional,

                    autoCommit: data.pool["auto_commit"],
                    connectionTimeout: data.pool["connection_timeout"],
                    idleTimeout: data.pool["idle_timeout"],
                    maxLifeTime: data.pool["max_life_time"],
                    maximumPoolSize: data.pool["maximum_pool_size"]
                }
            });
        });
    }

    async changeDatasource() {
        try {
            let data = await this.datasourceService.changeDatasource(this.state);

            this.setState({
                disabledApply: true,
                disabledReset: true,
                current: {
                    username: this.state.username,
                    password: this.state.password,
                    host: this.state.host,
                    port: this.state.port,
                    dbName: this.state.dbName,
                    dbType: this.state.dbType,
                    scriptEncoding: this.state.scriptEncoding,
                    driverClassName: this.state.driverClassName,
                    additional: this.state.additional,

                    autoCommit: this.state.autoCommit,
                    connectionTimeout: this.state.connectionTimeout,
                    idleTimeout: this.state.idleTimeout,
                    maxLifeTime: this.state.maxLifeTime,
                    maximumPoolSize: this.state.maximumPoolSize,
                }
            });

            this.props.restart();
            this.toast.show({ severity: 'success', summary: 'Successful', detail: data.message, life: appSettings.TOAST_LIVE });
        } catch (e) {
            let response = "";
            try {
                response = e.response.data;
            } catch (e1) {
                response = e;
            }

            let message = "Internal Server Error. :(";
            try {
                if (response.message != null)
                    message = response.message;
            } catch (e) {}
            console.log("Change datasource failed: " + response);
            this.toast.show({
                severity: 'error',
                summary: 'Error',
                detail: message,
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

    checkProp(currentType, propType, value, defaultValue) {
        if (typeof value === "boolean") {
            if(currentType === propType)
                return value;
        }

        return currentType === propType ? value : defaultValue;
    }

    checkApply(type, value) {
        if (typeof value === "string") {
            if (value === "")
                return true;
        } else if (typeof value === "number") {
            if (value <= 0)
                return true;
        }

        let newProps = {
            username: "",
            password: "",
            host: "",
            port: 0,
            dbName: "",
            dbType: "",
            scriptEncoding: "",
            driverClassName: "",
            additional: "",
            autoCommit: true,
            connectionTimeout: 0,
            idleTimeout: 0,
            maxLifeTime: 0,
            maximumPoolSize: 0
        };

        newProps.username = this.checkProp(type, this.propsType.username, value, this.state.username);
        newProps.password = this.checkProp(type, this.propsType.password, value, this.state.password);
        newProps.host = this.checkProp(type, this.propsType.host, value, this.state.host);
        newProps.port = this.checkProp(type, this.propsType.port, value, this.state.port);
        newProps.dbName = this.checkProp(type, this.propsType.dbName, value, this.state.dbName);
        newProps.dbType = this.checkProp(type, this.propsType.dbType, value, this.state.dbType);
        newProps.scriptEncoding = this.checkProp(type, this.propsType.scriptEncoding, value, this.state.scriptEncoding);
        newProps.driverClassName = this.checkProp(type, this.propsType.driverClassName, value, this.state.driverClassName);
        newProps.additional = this.checkProp(type, this.propsType.additional, value, this.state.additional);
        newProps.autoCommit = this.checkProp(type, this.propsType.autoCommit, value, this.state.autoCommit);
        newProps.connectionTimeout = this.checkProp(type, this.propsType.connectionTimeout, value, this.state.connectionTimeout);
        newProps.idleTimeout = this.checkProp(type, this.propsType.idleTimeout, value, this.state.idleTimeout);
        newProps.maxLifeTime = this.checkProp(type, this.propsType.maxLifeTime, value, this.state.maxLifeTime);
        newProps.maximumPoolSize = this.checkProp(type, this.propsType.maximumPoolSize, value, this.state.maximumPoolSize);

        return _.isEqual(newProps, this.state.current);
    }

    reset() {
        this.setState({
            username: this.state.current.username,
            password: this.state.current.password,
            host: this.state.current.host,
            port: this.state.current.port,
            dbName: this.state.current.dbName,
            dbType: this.state.current.dbType,
            scriptEncoding: this.state.current.scriptEncoding,
            driverClassName: this.state.current.driverClassName,
            additional: this.state.current.additional,

            autoCommit: this.state.current.autoCommit,
            connectionTimeout: this.state.current.connectionTimeout,
            idleTimeout: this.state.current.idleTimeout,
            maxLifeTime: this.state.current.maxLifeTime,
            maximumPoolSize: this.state.current.maximumPoolSize,

            disabledApply: true,
            disabledReset: true
        });
    }

    searchEncoding(event) {
        this.autoSearch(event, this.state.encodings, this.propsType.filteredEncodings, "name");
    }

    searchDriverName(event) {
        this.autoSearch(event, this.state.databases, this.propsType.filteredDriverName, "driver");
    }

    searchDbType(event) {
        this.autoSearch(event, this.state.databases, this.propsType.filteredDbTypes, "name");
    }

    autoSearch(event, data, filteredType, elementType) {
        setTimeout(() => {
            let filtered;
            if(!event.query.trim().length) {
                filtered = [...data];
            } else {
                filtered = data.filter((enc) => {
                    return enc[elementType].toLowerCase().startsWith(event.query.toLowerCase());
                });
            }

            let result = {};
            result[filteredType] = filtered;
            this.setState(result);
        }, 250)
    }

    scriptEncodingAutoCompleteTemplate(item) {
        return (
            <div>
                <span className="p-card" style={{padding: "0.3em"}}>{item.name}</span>
                <span style={{marginLeft: "0.2em"}}/>
                <span className="p-card" style={{padding: "0.3em"}}>{item.lang}</span>
            </div>
        );
    }

    dbTypeAutoCompleteTemplate(item) {
        return this.cardTemplate(item.name)
    }

    driverNameAutoCompleteTemplate(item) {
        return this.cardTemplate(item.driver);
    }

    cardTemplate(data) {
        return (
            <div>
                <span className="p-card" style={{padding: "0.3em"}}>{data}</span>
            </div>
        );
    }

    render() {
        return (<>
            <Toast ref={(el) => this.toast = el} />
            <Fieldset legend={i18n.t("datasource")} style={{marginTop: "1em"}}>
                <div className="p-grid">
                    <div className="p-col-12 p-md-6">
                        <Fieldset legend={i18n.t("connection")} style={{marginTop: "1em"}}>
                            <div className="p-grid p-dir-col">
                                <div className="p-col">
                                    <label htmlFor="username" className="p-d-block" style={{textAlign: "left"}}>{i18n.t("username")}</label>
                                    <InputText value={this.state.username} autoComplete="off" id="username" className="p-d-block"
                                               onChange={(e) => {
                                                   this.changeState(
                                                       {username: e.target.value, disabledApply: true, disabledReset: true},
                                                       this.propsType.username, e.target.value); }}
                                               style={{width: "100%"}}/>
                                </div>
                                <div className="p-col">
                                    <label htmlFor="password" className="p-d-block" style={{textAlign: "left"}}>{i18n.t("password")}</label>
                                    <Password value={this.state.password} id="password" className="p-d-block"
                                              onChange={(e) => {
                                                  this.changeState(
                                                      {password: e.target.value, disabledApply: true, disabledReset: true},
                                                      this.propsType.password, e.target.value); }}
                                              style={{width: "100%"}}/>
                                </div>
                                <div className="p-col">
                                    <label htmlFor="host" className="p-d-block" style={{textAlign: "left"}}>{i18n.t("host")}</label>
                                    <InputText value={this.state.host} id="host" className="p-d-block" style={{width: "100%"}}
                                               onChange={(e) => {
                                                   this.changeState(
                                                       {host: e.target.value, disabledApply: true, disabledReset: true},
                                                       this.propsType.host, e.target.value); }}/>
                                </div>
                                <div className="p-col">
                                    <label htmlFor="port" className="p-d-block" style={{textAlign: "left"}}>{i18n.t("port")}</label>
                                    <InputText id="port" value={this.state.port} style={{width: "100%"}}
                                               onChange={(e) => {
                                                   let newPort = parseInt(e.target.value, 10);
                                                   newPort = isNaN(newPort) ? 0: newPort;
                                                   this.changeState(
                                                       {port: newPort, disabledApply: true, disabledReset: true},
                                                       this.propsType.port, newPort); }}/>
                                </div>
                                <div className="p-col">
                                    <label htmlFor="dbName" className="p-d-block" style={{textAlign: "left"}}>{i18n.t("databaseName")}</label>
                                    <InputText value={this.state.dbName} id="dbName" className="p-d-block" style={{width:"100%"}}
                                               onChange={(e) => {
                                                   this.changeState(
                                                       {dbName: e.target.value, disabledApply: true, disabledReset: true},
                                                       this.propsType.dbName, e.target.value); }}/>
                                </div>
                                <div className="p-col">
                                    <label htmlFor="dbType" className="p-d-block" style={{textAlign: "left"}}>{i18n.t("databaseType")}</label>
                                    <AutoComplete value={this.state.dbType} id="dbType" style={{width:"100%"}}
                                                  suggestions={this.state.filteredDbTypes}
                                                  completeMethod={this.searchDbType}
                                                  dropdown
                                                  itemTemplate={this.dbTypeAutoCompleteTemplate}
                                                  field="name"
                                                  onChange={(e) => {
                                                      let value = e.target.value.name;
                                                      if(value === undefined)
                                                          value = e.target.value;
                                                      this.changeState(
                                                          {dbType: value, disabledApply: true, disabledReset: true},
                                                          this.propsType.dbType, value); }}/>
                                </div>
                                <div className="p-col">
                                    <label htmlFor="scriptEncoding" className="p-d-block" style={{textAlign: "left"}}>{i18n.t("scriptEncoding")}</label>
                                    <AutoComplete value={this.state.scriptEncoding} id="scriptEncoding" style={{width:"100%"}}
                                                  suggestions={this.state.filteredEncodings}
                                                  completeMethod={this.searchEncoding}
                                                  dropdown
                                                  itemTemplate={this.scriptEncodingAutoCompleteTemplate}
                                                  field="name"
                                                  onChange={(e) => {
                                                      let value = e.target.value.name;
                                                      if(value === undefined)
                                                          value = e.target.value;
                                                      this.changeState(
                                                          {scriptEncoding: value, disabledApply: true, disabledReset: true},
                                                          this.propsType.scriptEncoding, value); }}/>
                                </div>
                                <div className="p-col">
                                    <label htmlFor="driverClassName" className="p-d-block" style={{textAlign: "left"}}>{i18n.t("driverClassName")}</label>
                                    <AutoComplete value={this.state.driverClassName} id="driverClassName" style={{width:"100%"}}
                                                  suggestions={this.state.filteredDriverName}
                                                  completeMethod={this.searchDriverName}
                                                  dropdown
                                                  itemTemplate={this.driverNameAutoCompleteTemplate}
                                                  field="driver"
                                                  onChange={(e) => {
                                                      let value = e.target.value.driver;
                                                      if(value === undefined)
                                                          value = e.target.value;
                                                      this.changeState(
                                                          {driverClassName: value, disabledApply: true, disabledReset: true},
                                                          this.propsType.driverClassName, value); }}/>
                                </div>
                                <div className="p-col">
                                    <label htmlFor="additional" className="p-d-block" style={{textAlign: "left"}}>{i18n.t("additional")}</label>
                                    <InputTextarea value={this.state.additional} id="additional" autoResize className="p-d-block" style={{width:"100%"}}
                                                   onChange={(e) => {
                                                       this.changeState(
                                                           {additional: e.target.value, disabledApply: true, disabledReset: true},
                                                           this.propsType.additional, e.target.value); }}/>
                                </div>
                            </div>
                        </Fieldset>
                    </div>
                    <div className="p-col-12 p-md-6">
                        <Fieldset legend={i18n.t("pool")} style={{marginTop: "1em"}}>
                            <div className="p-grid p-dir-col">
                                <div className="p-col">
                                    <div className="p-field-checkbox">
                                        <Checkbox inputId="autoCommitCheckbox" checked={this.state.autoCommit}
                                                  onChange={(e) => {
                                                      this.changeState(
                                                          {autoCommit: e.checked, disabledApply: true, disabledReset: true},
                                                          this.propsType.autoCommit, e.checked); }}/>
                                        <label htmlFor="autoCommitCheckbox">{i18n.t("autoCommit")}</label>
                                        <Tooltip target=".autoCommitQuestion"/>
                                        <span className="pi pi-question autoCommitQuestion"
                                              style={{marginLeft: "0.5em", fontSize: "0.8em"}}
                                              data-pr-tooltip={i18n.t("autoCommitHint")}/>
                                    </div>
                                </div>
                                <div className="p-col">
                                    <label htmlFor="connectionTimeout" className="p-d-block" style={{textAlign: "left"}}>{i18n.t("connectionTimeout")}</label>
                                    <div className="p-field-checkbox">
                                        <InputText id="connectionTimeout" value={this.state.connectionTimeout} style={{width: "100%"}}
                                                   onChange={(e) => {
                                                       let newConnectionTimeout = parseInt(e.target.value, 10);
                                                       newConnectionTimeout = isNaN(newConnectionTimeout) ? 0: newConnectionTimeout;
                                                       this.changeState(
                                                           {connectionTimeout: newConnectionTimeout, disabledApply: true, disabledReset: true},
                                                           this.propsType.connectionTimeout, newConnectionTimeout); }}/>
                                        <Tooltip target=".connTout" position="top"/>
                                        <span className="pi pi-question connTout"
                                              style={{marginLeft: "0.5em", fontSize: "0.8em"}}
                                              data-pr-tooltip={i18n.t("connectionTimeoutHint")}/>
                                    </div>
                                </div>
                                <div className="p-col">
                                    <label htmlFor="idleTimeout" className="p-d-block" style={{textAlign: "left"}}>{i18n.t("idleTimeout")}</label>
                                    <div className="p-field-checkbox">
                                        <InputText id="idleTimeout" value={this.state.idleTimeout} style={{width: "100%"}}
                                               onChange={(e) => {
                                                   let newIdleTimeout = parseInt(e.target.value, 10);
                                                   newIdleTimeout = isNaN(newIdleTimeout) ? 0: newIdleTimeout;
                                                   this.changeState(
                                                       {idleTimeout: newIdleTimeout, disabledApply: true, disabledReset: true},
                                                       this.propsType.idleTimeout, newIdleTimeout); }}/>
                                        <Tooltip target=".idleTout" position="top"/>
                                        <span className="pi pi-question idleTout"
                                              style={{marginLeft: "0.5em", fontSize: "0.8em"}}
                                              data-pr-tooltip={i18n.t("idleTimeoutHint")}/>
                                    </div>
                                </div>
                                <div className="p-col">
                                    <label htmlFor="maxLifeTime" className="p-d-block" style={{textAlign: "left"}}>{i18n.t("maxLifeTime")}</label>
                                    <div className="p-field-checkbox">
                                        <InputText id="maxLifeTime" value={this.state.maxLifeTime} style={{width: "100%"}}
                                               onChange={(e) => {
                                                   let newLifeTime = parseInt(e.target.value, 10);
                                                   newLifeTime = isNaN(newLifeTime) ? 0: newLifeTime;
                                                   this.changeState(
                                                       {maxLifeTime: newLifeTime, disabledApply: true, disabledReset: true},
                                                       this.propsType.maxLifeTime, newLifeTime); }}/>
                                        <Tooltip target=".maxLifeTime" position="top"/>
                                        <span className="pi pi-question maxLifeTime"
                                              style={{marginLeft: "0.5em", fontSize: "0.8em"}}
                                              data-pr-tooltip={i18n.t("maxLifeTimeHint")}/>
                                    </div>
                                </div>
                                <div className="p-col">
                                    <label htmlFor="maximumPoolSize" className="p-d-block" style={{textAlign: "left"}}>{i18n.t("maximumPoolSize")}</label>
                                    <div className="p-field-checkbox">
                                        <InputText id="maximumPoolSize" value={this.state.maximumPoolSize} style={{width: "100%"}}
                                                   onChange={(e) => {
                                                       let newMaximumPoolSize = parseInt(e.target.value, 10);
                                                       newMaximumPoolSize = isNaN(newMaximumPoolSize) ? 0: newMaximumPoolSize;
                                                       this.changeState(
                                                           {maximumPoolSize: newMaximumPoolSize, disabledApply: true, disabledReset: true},
                                                           this.propsType.maximumPoolSize, newMaximumPoolSize); }}/>
                                        <Tooltip target=".maxPoolSize" position="top"/>
                                        <span className="pi pi-question maxPoolSize"
                                              style={{marginLeft: "0.5em", fontSize: "0.8em"}}
                                              data-pr-tooltip={i18n.t("maximumPoolSizeHint")}/>
                                    </div>
                                </div>
                            </div>
                        </Fieldset>
                    </div>
                </div>
                <div className="p-grid p-dir-col">
                    <div className="p-col-12" style={{marginTop: "1em"}}>
                        <Button label={i18n.t("applyChangesBtn")} style={{float: "left", width: "100%"}} disabled={this.state.disabledApply}
                                onClick={this.changeDatasource}/>
                    </div>
                    <div className="p-col-12" style={{marginTop: "1em"}}>
                        <Button className="p-button-warning" label={i18n.t("reset")} style={{float: "left", width: "100%"}}
                                disabled={this.state.disabledReset}
                                onClick={this.reset}/>
                    </div>
                </div>
            </Fieldset>
        </>
        );
    }
}