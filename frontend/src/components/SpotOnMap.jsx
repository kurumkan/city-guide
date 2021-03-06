import React, { PropTypes, Component } from "react/addons";
import { connect } from "react-redux";
import shouldPureComponentUpdate from "react-pure-render/function";

import { selectSpot } from "actions/Actions";

export class SpotOnMap extends Component {
  static propTypes = {
    text: PropTypes.string,
    id: PropTypes.string.isRequired,
    selectedId: PropTypes.string.isRequired,
    selectSpot: PropTypes.func.isRequired
  };

  static defaultProps = {
    text: ""
  }

  constructor( props ) {
    super( props );
    this.onMouseEnterHandler = this.onMouseEnterHandler.bind( this );
  }

  shouldComponentUpdate = shouldPureComponentUpdate;

  onMouseEnterHandler() {
    //  remove tooltip from "selectedSpot"
    this.props.selectSpot( null );
  }

  render() {
    const { text, id, selectedId } = this.props;
    return (
      <div className="spot-on-map" onMouseEnter={ this.onMouseEnterHandler }>
        <div className="wrapper">
          <img src="images/bar_icon.png" alt="" />
          <div className={ `tooltip ${ id === selectedId && "selected-spot" }` }>
            {text}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps( state ) {
  return {
    selectedId: state.spots.selectedSpot
  };
}

export default connect( mapStateToProps, { selectSpot } )( SpotOnMap );
