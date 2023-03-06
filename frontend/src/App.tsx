import { useEffect, useState } from 'react';
import { Container, Modal, Button } from 'react-bootstrap';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Categories from './components/Categories';
import LoginUserModel from './components/LoginUserModel';
import NavBar from './components/NavBar';
import SignUpModel from './components/SignUpModel';
import Slider from './components/Slider';
import { User } from './models/user';
import * as UserApi from './network/user_api';
import NotFound from './pages/NotFound';
import OffersPage from './pages/OffersPage';
import UserOffersPage from './pages/UserOffers';
import styles from './styles/App.module.css';

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
						<Route path='/myoffers' element={<UserOffersPage />} />
						<Route path='/*' element={<NotFound />} />
					</Routes>
				</Container>

				{showSignUpModel && (
					<SignUpModel
						onDismiss={() => setShowSignUpModel(false)}
						onSuccessSignUp={(user) => {
							// setLoggedInUser(user);
							// setShowSignUpModel(false);
							// setBeforeLogin(false);
							setShowSignUpModel(false);
							// initModal();
							// <Modal show={isShow}>
							// 	<Modal.Header closeButton onClick={initModal}>
							// 		<Modal.Title>React Modal Popover Example</Modal.Title>
							// 	</Modal.Header>
							// 	<Modal.Body>
							// 		Lorem ipsum dolor sit amet, consectetur adipiscing elit.
							// 	</Modal.Body>
							// 	<Modal.Footer>
							// 		<Button variant='danger' onClick={initModal}>
							// 			Close
							// 		</Button>
							// 		<Button variant='dark' onClick={initModal}>
							// 			Store
							// 		</Button>
							// 	</Modal.Footer>
							// </Modal>;
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
		</BrowserRouter>
	);
}

export default App;
