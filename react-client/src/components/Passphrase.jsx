import React from 'react';

const Passphrase = (props) => {
  return (
    <div>
      <p>Your PassPhrase: {props.passphrase} </p>
      {/*<Button label='Generate a new PassPhrase' onClick={this.setNewPhrase.bind(this, 5, 'aA#')}/>*/}
    </div>
  )
}

export default Passphrase;
