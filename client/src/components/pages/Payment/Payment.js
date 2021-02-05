import React from "react";
import { useState } from "react";
import "./Payment.css";
import { useSelector, useDispatch } from "react-redux";
import { Button, MenuItem, TextField } from "@material-ui/core";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import { savePaymentMethod } from "../../../actions/cartActions";
import CheckoutStep from "../../CheckoutStep/CheckoutStep";

function Payment({ history }) {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress, paymentMethod } = cart;

  if (!shippingAddress) {
    history.push("/shipping");
  }

  const [payment, setPayment] = useState(paymentMethod);

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(payment));
    history.push("/place-order");
  };

  return (
    <div className="shipping-wrapper">
      <CheckoutStep step={1} />

      <div className="title">Chọn phương thức thanh toán: </div>

      <form className="payment-methods" onSubmit={submitHandler}>
        <RadioGroup
          aria-label="paymenyMethods"
          name="paymentMethod"
          value={payment}
          onChange={(e) => setPayment(e.target.value)}
        >
          <FormControlLabel
            value="PayPal"
            control={<Radio size="small" />}
            label={
              <>
                <img
                  src="https://www.paypalobjects.com/webstatic/mktg/logo/pp_cc_mark_37x23.jpg"
                  border="0"
                  className="paypal-payment"
                  alt="PayPal Logo"
                />{" "}
                PayPal hoặc Credit Card
              </>
            }
          />
          <FormControlLabel
            value="Ví ZaloPay"
            control={<Radio size="small" />}
            label={
              <>
                <img src="/zalopay.png" className="zalopay-payment" /> Ví
                ZaloPay
              </>
            }
          />
          <FormControlLabel
            value="Ví Momo"
            control={<Radio size="small" />}
            label={
              <>
                <img
                  src="https://developers.momo.vn/images/logo.png"
                  className="momo-payment"
                />{" "}
                Ví Momo
              </>
            }
          />
          <FormControlLabel
            value="Thanh toán khi nhận hàng"
            control={<Radio size="small" />}
            label={
              <>
                <img src="/express-delivery.png" className="cash-payment" />{" "}
                Thanh toán khi nhận hàng
              </>
            }
          />
        </RadioGroup>
        <Button
          type="submit"
          style={{ marginTop: "10px" }}
          variant="contained"
          color="secondary"
        >
          Tiếp tục
        </Button>
      </form>
    </div>
  );
}

export default Payment;
