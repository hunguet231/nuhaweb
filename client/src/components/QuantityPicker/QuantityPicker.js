import React, { forwardRef, useState } from "react";
import "./QuantityPicker.css";

const QuantityPicker = forwardRef((props, ref, qty) => {
  const [value, setValue] = useState(qty);

  const increment = () => {
    setValue((prevState) => ++prevState);
  };

  const decrement = () => {
    setValue((prevState) => (prevState > 1 ? --prevState : 1));
  };

  const handleChange = (e) => {
    const res = e.target.validity.valid ? e.target.value : value;
    setValue(res);
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
        ref={ref}
        className="quantity-input__screen"
        type="text"
        required
        pattern="[0-9]*"
        onInput={handleChange}
        value={value}
      />
      <button
        className="quantity-input__modifier quantity-input__modifier--right"
        onClick={increment}
      >
        &#xff0b;
      </button>
    </div>
  );
});

export default QuantityPicker;
