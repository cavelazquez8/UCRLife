import { Container } from "react-bootstrap";
import OfferPageLoggedInView from "../components/OfferPageLoggedInView";
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
						<OfferPageLoggedInView userLoggedIn={userLoggedIn}/>
					) : (
						<OfferPageLoggedOutView />
					)}
				</>
			</Container>
    );
}

export default OffersPage;