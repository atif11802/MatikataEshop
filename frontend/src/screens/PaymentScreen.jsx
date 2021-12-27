import React from "react";
import { useState } from "react";
import { Button, Form, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import { savePaymentMethod } from "../actions/cartActions";
import { useNavigate } from "react-router-dom";
import CheckOutSteps from "../components/CheckOutSteps";

const PaymentScreen = () => {
	let navigate = useNavigate();
	const cart = useSelector((state) => state.cart);
	const { shippingAddress } = cart;

	if (!shippingAddress) {
		navigate("/shipping");
	}

	const [paymentMethod, setPaymentMethod] = useState("Paypal");

	const dispatch = useDispatch();

	const submitHandler = (e) => {
		e.preventDefault();
		//dispatch
		dispatch(savePaymentMethod(paymentMethod));
		navigate("/placeorder");
	};

	return (
		<FormContainer>
			<CheckOutSteps step1 step2 step3 />
			<h1>Payment Method</h1>
			<Form onSubmit={submitHandler}>
				<Form.Group>
					<Form.Label as='legend'>Select Method</Form.Label>
					<Col>
						<Form.Check
							type='radio'
							label='PayPal or Credit Card'
							id='PayPal'
							name='paymentMethod'
							value='PayPal'
							checked
							onChange={(e) => setPaymentMethod(e.target.value)}
						></Form.Check>
						{/* <Form.Check
							type='radio'
							label='Stripe'
							id='Stripe'
							name='paymentMethod'
							value='Stripe'
							onChange={(e) => setPaymentMethod(e.target.value)}
						></Form.Check> */}
					</Col>
				</Form.Group>
				<Button className='mt-3' type='submit' variant='primary'>
					continue
				</Button>
			</Form>
		</FormContainer>
	);
};

export default PaymentScreen;
