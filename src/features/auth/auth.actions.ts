import { AuthState } from './auth.slice.ts'

export const logoutAction = (state: AuthState) => {
	localStorage.removeItem('authToken')
	state.userToken = undefined
	state.userInfo = undefined
	state.error = undefined
	state.loading = false
}
