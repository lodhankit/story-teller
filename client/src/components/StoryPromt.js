import React from 'react';
import '../styles/StoryPromt.css';
import { InputGroup, Button, Input } from 'reactstrap';
import { FaTelegramPlane } from "react-icons/fa";
import Progressbar from './Progressbar';

class StoryPromt extends React.Component {
  constructor() {
    super()
    this.state = {
      question: '',
      clone: '',
      message: '',
      count: 0,
      word: 1,
      wordsize: 0
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.ask = this.ask.bind(this)
  }
  handleClick(e) {
    this.setState({
      word: e.target.value
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
        for (let i = 0; i < qn; i++) {
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
          if (answer.length % 2 === 0) {
            this.setState({
              wordsize: this.state.wordsize + 1
            })
          }
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
        question: ''
      })
      this.setState({
        wordsize: 100
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
    let generated = "";
    if(this.state.wordsize === 100){
       generated = "The story is generated!!!"
    }
    return (
      <div>
        <div className='row'>
          <InputGroup className="tk">
            <div className='col-xs-11 tokens'>
              <Input value={this.state.word} onChange={this.handleClick} />
            </div>
            <div className='col-xs-1'>
              <Button color="primary">Tokens Number</Button>
            </div>
          </InputGroup>
        </div>
        <div className='row'>
          <InputGroup className="qs">
            <div className='col-xs-11 text'>
              <Input value={this.state.question} onChange={this.handleChange} />
            </div>
            <div className='col-xs-1'>
              <Button id="bt" color="success" onClick={this.ask}>Generate <FaTelegramPlane /></Button>
            </div>
          </InputGroup>
        </div>
        <div className='pgb row'>
          <h3 class="pbh">Progress of generated Story</h3>
          <Progressbar progress={this.state.wordsize} />
          <p className="answer">{res}</p>
        </div>
        <h4>{generated}</h4>
      </div>
    )
  }
}

export default StoryPromt;
