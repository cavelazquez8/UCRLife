import { Container } from "react-bootstrap";
import OfferPageLoggedOutView from "../components/OfferPageLoggedOutView";
import { User } from "../models/user";
import UserOffer from "../components/UserOffers";

interface userOfferPageProps {
    userLoggedIn: User | null,
}

const UserOfferPage = ({ userLoggedIn }: userOfferPageProps) => {
    
    return (
            <Container>
				<>
					{userLoggedIn ? (
						<UserOffer/>
					) : (
						<OfferPageLoggedOutView />
					)}
				</>
			</Container>
    );
}

export default UserOfferPage;