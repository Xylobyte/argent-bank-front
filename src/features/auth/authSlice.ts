import { createSlice } from '@reduxjs/toolkit'
import { userLogin, userProfile } from './authActions.ts'
import { User } from '../../api/user.types.ts'

export interface AuthState {
	loading: boolean
	userInfo?: User
	userToken?: string
	error?: 'internalError' | 'authError'
}

const userToken = localStorage.getItem('authToken')

const initialState: AuthState = {
	loading: false,
	userToken,
	error: null,
}

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		logout: (state: AuthState) => {
			localStorage.removeItem('authToken')
			state.userToken = undefined
			state.userInfo = undefined
			state.error = undefined
			state.loading = false
		},
	},
	extraReducers: builder => {
		builder.addCase(userLogin.pending, state => {
			state.loading = true
			state.error = undefined
		})
		builder.addCase(userLogin.fulfilled, (state, { payload }) => {
			state.loading = true
			state.userToken = payload.token
		})
		builder.addCase(userLogin.rejected, (state, { payload }) => {
			state.error =
				(payload as any).status === 500 ? 'internalError' : 'authError'
		})

		builder.addCase(userProfile.fulfilled, (state, { payload }) => {
			state.userInfo = payload
		})
		builder.addCase(userProfile.rejected, state => {
			state.error = 'internalError'
		})
	},
})

export const { logout } = authSlice.actions

export default authSlice.reducer
