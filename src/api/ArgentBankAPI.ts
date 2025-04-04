import { apiRequest } from './utils.ts'
import { LoginResponse } from './login.types.ts'
import { User } from './user.types.ts'

export class ArgentBankAPI {
	static login = async (
		email: string,
		password: string,
	): Promise<LoginResponse> =>
		(await apiRequest('/user/login', 'POST', { email, password })).body

	static getUserInfo = async (token: string): Promise<User> =>
		(
			await apiRequest('/user/profile', 'POST', undefined, {
				Authorization: `Bearer ${token}`,
			})
		).body
}
