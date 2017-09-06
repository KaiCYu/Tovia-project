import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from '../../node_modules/react-toolbox/lib/button';
import $ from 'jquery';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render () {
    return (
    <div>
      <h1>Tovia's Enigma</h1>

      <Button label="Hello World!" />,

    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
