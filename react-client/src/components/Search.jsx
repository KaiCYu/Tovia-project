import React from 'react';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: ''
    }
  }

  onChange (e) {
    this.setState({
      query: e.target.value
    });
  }

  search() {
    this.props.onSearch(this.state.query);
  }

  render() {
    return (<div>
      <h4>randomize your game!!</h4>
    Enter a BoardGameGeek username: <input value={this.state.query} onChange={this.onChange.bind(this)}/>
  <button onClick={this.search.bind(this)}> RANDOMIZE </button>
    </div>)
  }
}

export default Search;
