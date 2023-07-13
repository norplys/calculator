import React from 'react'
import './App.scss'
import Display from './assets/component/display';
import Number from './assets/component/number';
import { bank } from './assets/bank/buttonbank';

class App extends React.Component{
  constructor(){
    super();
    this.state = {
      listnumber : '',
      number : null,
      isCalculate : false,
      fullStop : false,
    }
  };


  handleClick(event){
    const regex = /[^0-9]$/
    if(event === '='){
      if(regex.test(this.state.listnumber) === false && this.state.isCalculate === false && this.state.listnumber !== ''){
      let number = eval(this.state.listnumber);
      let total = number.toFixed(4);
      this.setState({
        number : parseFloat(total),
        isCalculate : true,
        fullStop : false,
        
      });
    } else if(regex.test(this.state.listnumber) === true || this.state.isCalculate === true || this.state.number !== '' || this.state.listnumber === ''){
      this.setState({
        listnumber : this.state.listnumber,
        isCalculate : false,
        
        fullStop : false
      });
    }
    }
    else if(event === '.' && this.state.fullStop === true){
      this.setState({
        listnumber : this.state.listnumber,
        isCalculate : false,
      })
    }
    else if((event === '+' || event === '-' || event === '*' || event === '/' || event === '.') && (regex.test(this.state.listnumber) === false)){
      if (event === '.'){
        this.setState({
          listnumber : this.state.listnumber + event,
          fullStop : true,
        });
      }
      else{
      this.setState({ 
        listnumber : this.state.listnumber + event,
        number : null,
        isCalculate : false,
        fullStop : false 
      })
    }
    }
    else if((event === '+' || event === '-' || event === '*' || event === '/' || event === '.') && (regex.test(this.state.listnumber) === true)){
      if(event === '.'){
        this.setState({
          listnumber : this.state.listnumber ,
        })
      }
      else{
      let splitting = this.state.listnumber.split(''); 
      splitting.pop();
      this.setState({ 
        listnumber : splitting.join('') + event,
        number : null,
        isCalculate : false,
        fullStop : false
      })
    }
    }
    else if(event === 'AC'){
      this.setState({
        listnumber : '',
        number : null,
        fullStop : false,
      })
    }
    else if(event != 'AC' && event != '=' && this.state.isCalculate === false){
    this.setState({
      listnumber : this.state.listnumber + event,
      
      isCalculate : false
    })
  } 
    else if(this.state.isCalculate === true){
    this.setState({
      listnumber : '' + event,
      number : null,
      
      isCalculate : false,
      fullStop : false
    })
  }
  };


  render(){
    return(
      <>
        <div id='container'>
          <Display total = {this.state.number} list = {this.state.listnumber}/>
          <section id = "button-container">
            {bank.map(each => {
                return <Number key = {each.id} clickHandler = {this.handleClick.bind(this)} class = {each.class} id = {each.value} text = {each.id} keyCode = {each.keyCode}/>
            })}
          </section>
        </div>      
        <div id="subtitle">Coded and Deployed by <p id ="name">Norplys</p></div>
        </>
    )
  };
}

export default App
