import { Button, Modal } from 'react-bootstrap';
import styles from '../styles/offerView.module.css';
import {useEffect, useState} from "react"
import { useNavigate } from 'react-router-dom';
import { Offer } from '../models/offers';
import { User } from "../models/user";
import axios from "axios";

interface OfferViewProps {
	offerToView?: Offer;
	onDismiss: () => void;
    userLoggedIn: User | null,
}

const OfferView = ({offerToView, onDismiss, userLoggedIn} : OfferViewProps ) => {
    
    const navigate = useNavigate();
    const [conversations, setConversations] = useState([]);
    const [ownOffer, setOwnOffer] = useState(false);

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
				<Modal.Title> {offerToView.title} </Modal.Title>
			</Modal.Header>

            <Modal.Body>
            <img
                className={styles.Img}
                src={offerToView.imgURL}
                alt=""
            />

            </Modal.Body>
            <Modal.Footer>
                {/* don't message yourself */}
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