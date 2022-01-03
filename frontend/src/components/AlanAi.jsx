import React, { useEffect } from "react";
import alanBtn from "@alan-ai/alan-sdk-web";
import { useNavigate } from "react-router-dom";

const AlanAi = () => {
	const navigate = useNavigate();

	useEffect(() => {
		alanBtn({
			key: "09106590c7922c42a68355e6f3ffe0bb2e956eca572e1d8b807a3e2338fdd0dc/stage",
			onCommand: (commandData) => {
				if (commandData.command === "goToHome") {
					navigate("/");
				} else if (commandData.command === "goToProfile") {
					navigate("/profile");
				} else if (commandData.command === "goToCart") {
					navigate("/cart");
				}
			},
		});
	}, []);
	return <div></div>;
};

export default AlanAi;
