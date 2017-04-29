import React, { Component } from "react";
import { connect } from "react-redux";

import SpotsListItem from "components/SpotsListItem";
import Loader from "components/Loader";
import DisplaySelector from "components/DisplaySelector";
import Pagination from "components/Pagination";

export class SpotsList extends Component {

  renderSpots( spots ) {
    return spots.map( ( spot, i ) => <SpotsListItem spot={ spot } key={ i } /> );
  }

  render() {
    const { spots, term, error, isLoading } = this.props;     
    
    if( isLoading ){
      return <Loader />;
    }

    if( error ) return <div className="spots-list" />         
    else
      return (
        <div className="spots-list">
          <h2>Search Results for: { term }</h2>
          <DisplaySelector />
          <div className="row spots-list-wrapper">
            { this.renderSpots( spots ) }
          </div>
          <Pagination />
        </div>
      );
  }
}

function mapStateToProps( state ) {
  return {
    spots: state.spots.all,
    term: state.search.term,
    error: state.error,
    isLoading: state.isLoading        
  };
}
asdasd
export default connect( mapStateToProps, null )( SpotsList );
