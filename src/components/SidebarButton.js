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