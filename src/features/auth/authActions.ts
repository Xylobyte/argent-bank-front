import { createAsyncThunk } from '@reduxjs/toolkit'
import { ArgentBankAPI } from '../../api/ArgentBankAPI.ts'
import { HttpError } from '../../api/utils.ts'
import { AuthState } from './authSlice.ts'
import { User } from '../../api/user.types.ts'

export const userLogin = createAsyncThunk(
	'auth/login',
	async (data: { email: string; password: string }, { rejectWithValue }) => {
		try {
			const r = await ArgentBankAPI.login(data.email, data.password)
			localStorage.setItem('authToken', r.token)
			return r
		} catch (e) {
			const error = e as HttpError
			return rejectWithValue({
				status: error.status,
				message: error.message,
			})
		}
	},
)

export const userProfile = createAsyncThunk<
	User,
	undefined,
	{ state: { auth: AuthState } }
>('auth/profile', async (_, { rejectWithValue, getState }) => {
	try {
		return await ArgentBankAPI.getUserInfo(getState().auth.userToken)
	} catch (e) {
		const error = e as HttpError
		return rejectWithValue({
			status: error.status,
			message: error.message,
		})
	}
})
