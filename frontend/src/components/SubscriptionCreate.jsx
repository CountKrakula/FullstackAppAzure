import { useState } from 'react'
import axios from 'axios'

export default function SubscriptionCreate() {
  const [subscription, setSubscription] = useState('');

  async function createSubscription(e) {
    e.preventDefault();
    try {
      const response = await axios.post('https://localhost:7031/api/Subscription', { name: subscription });
      console.log('Subscription created:', response.data);
      setSubscription('');
    } catch (error) {
      console.error('Error creating subscription:', error);
    }
  }

  return (
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
  );
}