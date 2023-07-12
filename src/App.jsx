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
      fullStop : false,
    }
  };

  componentDidUpdate(pp,ps){
    const regex = /^[^0-9]/;
    if(regex.test(this.state.listnumber) === true && this.state.number !== 'ERROR' && this.state.listnumber !== ''){
    this.setState({
      number : 'ERROR',
      isCalculate : true
    })
  }
    if(ps.operator === 'operator' && this.state.operator === 'operator' && this.state.now != ps.now && this.state.now != '' && this.state.now !== '=' && this.isCalculate === false){
      let listnumber = ps.listnumber.split('');
      listnumber.pop();
      this.setState({
        listnumber : listnumber.join('') + this.state.now,
        now : ''
      })
    }
    else if(ps.operator === 'operator' && this.state.operator === 'operator' && this.state.now != ps.now && this.state.now === '='){
        this.setState({
          listnumber : this.state.listnumber,
          now : ''
        })
    }
    else if(ps.now === this.state.now && this.state.operator === 'operator'){
      this.setState({
        listnumber : ps.listnumber,
        now : ''
      })
    };
  }

  operatorHandler(event){
    this.setState({
      operator : event
    })

  }

  handleClick(event){
    if(event === '='){
      const regex = /[^0-9]$/;
      if(regex.test(this.state.listnumber) === false && this.state.isCalculate === false && this.state.listnumber !== ''){
      let number = eval(this.state.listnumber);
      let total = number.toFixed(4);
      this.setState({
        number : parseFloat(total),
        isCalculate : true,
        fullStop : false,
        now : event,
      });
    } else if(regex.test(this.state.listnumber) === true || this.state.isCalculate === true || this.state.number !== '' || this.state.listnumber === ''){
      this.setState({
        isCalculate : false,
        now : event,
        fullStop : false
      });
    }
    }
    else if(event === '.' && this.state.fullStop === false){
      console.log(this.state.fullStop);
      this.setState({
        listnumber : this.state.listnumber + event,
        number : null,
        now : event,
        isCalculate : false,
        fullStop : true
      })
    }
    else if(event === '.' && this.state.fullStop === true){
      this.setState({
        listnumber : this.state.listnumber,
        now : event,
        isCalculate : false,
      })
    }
    else if(event === '+' || event === '-' || event === '*' || event === '/' && this.state.isCalculate === false){
      this.setState({
        listnumber : this.state.listnumber + event,
        number : null,
        now : event,
        isCalculate : false,
        fullStop : false
      })
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
      now : event,
      isCalculate : false
    })
  }
    else if(this.state.isCalculate === true){
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
      <>
        <div id='container'>
          <Display total = {this.state.number} list = {this.state.listnumber}/>
          <section id = "button-container">
            {bank.map(each => {
                return <Number op = {this.operatorHandler.bind(this)} key = {each.id} clickHandler = {this.handleClick.bind(this)} class = {each.class} id = {each.value} text = {each.id} keyCode = {each.keyCode}/>
            })}
          </section>
        </div>      
        <div id="subtitle">Coded and Deployed by <p id ="name">Norplys</p></div>
        </>
    )
  };
}

export default App
