import React from "react";
import ScrollUpButton from "react-scroll-up-button";
import "./ScrollUpBtn.css";

function ScrollUpBtn() {
  return (
    <div>
      <ScrollUpButton
        ContainerClassName="AnyClassForContainer"
        TransitionClassName="AnyClassForTransition"
      ></ScrollUpButton>
    </div>
  );
}

export default ScrollUpBtn;
