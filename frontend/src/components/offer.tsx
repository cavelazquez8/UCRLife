import styles from "../styles/Offer.module.css";
import { Card } from "react-bootstrap";
import { Offer as OfferModel } from "../models/offers";
import { formatDate } from "../utils/formatDate";


interface OfferProps {
    offer: OfferModel,
    className?: string,
}

const Offer = ({ offer, className }: OfferProps) => {

    const {
        title,
        description,
        price,
        createdAt,
        updatedAt,

    } = offer;

    let createdUpdatedText: string;
    if (updatedAt > createdAt) {
        createdUpdatedText = "Updated: " + formatDate(updatedAt);
    } else {
        createdUpdatedText = "Created: " + formatDate(createdAt);
    }

        return (
            <Card className={`${styles.offerCard} ${className}`}>
                <Card.Body className={styles.cardBody}>
                    <Card.Title>
                        {title}
                    </Card.Title>
                    <Card.Text className={styles.cardText}>
                        {description}
                    </Card.Text>
                </Card.Body>
                <Card.Footer className="text-muted">
                    {createdUpdatedText}
                </Card.Footer>
            </Card>
        )
}

export default Offer;