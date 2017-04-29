import React, { Component } from "react";
import { Link } from "react-router";

export default class NavLink extends Component {

    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };
    
    render() {
        const isActive = this.context.router.isActive( this.props.to, true );
        const className = isActive ? "active" : "";
       
        return (
            <li className={ className }>
                <Link { ...this.props }>
                    { this.props.children }
                </Link>
            </li>
        );
    }
}
