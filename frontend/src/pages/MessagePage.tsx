import { Container } from "react-bootstrap";
import Messenger from "../components/MessagePage"
import OfferPageLoggedOutView from "../components/OfferPageLoggedOutView";
import { User } from "../models/user";

interface OfferPageProps {
    userLoggedIn: User | null,
}

const OffersPage = ({ userLoggedIn }: OfferPageProps) => {
    
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

export default OffersPage;