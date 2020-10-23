import React, {Component} from 'react';
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {Button} from 'primereact/button';
import 'primeicons/primeicons.css';
import {InputText} from "primereact/inputtext";
import {BlacklistService} from "./BlacklistService";
import {Toast} from "primereact/toast";
import {Toolbar} from "primereact/toolbar";
import {DialogQuestion} from "./DialogQuestion";
import {OverlayPanel} from "primereact/overlaypanel";
import {ProgressBar} from "primereact/progressbar";
import {ColumnGroup} from "primereact/columngroup";
import {Row} from "primereact/row";
import {appSettings} from "./AppSettings";
import i18n from "i18next";
import {visibility} from "../utils/CssProps";

export class DataTableBlacklist extends Component {

    emptyClient = {
        imei: null
    };

    emptyBlacklist = [];

    constructor(props) {
        super(props);
        this.state = {
            removeBlacklistDialog : false,
            removeBlacklistDialogSelected : false,
            selectedClients: null,
            selectedClient: this.emptyClient,
            blacklist: this.emptyBlacklist,
            addBlacklistImei: "",
            removeBlacklistImei: "",
            tagBlacklist: "tag",
            addBlacklistLoading: visibility.hidden,
            removeBlacklistLoading: visibility.hidden,
            blacklistSize: 0
        };
        this.blacklistService = new BlacklistService();
        this.renderRowButtons = this.renderRowButtons.bind(this);

        this.hideRemoveBlacklistDialog = this.hideRemoveBlacklistDialog.bind(this);
        this.hideRemoveBlacklistDialogSelected = this.hideRemoveBlacklistDialogSelected.bind(this);
        this.removeBlacklist = this.removeBlacklist.bind(this);
        this.removeBlacklistSelected = this.removeBlacklistSelected.bind(this);
        this.confirmRemoveBlacklist = this.confirmRemoveBlacklist.bind(this);
        this.confirmRemoveBlacklistSelected = this.confirmRemoveBlacklistSelected.bind(this);
        this.confirmAddBlacklist = this.confirmAddBlacklist.bind(this);
        this.confirmRemoveBlacklistOverlay = this.confirmRemoveBlacklistOverlay.bind(this);
    }

    async componentDidMount() {
        try {
            let blacklist = await this.blacklistService.getBlacklist();
            this.setState({
                blacklist: blacklist,
                blacklistSize: blacklist.length
            })
        } catch (e) {
            console.log(`Blacklist request failed: ${e}`);
        }
    }

    confirmRemoveBlacklistSelected() {
        this.setState({removeBlacklistDialogSelected: true});
    }

    confirmRemoveBlacklist(client) {
        this.setState({
            selectedClient: client,
            removeBlacklistDialog: true
        });
    }

    async confirmAddBlacklist() {
        this.setState({addBlacklistLoading: visibility.visible});

        try {
            let data = await this.blacklistService.addToBlacklist(this.state.addBlacklistImei);
            let newBlacklist = this.state.blacklist;
            newBlacklist.push({imei: data.imeilist[0]});

            this.setState({
                addBlacklistLoading: visibility.hidden,
                blacklist: newBlacklist,
                addBlacklistImei: "",
                blacklistSize: newBlacklist.length
            });
            this.toast.show({ severity: 'success', summary: i18n.t("successful"), detail: data.message, life: appSettings.TOAST_LIVE });
        } catch (e) {
            let response = e.response.data;
            console.log(response);
            console.log(i18n.t("addBlacklistRequestFailed") + response);
            this.setState({
                addBlacklistLoading: visibility.hidden
            });
            this.toast.show({ severity: 'error', summary: i18n.t("error"), detail: response.message, life: appSettings.TOAST_LIVE });
        }
    }

