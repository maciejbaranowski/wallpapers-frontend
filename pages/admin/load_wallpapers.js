import React from 'react'

const LoadWallpapers = (props) => (
  <div>
    Nie zaimplementowane
  </div>
);

LoadWallpapers.getInitialProps = async (context) => {
  return {
    adminPassword: context.query.password
  }
}

export default LoadWallpapers;