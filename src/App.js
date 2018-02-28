import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import $ from 'jquery';
import { Form } from './Component/Form';
import { Content } from './Component/Content';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
class App extends Component {
  componentDidMount(){
      var THIS = this;
          $.ajax({
            url: "http://localhost:3200/employee",
            type: "GET",
            data: {},
            dataType: 'json',
            success: function(data) {
              THIS.setState({resp: data})
            }
          });

      this.setState({lists: [
        {
          fullname: "Jane Raos",
          dept: "IT Department"
        },
        {
          fullname: "Dela Roysa",
          dept: "Engineering Department"
        }
      ]
        })
  }





  render() {
    return (
      <div>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React</h1>
          </header>
          <p className="App-intro">
            To get started, edit <code>src/App.js</code> and save to reload.
          </p>
        </div>
        <div>
          <Form />
          <Content />
        </div>
      </div>
    );
  }
}

export default App;