    async confirmRemoveBlacklistOverlay() {
        this.setState({removeBlacklistLoading: visibility.visible});

        try {
            let data = await this.blacklistService.removeFromBlacklist(this.state.removeBlacklistImei);
            let blacklist = await this.blacklistService.getBlacklist();
            this.setState({
                blacklist: blacklist,
                blacklistSize: blacklist.length,
                removeBlacklistLoading: visibility.hidden,
                removeBlacklistImei: ""
            });
            this.toast.show({ severity: 'success', summary: i18n.t("successful"), detail: data.message, life: appSettings.TOAST_LIVE });
        } catch (e) {
            let response = e.response.data;
            console.log(response);
            console.log(i18n.t("removeBlacklistRequestFailed") + response);
            this.setState({
                removeBlacklistLoading: visibility.hidden
            });
            this.toast.show({ severity: 'error', summary: i18n.t("error"), detail: response.message, life: appSettings.TOAST_LIVE });
        }
    }

    hideRemoveBlacklistDialogSelected() {
        this.setState({ removeBlacklistDialogSelected: false });
    }

    hideRemoveBlacklistDialog() {
        this.setState({ removeBlacklistDialog: false });
    }

    async removeBlacklistSelected() {
        try {
            let clients = this.state.blacklist.filter(client => !this.state.selectedClients.includes(client));
            await this.blacklistService.removeFromBlacklist(this.state.selectedClients);

            this.setState({
                blacklist: clients,
                removeBlacklistDialogSelected: false,
                selectedClients: null
            });

            this.toast.show({severity: 'success', summary: i18n.t("successful"), detail: i18n.t("removeClientsFromTheBlacklist"),
                life: appSettings.TOAST_LIVE });
        } catch (e) {
            let response = e.response.data;
            this.toast.show({severity: 'error', summary: i18n.t("error"), detail: response === null ? `${e}` : response.message,
                life: appSettings.TOAST_LIVE });

            this.setState({
                removeBlacklistDialogSelected: false,
            });
        }
    }

    async removeBlacklist() {
        try {
            await this.blacklistService.removeFromBlacklist(this.state.selectedClient.imei);
            let clients = this.state.blacklist.filter(client => client.imei !== this.state.selectedClient.imei);
            this.setState({
                blacklist: clients,
                removeBlacklistDialog: false,
                blacklistSize: clients.length,
                selectedClient: this.emptyClient
            });

            this.toast.show({ severity: 'success', summary: i18n.t("successful"), detail: i18n.t("removeClientFromTheBlacklist"), life: appSettings.TOAST_LIVE });
        } catch (e) {
            console.log(`Remove blacklist request failed: ${e}`);
            this.setState({
                removeBlacklistDialog: false
            });

            this.toast.show({ severity: 'error', summary: i18n.t("error"), detail: `${e}`, life: appSettings.TOAST_LIVE});
        }
    }

    renderHeader() {
        return (
            <div style={{textAlign: "left"}}>
                <span className="p-input-icon-left">
                    <i className="pi pi-search"/>
                    <InputText
                        type="search"
                        onInput={ (e) => this.setState({globalFilter: e.target.value}) }
                        placeholder={i18n.t("IMEIHashSearch")}/>
                </span>
            </div>
        );
    }

    renderRowButtons(rowData) {
        const buttonStyle = {
            marginLeft: "0.5em"
        };

        return (
            <div>
                <Button style={buttonStyle} type="button" icon="pi pi-lock-open" className="p-button-danger"
                        onClick={() => {this.confirmRemoveBlacklist(rowData)}}
                        tooltip={i18n.t("removeFromTheBlacklistBtn")}
                        tooltipOptions={{position: "top"}}/>
            </div>
        );
    }

