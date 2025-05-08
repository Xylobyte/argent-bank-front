import { createAsyncThunk } from '@reduxjs/toolkit'
import { ArgentBankAPI } from '../../api/ArgentBankAPI.ts'
import { HttpError } from '../../api/utils.ts'
import { AuthState } from './authSlice.ts'
import { User } from '../../api/user.types.ts'

/**
 * Asynchronous thunk to handle user login.
 *
 * @param {object} data - Login credentials (email and password).
 * @param {function} rejectWithValue - Function to reject the asynchronous request with a value.
 * @returns {object} The result of the login attempt, or an error object if rejected.
 */
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

/**
 * UserProfile object retrieved from the API.
 */
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

/**
 * A Thunk action that updates a user's profile information.
 *
 * @param {object} data - The updated user profile data, containing 'firstName' and 'lastName'.
 * @param {object} { rejectWithValue, getState } - An object with the 'rejectWithValue' function for handling errors and the 'getState' function to access the application state.
 * @returns {Promise} A promise that resolves to an object representing the updated user profile data.
 */
export const updateUserProfile = createAsyncThunk<
	{ firstName: string; lastName: string },
	{ firstName: string; lastName: string },
	{ state: { auth: AuthState } }
>('auth/updateProfile', async (data, { rejectWithValue, getState }) => {
	try {
		await ArgentBankAPI.updateUserInfo(
			getState().auth.userToken,
			data.firstName,
			data.lastName,
		)
		return {
			firstName: data.firstName,
			lastName: data.lastName,
		}
	} catch (e) {
		const error = e as HttpError
		return rejectWithValue({
			status: error.status,
			message: error.message,
		})
	}
})
