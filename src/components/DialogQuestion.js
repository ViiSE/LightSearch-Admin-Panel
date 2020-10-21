import React from "react";
import {Component} from "react";
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