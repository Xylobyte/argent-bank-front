import { configureStore } from '@reduxjs/toolkit'
import authReducer, { AuthState } from '../features/auth/auth.slice.ts'

const loadAuthToken = (): string | undefined => {
	try {
		return localStorage.getItem('authToken') || undefined
	} catch {
		return undefined
	}
}

const preloadedState = {
	auth: {
		loading: false,
		userToken: loadAuthToken(),
	} as AuthState,
}

export const store = configureStore({
	reducer: {
		auth: authReducer,
	},
	preloadedState,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
