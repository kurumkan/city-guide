import React, { Component } from 'react';
import {Link} from "react-router";

export default class NavLink extends Component{

    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };
    
    render(){
        var isActive = this.context.router.isActive(this.props.to, true);
        var className = isActive ? "active" : "";
       
        return (
            <li className={className}>
                <Link {...this.props}>
                    {this.props.children}
                </Link>
            </li>
        );
    }
}