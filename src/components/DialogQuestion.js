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
import {Dialog} from "primereact/dialog";
import {Button} from "primereact/button";

export class DialogQuestion extends Component {

    constructor(props) {
        super(props);
        this.renderFooter = this.renderFooter.bind(this);
    }

    renderFooter() {
        return (
            <>
                <Button icon="pi pi-times" className="p-button-text" onClick={this.props.onCancel}/>
                <Button icon="pi pi-check" className="p-button-text" onClick={this.props.onConfirm}/>
            </>
        );
    }

    render() {
        const footer = this.renderFooter();

        return (
            <Dialog visible={this.props.visible}
                    style={{ width: '30vw', backgroundColor: "#007ad9", color:"white" }}
                    modal
                    header={this.props.headerText}
                    footer={footer}
                    onHide={this.props.onHide}>
                <div>
                    <div className="pi pi-question-circle" style={{fontSize: "1.5em"}}/>
                    <br/>
                    {this.props.message}
                </div>
            </Dialog>
        );
    }
}