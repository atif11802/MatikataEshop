import React from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";

const Routing = () => {
	return (
		<Router>
			<Header />
			<Container>
				<Routes>
					<Route path='/' element={<HomeScreen />} />
					<Route path='/product/:id' element={<ProductScreen />} />
					<Route path='/cart' element={<CartScreen />}>
						<Route path=':id' element={<CartScreen />} />
					</Route>
					<Route path='/login' element={<LoginScreen />} />
					<Route path='/register' element={<RegisterScreen />} />
				</Routes>
			</Container>
		</Router>
	);
};

export default Routing;
