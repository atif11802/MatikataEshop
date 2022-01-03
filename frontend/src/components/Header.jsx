import React from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/userActions";
import SearchBox from "./SearchBox";

const Header = () => {
	const dispatch = useDispatch();

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const cart = useSelector((state) => state.cart);
	const { cartItems } = cart;

	const logoutHandler = () => {
		dispatch(logout());
	};

	return (
		<header>
			<Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
				<Container>
					<Link className='navbar-brand' to='/'>
						Home
					</Link>

					<SearchBox />
					<Navbar.Toggle aria-controls='basic-navbar-nav' />
					<Navbar.Collapse id='basic-navbar-nav'>
						<Nav className='ml-auto'>
							<ul className='navbar-nav mr-auto'>
								<li className='nav-item active'>
									<Link className='nav-link' to='/cart'>
										<i className='fa fa-shopping-cart'></i>Cart
										<sup>{cartItems && cartItems.length}</sup>
									</Link>
								</li>
								{userInfo ? (
									<NavDropdown title={userInfo.name} id='username'>
										<li className='nav-item active'>
											<Link className='nav-link' to='/profile'>
												<i className='fa fa-user'></i>Profile
											</Link>
										</li>
										<li className='nav-item active' onClick={logoutHandler}>
											<h6 style={{ cursor: "pointer" }} className='nav-link'>
												<i className='fas fa-sign-out-alt'></i> Logout
											</h6>
										</li>
									</NavDropdown>
								) : (
									<li className='nav-item active'>
										<Link className='nav-link' to='/login'>
											<i className='fa fa-user'></i>Sign In
										</Link>
									</li>
								)}
							</ul>
							{userInfo && userInfo.isAdmin && (
								<NavDropdown title='Admin' id='adminmenu'>
									<li className='nav-item active'>
										<Link className='nav-link' to='/admin/userlist'>
											<i className='fas fa-users'></i>Users
										</Link>
									</li>
									<li className='nav-item active'>
										<Link className='nav-link' to='/admin/productlist'>
											<i className='fas fa-archive'></i>Products
										</Link>
									</li>
									<li className='nav-item active'>
										<Link className='nav-link' to='/admin/orderlist'>
											<i className='fas fa-clipboard-list'></i>Orders
										</Link>
									</li>
								</NavDropdown>
							)}
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</header>
	);
};

export default Header;
