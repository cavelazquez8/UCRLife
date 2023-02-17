import React, { useEffect, useState }from 'react';
import Col from 'react-bootstrap/esm/Col';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Offer from './components/offer';
import {Offer as OfferModel} from "./models/offers"
import styles from "./styles/OfferPage.module.css"
import * as OffersApi from "./network/offers_api";
import AddOfferDialogue from './components/AddOfferDialogue';
import { Button } from 'react-bootstrap';

function App() {
  const [offers, setOffers] = useState<OfferModel[]>([])

  const [showAddOfferDialoguel, setShowAddOfferDialogue] = useState(false);

  useEffect(() => {
    async function loadOffers(){
      try {
        const offers = await OffersApi.fetchOffers();
        setOffers(offers);
      } catch (error) {
        console.error(error);
        alert(error);
      }
      
    }
    loadOffers();
      
  }, []);

  return (
    <Container>
      <Button onClick={() => setShowAddOfferDialogue(true)}>
        Add New Offer
      </Button>
      <Row xs={1} md={2} xl={4} className="g-4">
      {offers.map(offer => (
        <Col key={offer._id}>
        <Offer offer={offer} className={styles.offer} />
        </Col>
      ))}
      </Row>
      {showAddOfferDialoguel &&
        <AddOfferDialogue
          onDismiss={() => setShowAddOfferDialogue(false)}
          onOfferSaved={(newOffer) => {
            setOffers([...offers, newOffer]);
            setShowAddOfferDialogue(false);
          }}
        />
      }
    </Container>
  );
}

export default App;
