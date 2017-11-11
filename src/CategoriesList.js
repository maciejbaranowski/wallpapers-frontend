import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import DataProvider from './DataProvider'

class CategoriesList extends Component {
  constructor() {
    super();
    this.state = {
      categories : []
    }
  }
  componentDidMount() {
    DataProvider.getCategoriesList()
      .then((response) => {
        this.setState({categories: response.data})
      })
  }
  render () {
    return (
      <div>
        <h2>Kategorie</h2>
        <div className="three-column">
          {this.state.categories.map((category, i) => {
            return <Link key={category.id} to={"list/"+category.id}><li>{category.name}</li></Link>
          })}
        </div>
      </div>
    )
  }

}

export default CategoriesList;
