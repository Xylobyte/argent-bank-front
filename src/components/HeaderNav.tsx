import { Link, useNavigate } from 'react-router'
import { useAppDispatch, useAppSelector } from '../app/hooks.ts'
import { useEffect } from 'react'
import { userProfile } from '../features/auth/auth.thunks.ts'
import { logout } from '../features/auth/auth.slice.ts'

function HeaderNav() {
	const userInfo = useAppSelector(state => state.auth.userInfo)
	const userToken = useAppSelector(state => state.auth.userToken)

	const dispatch = useAppDispatch()

	const navigate = useNavigate()

	useEffect(() => {
		if (userToken) {
			dispatch(userProfile())
		}
	}, [userToken, dispatch])

	return (
		<nav className='main-nav'>
			<Link className='main-nav-logo' to='/'>
				<img
					className='main-nav-logo-image'
					src='/img/argentBankLogo.png'
					alt='Argent Bank Logo'
				/>
				<h1 className='sr-only'>Argent Bank</h1>
			</Link>
			<div>
				<Link
					className='main-nav-item'
					to={userInfo ? '/profile' : '/login'}
				>
					<i className='fa fa-user-circle'></i>
					{userInfo
						? `${userInfo.firstName} ${userInfo.lastName}`
						: 'Sign In'}
				</Link>
				{userInfo && (
					<a
						href='#'
						className='main-nav-item'
						onClick={e => {
							e.preventDefault()
							dispatch(logout())
							navigate('/')
						}}
					>
						<i className='fa fa-sign-out'></i>
						Logout
					</a>
				)}
			</div>
		</nav>
	)
}

export default HeaderNav
