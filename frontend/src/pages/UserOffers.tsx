import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import AddOfferDialogue from '../components/AddOfferDialogue';
import Offer from '../components/offer';
import { Offer as OfferModel } from '../models/offers';
import * as OffersApi from '../network/offers_api';
import styles from '../styles/OfferPage.module.css';
import styleUtils from '../styles/utils.module.css';

const OfferPageLoggedInView = () => {
	const [offers, setOffers] = useState<OfferModel[]>([]);
	const [showAddOfferDialoguel, setShowAddOfferDialogue] = useState(false);
	const [offerToEdit, setOfferToEdit] = useState<OfferModel | null>(null);
	const [searchTerm, setSearchTerm] = useState('');
	// const navigate = useNavigate();

	useEffect(() => {
		async function loadOffers() {
			try {
				const offers = await OffersApi.fetchUserOffers();
				setOffers(offers);
			} catch (error) {
				console.error(error);
				alert(error);
			}
		}
		loadOffers();
	}, []);

	async function deleteOffer(offer: OfferModel) {
		try {
			await OffersApi.deleteOffer(offer._id);
			setOffers(
				offers.filter((existingOffer) => existingOffer._id !== offer._id)
			);
		} catch (error) {
			console.error(error);
			alert(error);
		}
	}

	const getOfferLists = async () => {
		try {
			const offers = await OffersApi.searchOffer(searchTerm);
			console.log(offers);
			setOffers(offers);
		} catch (error) {
			console.error(error);
			alert(error);
		}
	};

	const searchHandler = () => {
		if (searchTerm === '') return;
		getOfferLists();
		console.log('Search Handler Works');
		console.log(searchTerm);
		// navigate('/api/notes/search?title=' + searchTerm);
	};
	return (
		<>
			<Button
				className={`mb-4 ${styleUtils.Center}`}
				onClick={() => setShowAddOfferDialogue(true)}
			>
				Add New Offer
			</Button>
			<input
				type='search'
				value={searchTerm}
				name='keyword'
				placeholder='Search an item'
				onChange={(e) => setSearchTerm(e.currentTarget.value)}
				onKeyDown={(e) => {
					if (e.keyCode === 13) searchHandler();
				}}
			/>

					<label>
					&nbsp;Category:&nbsp;
                            <select value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)}>
                            <option value="">Select a category</option>
                            <option value="electronics">Electronics</option>
                            <option value="books">Books</option>
                            <option value="transport">Transport</option>
                            <option value="misc">Misc</option>
                            </select>
                    </label>

			<Row xs={1} md={2} xl={4} className='g-4'>
				{offers.map((offer) => (
					<Col key={offer._id}>
						<Offer
							offer={offer}
							className={styles.offer}
							onOfferClicked={setOfferToEdit}
							onDeleteOfferClicked={deleteOffer}
						/>
					</Col>
				))}
			</Row>
			{showAddOfferDialoguel && (
				<AddOfferDialogue
					onDismiss={() => setShowAddOfferDialogue(false)}
					onOfferSaved={(newOffer) => {
						setOffers([...offers, newOffer]);
						setShowAddOfferDialogue(false);
					}}
				/>
			)}
			{offerToEdit && (
				<AddOfferDialogue
					offerToEdit={offerToEdit}
					onDismiss={() => setOfferToEdit(null)}
					onOfferSaved={(updatedOffer) => {
						setOffers(
							offers.map((exisitngOffer) =>
								exisitngOffer._id === updatedOffer._id
									? updatedOffer
									: exisitngOffer
							)
						);
						setOfferToEdit(null);
					}}
				/>
			)}
		</>
	);
};

export default OfferPageLoggedInView;
