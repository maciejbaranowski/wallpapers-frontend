import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import WallpaperList from "./WallpaperList";
import CategoriesList from "./CategoriesList";
import AuthorsList from "./AuthorsList";
import FullImage from "./FullImage";
import Navigation from "./Navigation";
import { NotFound, Licence, CopyrightFooter } from "./Static";
import Contact from "./Contact";
import PopularCategories from "./PopularCategories";

import ReactGA from "react-ga";
ReactGA.initialize("UA-109847829-2");

const reportAnalytics = () => {
  ReactGA.pageview(window.location.pathname + window.location.search);
  return null;
};

const canonicalSetter = () => {
  let oldLinks = document.getElementsByTagName("link");
  console.log(oldLinks);
  Array.from(oldLinks).forEach(e => {
    if (e.rel === "canonical") {
      e.parentNode.removeChild(e);
    }
  });
  let linkTag = document.createElement("link");
  linkTag.rel = "canonical";
  linkTag.href = window.location;
  return null;
};
const Home = () => (
  <div>
    <PopularCategories />
    <WallpaperList category="all" page="0" searchPhrase="" author="" />
  </div>
);

const WallpaperListWrapper = match => {
  let category = match.match.params.categoryId ? match.match.params.categoryId : "";
  let page = match.match.params.pageNo ? match.match.params.pageNo : 0;
  let searchPhrase = match.match.params.phrase ? match.match.params.phrase : "";
  let author = match.match.params.author ? match.match.params.author : "";
  return <WallpaperList category={category} page={page} searchPhrase={searchPhrase} author={author} />;
};

const App = () => (
  <Router>
    <div className="container unselectable">
      <Navigation />
      <div className="well">
        <Route component={canonicalSetter} />
        <Route component={reportAnalytics} />
        <Route exact path="/" component={Home} />
        <Route path="/licence" component={Licence} />
        <Route path="/contact" component={Contact} />
        <Route path="/categories" component={CategoriesList} />
        <Route path="/authors" component={AuthorsList} />
        <Route path="/image/:imageId" component={FullImage} />
        <Route exact path="/author/:author" component={WallpaperListWrapper} />
        <Route exact path="/author/:author/:pageNo" component={WallpaperListWrapper} />
        <Route exact path="/search/:phrase" component={WallpaperListWrapper} />
        <Route exact path="/search/:phrase/:pageNo" component={WallpaperListWrapper} />
        <Route exact path="/list/:categoryId/" force-refresh component={WallpaperListWrapper} />
        <Route exact path="/list/:categoryId/:pageNo" force-refresh component={WallpaperListWrapper} />
      </div>
      <CopyrightFooter />
    </div>
  </Router>
);

export default App;
