import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // items: []
      game: ''
    }
  }

  search(user) {
    console.log(`${user} was searched`);
    $.ajax({
      type: 'POST',
      url: '/collection',
      // dataType: 'xml',
      // dataType: 'application/json',
      data: `${user}`,
      success: function (data) {
        console.log('success!');
        console.log('data in react: ', data);
        // console.log('game state in react', this.state.game);
      },
      error: function (err) {
        // console.log('error in react! ', err);
        console.log('RANDOMIZED GAME:', err.responseText);
        // this.setState({game: `${err.responseText}`})
        this.setState({game: err.responseText})
      }.bind(this)
    })
    // $.post('http://localhost:4321/collection', {data: `${user}`}, function (data) {
    //   console.log('success!', data);
    // })
  }

  render () {
    return (<div>
      <h1>BOARD GAME PICKER</h1>
      <Search onSearch={this.search.bind(this)} />
    <h3>{this.state.game}</h3>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
