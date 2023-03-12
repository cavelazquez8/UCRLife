import { useEffect, useState } from 'react';
import { Container, Modal, Button } from 'react-bootstrap';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginUserModel from './components/LoginUserModel';
import NavBar from './components/NavBar';
import SignUpModel from './components/SignUpModel';
import { User } from './models/user';
import * as UserApi from './network/user_api';
import NotFound from './pages/NotFound';
import OffersPage from './pages/OffersPage';
import MessagePage from './pages/MessagePage';
import UserOfferPage from './pages/UserOffersPage';
import FavoriteOffersPage from './pages/FavoriteOffersPage';
import styles from './styles/App.module.css';
import Footer from './components/Footer';

function App() {
	const [userLoggedIn, setLoggedInUser] = useState<User | null>(null);
	const [showSignUpModel, setShowSignUpModel] = useState(false);
	const [showLoginModel, setShowLoginModel] = useState(false);
	const [beforeLogin, setBeforeLogin] = useState(true);
	const [isShow, invokeModal] = useState(false);
	const initModal = () => {
		return invokeModal(!false);
	};

	useEffect(() => {
		async function fetchLoggedInUser() {
			try {
				const user = await UserApi.getLogIn();
				setLoggedInUser(user);
			} catch (error) {
				console.error(error);
			}
		}
		fetchLoggedInUser();
	}, []);
	return (
		<BrowserRouter>
			<div>
				<NavBar
					userLoggedIn={userLoggedIn}
					onSignupOption={() => setShowSignUpModel(true)}
					onLoginOption={() => setShowLoginModel(true)}
					onLogoutOption={() => setLoggedInUser(null)}
				/>

				<Container className={styles.pageContainer}>
					<Routes>
						<Route
							path='/'
							element={<OffersPage userLoggedIn={userLoggedIn} />}
						/>

						<Route
							path='/myoffers'
							element={<UserOfferPage userLoggedIn={userLoggedIn}/>}
						/>
						<Route
							path='/mymessages'
							element={<MessagePage userLoggedIn={userLoggedIn}/>}
						/>
						<Route	
							path='/starOffers'
							element={<FavoriteOffersPage userLoggedIn={userLoggedIn}/>}
						/>
						<Route
							path='/*'
							element={<NotFound />}
						/>
				</Routes>
			</Container>
			
			{showSignUpModel && (
				<SignUpModel
					onDismiss={() => setShowSignUpModel(false)}
					onSuccessSignUp={(user) => {
						//setLoggedInUser(user);
						//setShowSignUpModel(false);
						//setBeforeLogin(false);
            setShowSignUpModel(false);
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
		<Footer/>
		</div>
		</BrowserRouter>
	);
}

export default App;
