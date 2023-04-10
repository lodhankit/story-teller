import React, { Component } from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';
import '../styles/StoryPromt.css';

class Progressbar extends Component {
    constructor(props){
        super(props)
    }
    render(){
        return <ProgressBar className='pb' animated now={this.props.progress} />;
    }
}

export default Progressbar;