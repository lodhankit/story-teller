import React from 'react';
import '../styles/StoryPromt.css';
import { InputGroup, Button, Input } from 'reactstrap';
import { FaTelegramPlane } from "react-icons/fa";

class StoryPromt extends React.Component {
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
    await fetch('http://localhost:3001/server', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ "name": `write a complete story about ${this.state.question}` })
    }).then(response => response.json()).then(
      async (data) => {
        this.setState({
          question:''
        })
        function sleep(ms){
          return new Promise((resolve,reject)=>{
            setTimeout(resolve,ms)
          })
        }
        let arr = data["name"].split(" ")
        let answer = "";
        for(let i = 0 ; i < arr.length ; i++){
          if(arr[i] === '[newline]'){
            arr[i] = '\n';
          }
          answer += arr[i]+" ";
          this.setState({
            message:answer
          })
          await sleep(100)
        }
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
  return (
  <div>
    <InputGroup>
        <Input value={this.state.question} onChange={this.handleChange} />
        <Button color="success" onClick={this.ask}>Generate <FaTelegramPlane/></Button>
    </InputGroup> 
    <p>{res}</p>
  </div>
  )
}
}

export default StoryPromt;
