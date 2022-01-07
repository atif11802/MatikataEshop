import React, { useState, useRef } from "react";
import { Button, Overlay } from "react-bootstrap";

let commands = [
	{ command: "go to home" },
	{ command: "go to profile" },
	{ command: "go to cart" },
];

const Command = () => {
	const [show, setShow] = useState(false);
	const target = useRef(null);
	return (
		<>
			<Button
				style={{
					position: "fixed",
					top: "75%",
					zIndex: "1",
					left: "3%",
				}}
				variant='danger'
				ref={target}
				onClick={() => setShow(!show)}
				className='ai-commands'
			>
				Ai Commands
			</Button>
			<Overlay target={target.current} show={show} placement='right'>
				{({ placement, arrowProps, show: _show, popper, ...props }) => (
					<div
						{...props}
						style={{
							backgroundColor: "rgba(255, 100, 100, 0.85)",
							padding: "2px 10px",
							color: "white",
							borderRadius: 3,
							...props.style,
						}}
					>
						<div className='commands'>
							{commands.map((command) => (
								<div className='command'>
									<p>{command.command}</p>
								</div>
							))}
						</div>
					</div>
				)}
			</Overlay>
		</>
	);
};

export default Command;
