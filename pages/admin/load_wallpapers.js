import React, { useState } from 'react'
import Link from 'next/link'
import Axios from 'axios'

const LoaderStepInputAuthor = (props) => {
  const [author, setAuthor] = useState("")
  return (
    <div>
      <label htmlFor="password">Podaj autora:</label> 
      <input 
        className="form-control"
        type="text"
        id="input-author"
        required
        autoFocus
        value={author}
        onChange={e => setAuthor(e.target.value)}/>
      <button className="btn" onClick={() => {props.onSubmit(author);}}>Szukaj cytatów</button>
    </div>
  )
};

const LoaderStepQuoteSelection = (props) => {
  const [selected, setSelected] = useState(props.quotes);
  const checkboxes = selected.map((quote) => {
    return <li key={quote} onClick={() => {
      setSelected(selected.filter((v) => v !== quote))
    }}>{quote}</li>;
  })
  return <div>
    Kliknij w cytaty które chcesz usunąć z dalszego procesowania:
    <ul>{checkboxes}</ul>
    <button className="btn" onClick={() => {props.onSubmit(selected);}}>Potwierdź</button>
  </div>
};

const LoaderStepProcessSingle = (props) => {
  return <div>
    {props.quote}
    <button className="btn" onClick={() => {props.onNext();}}>Następny</button>
  </div>
};

const LoaderStepProcessFinished = (props) => (
  <div>Proces zakończony
    <Link href={"/admin/menu?password=" + props.adminPassword}>
      <a className="btn btn-default">Powrót do menu</a>
    </Link>
  </div>
);

class LoadWallpapers extends React.Component {
  constructor() {
    super();
    this.state = {
      author: null,
      quotes: null,
      selectedQuotes: null
    }
  }
  render() {
    if (!this.state.author) {
      return <LoaderStepInputAuthor onSubmit={(author) => this.setState({author})}/>;
    }
    if (!this.state.quotes) {
      Axios.get(`/admin/quotes?author=${this.state.author}&password=${this.props.adminPassword}`).then(
        (data) => {
          this.setState({quotes: data.data})
        },
        (e) => console.log(e)
      );
      return <span>Ładowanie cytatów</span>
    }
    if (!this.state.selectedQuotes) {
      return <LoaderStepQuoteSelection quotes={this.state.quotes} onSubmit={(selectedQuotes) => this.setState({selectedQuotes})}/>
    }
    if (this.state.selectedQuotes.length > 0) {
      const processedQuote = this.state.selectedQuotes[0];
      return <LoaderStepProcessSingle onNext={()=> {
        this.setState({selectedQuotes: this.state.selectedQuotes.slice(1)});
      }} quote={processedQuote}/>
    }
    return <LoaderStepProcessFinished adminPassword={this.props.adminPassword}/>
  }
};

LoadWallpapers.getInitialProps = async (context) => {
  return {
    adminPassword: context.query.password
  }
}

export default LoadWallpapers;