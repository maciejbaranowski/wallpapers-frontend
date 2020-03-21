import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Axios from 'axios'
import DataProvider from '../../components/DataProvider'

const LoaderStepInputAuthor = (props) => {
  const [author, setAuthor] = useState("Mark Twain")
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

const LoaderStepProcessSingleImageChoice = props => {
  const [images, setImages] = useState([]);
  useEffect(() => {
    DataProvider.getPlainImagesList().then((data) => {
      const allImages = data.data;
      const numberOfPickedImages = 20;
      const pickedImages = Array(numberOfPickedImages).fill().map(()=> {
        const randomIndex = Math.floor(Math.random() * allImages.length);
        return allImages[randomIndex];
      });
      setImages(pickedImages);
    });
  }, []);
  return <div>
    <h3>{props.quote}</h3><br/>
    <span>Wybierz tło do tego cytatu:</span><br/>
    <div className="image-choice">
      {images.map(image => (
        <div onClick={()=>props.onImageChoice(image)} key={image}><img src={`https://api.tapetycytaty.pl/img/${image}`}/></div>
      ))}
    </div>
  </div>;
}

const LoaderStepProcessSingleConfirm = props => {
  const [image, setImage] = useState(null);
  useEffect(() => {
    Axios.get(`/admin/generate?password=${props.adminPassword}&quote=${props.quote}&backgroundImage=${props.backgroundImage}`).then((data) => {
      setImage(data.data);
    });
  }, []);
  return <div>
    <h3>{props.quote}</h3>
    {!image ? <span>Ładowanie obrazu...</span> : <img src={`${image}?${performance.now()}`}/>}
    <br/>
    <button className="btn" onClick={() => {props.onNext();}}>Następny</button>
  </div>
}
const LoaderStepProcessSingle = (props) => {
  const [backgroundImage, setBackgroundImage] = useState(null);
  if (!backgroundImage) {
    return <LoaderStepProcessSingleImageChoice {...props} onImageChoice={(imagePath)=> {setBackgroundImage(imagePath)}}/>
  } else {
    return <LoaderStepProcessSingleConfirm {...props} backgroundImage={backgroundImage} onNext={() => {setBackgroundImage(null); props.onNext()}}/>
  }
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
      }} quote={processedQuote} adminPassword={this.props.adminPassword}/>
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