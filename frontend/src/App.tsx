import React, { useEffect, useState }from 'react';
import Col from 'react-bootstrap/esm/Col';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Offer from './components/offer';
import {Offer as OfferModel} from "./models/offers"
import styles from "./styles/OfferPage.module.css"
import styleUtils from "./styles/utils.module.css"
import * as OffersApi from "./network/offers_api";
import AddOfferDialogue from './components/AddOfferDialogue';
import { Button } from 'react-bootstrap';

function App() {
  const [offers, setOffers] = useState<OfferModel[]>([])

  const [showAddOfferDialoguel, setShowAddOfferDialogue] = useState(false);
  const [offerToEdit, setOfferToEdit] = useState<OfferModel | null>(null);

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

  async function deleteOffer(offer: OfferModel) {
    try {
      await OffersApi.deleteOffer(offer._id);
      setOffers(offers.filter(existingOffer => existingOffer._id !== offer._id));
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }

  return (
    <Container>
      <Button className={`mb-4 ${styleUtils.Center}`}
      onClick={() => setShowAddOfferDialogue(true)}>
        Add New Offer
      </Button>
      <Row xs={1} md={2} xl={4} className="g-4">
      {offers.map(offer => (
        <Col key={offer._id}>
        <Offer 
        offer={offer} 
        className={styles.offer} 
        onOfferClicked={setOfferToEdit}
        onDeleteOfferClicked={deleteOffer}
        />
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
      {offerToEdit &&
      <AddOfferDialogue 
      offerToEdit={offerToEdit}
      onDismiss={() => setOfferToEdit(null)}
      onOfferSaved={(updatedOffer) => {
        setOffers(offers.map(exisitngOffer => exisitngOffer._id === updatedOffer._id ? updatedOffer : exisitngOffer));
        setOfferToEdit(null);
      }}
      />
      }

    </Container>
  );
}

export default App;
