import React from 'react';
import ReactDOM from 'react-dom';
import { Button} from '../../node_modules/react-toolbox/lib/button';
import { Input } from '../../node_modules/react-toolbox/lib/input';
import { DatePicker } from 'react-toolbox/lib/date_picker';

import $ from 'jquery';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      message: '',
      expireDate: '',
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(name, value){
    // console.log('name', name, 'value', value);
    this.setState({ [name]: value });
  };

  render () {
    return (
    <div>
      <h1>Tovia's Enigma</h1>
      
      <section> 
        <Input type='text' label='Name' name='name' value={this.state.name} onChange={this.handleChange.bind(this, 'name')} maxLength={16} />
        <Input type='text' label='Message' name={'message'} value={this.state.message} onChange={this.handleChange.bind(this, 'message')} maxLength={ 120 }></Input>

        <DatePicker
          label='Expiration date'
          minDate={new Date()}
          onChange={this.handleChange.bind(this, 'expireDate')}
          value={this.state.expireDate}
          sundayFirstDayOfWeek
        />
        <Button label='Hello World!' />,
      </section>

    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
