import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";

const mapStateToProps = (state /*, ownProps*/) => {
  return {
    value: state,
  };
};

const Counter = ({ value, onIncrement, onDecrement }) => (
  <div>
    <button onClick={onIncrement}>Increment</button>{" "}
    <button onClick={onDecrement}>Decrement</button>
    <div>Clicked: {value} times</div>
  </div>
);

export default connect(mapStateToProps)(Counter);