import React, { Component } from "react";

export default class Conatact extends Component {
  constructor() {
    super();
    this.state = {
      messageSent: false
    };
  }
  sendMessage = () => {
    this.setState({
      messageSent: true
    });
  };
  render() {
    if (this.state.messageSent === true)
      return <h2>Wiadomość wysłana, dziękujemy</h2>;
    return (
      <form>
        <h2>Kontakt</h2>
        <div className="form-group">
          <label>Twój adres E-mail</label>
          <input type="email" className="form-control" placeholder="Email" />
        </div>
        <div className="form-group">
          <label>Wiadomość</label>
          <textarea className="form-control" rows="3" />
        </div>
        <button className="btn btn-default" onClick={this.sendMessage}>
          Wyślij
        </button>
      </form>
    );
  }
}
