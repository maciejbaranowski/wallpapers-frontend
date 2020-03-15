import React from 'react'
import WallpaperList from '../../components/WallpaperList'
import DataProvider from '../../components/DataProvider';
import { withRouter } from 'next/dist/client/router';

const AdminManageDatabase = withRouter((props) => {
  return (
  <div>
    <WallpaperList {...props}/>
  </div>);
});

AdminManageDatabase.getInitialProps = async (context) => {
  const page = context.query.page || 0;
  const data = await DataProvider.getWallpapers(context.query.category, page * 10, 10, context.query.searchPhrase, context.query.author);
  return {
    wallpapersList: data.wallpapers,
    dataFetched: true,
    wallpapersNumber: data.count,
    adminPassword: context.query.password,
    wallpapersPerPage: 100
  }
}
export default AdminManageDatabase;