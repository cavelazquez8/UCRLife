import { useEffect, useState } from 'react';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import Offer from '../components/offer';
import { Offer as OfferModel } from '../models/offers';
import * as OffersApi from '../network/offers_api';
import styles from '../styles/OfferPage.module.css';
import Categories from './Categories';

const OfferPageLoggedInView = () => {
	const [offers, setOffers] = useState<OfferModel[]>([]);
	const [offerToEdit, setOfferToEdit] = useState<OfferModel | null>(null);
	const [searchTerm, setSearchTerm] = useState('');
	const [category, setCategory] = useState('');

	useEffect(() => {
		async function loadOffers() {
			try {
				const offers = await OffersApi.fetchAllOffers();
				setOffers(offers);
			} catch (error) {
				console.error(error);
				alert(error);
			}
		}
		loadOffers();
	}, []);

	async function deleteOffer(offer: OfferModel) { }

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
	};

	  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		event.persist();
		const newQuery = event.target.value;
		console.log('target value:');
		console.log(event.target.value);
		console.log('setting category');
		setCategory(newQuery);
		console.log('category:');
		//console.log(newQuery);
		console.log(category);
		searchHandler();
	  };

	return (
		<>
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
                            <select value={searchTerm} onChange={handleSelectChange}>
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
			<Categories/>
		</>
	);
};

export default OfferPageLoggedInView;
