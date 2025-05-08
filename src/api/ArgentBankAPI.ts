import { apiRequest } from './utils.ts'
import { LoginResponse } from './login.types.ts'
import { User } from './user.types.ts'

export class ArgentBankAPI {
	/**
	 * Performs a login request with the provided email and password.
	 *
	 * @param {string} email - The user's email address.
	 * @param {string} password - The user's password.
	 * @returns {Promise<LoginResponse>} A promise that resolves to the login response.
	 */
	static login = async (
		email: string,
		password: string,
	): Promise<LoginResponse> =>
		(await apiRequest('/user/login', 'POST', { email, password })).body

	/**
	 * Retrieves user information based on a provided token.
	 *
	 * @param {string} token - Authentication token for the request.
	 * @returns {Promise<User>} A promise resolving to the retrieved user data.
	 */
	static getUserInfo = async (token: string): Promise<User> =>
		(
			await apiRequest('/user/profile', 'POST', undefined, {
				Authorization: `Bearer ${token}`,
			})
		).body

	/**
	 * Updates the user's profile information.
	 *
	 * @param {string} token - The authentication token for the API request.
	 * @param {string} firstName - The user's first name.
	 * @param {string} lastName - The user's last name.
	 * @returns {Promise<{ id: number; email: string }>} A promise that resolves to an object containing the user profile information.
	 */
	static updateUserInfo = async (
		token: string,
		firstName: string,
		lastName: string,
	): Promise<{ id: number; email: string }> =>
		(
			await apiRequest(
				'/user/profile',
				'PUT',
				{ firstName, lastName },
				{ Authorization: `Bearer ${token}` },
			)
		).body
}
