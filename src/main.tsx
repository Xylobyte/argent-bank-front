import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router'
import Home from './pages/Home.tsx'
import HeaderNav from './components/HeaderNav.tsx'
import Footer from './components/Footer.tsx'
import { Provider } from 'react-redux'
import { store } from './app/store.ts'
import Login from './pages/Login.tsx'
import Profile from './pages/Profile.tsx'
import ProtectedRoute from './components/ProtectedRoute.tsx'

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<Provider store={store}>
			<BrowserRouter>
				<HeaderNav />

				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/login' element={<Login />} />
					<Route element={<ProtectedRoute />}>
						<Route path='/profile' element={<Profile />} />
					</Route>

					<Route path='*' element={<Navigate to='/' replace />} />
				</Routes>

				<Footer />
			</BrowserRouter>
		</Provider>
	</StrictMode>,
)
