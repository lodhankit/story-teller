import './App.css';
import React from 'react';
const { Configuration, OpenAIApi } = require("openai");
class App extends React.Component {
  constructor() {
    super()
    this.state = {
      question: '',
      message: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.ask = this.ask.bind(this)
  }
  ask() {
   
    this.setState({
      message: 'I am good'
    })
  }
  handleChange(event) {
    this.setState({
      question: event.target.value
    })
  }
  render() {
    let res = this.state.message
    return (<div>
      <input value={this.state.question} onChange={this.handleChange} />
      <button onClick={this.ask}>Story Time!</button>
      <p>{res}</p>
    </div>)
  }
}

export default App;
