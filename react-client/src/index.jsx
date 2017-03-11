import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // items: []w
    }
  }

  search(user) {
    console.log(`${user} was searched`);

    $.ajax({
      type: 'POST',
      url: '/collection',
      dataType: 'xml',
      data: `hi from search data`,
      // dataType: 'application/json',
      success: function (data) {
        console.log('success!');
      },
      error: function (err) {
        console.log('error! ', err);
      }
    })

  }

  render () {
    return (<div>
      <h1>BOARD GAME PICKER</h1>
      <Search onSearch={this.search.bind(this)} />
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
