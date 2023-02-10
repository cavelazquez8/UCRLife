import React, { useEffect, useState }from 'react';
import './App.css';
import {Offer} from "./models/offers"

function App() {
  const [offers, setOffers] = useState<Offer[]>([])

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
    <div className="App">
      {JSON.stringify(offers)}
    </div>
  );
}

export default App;
