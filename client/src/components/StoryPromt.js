import React from 'react';
import '../styles/StoryPromt.css';
import { InputGroup, Button, Input } from 'reactstrap';
import { FaTelegramPlane } from "react-icons/fa";

class StoryPromt extends React.Component {
  constructor() {
    super()
    this.state = {
      question: '',
      clone:'',
      message: '',
      count: 0,
      word:0
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.ask = this.ask.bind(this)
  }
  handleClick(e){
    this.setState({
      word:e.target.value
    })
  }
  async ask() {
    console.log(this.state.clone)
    await fetch('http://localhost:3001/server', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ "name": `${this.state.clone}` })
    }).then(response => response.json()).then(
      async (data) => {
        function sleep(ms) {
          return new Promise((resolve, reject) => {
            setTimeout(resolve, ms)
          })
        }
        let qn = this.state.clone.split(" ").length
        let arr = data["name"].split(" ")
        let answer = "";
        for(let i = 0 ; i < qn ; i++){
          answer += arr[i] + " "
        }
        this.setState({
          message: answer
        })
        for (let i = qn; i < arr.length; i++) {
          answer += arr[i] + " ";
          this.setState({
            message: answer
          })
          await sleep(100)
        }
      }
    ).catch(err => {
      console.log("this is an error")
    })
    this.setState({
      clone: this.state.message
    })
    function sleep(ms) {
      return new Promise((resolve, reject) => {
        setTimeout(resolve, ms)
      })
    }
    await sleep(100)
    if (this.state.count === 50 || this.state.message === "The model is loading please try again ") {
      this.setState({
        question:''
      })
      return
    }
    this.setState({
      count: this.state.count + 1
    })
    document.getElementById("bt").click()
    //this.setState({
    //  message: 'I am good'
    //})
  }
  handleChange(event) {
    this.setState({
      question: event.target.value
    })
    this.setState({
      clone: event.target.value
    })
  }
  render() {
    let res = this.state.message
    return (
      <div className='row'>
        <InputGroup className="qs">
          <Input value={this.state.word} onChange={this.handleClick} />
          <div className='col-xs-11 text'>
            <Input value={this.state.question} onChange={this.handleChange} />
          </div>
          <div className='col-xs-1'>
            <Button id="bt" color="success" onClick={this.ask}>Generate <FaTelegramPlane /></Button>
          </div>
        </InputGroup>
        <p className="answer">{res}</p>
      </div>
    )
  }
}

export default StoryPromt;
