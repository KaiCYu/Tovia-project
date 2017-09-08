import React from 'react';
import ReactDOM from 'react-dom';
import { Button} from '../../node_modules/react-toolbox/lib/button';
import { Input } from '../../node_modules/react-toolbox/lib/input';
import { DatePicker } from 'react-toolbox/lib/date_picker';
import { Dialog } from 'react-toolbox/lib/dialog';
// import EncryptPopup from './components/EncryptPopup';
import Passphrase from './components/Passphrase.jsx';

import $ from 'jquery';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      message: '',
      expireDate: '',
      passphrase: '',
      encoded: '',
      decoded: '',
      encryptActive: false,
      decryptActive: false,
    }

    this.encryptActions = [
      { label: "Close", onClick: this.handleToggle.bind(this, 'encryptActive') },
    ];

    this.decryptActions = [
      { label: "Close", onClick: this.handleToggle.bind(this, 'decryptActive') }
    ];

    this.handleChange = this.handleChange.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.setNewPhrase = this.setNewPhrase.bind(this);
    this.encrypt = this.encrypt.bind(this);
    this.decrypt = this.decrypt.bind(this);
  }

  componentWillMount() {
    let newPhrase = this.setNewPhrase(5, 'aA#');
    this.setState({passphrase: newPhrase});
  }

  handleChange(name, value){
    // console.log('name', name, 'value', value);
    this.setState({ [name]: value });
  };

  handleToggle(name){
    // console.log('name', name)
    this.setState({[name] : !this.state[name]});
  }

  setNewPhrase(length, chars) {
    var mask = '';
    if (chars.indexOf('a') > -1) mask += 'abcdefghijklmnopqrstuvwxyz';
    if (chars.indexOf('A') > -1) mask += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (chars.indexOf('#') > -1) mask += '0123456789';
    var result = '';
    for (var i = length; i > 0; --i) result += mask[Math.floor(Math.random() * mask.length)];
    // console.log(result);
    return result;
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
        console.log('successfully encrypted! data: ', data);
        this.setState({encoded: data, message: '', name: '', expireDate: ''});
        this.handleToggle('encryptActive');
      },
      error: (err) => {
        console.log('ERROR FROM ECRYPT:', err);
      }
    })
  }

  decrypt(event) {
    console.log('inside decrypt')
    event.preventDefault();
    $.ajax({
      url: 'decrypt',
      type: 'GET',
      data: {
        decoded: this.state.decoded,
        passphrase: this.state.passphrase,
      },
      success: (data) => {
        console.log('successfully decrypted!!', data);
        this.setState({message: data, decoded: '', encoded: ''});
        this.handleToggle('decryptActive');

      },
      error: (err) => {
        console.log('ERROR FROM DECRYPT:', err.responseText)
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
        <Button label='Decrypt!' onClick={() => this.handleToggle('decryptActive')}/>
      </section>

      <Passphrase passphrase={this.state.passphrase} setNewPhrase={this.setNewPhrase} handleChange={this.handleChange}/> 

      <Dialog
        title='Encrypt/Decrypt'
        actions={this.encryptActions}
        active={this.state.encryptActive}
        onEscKeyDown={() => this.handleToggle('encryptActive')}
        onOverlayClick={() => this.handleToggle('encryptActive')}
      >
        <Input type='text' multiline label='Message' maxLength={200} value={this.state.encoded} />
      </Dialog>

      <Dialog
        title='Decrypt'
        actions={this.decryptActions}
        active={this.state.decryptActive}
        onEscKeyDown={() => this.handleToggle('decryptActive')}
        onOverlayClick={() => this.handleToggle('decryptActive')}
      >
        <Input type='text' multiline label='Message' maxLength={200} value={this.state.decoded} onChange={this.handleChange.bind(this, 'decoded')}/>
        <Button label='Decrypt' onClick={this.decrypt}/>
      </Dialog>

    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
