import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { Link } from "react-router";

import { getSpots } from "actions/Actions";

export class Pagination extends Component {
  static propTypes = {
    spotsCount: PropTypes.number.isRequired,
    term: PropTypes.string.isRequired,
    sort: PropTypes.number.isRequired,
    offset: PropTypes.number.isRequired,
    getSpots: PropTypes.func.isRequired
  };

  range( end ) {
    const result = [];
    const start = end > 4 ? end - 4 : 1;
    for ( let i = start; i <= end; i++ ) {
      result.push( i );
    }
    return result;
  }

  handleClick( newOffset ) {
    const { spotsCount } = this.props;

    if ( newOffset >= 0 && newOffset < 988 && newOffset < spotsCount ) {
      const { term, sort, getSpots } = this.props;
      getSpots( term, newOffset, sort );
    }
  }

  render() {
    const { spotsCount, term, sort, offset } = this.props;

    const pageNumber = Math.floor( offset / 12 ) + 1;
    let total = Math.ceil( spotsCount / 12 );
    total = total <= 83 ? total : 83;
    let n = total;
    if ( total > 5 ) {
      if ( pageNumber + 2 <= total ) {
        n = pageNumber + 2 < 5 ? 5 : pageNumber + 2;
      }
    }

    const baseUrl = `/search?term=${ term }&sort=${ sort }&offset=`;
    const renderPageLinks = this.range( n ).map( ( n ) => {
      const newOffset = ( n - 1 ) * 12;
      return (
        <li key={ n } onClick={ this.handleClick.bind( this, newOffset ) } className={ pageNumber === n ? "active" : "" } role="button">
          <Link to={ baseUrl + newOffset }>{n}</Link>
        </li>
      );
    } );

    const next = pageNumber + 1;
    const prev = pageNumber - 1;

    return (
      <div className="pagination-wrapper">
        <div className="col-xs-5 pagination-info">
          Page {pageNumber} of {total}
        </div>
        <div className="col-xs-7 text-right">
          <nav aria-label="Page navigation" className="navigator">
            <ul className="pagination pagination-custom">
              <li onClick={ this.handleClick.bind( this, offset - 12 ) } className={ prev > 0 ? "" : "disabled" } role="button">
                <Link to={ baseUrl + ( offset - 12 ) } aria-label="Previous">
                  <span aria-hidden="true">&laquo;</span>
                </Link>
              </li>
              { renderPageLinks }
              <li onClick={ this.handleClick.bind( this, offset + 12 ) } className={ next > total ? "disabled" : "" } role="button">
                <Link to={ baseUrl + ( offset + 12 ) } aria-label="Next">
                  <span aria-hidden="true">&raquo;</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    );
  }
}

function mapStateToProps( state ) {
  const { term, sort, offset } = state.search;
  const { spotsCount } = state.spots;
  return { term, sort, offset, spotsCount };
}

export default connect( mapStateToProps, { getSpots } )( Pagination );
