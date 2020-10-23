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

import React from "react";
import {Component} from "react";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {LogService} from "../service/LogService";
import {InputText} from "primereact/inputtext";
import {Dropdown} from "primereact/dropdown";
import {Row} from "primereact/row";
import {ColumnGroup} from "primereact/columngroup";
import i18n from "i18next";
import {Calendar} from "primereact/calendar";
import {getCalendarLocation} from "../utils/Translate";

export class DataTableLogs extends Component {

    constructor(props) {
        super(props);

        this.state = {
            logs: null,
            logsAmount: 0,
            searchText: "",
            date: null,
            types: [],
            selectedTypes: null,
            searchChips: [],
            minDate: null,
            maxDate: null,
            isMobile: !(window.innerWidth > 600)
        };

        this.logService = new LogService();
        this.delaySearchTimer = null;
        this.handleSearch = this.handleSearch.bind(this);

        this.headerTemplate = this.headerTemplate.bind(this);
        this.typeBodyTemplate = this.typeBodyTemplate.bind(this);
        this.onTypeFilterChange = this.onTypeFilterChange.bind(this);
        this.onMessageFilterInput = this.onMessageFilterInput.bind(this);
        this.typeItemTemplate = this.typeItemTemplate.bind(this);
    }

    componentDidMount() {
        window.addEventListener('resize', this.updateDimensions);
        this.logService.getLogs().then(data => {
            let datesLog = [];

            data.logs.forEach(log => {
                datesLog.push(log.date);
            });

            let sortDatesLog = datesLog.sort();
            let minDateArr = sortDatesLog[0].split("-").map(d=>+d);
            let maxDateArr = sortDatesLog[sortDatesLog.length - 1].split("-").map(d=>+d);

            let minDate = new Date(minDateArr[2], minDateArr[1]-1, minDateArr[0]);
            let maxDate = new Date(maxDateArr[2], maxDateArr[1]-1, maxDateArr[0]);

            this.setState({
                logs: data.logs,
                logsAmount: data.logs.length,
                types: data.types,
                minDate: minDate,
                maxDate: maxDate
            });
        });
    }


    componentWillUnmount() {
        window.removeEventListener('resize', this.updateDimensions);
    }

    updateDimensions = () => {
        if(window.innerWidth <= 600) {
            this.setState({ isMobile: true });
        } else {
            this.setState({ isMobile: false });
        }
    };

    componentDidUpdate (prevProps, prevState) {
        if(prevState.searchText !== this.state.searchText) {
            this.handleSearch();
        }
    }

    handleSearch = () => {
        clearTimeout(this.delaySearchTimer);
        this.delaySearchTimer = setTimeout(() => {
            this.setState({globalFilter: this.state.searchText})
        }, 500);
    };

    headerTemplate(data) {
        return (
            <div className="p-card" style={{padding: "0.5em", display: "inline-block"}}>
                <div style={{fontWeight: "bold", fontSize: "16pt"}}>{data.date}</div>
            </div>
        );
    }

    footerTemplate() {
        return (<></>);
    }

    typeBodyTemplate(rowData) {
        if (rowData.type === "Error") {
            return (
                <div style={{color: "#D32F2F", fontWeight: "bold"}}>
                    {rowData.type}
                </div>);
        } else {
            return (
                <div style={{color: "#689F38", fontWeight: "bold"}}>
                    {rowData.type}
                </div>
            )
        }
    }

