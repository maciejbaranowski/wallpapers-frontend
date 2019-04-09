import React from 'react'
import WallpaperList from '../components/WallpaperList'
import PopularCategories from "../components/PopularCategories";
import DataProvider from "../components/DataProvider";
import {withRouter} from "next/router"

const Index = withRouter((props) => {
  const query = props.router.query;
  return <div>
    <PopularCategories/>
    <WallpaperList
      category={query.category}
      page={query.page}
      searchPhrase={query.searchPhrase}
      author={query.author}
      {...props}/>
  </div>;
});

Index.getInitialProps = async function (context) {
  const data = await DataProvider.getWallpapers(context.query.category, context.query.page, 10, context.query.searchPhrase, context.query.author);
  return {
    wallpapersList: data
      .data
      .list
      .map(wallpaper => {
        wallpaper.filename = DataProvider.getImagesHost() + "thumbnails/" + wallpaper.filename;
        return wallpaper;
      }),
    dataFetched: true,
    wallpapersNumber: data.data.count
  }
}
export default Index;