import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";

import SpotsListItem from "components/SpotsListItem";
import Loader from "components/Loader";
import DisplaySelector from "components/DisplaySelector";
import Pagination from "components/Pagination";

export class SpotsList extends Component {
  static propTypes = {
    spots: PropTypes.arrayOf( {
      visitors: PropTypes.array,
      id: PropTypes.string,
      location: PropTypes.object,
      name: PropTypes.string,
      url: PropTypes.string,
      image_url: PropTypes.string,
      display_phone: PropTypes.string,
      snippet_text: PropTypes.string,
      review_count: PropTypes.number
    } ).isRequired,
    term: PropTypes.string.isRequired,
    error: PropTypes.string,
    isLoading: PropTypes.boolean,
  };

  static defaultProps = {
    isLoading: false,
    error: ""
  };

  renderSpots( spots ) {
    return spots.map( ( spot ) => <SpotsListItem spot={ spot } key={ spot.id } /> );
  }

  render() {
    const { spots, term, error, isLoading } = this.props;
    if ( isLoading ) {
      return <Loader />;
    }

    if ( error ) return <div className="spots-list" />;
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

export default connect( mapStateToProps, null )( SpotsList );
