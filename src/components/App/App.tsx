import Header from "@components/Header/Header";
import Footer from "@components/Footer/Footer";
import Gradient from "@components/Gradient/Gradient";
import RainingHearts from "@components/RainingHearts/RainingHearts";
import { SceneProvider } from "@/contexts/SceneContext";
import strings from "@locales/en.json";
import SceneViewer from "../SceneViewer/SceneViewer";

function App() {
	return (
		<>
			<SceneProvider>
				<div className='flex flex-col items-center w-screen relative'>
					<h1 className='sr-only'>{strings.page_h1}</h1>
					<Gradient />
					<Header />
					<SceneViewer />
					<Footer />
					<RainingHearts beatingHearts={true} />
				</div>
			</SceneProvider>
		</>
	);
}

export default App;
