import styles from '../styles/Offer.module.css';
import { Card } from 'react-bootstrap';
import { Offer as OfferModel } from '../models/offers';
import { formatDate } from '../utils/formatDate';
import { MdDelete,MdBookmark } from 'react-icons/md';
import styleUtils from '../styles/utils.module.css';
import { BiStar } from 'react-icons/bi';
import {AiFillStar} from 'react-icons/ai'

interface OfferProps {
	offer: OfferModel;
	onOfferClicked: (note: OfferModel) => void;
	onDeleteOfferClicked: (note: OfferModel) => void;
	className?: string;
	onAddFavoriteClick: (note:OfferModel)=>void;
	ableToDelete: any,
}

const Offer = ({
	offer,
	onDeleteOfferClicked,
	onOfferClicked,
	className,
	onAddFavoriteClick,
	ableToDelete,
}: OfferProps) => {
	const { title, username, description, imgURL, price, createdAt, updatedAt, totalrating, ratings} = offer;

	let createdUpdatedText: string;
	if (updatedAt > createdAt) {
		createdUpdatedText = 'Updated: ' + formatDate(updatedAt);
	} else {
		createdUpdatedText = 'Created: ' + formatDate(createdAt);
	}
	return (
		<Card
			className={`${styles.offerCard} ${className}`}
			onClick={() => onOfferClicked(offer)}
		>
			<div className={styles.imagecontainer}>
			<Card.Img variant='top' src={imgURL} />
			</div>
			<Card.Body className={styles.cardBody}>
				<Card.Title className={styleUtils.flexCenter}>
					{title} &nbsp; ${price}

					{ableToDelete ? ( <MdDelete title="Delete"
						className='text-muted ms-auto'
						onClick={(e) => {
							onDeleteOfferClicked(offer);
							e.stopPropagation();
						}}
					/> ) : ( <MdBookmark title="Add to favorites"
						className='text-muted ms-auto'
						onClick={(e) => {
							onAddFavoriteClick(offer);
							e.stopPropagation();
						}}
					/> ) 
            }		
				</Card.Title>
				<Card.Subtitle className='mb-2 text-muted'>
					Created by:&nbsp;{username}
				</Card.Subtitle>
				<div className={styles.commentStars}>
						{[...Array(Math.floor(totalrating))].map((_, index) => (
       			 		<AiFillStar key={index} style={{ color: 'blue' }} />
					))}
    				{[...Array(5 - Math.floor(totalrating))].map((_, index) => (
        				<BiStar key={index} />
    				))}     <span className={styles.numRatings}>
					<span style={{ color: 'blue' }}>({ratings.length})</span>
					</span>
				</div>
				<Card.Text className={styles.cardText}>{description}</Card.Text>
			
		</Card.Body>
		<Card.Footer className='text-muted'>{createdUpdatedText}</Card.Footer>
	</Card>
);
};
export default Offer;
