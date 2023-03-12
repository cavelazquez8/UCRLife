import { Button, Modal, Form } from 'react-bootstrap';
import styles from '../styles/offerView.module.css';
import {useEffect, useState} from "react"
import { useNavigate } from 'react-router-dom';
import { Offer } from '../models/offers';
import { User } from "../models/user";
import {AiFillStar} from 'react-icons/ai'
import { BiStar } from 'react-icons/bi';
import { rateOffer } from '../network/offers_api';
import axios from "axios";

interface CommentProps {
	star: number;
	comment: string;
	postedby:  string;
    postUsername: string;
}

const Comment = ({ star, comment, postedby, postUsername }: CommentProps) => {
	return (
		<div className={styles.commentContainer}>
			<div className={styles.commentHeader}>
				<div className={styles.commentStars}>
				{[...Array(star)].map((_, index) => (
       			 <AiFillStar key={index} style={{ color: 'blue' }} />
					))}
    				{[...Array(5 - star)].map((_, index) => (
        			<BiStar key={index} />
   				 ))}
				</div>
				<div className={styles.commentPostedBy}>Posted by: {postUsername}</div>
			</div>
			<div className={styles.commentText}>{comment}</div>
		</div>
	);
};

interface OfferViewProps {
	offerToView?: Offer;
	onDismiss: () => void;
    userLoggedIn: User | null,
}

const OfferView = ({offerToView, onDismiss, userLoggedIn} : OfferViewProps ) => {
    
    const navigate = useNavigate();
    const [conversations, setConversations] = useState([]);
    const [ownOffer, setOwnOffer] = useState(false);

    const [rating, setRating] = useState<number>(0);
	const [comment, setComment] = useState<string>('');

	const handleRatingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		
		setRating(parseInt(event.target.value));
	};

	const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setComment(event.target.value);
	};

	const handleRateOffer = async () => {
		await rateOffer(offerToView._id, rating, comment, userLoggedIn.username);
		window.location.reload(); // Reload the page to show the updated ratings
	};



    useEffect(()=>{
        //get all the conversations of the user
        axios.get('/api/conversation/' + userLoggedIn?._id).then(response => {
        setConversations(response.data);
        })
        .catch(error => {
            console.error(error);
        });

        if(userLoggedIn?._id === offerToView.userId) setOwnOffer(true)

    },[offerToView.userId, userLoggedIn?._id]);

    const handleClick = async () => {
        //check if the user has had a conversation with the user that posted the offer
        const conver = conversations.find( (convs) => convs.users.includes(offerToView.userId) );
        let conv_id;

        try{
            if(conver) {
                //send the id of the conversation that already exists
                conv_id = conver._id
            }
            else 
            {   //create new conversation
                const conversation = {
                    senderId: userLoggedIn._id,
                    recipientId: offerToView.userId,
                }
                const res = await axios.post('api/conversation/newConversation', conversation);
                conv_id = res.data._id
            }
            const data = { 
                id: conv_id,
                mssg: "Hello, I'm interested in buying your " + offerToView.title + " for $" + offerToView.price
            };
            //send the data to the messages page
            const searchParams = new URLSearchParams(data);
            navigate(`/mymessages?${searchParams.toString()}`);
        }
        catch(error){
            console.log(error);
        }
      }

    return(
        <Modal show onHide={onDismiss}>
            <Modal.Header closeButton>
				<Modal.Title> {offerToView.title} &nbsp; ${offerToView.price} </Modal.Title>
			</Modal.Header>

            <Modal.Body>
            <img
                className={styles.Img}
                src={offerToView.imgURL}
                alt=""
            />

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
		
				</div>

            {offerToView.totalrating && (
				<div className={styles.commentContainer}>
					<div className={styles.commentHeader}>
						<div className={styles.commentPostedBy}>
							Reviews
						</div>
					</div>
					<div className={styles.commentText}>
						{offerToView.ratings.map((comment, index) => (
							<Comment
								key={index}
								star={comment.star}
								comment={comment.comment}
								postedby={comment.postedby}
                                postUsername ={comment.postUsername}
							/>
						))}
					</div>
				</div>
			)}
            </Modal.Body>

            <Modal.Footer>
                {/* prevent self message */}
            {ownOffer ? ( <></>) : (
                    <Button type='submit' onClick={handleClick}>
                        Send Message
                    </Button> ) 
            }
			</Modal.Footer>

        </Modal>
        
    )
}

export default OfferView;