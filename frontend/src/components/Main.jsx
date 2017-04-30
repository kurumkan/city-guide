import React, { PropTypes } from "react";

import Nav from "components/Nav";
import Footer from "components/Footer";

const Main = props => (
  <div className="container-fluid main">
    <Nav />
    <div className="row">
      <div className="container-fluid content">
        { props.children }
      </div>
    </div>
    <Footer />
  </div>
);

Main.propTypes = {
  children: PropTypes.element.isRequired
};

export default Main;
