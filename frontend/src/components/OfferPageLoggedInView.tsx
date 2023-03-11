import { useCallback, useEffect, useState } from 'react';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import Offer from '../components/offer';
import { Offer as OfferModel } from '../models/offers';
import * as OffersApi from '../network/offers_api';
import styles from '../styles/OfferPage.module.css';
import Categories from './Categories';
import * as favoriteOfferApi from '../network/favoriteOffer_api'

const OfferPageLoggedInView = () => {
	const [offers, setOffers] = useState<OfferModel[]>([]);
	const [offerToEdit, setOfferToEdit] = useState<OfferModel | null>(null);
	const [searchTerm, setSearchTerm] = useState('');
	const [category, setCategory] = useState('');

	async function loadOffers() {
		try {
			const offers = await OffersApi.fetchAllOffers();
			setOffers(offers);
		} catch (error) {
			console.error(error);
			alert(error);
		}
	}

	useEffect(() => {
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

	const getCategoryLists = async () => {
		try {
			const offers = await OffersApi.searchOffer(category);
			console.log(offers);
			setOffers(offers);
		} catch (error) {
			console.error(error);
			alert(error);
		}
		setCategory('');
	};

	const searchHandler = () => {
		if (searchTerm === '') return;
		getOfferLists();
	};

	const categoryHandler = useCallback(() => {
		if (category === '') return;
		if (category === 'all')
		{
			loadOffers();
			setCategory('');
			return;
		}
		getCategoryLists();
	}, [category, getCategoryLists] );

	const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		event.persist();
		const newQuery = event.target.value;
		setCategory(newQuery);
		categoryHandler();
	  };

	  useEffect(() => {
		categoryHandler();
	  }, [category, categoryHandler]);

	  const handleCategoryChange = (newText: string) => {
		setCategory(newText);
	  };
	  async function addOfferToFavorites(offer: OfferModel){
		console.log(offer._id);
		await favoriteOfferApi.fetchAddOffer(offer._id);
	  }

	return (
		<>
		<Categories onCategoryChange={handleCategoryChange}/>
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
                            <select value={category} onChange={handleSelectChange}>
                            <option value="">Select a category</option>
							<option value="all">All</option>
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
							onAddFavoriteClick={addOfferToFavorites}
						/>
					</Col>
				))}
			</Row>
		</>
	);
};

export default OfferPageLoggedInView;
