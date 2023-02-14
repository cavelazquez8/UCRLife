import React, { useEffect, useState }from 'react';
import Col from 'react-bootstrap/esm/Col';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Offer from './components/offer';
import {Offer as OfferModel} from "./models/offers"
import styles from "./styles/OfferPage.module.css"

function App() {
  const [offers, setOffers] = useState<OfferModel[]>([])

  useEffect(() => {
    async function loadOffers(){
      try {
        const response = await fetch("/api/offers", {method: "GET"});
        const offers = await response.json();
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
      <Row xs={1} md={2} xl={4} className="g-4">
      {offers.map(offer => (
        <Col key={offer._id}>
        <Offer offer={offer} className={styles.offer} />
        </Col>
      ))}
      </Row>
    </Container>
  );
}

export default App;
