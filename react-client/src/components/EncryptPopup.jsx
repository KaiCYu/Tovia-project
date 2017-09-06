import Dialog from 'react-toolbox/lib/dialog';

class DialogTest extends React.Component {
  constructor(props) {

  }
  actions = [
    { label: "Cancel", onClick: this.handleToggle },
    { label: "Save", onClick: this.handleToggle }
  ];

  render () {
    return (
      <div>
        <Dialog
          actions={this.actions}
          active={this.state.active}
          onEscKeyDown={this.handleToggle}
          onOverlayClick={this.handleToggle}
          title='Encrypt/Decrypt'
        >
          <p>Here you can add arbitrary content. Components like Pickers are using dialogs now.</p>
          <Input type='text' multiline label='Message' maxLength={200} value={this.state.encoded} />

        </Dialog>
      </div>
    );
  }
}

export default EncryptPopup;