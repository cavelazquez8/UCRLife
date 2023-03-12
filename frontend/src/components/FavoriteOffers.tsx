import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import AddOfferDialogue from './AddOfferDialogue';
import Offer from './offer';
import { Offer as OfferModel } from '../models/offers';
import * as OffersApi from '../network/offers_api';
import styles from '../styles/OfferPage.module.css';
import styleUtils from '../styles/utils.module.css';
import {favoriteOffer} from "../models/favoriteOffer";
import * as favoriteOffersApi from '../network/favoriteOffer_api';

const FavoriteOffers = () => {
	const [offers, setOffers] = useState<OfferModel[]>([]);
	const [showAddOfferDialoguel, setShowAddOfferDialogue] = useState(false);
	const [offerToEdit, setOfferToEdit] = useState<OfferModel | null>(null);

	useEffect(() => {
		async function loadOffers() {
			try {
				let favoriteOffers: Array<favoriteOffer> = await favoriteOffersApi.fetchFavoriteOffers();
				let offers:Array<OfferModel> = [];
				console.log("Size ", favoriteOffers.length);
				for(var i=0; i<favoriteOffers.length;++i){
					console.log("Favorite Offer Id ", favoriteOffers.at(i).favoriteOffersId)
					offers.push(await OffersApi.getOffer(favoriteOffers.at(i).favoriteOffersId));
				}
				if(offers.length !== 0){
					setOffers(offers);
				}
			} catch (error) {
				console.error(error);
				//alert(error);
			}
		}
		loadOffers();
	}, []);

	async function deleteFavoriteOffer(offer: OfferModel) {
		try {
			await favoriteOffersApi.deleteFavorite(offer._id);
			setOffers(
				offers.filter((existingOffer) => existingOffer._id !== offer._id)
			);
		} catch (error) {
			console.error(error);
			alert(error);
		}
	}
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
	
	async function addOffer(){

	}

	return (
		<>

			<Row xs={1} md={2} xl={4} className='g-4'>
				{offers.map((offer) => (
					<Col key={offer._id}>
						<Offer
							offer={offer}
							className={styles.offer}
							onOfferClicked={setOfferToEdit}
							onDeleteOfferClicked={deleteFavoriteOffer}
							onAddFavoriteClick={addOffer}
							ableToDelete={true}
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
		</>
	);
};

export default FavoriteOffers;