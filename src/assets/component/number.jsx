import React from "react";

export default class Number extends React.Component{
    constructor(){
    super();
    this.keydown = this.keydown.bind(this);
    };
    componentDidMount(){
        window.addEventListener('keydown' , this.keydown)
    }
    componentWillUnmount(){
        window.removeEventListener('keydown' , this.keydown)
    }
    keydown (event){
        if(event.keyCode === this.props.keyCode){
            this.props.clickHandler(this.props.text);
            this.props.op(this.props.class);
        }
    }
    render(){
        return(
            <button  onClick={() => {this.props.clickHandler(this.props.text) ; this.props.op(this.props.class)}} className={this.props.class} id = {this.props.id}>{this.props.text}</button>
        )
    }
}3