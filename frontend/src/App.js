import Footer from "./components/Footer";
import Header from "./components/Header";
import { Container } from "react-bootstrap";
import Routing from "./Routing";

function App() {
	return (
		<>
			<main className='py-1'>
				<Routing />
			</main>

			<Footer />
		</>
	);
}

export default App;