    renderToolbarButton() {
        return (
            <>
                <Button label={i18n.t("add")} icon="pi pi-ban" className="p-button-success"
                        onClick={(e) => this.op.toggle(e)}/>
                <OverlayPanel ref={(el) => this.op = el}>
                    <div className="p-inputgroup">
                        <InputText placeholder={i18n.t("enterIMEIOrIMEIHash")}
                                   onInput={ (e) => this.setState({addBlacklistImei: e.target.value})}/>
                        {/*<InputText placeholder="Enter Tag"*/}
                        {/*           onInput={ (e) => this.setState({tagBlacklist: e.target.value})}/>*/}
                        <Button label={i18n.t("add")} icon="pi pi-ban" className="p-button-success"
                                disabled={(this.state.tagBlacklist && this.state.addBlacklistImei) === ""}
                                onClick={this.confirmAddBlacklist}/>
                    </div>
                    <div style={{marginTop: "0.2em"}} />
                    <ProgressBar mode="indeterminate" style={{height: "0.2em", visibility: this.state.addBlacklistLoading}} />
                </OverlayPanel>
                <div style={{marginLeft: "0.5em"}} />
                <Button label={i18n.t("remove")} icon="pi pi-lock-open" className="p-button-danger"
                        onClick={this.confirmRemoveBlacklistSelected} style={{borderRadius: "3px 0px 0px 3px"}}
                        disabled={!this.state.selectedClients || !this.state.selectedClients.length} />
                <Button label={i18n.t("")} icon="pi pi-chevron-down" style={{borderRadius: "0px 3px 3px 0px"}}
                        className="p-button-danger"
                        onClick={(e) => this.opr.toggle(e)}/>
                <OverlayPanel ref={(el) => this.opr = el}>
                    <div className="p-inputgroup">
                        <InputText placeholder={i18n.t("enterIMEIOrIMEIHash")}
                                   onInput={ (e) => this.setState({removeBlacklistImei: e.target.value})}/>
                        <Button label={i18n.t("remove")} icon="pi pi-lock-open" className="p-button-danger"
                                disabled={(this.state.tagBlacklist && this.state.removeBlacklistImei) === ""}
                                onClick={this.confirmRemoveBlacklistOverlay}/>
                    </div>
                    <div style={{marginTop: "0.2em"}} />
                    <ProgressBar mode="indeterminate" style={{height: "0.2em", visibility: this.state.removeBlacklistLoading}} />
                </OverlayPanel>
            </>
        );
    }

    renderFooterGroup(size) {
        return (
            <ColumnGroup>
                <Row>
                    <Column footer={i18n.t("blacklistSizeSummary")} colSpan={2} footerStyle={{textAlign: 'right'}}/>
                    <Column footer={size} />
                </Row>
            </ColumnGroup>
        );
    }

    render() {
        const header = this.renderHeader();
        const btn = this.renderToolbarButton();

        return (
            <div>
                <Toast ref={(el) => this.toast = el} />
                <Toolbar style={{border: "none", borderRadius: "0px"}} left={btn}/>
                <DataTable header={header}
                           value={this.state.blacklist}
                           footerColumnGroup={this.renderFooterGroup(this.state.blacklistSize)}
                           selection={this.state.selectedClients}
                           onSelectionChange={(e) => this.setState({selectedClients: e.value})}
                           className="p-datatable-blacklist"
                           globalFilter={this.state.globalFilter}
                           emptyMessage={i18n.t("IMEIHashNotFound")}
                           dataKey="imei"
                           paginator={true}
                           rows={10}
                           rowsPerPageOptions={[10,25,50]}
                           paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                           currentPageReportTemplate={i18n.t("from") + " {first} " + i18n.t("to") + " {last} " + i18n.t("of") + " {totalRecords}"}
                           rowHover
                           responsive
                           resizableColumns={true}>
                    <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}/>
                    <Column field="imei" header={i18n.t("IMEIHash")} sortable />
                    <Column header={i18n.t("actions")} body={this.renderRowButtons} style={{width: '20vw'}} />
                </DataTable>

                <DialogQuestion headerText={i18n.t("confirm")} message={i18n.t("removeClientFromTheBlacklistQuestion")}
                                visible={this.state.removeBlacklistDialog}
                                onConfirm={this.removeBlacklist}
                                onCancel={this.hideRemoveBlacklistDialog}
                                onHide={this.hideRemoveBlacklistDialog}/>

                <DialogQuestion headerText={i18n.t("confirm")} message={i18n.t("removeClientsFromTheBlacklistQuestion")}
                                visible={this.state.removeBlacklistDialogSelected}
                                onConfirm={this.removeBlacklistSelected}
                                onCancel={this.hideRemoveBlacklistDialogSelected}
                                onHide={this.hideRemoveBlacklistDialogSelected}/>
            </div>
        );
    }
}
