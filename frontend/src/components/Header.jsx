import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

const Header = () => {
	return (
		<header>
			<Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
				<Container>
					<Link className='navbar-brand' to='/'>
						Home
					</Link>

					<Navbar.Toggle aria-controls='basic-navbar-nav' />
					<Navbar.Collapse id='basic-navbar-nav'>
						<Nav className='ml-auto'>
							<ul className='navbar-nav mr-auto'>
								<li className='nav-item active'>
									<Link className='nav-link' to='/cart'>
										<i className='fa fa-shopping-cart'></i>Cart
									</Link>
								</li>
								<li className='nav-item active'>
									<Link className='nav-link' to='/login'>
										<i className='fa fa-user'></i>Sign In
									</Link>
								</li>
							</ul>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</header>
	);
};

export default Header;
