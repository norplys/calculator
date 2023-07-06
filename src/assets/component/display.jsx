import React from "react";

export default class Display extends React.Component{
    constructor(){
        super();
    };
    render(){
        return(
            <>
            <div id="display-container">
                <div id="array">{this.props.list}</div>
                <div id="input">{this.props.total}</div>
            </div>
            </>
        )
    }
}