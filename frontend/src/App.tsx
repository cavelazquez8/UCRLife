import React, { useEffect, useState }from 'react';
import Offer from './components/offer';
import {Offer as OfferModel} from "./models/offers"

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
    <div>
      {offers.map(offer => (
        <Offer offer={offer} key={offer._id} />
      ))}
    </div>
  );
}

export default App;
