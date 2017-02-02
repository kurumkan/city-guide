import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from 'Actions';

class Signout extends Component {

  componentWillMount() {
    this.props.signoutUser();  
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="text-center">
            Sorry you are leaving! We will miss you lots & lots!
          </div>          
        </div>
      </div>      
    );
  }
  
}


export default connect(null, actions)(Signout)