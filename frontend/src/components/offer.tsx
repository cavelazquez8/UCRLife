import styles from "../styles/Offer.module.css";
import { Card } from "react-bootstrap";
import { Offer as OfferModel } from "../models/offers";


interface OfferProps {
    offer: OfferModel,
    
}

const Offer = ({ offer }: OfferProps) => {

    const {
        title,
        description,
        price,
        createdAt,
        updatedAt,

    } = offer;

        return (
            <Card className={styles.offerCard}>
                <Card.Body>
                    <Card.Title>
                        {title}
                    </Card.Title>
                    <Card.Text className={styles.cardText}>
                        {description}
                    </Card.Text>
                </Card.Body>
            </Card>
        )
}

export default Offer;