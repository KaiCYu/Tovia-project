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
      passphrase: '',
    }
    this.handleChange = this.handleChange.bind(this);
    this.setNewPhrase = this.setNewPhrase.bind(this);
    this.encrypt = this.encrypt.bind(this);
  }

  componentDidMount() {
    this.setNewPhrase(5, 'aA#');
  }

  handleChange(name, value){
    // console.log('name', name, 'value', value);
    this.setState({ [name]: value });
  };

  setNewPhrase(length, chars) {
    var mask = '';
    if (chars.indexOf('a') > -1) mask += 'abcdefghijklmnopqrstuvwxyz';
    if (chars.indexOf('A') > -1) mask += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (chars.indexOf('#') > -1) mask += '0123456789';
    var result = '';
    for (var i = length; i > 0; --i) result += mask[Math.floor(Math.random() * mask.length)];
    this.setState({passphrase: result});
  }

  encrypt(event) {
    event.preventDefault();
    $.ajax({
      url: '/encrypt',
      type: 'POST',
      data: {
        name: this.state.name,
        message: this.state.message,
        expireDate: this.state.expireDate,
        passphrase: this.state.passphrase,
      },
      success: (data) => {
        console.log('success! data: ', data);
      },
      error: (err) => {
        console.log('ERRORED:', err);
      }
    })
  }

  render () {
    return (
    <div>
      <h1>Tovia's Enigma</h1>
      
      <section> 
        <Input type='text' label='Name' name='name' value={this.state.name} onChange={this.handleChange.bind(this, 'name')} maxLength={16} />
        <Input type='text' label='Message' name={'message'} value={this.state.message} onChange={this.handleChange.bind(this, 'message')} maxLength={ 120 }></Input>

        <DatePicker
          label='Expiration date'
          minDate={new Date(2017, 8, 15)}
          onChange={this.handleChange.bind(this, 'expireDate')}
          value={this.state.expireDate}
          sundayFirstDayOfWeek
        />
        <Button label='Encrypt!' onClick={this.encrypt}/>
        <Button label='Decrypt!'/>
      </section>
      
      <p>Your PassPhrase: {this.state.passphrase} </p>
      <Button label='Generate a new PassPhrase' onClick={this.setNewPhrase.bind(this, 5, 'aA#')}/>

    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
