import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";

import { getSpots } from "actions/Actions";
import SpotsList from "components/SpotsList";
import MapContainer from "components/MapContainer";
import Alert from "components/Alert";

export class SearchPage extends Component {
  static propTypes = {
    location: PropTypes.shape( {
      query: PropTypes.shape( {
        term: PropTypes.string,
        offset: PropTypes.number,
        sort: PropTypes.number
      } )
    } ),
    getSpots: PropTypes.func.isRequired
  };

  static defaultProps = {
    location: {
      query: {
        term: "",
        sort: 0,
        offset: 0
      }
    }
  };

  componentWillMount() {
    const { term, offset, sort } = this.props.location.query;
    this.props.getSpots( term, offset, sort );
  }

  render() {
    return (
      <div className="search-page row">
        <Alert />
        <div className="col-sm-5 no-padding">
          <MapContainer />
        </div>
        <div className="col-sm-7 no-padding" id="right">
          <SpotsList />
        </div>
      </div>
    );
  }
}

export default connect( null, { getSpots } )( SearchPage );