    renderHeader() {
        return (
            <div style={{textAlign: "left"}}>
                <span className="p-input-icon-left">
                    <i className="pi pi-search"/>
                    <InputText
                        type="search"
                        onInput={ (e) => this.setState({searchText: e.target.value}) }
                        placeholder={i18n.t("globalSearch")}/>
                </span>
                {this.state.isMobile ? <div/> :
                <Calendar ref={(cal) => this.cal = cal}
                          dateFormat="dd.mm.yy" placeholder={i18n.t("pickADate")}
                          value={this.state.date}
                          style={{width: "300px", marginLeft: "0.5em", textAlign: "left"}}
                          minDate={this.state.minDate}
                          maxDate={this.state.maxDate}
                          readOnlyInput
                          showButtonBar
                          locale={getCalendarLocation(this.props.lang)}
                          onChange={(e) => {
                              this.setState({date: e.value});
                              try {
                                  let dt = e.value;
                                  let day = dt.getDate();
                                  let zero = (day / 10) < 1 ? "0" : "";
                                  let month = dt.getMonth() + 1;
                                  let year = dt.getFullYear();
                                  let res = [day, month, year].join(".");
                                  this.onMessageFilterInput(zero + res);
                              } catch (er) {
                                  this.onMessageFilterInput("");
                              }
                          }}/>
                }
            </div>
        );
    }

    renderFooterGroup(logsAmount) {
        let str = i18n.t("recordsSummary") + " " + logsAmount;
        return (
            <ColumnGroup>
                <Row>
                    <Column footer={str} colSpan={3} footerStyle={{textAlign: 'right'}}/>
                </Row>
            </ColumnGroup>
        );
    }

    renderTypeFilter() {
        return (
            <Dropdown value={this.state.selectedTypes} options={this.state.types} onChange={this.onTypeFilterChange}
                      itemTemplate={this.typeItemTemplate}
                      showClear
                      placeholder={i18n.t("selectAType")}
                      className="p-column-filter"
                      /*style={{width: "10.5em"}}*//>
        );
    }

    renderMessageFilter() {
        return (
                <InputText style={{width: "30em"}}
                       onInput={(e) => this.onMessageFilterInput(e.target.value)}
                       className="p-column-filter"
                       placeholder={i18n.t("searchByMessage")}/>
        );
    }

    typeItemTemplate(option) {
        if (option === "Error") {
            return (
                <span style={{color: "#D32F2F", fontWeight: "bold"}}>
                    {option}
                </span>);
        } else {
            return (
                <span style={{color: "#689F38", fontWeight: "bold"}}>
                    {option}
                </span>
            )
        }
    }

    onTypeFilterChange(event) {
        this.dt.filter(event.value, 'type', 'equals');
        this.setState({selectedTypes: event.value});
    }

    onMessageFilterInput(text) {
        this.dt.filter(text, 'msg', 'contains');
    }

    render() {
        const header = this.renderHeader();
        const typeFilter = this.renderTypeFilter();
        const msgFilter = this.renderMessageFilter();

        return (
            <div>
                <DataTable ref={(el) => this.dt = el}
                           header={header}
                           value={this.state.logs}
                           rowGroupMode="subheader"
                           groupField="date"
                           emptyMessage={i18n.t("logsNotFound")}
                           sortMode="single"
                           sortField="date"
                           globalFilter={this.state.globalFilter}
                           rowGroupHeaderTemplate={this.headerTemplate}
                           rowGroupFooterTemplate={this.footerTemplate}
                           footerColumnGroup={this.renderFooterGroup(this.state.logsAmount)}
                           sortOrder={1}
                           paginator={true}
                           rows={10}
                           rowsPerPageOptions={[10,25,50]}
                           responsive
                           paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                           currentPageReportTemplate={i18n.t("from") + " {first} " + i18n.t("to") + " {last} " + i18n.t("of") + " {totalRecords}"}>
                    <Column header="#" body={(data, props) => props.rowIndex + 1} style={{width: "5%", color:"gray"}}/>
                    <Column field="type" body={this.typeBodyTemplate} header={i18n.t("type")} style={{width: "10%"}}
                            filter
                            filterElement={typeFilter}/>
                    <Column field="msg" header={i18n.t("message")} style={{width: "85%", wordWrap: "break-word"}}
                            filter={!this.state.isMobile}
                            filterElement={msgFilter}
                            />
                </DataTable>
            </div>
        );
    }
}