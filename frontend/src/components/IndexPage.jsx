import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";

import { authUser } from "actions/Actions";
import Searchbar from "components/Searchbar";

export class IndexPage extends Component {

  static propTypes = {
    location: PropTypes.object.isRequired,
    authUser: PropTypes.func.isRequired
  };

  componentWillMount() {
    const { token, username, userid } = this.props.location.query;
    if ( token && username && userid ) this.props.authUser( token, username, userid );
  }

  render() {
    return (
      <div className="index-page row">
        <div className="landing-layer">
          <div className="col-md-3" />
          <div className="col-md-6">
            <Searchbar />
          </div>
          <div className="col-md-3" />
        </div>
      </div>
    );
  }
}

export default connect( null, { authUser } )( IndexPage );
