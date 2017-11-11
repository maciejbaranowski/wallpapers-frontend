import React, {Component} from 'react'
import {Link} from 'react-router-dom'

export default class Wallpaper extends Component {
  render () {
    return (
      <Link to={"/image/"+this.props.data.id}>
        <div className="no-column-break well well-sm">
          <h4>{this.props.data.quote}</h4>
          <img src={this.props.data.filename} alt={this.props.data.quote} className="img-responsive img-thumbnail"/>
          <h6>Kategoria: {this.props.data.category}</h6>
        </div>
      </Link>
    )
  }
}
