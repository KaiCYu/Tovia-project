import React from 'react';
import { Button} from '../../../node_modules/react-toolbox/lib/button';

const Passphrase = (props) => {
  return (
    <div>
      <p>Your PassPhrase: {props.passphrase} </p>
      <Button label='Generate a new PassPhrase' onClick={() => props.handleChange('passphrase', props.setNewPhrase(5, 'aA#'))}/>
    </div>
  )
}

export default Passphrase;
