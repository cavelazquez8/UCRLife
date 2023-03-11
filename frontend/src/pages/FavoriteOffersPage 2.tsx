import { Container } from "react-bootstrap";
import OfferPageLoggedOutView from "../components/OfferPageLoggedOutView";
import { User } from "../models/user";
import FavoriteOffers from "../components/FavoriteOffers";

interface FavoriteOffersPageProps {
    userLoggedIn: User | null,
}

const FavoriteOffersPage = ({ userLoggedIn }: FavoriteOffersPageProps) => {
    
    return (
            <Container>
				<>
					{userLoggedIn ? (
						<FavoriteOffers/>
					) : (
						<OfferPageLoggedOutView />
					)}
				</>
			</Container>
    );
}

export default FavoriteOffersPage;