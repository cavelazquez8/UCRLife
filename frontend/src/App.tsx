import Container from 'react-bootstrap/esm/Container';
import LoginUserModel from './components/LoginUserModel';
import NavBar from './components/NavBar';
import SignUpModel from './components/SignUpModel';
import { useEffect, useState } from 'react';
import { User } from './models/user';
import Slider from './components/Slider';
import Categories  from './components/Categories';
import * as UserApi from './network/user_api';
import OfferPageLoggedInView from './components/OfferPageLoggedInView';
import OfferPageLoggedOutView from './components/OfferPageLoggedOutView';

function App() {
	const [userLoggedIn, setLoggedInUser] = useState<User | null>(null);
	const [showSignUpModel, setShowSignUpModel] = useState(false);
	const [showLoginModel, setShowLoginModel] = useState(false);
	const [beforeLogin, setBeforeLogin] = useState(true);

	useEffect(() => {
		async function fetchLoggedInUser() {
			try {
				const user = await UserApi.getLogIn();
				setLoggedInUser(user);
			} catch (error) {
				console.error(error);
			}
			fetchLoggedInUser();
		}
	}, []);
	return (
		<div>
			<NavBar
				userLoggedIn={userLoggedIn}
				onSignupOption={() => setShowSignUpModel(true)}
				onLoginOption={() => setShowLoginModel(true)}
				onLogoutOption={() => setLoggedInUser(null)}
			/>
			<Container>
				<>
					{userLoggedIn ? (
						<OfferPageLoggedInView />
					) : (
						<OfferPageLoggedOutView />
					)}
				</>
			</Container>
			{showSignUpModel && (
				<SignUpModel
					onDismiss={() => setShowSignUpModel(false)}
					onSuccessSignUp={(user) => {
						setLoggedInUser(user);
						setShowSignUpModel(false);
						setBeforeLogin(false);
					}}
				/>
			)}
			{showLoginModel && (
				<LoginUserModel
					onDismiss={() => setShowLoginModel(false)}
					onSuccessLogin={(user) => {
						setLoggedInUser(user);
						setShowLoginModel(false);
						setBeforeLogin(false);
					}}
				/>
			)}
			{beforeLogin && <Categories />}
			{beforeLogin && <Slider />}
		</div>
	);
}

export default App;
