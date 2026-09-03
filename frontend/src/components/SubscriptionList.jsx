import { useState, useEffect } from 'react'
import axios from 'axios'

export default function SubscriptionList() {
  const [subscriptions, setSubscriptions] = useState([]);

  async function getSubscriptions() {
    try {
      const response = await axios.get('https://localhost:7031/api/Subscription');
      setSubscriptions(response.data);
    } catch (error) {
      console.error('Error fetching subscriptions:', error);
    }
  }

  useEffect(() => {
    getSubscriptions();
  }, []);

  return (
    <> 
    
      <h1>Subscription List</h1>
      <ul>        
          {subscriptions.map(subscription => (
            <li key={subscription.id}>
            <b>{subscription.name}</b> - {subscription.cost} kr / {subscription.billingInterval}
            </li>
      ))}
      </ul>
    
    </>
  )
}