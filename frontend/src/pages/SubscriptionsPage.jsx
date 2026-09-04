import { useState, useEffect } from 'react'
import axios from 'axios'

export default function SubscriptionsPage() {
  const [subscription, setSubscription] = useState('');
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

  async function createSubscription(e) {
    e.preventDefault();
    try {
      const response = await axios.post('https://localhost:7031/api/Subscription', { name: subscription });
      console.log('Subscription created:', response.data);
      setSubscription('');
      getSubscriptions(); // refresh list after creating
    } catch (error) {
      console.error('Error creating subscription:', error);
    }
  }

  return (
    <>
    <main>
      <form onSubmit={createSubscription}>
        <label htmlFor="subscription">Subscription Name:</label>
        <input
          type="text"
          id="subscription"
          value={subscription}
          onChange={(e) => setSubscription(e.target.value)}
          required
        />
        <button type="submit">Create Subscription</button>
      </form>

      <h1>Subscription List</h1>
      <ul>
        {subscriptions.map(subscription => (
          <li key={subscription.id}>
            <b>{subscription.name}</b> - {subscription.cost} kr / {subscription.billingInterval}
          </li>
        ))}
      </ul>
      </main>
    </>
  );
}