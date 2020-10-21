import React from 'react';
import {Component} from "react";
import {ClientService} from "../service/ClientService";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import { Button } from 'primereact/button';
import 'primeicons/primeicons.css';
import {InputText} from "primereact/inputtext";
import {ColumnGroup} from "primereact/columngroup";
import {Row} from "primereact/row";
import {Toolbar} from "primereact/toolbar";
import {DialogQuestion} from "./DialogQuestion";
import {Toast} from "primereact/toast";
import {appSettings} from "./AppSettings";
import {BlacklistService} from "./BlacklistService";
import i18n from "i18next";

export class DataTableClients extends Component {

    emptyClient = {
        imei: null
    };

    constructor(props) {
        super(props);
        this.state = {
            kickClientDialog: false,
            kickClientsDialogSelected: false,
            addBlacklistDialog: false,
            addBlacklistDialogSelected: false,
            selectedClients: null,
            selectedClient: this.emptyClient,
            clients: null,
            amountClients: 0
        };

        this.clientsService = new ClientService();
        this.blacklistService = new BlacklistService();
        this.renderButtons = this.renderButtons.bind(this);

        this.hideKickClientDialog = this.hideKickClientDialog.bind(this);
        this.hideKickClientsDialogSelected = this.hideKickClientsDialogSelected.bind(this);
        this.confirmKickClient = this.confirmKickClient.bind(this);
        this.confirmKickClientsSelected = this.confirmKickClientsSelected.bind(this);
        this.kickClient = this.kickClient.bind(this);
        this.kickClientsSelected = this.kickClientsSelected.bind(this);

        this.hideAddBlacklistDialog = this.hideAddBlacklistDialog.bind(this);
        this.hideAddBlacklistDialogSelected = this.hideAddBlacklistDialogSelected.bind(this);
        this.confirmAddBlacklist = this.confirmAddBlacklist.bind(this);
        this.confirmAddBlacklistSelected = this.confirmAddBlacklistSelected.bind(this);
        this.addBlacklist = this.addBlacklist.bind(this);
        this.addBlacklistSelected = this.addBlacklistSelected.bind(this);
    }

    componentDidMount() {
        this.clientsService.getClients().then(data => {
            this.setState({
                amountClients: data.length,
                clients: data
            });
        });
    }

    hideKickClientDialog() {
        this.setState({ kickClientDialog: false });
    }

    hideKickClientsDialogSelected() {
        this.setState({ kickClientsDialogSelected: false });
    }

    confirmKickClient(client) {
        this.setState({
            selectedClient: client,
            kickClientDialog: true
        });
    }

    confirmKickClientsSelected() {
        this.setState({
            kickClientsDialogSelected: true
        });
    }

    async kickClient() {
        try {
            let clients = this.state.clients.filter(client => client.imei !== this.state.selectedClient.imei);
            let data = await this.clientsService.kickClients(this.state.selectedClient.imei);
            this.setState({
                clients: clients,
                kickClientDialog: false,
                selectedClient: this.emptyClient,
                amountClients: clients.length
            });
            this.toast.show({ severity: 'success', summary: i18n.t("successful"), detail: data.message, life: appSettings.TOAST_LIVE });
        } catch (e) {
            let response = e.response.data;
            console.log(i18n.t("kickRequestFailed") + response);
            this.setState({
                kickClientDialog: false
            });
            this.toast.show({ severity: 'error', summary: i18n.t("error"), detail: response.message, life: appSettings.TOAST_LIVE });
        }
    }

    async kickClientsSelected() {
        try {
            let clients = this.state.clients.filter(client => !this.state.selectedClients.includes(client));
            let data = await this.clientsService.kickClients(this.state.selectedClients);

            this.setState({
                clients: clients,
                kickClientsDialogSelected: false,
                selectedClient: this.emptyClient,
                amountClients: clients.length
            });

            this.toast.show({
                severity: 'success',
                summary: i18n.t("successful"),
                detail: data.message,
                life: appSettings.TOAST_LIVE
            });
        } catch (e) {
            this.setState({
                kickClientsDialogSelected: false
            });
            let response = e.response.data;
            this.toast.show({ severity: 'error', summary: i18n.t("error"), detail: response.message, life: appSettings.TOAST_LIVE });
        }
    }

    hideAddBlacklistDialog() {
        this.setState({ addBlacklistDialog: false });
    }

    hideAddBlacklistDialogSelected() {
        this.setState({ addBlacklistDialogSelected: false });
    }

    confirmAddBlacklist(client) {
        this.setState({
            selectedClient: client,
            addBlacklistDialog: true
        });
    }

    confirmAddBlacklistSelected() {
        this.setState({
            addBlacklistDialogSelected: true
        });
    }

    async addBlacklist() {
        try {
            let clients = this.state.clients.filter(client => client.imei !== this.state.selectedClient.imei);
            let data = (await this.blacklistService.addToBlacklist(this.state.selectedClient.imei));
            this.setState({
                clients: clients,
                addBlacklistDialog: false,
                selectedClient: this.emptyClient,
                amountClients: clients.length
            });

            this.toast.show({ severity: 'success', summary: i18n.t("successful"), detail: data.message, life: appSettings.TOAST_LIVE});
        } catch (e) {
            let response = e.response.data;
            this.setState({
                addBlacklistDialog: false
            });
            this.toast.show({ severity: 'error', summary: i18n.t("error"), detail: response.message, life: appSettings.TOAST_LIVE});
        }
    }

