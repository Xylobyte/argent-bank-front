import { FormEvent, useEffect, useState } from 'react'
import { userLogin } from '../features/auth/authActions.ts'
import { useAppDispatch, useAppSelector } from '../app/hooks.ts'
import { useNavigate } from 'react-router'

function Login() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const loading = useAppSelector(state => state.auth.loading)
	const error = useAppSelector(state => state.auth.error)
	const userInfo = useAppSelector(state => state.auth.userInfo)

	const dispatch = useAppDispatch()

	const navigate = useNavigate()

	useEffect(() => {
		document.title = 'Argent Bank - Login'
	}, [])

	useEffect(() => {
		if (userInfo) {
			navigate('/profile', { replace: true })
		}
	}, [userInfo, navigate])

	const login = (e: FormEvent) => {
		e.preventDefault()
		dispatch(userLogin({ email, password }))
	}

	return (
		<main className='main bg-dark'>
			<section className='sign-in-content'>
				<i className='fa fa-user-circle sign-in-icon'></i>
				<h1>Sign In</h1>

				<form onSubmit={login}>
					<div className='input-wrapper'>
						<label htmlFor='username'>Username</label>
						<input
							type='text'
							id='username'
							value={email}
							onChange={e => setEmail(e.target.value)}
						/>
					</div>
					<div className='input-wrapper'>
						<label htmlFor='password'>Password</label>
						<input
							type='password'
							id='password'
							value={password}
							onChange={e => setPassword(e.target.value)}
						/>
					</div>
					<div className='input-remember'>
						<input
							type='checkbox'
							id='remember-me'
							defaultChecked={true}
						/>
						<label htmlFor='remember-me'>Remember me</label>
					</div>
					<button disabled={loading} className='sign-in-button'>
						Sign In
					</button>

					{error && (
						<span style={{ color: 'red' }}>
							{error === 'authError'
								? 'Verifiez les informations'
								: 'Erreur du server, reessayez plus tard'}
						</span>
					)}
				</form>
			</section>
		</main>
	)
}

export default Login
