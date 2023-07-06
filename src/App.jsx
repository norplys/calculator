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
      now : '',
      operator : '',
      isCalculate : false,
    }
  };

  componentDidUpdate(pp,ps){
    const regex = /^[^0-9]/
    if(regex.test(this.state.listnumber) === true && this.state.number !== 'ERROR' && this.state.listnumber !== ''){
    this.setState({
      number : 'ERROR'
    })
  }
    if(ps.operator === 'operator' && this.state.operator === 'operator' && this.state.now != ps.now && this.state.now != ''){
      let listnumber = ps.listnumber.split('');
      listnumber.pop();
      console.log(listnumber)
      this.setState({
        listnumber : listnumber.join('') + this.state.now,
        now : ''
      })
    }
    else if(ps.now === this.state.now && this.state.operator === 'operator'){
      this.setState({
        listnumber : ps.listnumber,
        now : ''
      })
    }
  }

  operatorHandler(event){
    this.setState({
      operator : event
    })

  }

  handleClick(event){
    if(event === '='){
      const regex = /[^0-9]$/
      if(regex.test(this.state.listnumber) === false){
      this.setState({
        number : eval(this.state.listnumber),
        isCalculate : true
      })
    } else if(regex.test(this.state.listnumber) === true){
      this.setState({
        listnumber : '',
        number : 'ERROR'
      })
    }
    }
    else if(event === 'AC'){
      this.setState({
        listnumber : '',
        number : null
      })
    }
    
    else if(event != 'AC' && event != '=' && this.state.isCalculate === false){
    this.setState({
      listnumber : this.state.listnumber + event,
      now : event,
      isCalculate : false
    })
  }
    else if(event != 'AC' && event != '=' && this.state.isCalculate === true){
    this.setState({
      listnumber : '' + event,
      number : null,
      now : event,
      isCalculate : false
    })
  }
  };


  render(){
    return(
        <div id='container'>
          <Display total = {this.state.number} list = {this.state.listnumber}/>
          <section id = "button-container">
            {bank.map(each => {
                return <Number op = {this.operatorHandler.bind(this)} key = {each.id} clickHandler = {this.handleClick.bind(this)} class = {each.class} id = {each.value} text = {each.id} keyCode = {each.keyCode}/>
            })}
          </section>
        </div>      
    )
  };
}

export default App