    async addBlacklistSelected() {
        try {
            let clients = this.state.clients.filter(client => !this.state.selectedClients.includes(client));
            let data = (await this.blacklistService.addToBlacklist(this.state.selectedClients));
            this.setState({
                clients: clients,
                addBlacklistDialog: false,
                selectedClient: this.emptyClient,
                amountClients: clients.length
            });

            this.toast.show({ severity: 'success', summary: i18n.t("successful"), detail: data.message, life: appSettings.TOAST_LIVE});
        } catch (e) {
            let response = e.response.data;
            this.setState({
                addBlacklistDialog: false
            });
            this.toast.show({ severity: 'error', summary: i18n.t("error"), detail: response.message, life: appSettings.TOAST_LIVE});
        }

        let clients = this.state.clients.filter(client => !this.state.selectedClients.includes(client));

        this.setState({
            clients: clients,
            addBlacklistDialogSelected: false,
            selectedClient: this.emptyClient,
            amountClients: clients.length
        });

        this.toast.show({ severity: 'success', summary: i18n.t("successful"), detail: i18n.t("addedClientsToTheBlacklist"), life: appSettings.TOAST_LIVE });
    }

    renderButtons(rowData) {
        const buttonStyle = {
            marginLeft: "0.5em"
        };

        return (
            <div>
                <Button style={buttonStyle} type="button" icon="pi pi-user-minus" className="p-button-warning"
                        tooltip={i18n.t("kick")}
                        onClick={() => {this.confirmKickClient(rowData)}}
                        tooltipOptions={{position: "top"}}/>
                <Button style={buttonStyle} type="button" icon="pi pi-ban" className="p-button-danger"
                        tooltip={i18n.t("addToTheBlacklist")}
                        onClick={() => {this.confirmAddBlacklist(rowData)}}
                        tooltipOptions={{position: "top"}}/>
            </div>
        );
    }

    renderHeader() {
        return (
            <div style={{textAlign: "left"}}>
                <span className="p-input-icon-left">
                    <i className="pi pi-search"/>
                <InputText
                    type="search"
                    onInput={ (e) => this.setState({globalFilter: e.target.value}) }
                    placeholder={i18n.t("globalSearch")}/>
                </span>
            </div>
        );
    }

    renderFooterGroup(amountClients) {
        return (
            <ColumnGroup>
                <Row>
                    <Column footer={i18n.t("activeClientsSummary")} colSpan={4} footerStyle={{textAlign: 'right'}}/>
                    <Column footer={amountClients} />
                </Row>
            </ColumnGroup>
        );
    }

    renderToolbarButton() {
        return (
            <>
                <Button label={i18n.t("kick")} icon="pi pi-user-minus" className="p-button-warning"
                        onClick={this.confirmKickClientsSelected}
                        disabled={!this.state.selectedClients || !this.state.selectedClients.length} />
                <div style={{marginLeft: "0.5em"}} />
                <Button label={i18n.t("addToTheBlacklist")} icon="pi pi-ban" className="p-button-danger"
                        onClick={this.confirmAddBlacklistSelected}
                        disabled={!this.state.selectedClients || !this.state.selectedClients.length} />
            </>
        );
    }

    render() {
        const header = this.renderHeader();

        return (
            <div>
                <Toast ref={(el) => this.toast = el} />
                <Toolbar style={{border: "none", borderRadius: "0px"}} left={this.renderToolbarButton()}/>
                <DataTable header={header}
                           value={this.state.clients}
                           totalRecords={this.state.totalRecords}
                           footerColumnGroup={this.renderFooterGroup(this.state.amountClients)}
                           selection={this.state.selectedClients}
                           onSelectionChange={(e) => this.setState({selectedClients: e.value})}
                           className="p-datatable-clients"
                           globalFilter={this.state.globalFilter}
                           emptyMessage={i18n.t("clientsNotFound")}
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
                    <Column field="username" header={i18n.t("username")} sortable />
                    <Column field="imei" header={i18n.t("IMEIHash")} sortable />
                    <Column field="token.valid_to" header={i18n.t("tokenValidTo")} sortable/>
                    <Column header={i18n.t("actions")} body={this.renderButtons} style={{width: '20vw'}} />
                </DataTable>

                <DialogQuestion headerText={i18n.t("confirm")} message={i18n.t("kickClientQuestion")}
                                visible={this.state.kickClientDialog}
                                onConfirm={this.kickClient}
                                onCancel={this.hideKickClientDialog}
                                onHide={this.hideKickClientDialog}/>

                <DialogQuestion headerText={i18n.t("confirm")} message={i18n.t("kickClientsQuestion")}
                                visible={this.state.kickClientsDialogSelected}
                                onConfirm={this.kickClientsSelected}
                                onCancel={this.hideKickClientsDialogSelected}
                                onHide={this.hideKickClientsDialogSelected}/>

                <DialogQuestion headerText={i18n.t("confirm")} message={i18n.t("addClientBlacklistQuestion")}
                                visible={this.state.addBlacklistDialog}
                                onConfirm={this.addBlacklist}
                                onCancel={this.hideAddBlacklistDialog}
                                onHide={this.hideAddBlacklistDialog}/>

                <DialogQuestion headerText={i18n.t("confirm")} message={i18n.t("addClientsBlacklistQuestion")}
                                visible={this.state.addBlacklistDialogSelected}
                                onConfirm={this.addBlacklistSelected}
                                onCancel={this.hideAddBlacklistDialogSelected}
                                onHide={this.hideAddBlacklistDialogSelected}/>
            </div>
        );
    }
}