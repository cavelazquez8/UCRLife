import styles from '../styles/Offer.module.css';
import { Card, Form, Button } from 'react-bootstrap';
import { useState } from 'react';
import { Offer as OfferModel } from '../models/offers';
import { formatDate } from '../utils/formatDate';
import { MdDelete } from 'react-icons/md';
import styleUtils from '../styles/utils.module.css';
import { rateOffer } from '../network/offers_api';


interface CommentProps {
	star: number;
	comment: string;
	postedby: string;
}

const Comment = ({ star, comment, postedby }: CommentProps) => {
	return (
		<div className={styles.commentContainer}>
			<div className={styles.commentHeader}>
				<div className={styles.commentStars}>
					{[...Array(star)].map((_, index) => (
						<i key={index} className='bi bi-star-fill'></i>
					))}
					{[...Array(5 - star)].map((_, index) => (
						<i key={index} className='bi bi-star'></i>
					))}
				</div>
				<div className={styles.commentPostedBy}>Posted by: {postedby} ({star} stars)</div>
			</div>
			<div className={styles.commentText}>{comment}</div>
		</div>
	);
};

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
	const { title, username, description, imgURL, price, createdAt, updatedAt, totalrating, ratings} = offer;

	const [rating, setRating] = useState<number>(0);
	const [comment, setComment] = useState<string>('');

	const handleRatingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		
		setRating(parseInt(event.target.value));
	};

	const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setComment(event.target.value);
	};

	const handleRateOffer = async () => {
		await rateOffer(offer._id, rating, comment);
		window.location.reload(); // Reload the page to show the updated ratings
	};

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
				</Card.Title>
				<Card.Subtitle className='mb-2 text-muted'>
					Created by:&nbsp;{username}
				</Card.Subtitle>
				<Card.Text className={styles.cardText}>{description}</Card.Text>
				<div>
					<Form.Control
						as='select'
						value={rating}
						onChange={handleRatingChange}
						className='mb-3'
					>
						<option value={0}>Rate this offer...</option>
						<option value={1}>1 star</option>
						<option value={2}>2 stars</option>
						<option value={3}>3 stars</option>
						<option value={4}>4 stars</option>
						<option value={5}>5 stars</option>
					</Form.Control>
					<Form.Control
						type='text'
						placeholder='Write a review...'
						value={comment}
						onChange={handleCommentChange}
						className='mb-3'
					/>
					<Button variant='primary' onClick={handleRateOffer} disabled={rating === 0}>
						Submit Review
					</Button>
					<div className='mt-3'>
						{totalrating !== undefined && (
							<span>
								Average rating: {totalrating} star{totalrating !== 1 && 's'}
							</span>
						)}
					</div>
				
					</div>
			{totalrating && (
				<div className={styles.commentContainer}>
					<div className={styles.commentHeader}>
						<div className={styles.commentStars}>
							{[...Array(totalrating)].map((_, index) => (
								<i key={index} className='bi bi-star-fill'></i>
							))}
							{[...Array(5 - totalrating)].map((_, index) => (
								<i key={index} className='bi bi-star'></i>
							))}
						</div>
						<div className={styles.commentPostedBy}>
							Number of ratings: {ratings.length} 
						</div>
					</div>
					<div className={styles.commentText}>
						{ratings.map((comment, index) => (
							<Comment
								key={index}
								star={comment.star}
								comment={comment.comment}
								postedby={comment.postedby}
							/>
						))}
					</div>
				</div>
			)}
		</Card.Body>
		<Card.Footer className='text-muted'>{createdUpdatedText}</Card.Footer>
	</Card>
);
};
export default Offer;
