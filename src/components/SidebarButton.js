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

import React, {Component} from "react";
import {MainSidebar} from "./MainSidebar";
import {Button} from "primereact/button";

export class SidebarButton extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isSidebarVisible: false
        };

        this.onHideSidebar = this.onHideSidebar.bind(this);
    }

    onHideSidebar(path) {
        this.setState({
            isSidebarVisible: false
        });
        if(path !== undefined) {
            this.props.tabMenuRef.current.setActiveIndex(path);
        }
    }

    render() {
        return (
            <div>
                <MainSidebar refresh={this.props.refresh} onShowSidebar={this.state.isSidebarVisible} onHideSidebar={this.onHideSidebar}/>
                <Button icon="pi pi-bars" className="p-button-secondary"
                        style={{ position: "sticky", marginLeft: "0.3em", float: "left"}}
                        onClick={()=>{ this.setState({isSidebarVisible: true}) }} />
            </div>
        );
    }
}