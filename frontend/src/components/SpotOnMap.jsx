import React, {PropTypes, Component} from 'react/addons';
import shouldPureComponentUpdate from 'react-pure-render/function';

export default class SpotOnMap extends Component {
  static propTypes = {
    text: PropTypes.string
  };

  static defaultProps = {};

  shouldComponentUpdate = shouldPureComponentUpdate;

  constructor(props) {
    super(props);    
  }

  render() {
    return (
      <div className='spot-on-map'>                        
        <div className="wrapper">          
          <img src='images/bar_icon.png'/>                                        
          <div className="tooltip">
            {this.props.text}
          </div>
        </div>        
      </div>
    );
  }
}