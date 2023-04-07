import './App.css';
import React from 'react';
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
  async ask() {
    console.log(this.state.question)
    await fetch('http://localhost:3001/server',{
      method:'POST',
      headers: {
        'Content-Type': 'application/json'
    },
      body: JSON.stringify({"name":`${this.state.question}`})
    }).then(response => response.json()).then(
      data => {
        this.setState({
          message:data["name"]
        })
      }
    ).catch(err => {
      console.log("this is an error")
    })
    //this.setState({
    //  message: 'I am good'
    //})
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
