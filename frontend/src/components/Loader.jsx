import React from "react";
import { ScaleLoader } from "react-spinners";
import { css } from "@emotion/react";
import { useState } from "react";

const override = css`
	display: flex;
	justify-content: center;
	margin: 0 auto;
	border-color: red;
`;

const Loader = ({ loading }) => {
	let [color, setColor] = useState("#ffffff");
	return (
		<ScaleLoader
			color={color}
			loading={loading}
			css={override}
			height={78}
			width={10}
			radius={23}
			margin={4}
		/>
	);
};

export default Loader;
