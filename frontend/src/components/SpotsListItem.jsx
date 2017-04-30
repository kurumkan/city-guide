import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";

import { selectSpot, setMapCenter, changeVisitStatus } from "actions/Actions";

export class SpotsListItem extends Component {
  static propTypes = {
    spot: PropTypes.shape( {
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
    selectSpot: PropTypes.func.isRequired,
    setMapCenter: PropTypes.func.isRequired,
    changeVisitStatus: PropTypes.func.isRequired,
    displayType: PropTypes.string.isRequired,
    authenticated: PropTypes.bool.isRequired
  };

  constructor( props ) {
    super( props );
    this.state = {
      visitStatus: false,
      numVisitors: 0
    };
  }

  componentWillMount() {
    const { spot } = this.props;
    const userId = localStorage.getItem( "userid" );

    if ( userId && spot.visitors && spot.visitors.indexOf( userId ) >= 0 ) {
      this.setState( { visitStatus: true } );
    }

    if ( spot.visitors ) {
      this.setState( {
        numVisitors: spot.visitors.length
      } );
    }
  }

  handleClick( key ) {
    const { spot } = this.props;
    if ( key === "pin" ) {
      const { selectSpot, setMapCenter } = this.props;
      selectSpot( spot.id );
      setMapCenter( {
        lat: spot.location.coordinate.latitude,
        lng: spot.location.coordinate.longitude
      } );
    } else {
      let { visitStatus, numVisitors } = this.state;
      visitStatus = !visitStatus;

      if ( visitStatus ) numVisitors++;
      else numVisitors--;

      this.setState( { visitStatus, numVisitors } );
      this.props.changeVisitStatus( spot.id );
    }
  }

  render() {
    const { spot, displayType, authenticated } = this.props;
    let name = spot.name.substring( 0, 25 );
    name = name.length === 25 ? `${ name }...` : name;

    const { numVisitors, visitStatus } = this.state;
    let buttonClass = "glyphicon glyphicon-plus";

    if ( visitStatus ) buttonClass = "glyphicon glyphicon-ok";

    if ( displayType === "GRID" ) {
      return (
        <div className="col-sm-6 col-md-4 spots-list-item">
          <div className="thumbnail">
            <a href={ spot.url } target="_blank" rel="noopener noreferrer">
              <image className="img-responsive" src={ spot.image_url } />
            </a>
            <div className="caption">
              <h3>{ name }</h3>
              <div>
                <span className="glyphicon glyphicon-earphone" aria-hidden="true" />
                { spot.display_phone }
              </div>
              <div>
                <span className="glyphicon glyphicon-map-marker" aria-hidden="true" />
                { spot.location.address[ 0 ] }
              </div>
              <div>
                <button className="btn btn-go" disabled={ !authenticated } onClick={ this.handleClick.bind( this, "iamgoing" ) }>
                  <span className={ buttonClass } aria-hidden="true" />
                  { numVisitors } going
                </button>
              </div>
              <div>
                <button className="btn btn-go" onClick={ this.handleClick.bind( this, "pin" ) }>
                  <span className="glyphicon glyphicon-pushpin" aria-hidden="true" />
                  Pinpoint
                </button>
              </div>
              <div>
                <span className={ `stars-container stars-${ Math.round( spot.rating * 20 ) }` }>★★★★★</span>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="panel panel-default spots-list-item">
        <div className="panel-body">
          <div className="col-sm-3">
            <a href={ spot.url } target="_blank" rel="noopener noreferrer">
              <image className="img-responsive" src={ spot.image_url } />
            </a>
          </div>
          <div className="col-sm-9">
            <h3>
              { spot.name }
            </h3>
            <div>
              <span className="glyphicon glyphicon-earphone" aria-hidden="true" />
              { spot.display_phone }
            </div>
            <div>
              <span className="glyphicon glyphicon-map-marker" aria-hidden="true" />
              { spot.location.address[ 0 ] }
            </div>
            <div>
              <button className="btn btn-go" disabled={ !authenticated } onClick={ this.handleClick.bind( this, "iamgoing" ) }>
                <span className={ buttonClass } aria-hidden="true" />
                { numVisitors } going
              </button>
            </div>
            <div>
              <button className="btn btn-go" onClick={ this.handleClick.bind( this, "pin" ) }>
                <span className="glyphicon glyphicon-pushpin" aria-hidden="true" />
                Pinpoint
              </button>
            </div>
            <div>
              <span className={ `stars-container stars-${ Math.round( spot.rating * 20 ) }` }>★★★★★</span>
            </div>
            <div>
              { spot.snippet_text }
            </div>
            <div>
              <a href={ spot.url } target="_blank" rel="noopener noreferrer">See { spot.review_count } more feedbacks</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps( state ) {
  const { displayType } = state;
  const { authenticated } = state.auth;
  return {
    displayType,
    authenticated
  };
}

export default connect( mapStateToProps,
  { selectSpot, setMapCenter, changeVisitStatus } )( SpotsListItem );
