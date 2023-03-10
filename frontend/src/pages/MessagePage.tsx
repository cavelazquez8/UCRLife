import { Container } from "react-bootstrap";
import Messenger from "../components/MessagePage"
import OfferPageLoggedOutView from "../components/OfferPageLoggedOutView";
import { User } from "../models/user";

interface MessagePageProps {
    userLoggedIn: User | null,
}

const MessagePage = ({ userLoggedIn }: MessagePageProps) => {
    
    return (
            <Container>
				<>
					{userLoggedIn ? (
						<Messenger userLoggedIn={userLoggedIn}/>
					) : (
						<OfferPageLoggedOutView />
					)}
				</>
			</Container>
    );
}

export default MessagePage;