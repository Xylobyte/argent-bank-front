import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import './index.css';
import {BrowserRouter, Route, Routes} from "react-router";
import Home from "./pages/Home.tsx";
import HeaderNav from "./components/HeaderNav.tsx";
import Footer from "./components/Footer.tsx";
import {Provider} from "react-redux";
import store from "./app/store.ts";

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<Provider store={store}>
			<BrowserRouter>
				<HeaderNav/>

				<Routes>
					<Route path="/" element={<Home/>}/>
				</Routes>

				<Footer/>
			</BrowserRouter>
		</Provider>
	</StrictMode>
);
