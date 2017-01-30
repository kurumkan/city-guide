import React, {PropTypes, Component} from 'react/addons';
import { connect } from 'react-redux';
import shouldPureComponentUpdate from 'react-pure-render/function';

class SpotOnMap extends Component {
  static propTypes = {
    text: PropTypes.string
  };

  static defaultProps = {};

  shouldComponentUpdate = shouldPureComponentUpdate;

  constructor(props) {
    super(props);    
  }

  render() {
    var {text, id, selectedId} = this.props;
    return (
      <div className='spot-on-map'>                        
        <div className="wrapper">          
          <img src='images/bar_icon.png'/>                                        
          <div className={'tooltip '+(id===selectedId?'selected-spot':'')}>
            {text}
          </div>
        </div>        
      </div>
    );
  }
}



function mapStateToProps(state) { 
  return {    
    selectedId: state.spots.selectedSpot
  };
}

export default connect(mapStateToProps, null)(SpotOnMap);