import { useAppSelector } from '../app/hooks.ts'
import { Navigate, Outlet } from 'react-router'

function ProtectedRoute() {
	const userInfo = useAppSelector(state => state.auth.userInfo)

	if (!userInfo) {
		return <Navigate to='/login' replace={true} />
	}

	return <Outlet />
}

export default ProtectedRoute
