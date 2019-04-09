import React, { Component } from "react";
import DataProvider from "../components/DataProvider";

export default class Contact extends Component {
  constructor() {
    super();
    this.state = {
      messageSent: false
    };
  }

  sendMessage = event => {
    DataProvider.sendMessage(
      event.target.emailInput.value,
      event.target.emailContent.value
    );
    this.setState({
      messageSent: true
    });
  };

  render() {
    if (this.state.messageSent === true)
      return <h2>Wiadomość wysłana, dziękujemy</h2>;
    return (
      
      <form onSubmit={this.sendMessage}>
        <h2>Kontakt</h2>
        <div className="form-group">
          <label htmlFor="emailInput">Twój adres E-mail</label>
          <input
            name="emailInput"
            type="email"
            className="form-control"
            placeholder="Email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="emailContent">Wiadomość</label>
          <textarea name="emailContent" className="form-control" rows="3" />
        </div>
        <button className="btn btn-default" type="submit">
          Wyślij
        </button>
      </form>
      
    );
  }
}
