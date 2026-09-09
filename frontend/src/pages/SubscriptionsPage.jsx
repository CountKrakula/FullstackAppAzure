import { useState, useEffect } from 'react'
import axios from 'axios'
import SubscriptionForm from '../components/SubscriptionForm'

export default function SubscriptionsPage() {
  const [subscription, setSubscription] = useState('');
  const [subscriptions, setSubscriptions] = useState([]);
  const [editingSubscription, setEditingSubscription] = useState(null);

  async function getSubscriptions() {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('https://localhost:7031/api/Subscription', {
        // Sends the token so the backend's [Authorize] check accepts this request
        headers: { Authorization: `Bearer ${token}` }
      });
      setSubscriptions(response.data);
    } catch (error) {
      console.error('Error fetching subscriptions:', error);
    }
  }

  useEffect(() => {
    getSubscriptions();
  }, []);

  async function createSubscription(data) {

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('https://localhost:7031/api/Subscription', data, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log('Subscription created:', response.data);
      getSubscriptions(); // refresh list after creating
    } catch (error) {
      console.error('Error creating subscription:', error);
    }
  }

  async function deleteSubscription(id) {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`https://localhost:7031/api/Subscription/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      getSubscriptions(); // refresh list after deleting
    } catch (error) {
      console.error('Error deleting subscription:', error);
    }
  }

  async function updateSubscription(id, updatedData) {
    try {

      const token = localStorage.getItem('token');
      await axios.put(`https://localhost:7031/api/Subscription/${id}`, updatedData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      getSubscriptions();
    } catch (error) {
      console.error('Error updating subscription:', error);
    }
  }

  return (
    <>
      <main>
        <SubscriptionForm onSubmit={createSubscription} />

        {editingSubscription && (
          <SubscriptionForm
            initialData={editingSubscription}
            onSubmit={(data) => updateSubscription(editingSubscription.id, data)}
          />
        )}




        <h1>Subscription List</h1>
        <ul>
          {subscriptions.map(subscription => (
            <li key={subscription.id}>
              <b>{subscription.name}</b> - {subscription.cost} kr / {subscription.billingInterval}
              <button onClick={() => deleteSubscription(subscription.id)}>Delete</button>
              <button onClick={() => setEditingSubscription(subscription)}>Edit</button>

            </li>
          ))}
        </ul>



      </main>


    </>
  );
}