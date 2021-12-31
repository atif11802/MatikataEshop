import dotenv from "dotenv";
import path from "path";
dotenv.config();
import express from "express";
import connectDB from "./config/db.js";
import ProductRoutes from "./routes/productRoutes.js";
import UserRoutes from "./routes/userRoutes.js";
import OrderRoutes from "./routes/orderRoutes.js";
import colors from "colors";
import morgan from "morgan";
import { notFound, errorHandler } from "./middleWare/errorMiddleware.js";
const app = express();
const PORT = process.env.PORT || 4000;

//database
connectDB();

app.use(express.json());

//middleware
app.use(morgan("dev"));

app.use("/api/products", ProductRoutes);
app.use("/api/users", UserRoutes);
app.use("/api/orders", OrderRoutes);

app.get("/api/config/paypal", (req, res) =>
	res.send(process.env.PAYPAL_CLIENT_ID)
);

const __dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/frontend/build")));

	app.get("*", (req, res) =>
		res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
	);
} else {
	app.get("/", (req, res) => {
		res.send("API is running....");
	});
}

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
	console.log(
		`server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
			.underline
	);
});
