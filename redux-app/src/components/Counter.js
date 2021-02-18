import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";

const mapStateToProps = (state /*, ownProps*/) => {
  return {
    value: state,
  };
};

const Counter = ({ value, onIncrement, onDecrement, onIncrementAsync }) => (
  <p>Redux app..</p>
);

export default connect(mapStateToProps)(Counter);
