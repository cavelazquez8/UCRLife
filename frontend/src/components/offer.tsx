import styles from '../styles/Offer.module.css';
import { Card } from 'react-bootstrap';
import { Offer as OfferModel } from '../models/offers';
import { formatDate } from '../utils/formatDate';
import { MdDelete } from 'react-icons/md';
import styleUtils from '../styles/utils.module.css';
import { AiFillMessage as MessengerIcon } from "react-icons/ai";
interface OfferProps {
	offer: OfferModel;
	onOfferClicked: (note: OfferModel) => void;
	onDeleteOfferClicked: (note: OfferModel) => void;
	className?: string;
}

const Offer = ({
	offer,
	onDeleteOfferClicked,
	onOfferClicked,
	className,
}: OfferProps) => {
	const { title, username, description, imgURL, price, createdAt, updatedAt } = offer;

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
			<Card.Img className={styles.cardImg} variant='top' src={imgURL} />
			<Card.Body className={styles.cardBody}>
				<Card.Title className={styleUtils.flexCenter}>
					{title} &nbsp; ${price}
					<MdDelete
						className='text-muted ms-auto'
						onClick={(e) => {
							onDeleteOfferClicked(offer);
							e.stopPropagation();
						}}
					/>
					<MessengerIcon/>
				</Card.Title>
				<Card.Subtitle className="mb-2 text-muted"> Created by:&nbsp;{username} </Card.Subtitle>
				<Card.Text className={styles.cardText}>{description}</Card.Text>
			</Card.Body>
			<Card.Footer className='text-muted'>{createdUpdatedText}</Card.Footer>
		</Card>
	);
};

export default Offer;
