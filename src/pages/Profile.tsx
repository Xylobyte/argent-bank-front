import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks.ts'
import { updateUserProfile } from '../features/auth/auth.thunks.ts'
import './Profile.css'

function Profile() {
	const [firstNameInput, setFirstNameInput] = useState('')
	const [lastNameInput, setLastNameInput] = useState('')
	const [isEditName, setIsEditName] = useState(false)

	const userInfo = useAppSelector(state => state.auth.userInfo)
	const dispatch = useAppDispatch()

	useEffect(() => {
		document.title = 'Argent Bank - Profil'
	}, [])

	useEffect(() => {
		setFirstNameInput(userInfo.firstName)
		setLastNameInput(userInfo.lastName)
	}, [userInfo])

	const toggleEditName = () => {
		if (isEditName) {
			dispatch(
				updateUserProfile({
					firstName: firstNameInput,
					lastName: lastNameInput,
				}),
			)
		}
		setIsEditName(old => !old)
	}

	return (
		<main className='main bg-dark'>
			<div className='header'>
				<h1>
					Welcome back
					<br />
					{isEditName ? (
						<>
							<input
								className='i-firstname'
								type='text'
								value={firstNameInput}
								onChange={e =>
									setFirstNameInput(e.target.value)
								}
							/>
							<input
								className='i-lastname'
								type='text'
								value={lastNameInput}
								onChange={e => setLastNameInput(e.target.value)}
							/>
						</>
					) : (
						<>
							<span>{userInfo.firstName}</span>
							<span> {userInfo.lastName}</span>
						</>
					)}
				</h1>
				<button className='edit-button' onClick={toggleEditName}>
					{isEditName ? 'Save' : 'Edit Name'}
				</button>
			</div>
			<h2 className='sr-only'>Accounts</h2>
			<section className='account'>
				<div className='account-content-wrapper'>
					<h3 className='account-title'>
						Argent Bank Checking (x8349)
					</h3>
					<p className='account-amount'>$2,082.79</p>
					<p className='account-amount-description'>
						Available Balance
					</p>
				</div>
				<div className='account-content-wrapper cta'>
					<button className='transaction-button'>
						View transactions
					</button>
				</div>
			</section>
			<section className='account'>
				<div className='account-content-wrapper'>
					<h3 className='account-title'>
						Argent Bank Savings (x6712)
					</h3>
					<p className='account-amount'>$10,928.42</p>
					<p className='account-amount-description'>
						Available Balance
					</p>
				</div>
				<div className='account-content-wrapper cta'>
					<button className='transaction-button'>
						View transactions
					</button>
				</div>
			</section>
			<section className='account'>
				<div className='account-content-wrapper'>
					<h3 className='account-title'>
						Argent Bank Credit Card (x8349)
					</h3>
					<p className='account-amount'>$184.30</p>
					<p className='account-amount-description'>
						Current Balance
					</p>
				</div>
				<div className='account-content-wrapper cta'>
					<button className='transaction-button'>
						View transactions
					</button>
				</div>
			</section>
		</main>
	)
}

export default Profile
