import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import WallpaperList from "./WallpaperList";
import CategoriesList from "./CategoriesList";
import FullImage from "./FullImage";
import Navigation from "./Navigation";
import { NotFound, Licence, Contact } from "./Static";

const Home = () => (
  <div>
    <h2>Strona główna</h2>
    <WallpaperList category="" page="0" searchPhrase="" />
  </div>
);

const WallpaperListWrapper = match => {
  let category = match.match.params.categoryId ? match.match.params.categoryId : "";
  let page = match.match.params.pageNo ? match.match.params.pageNo : 0;
  let searchPhrase = match.match.params.phrase ? match.match.params.phrase : "";
  return <WallpaperList category={category} page={page} searchPhrase={searchPhrase} />;
};

const App = () => (
  <Router>
    <div className="container">
      <Navigation />
      <div className="well">
        <Route exact path="/" component={Home} />

        <Route path="/licence" component={Licence} />
        <Route path="/contact" component={Contact} />
        <Route path="/categories" component={CategoriesList} />
        <Route path="/image/:imageId" component={FullImage} />
        <Route exact path="/search/:phrase" component={WallpaperListWrapper} />
        <Route exact path="/search/:phrase/:pageNo" component={WallpaperListWrapper} />
        <Route exact path="/list/" force-refresh component={WallpaperListWrapper} />
        <Route exact path="/list/:categoryId/" force-refresh component={WallpaperListWrapper} />
        <Route exact path="/list/:categoryId/:pageNo" force-refresh component={WallpaperListWrapper} />
        {
          //<Route exact path='*' component={NotFound} /> Not working yet :(
        }
      </div>
    </div>
  </Router>
);

export default App;
