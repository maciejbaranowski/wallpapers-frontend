import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import WallpaperList from "./WallpaperList";
import CategoriesList from "./CategoriesList";
import AuthorsList from "./AuthorsList";
import FullImage from "./FullImage";
import Navigation from "./Navigation";
import { NotFound, Licence } from "./Static";
import Contact from "./Contact";

const Home = () => (
  <div>
    <WallpaperList category="all" page="0" searchPhrase="" />
  </div>
);

const WallpaperListWrapper = match => {
  let category = match.match.params.categoryId
    ? match.match.params.categoryId
    : "";
  let page = match.match.params.pageNo ? match.match.params.pageNo : 0;
  let searchPhrase = match.match.params.phrase ? match.match.params.phrase : "";
  return (
    <WallpaperList
      category={category}
      page={page}
      searchPhrase={searchPhrase}
    />
  );
};

const App = () => (
  <Router>
    <div className="container unselectable">
      <Navigation />
      <div className="well">
        <Route exact path="/" component={Home} />
        <Route path="/licence" component={Licence} />
        <Route path="/contact" component={Contact} />
        <Route path="/categories" component={CategoriesList} />
        <Route path="/authors" component={AuthorsList} />
        <Route path="/image/:imageId" component={FullImage} />
        <Route exact path="/search/:phrase" component={WallpaperListWrapper} />
        <Route
          exact
          path="/search/:phrase/:pageNo"
          component={WallpaperListWrapper}
        />
        <Route
          exact
          path="/list/:categoryId/"
          force-refresh
          component={WallpaperListWrapper}
        />
        <Route
          exact
          path="/list/:categoryId/:pageNo"
          force-refresh
          component={WallpaperListWrapper}
        />
      </div>
    </div>
  </Router>
);

export default App;
