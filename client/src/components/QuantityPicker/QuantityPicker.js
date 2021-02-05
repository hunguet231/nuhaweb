import React, { forwardRef, useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../actions/cartActions";
import "./QuantityPicker.css";

const QuantityPicker = forwardRef((props, ref) => {
  const [value, setValue] = useState(props.defaultValue);

  const dispatch = useDispatch();

  const increment = () => {
    setValue((prevState) => ++prevState);
    if (props.autoUpdateCart) {
      dispatch(addToCart(props.id, value + 1));
    }
  };

  const decrement = () => {
    setValue((prevState) => (prevState > 1 ? --prevState : 1));
    if (props.autoUpdateCart) {
      dispatch(addToCart(props.id, value - 1));
    }
  };

  const handleChange = (e) => {
    // const res = e.target.validity.valid ? e.target.value : value;
    const res = e.target.value;
    setValue(res);
    if (props.autoUpdateCart) {
      dispatch(addToCart(props.id, res));
    }
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
        // pattern="[0-9]*"
        onChange={handleChange}
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
