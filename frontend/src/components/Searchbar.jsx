import React, { Component, PropTypes } from "react";

import { connect } from "react-redux";
import { getSpots } from "actions/Actions";

export class Searchbar extends Component {
  static propTypes = {
    sort: PropTypes.number,
    getSpots: PropTypes.func
  };

  static defaultProps = {
    sort: 0,
    getSpots: () => {}
  };

  constructor( props ) {
    super( props );
    this.state = { term: "" };
    this.handleSubmit = this.handleSubmit.bind( this );
    this.handleChange = this.handleChange.bind( this );
  }

  handleChange( e ) {
    this.setState( { term: e.target.value } );
  }

  handleSubmit( e ) {
    e.preventDefault();
    const { term } = this.state;
    if ( term ) {
      this.setState( { term: "" } );
      const { sort } = this.props;
      this.props.getSpots( term, 0, sort );
    }
  }
  render() {
    return (
      <form className="searchbar" onSubmit={ this.handleSubmit }>
        <div className="input-group">
          <input
            type="text" className="form-control" placeholder="Type a location"
            onChange={ this.handleChange }
            value={ this.state.term }
          />
          <span className="input-group-btn">
            <button className="btn btn-search" type="submit">
              <span className="glyphicon glyphicon-search" aria-hidden="true" />
            </button>
          </span>
        </div>
      </form>
    );
  }
}

function mapStateToProps( state ) {
  const { term, sort } = state.search;
  return { term, sort };
}

export default connect( mapStateToProps, { getSpots } )( Searchbar );
