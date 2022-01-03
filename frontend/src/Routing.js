import React from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen";
import ProductListScreen from "./screens/ProductListScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import OrderListScreen from "./screens/OrderListScreen";
import AlanAi from "./components/AlanAi";

const Routing = () => {
	return (
		<Router>
			<Header />
			<AlanAi />
			<Container>
				<Routes>
					<Route exact path='/' element={<HomeScreen />} />
					<Route path='/search/:keyword' element={<HomeScreen />} />
					<Route path='/product/:id' element={<ProductScreen />} />
					<Route path='/cart' element={<CartScreen />}>
						<Route path=':id' element={<CartScreen />} />
					</Route>
					<Route path='/login' element={<LoginScreen />} />
					<Route path='/register' element={<RegisterScreen />} />
					<Route path='/profile' element={<ProfileScreen />} />
					<Route path='/shipping' element={<ShippingScreen />} />
					<Route path='/payment' element={<PaymentScreen />} />
					<Route path='/placeorder' element={<PlaceOrderScreen />} />
					<Route path='/order/:orderId' element={<OrderScreen />} />
					<Route path='/admin/userlist' element={<UserListScreen />} />
					<Route path='/admin/user/:id/edit' element={<UserEditScreen />} />
					<Route path='/admin/productlist' element={<ProductListScreen />} />
					<Route
						path='/admin/product/:id/edit'
						element={<ProductEditScreen />}
					/>
					<Route path='/admin/orderlist' element={<OrderListScreen />} />
					<Route exact path='/page/:pageNumber' element={<HomeScreen />} />
					<Route
						exact
						path='/search/:keyword/page/:pageNumber'
						element={<HomeScreen />}
					/>
					<Route
						path='/admin/productlist/:pageNumber'
						element={<ProductListScreen />}
					/>
				</Routes>
			</Container>
		</Router>
	);
};

export default Routing;
