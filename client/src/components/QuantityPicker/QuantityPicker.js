import React, { useState } from "react";
import "./QuantityPicker.css";

function QuantityPicker() {
  const [value, setValue] = useState(1);

  const increment = () => {
    setValue((prevState) => ++prevState);
  };

  const decrement = () => {
    setValue((prevState) => (prevState > 1 ? --prevState : 1));
  };

  return (
    <div className="quantity-input">
      <p>Chọn số lượng</p>
      <button
        className="quantity-input__modifier quantity-input__modifier--left"
        onClick={decrement}
      >
        &mdash;
      </button>
      <input
        className="quantity-input__screen"
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button
        className="quantity-input__modifier quantity-input__modifier--right"
        onClick={increment}
      >
        &#xff0b;
      </button>
    </div>
  );
}

export default QuantityPicker;
