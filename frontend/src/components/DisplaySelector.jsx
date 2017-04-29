import React, { Component } from "react";
import { connect } from "react-redux";

import { getSpots, setSort, changeDisplayType } from "actions/Actions";

export class DisplaySelector extends Component{
  constructor( props ) {
    super(props);
    this.state={
      displayType: "LIST",
      sort: 0
    }
    this.handleChange = this.handleChange.bind( this );
  }

  componentWillMount() {
    const { sort, displayType } = this.props;
    this.setState({ sort, displayType });
  }

  handleClick( displayType ) {
    if( displayType!==this.state.displayType ) {
      this.setState( { displayType } );
      this.props.changeDisplayType();
    }
  }

  handleChange( e ) {
    const sort = e.target.value;        
    if(sort!==this.state.sort) {
      const{ term, setSort,getSpots } = this.props;
      this.setState( { sort } );
      setSort( sort );        
      getSpots( term, 0, sort );
    }
  }
  
  render() {  
    const { displayType } = this.state;   
    return (      
      <div className="display-selector">
        <div className="wrapper">
          <div 
            className={ `selector-button ${displayType=="GRID" && "active"}`}
            onClick={ this.handleClick.bind(this, 'GRID') }
          >
            <span className="glyphicon glyphicon-th" aria-hidden="true"></span>
          </div>
          <div 
            className={ `selector-button ${displayType=="LIST" && "active"}` }
            onClick={ this.handleClick.bind(this, "LIST") }
          >
            <span className="glyphicon glyphicon-th-list" aria-hidden='true'></span>
          </div>
        
          <div>         
            <select className="form-control" value={ this.state.sort } onChange={ this.handleChange }>
              <option disabled value="null">Sort By</option>            
              <option value="0">Best Matched</option>
              <option value="2">Highest Rated</option>
            </select>
          </div>
        </div>
      </div>
    );  
  }
}

function mapStateToProps( state ) {
  const {sort, term} = state.search;
  const { displayType } = state;
  return { sort, term, displayType };   
}

export default connect( mapStateToProps, { getSpots, setSort, changeDisplayType } )( DisplaySelector );
